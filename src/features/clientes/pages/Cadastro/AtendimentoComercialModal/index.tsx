import React, { useEffect, useMemo, useState } from 'react';
import {
    FiBarChart2,
    FiBox,
    FiChevronDown,
    FiChevronRight,
    FiClipboard,
    FiKey,
    FiShoppingCart,
} from 'react-icons/fi';
import { CiBarcode } from "react-icons/ci";
import { FaCashRegister } from "react-icons/fa";
import { TbFileDollar } from 'react-icons/tb';
import { RiFilePaperLine, RiBookletFill } from "react-icons/ri";
import {
    Body,
    OptionButton,
    ReportRow,
    ReportsBlock,
    ReportsHeader,
    ReportsList,
} from './styled';
import { ModalSimple } from '../../../../../common/components/ModalSimple';

interface AtendimentoComercialModalProps {
    open: boolean;
    onClose: () => void;
}

const options = [
    { label: 'Frente de Caixa', icon: FaCashRegister },
    { label: 'Pedido Pré-Venda', icon: FiShoppingCart },
    { label: 'Orçamento', icon: TbFileDollar },
    { label: 'Ordem de Serviço', icon: FiClipboard },
    { label: 'Consignação', icon: FiBox },
    { label: 'Locação', icon: FiKey },
    { label: 'Boleto', icon: CiBarcode },
    { label: 'Crediário', icon: RiBookletFill },
    { label: 'Promissória', icon: RiFilePaperLine },
];

const reportOptions = [
    'Relatório de Vendas',
    'Pedido Pré-Venda',
    'Orçamento',
    'Ordem de Serviço',
    'Venda Consignada',
    'Locação'
];

export const AtendimentoComercialModal: React.FC<AtendimentoComercialModalProps> = ({ open, onClose }) => {
    const [reportsOpen, setReportsOpen] = useState(true);

    useEffect(() => {
        if (!open) {
            return;
        }

        setReportsOpen(true);
        const previousBodyOverflow = document.body.style.overflow;
        const previousHtmlOverflow = document.documentElement.style.overflow;

        document.body.style.overflow = 'hidden';
        document.documentElement.style.overflow = 'hidden';

        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        window.addEventListener('keydown', handleEsc);

        return () => {
            document.body.style.overflow = previousBodyOverflow;
            document.documentElement.style.overflow = previousHtmlOverflow;
            window.removeEventListener('keydown', handleEsc);
        };
    }, [onClose, open]);

    const reportsToggleIcon = useMemo(
        () => (reportsOpen ? <FiChevronDown className="rightIcon" /> : <FiChevronRight className="rightIcon" />),
        [reportsOpen]
    );

    if (!open) {
        return null;
    }

    return (
        <ModalSimple
            title="Atendimento Comercial"
            subtitle="Selecione uma opção para acessar a página desejada."
            onClose={onClose}
            size="md"
        >
            <Body>
                {options.map((item) => {
                    const ItemIcon = item.icon;

                    return (
                        <OptionButton key={item.label} type="button" onClick={() => { }}>
                            <ItemIcon className="leftIcon" />
                            <span className="label">{item.label}</span>
                            <FiChevronRight className="rightIcon" />
                        </OptionButton>
                    );
                })}

                <ReportsBlock>
                    <ReportsHeader type="button" onClick={() => setReportsOpen((prev) => !prev)}>
                        <FiBarChart2 className="leftIcon" />
                        <span className="label">Relatórios</span>
                        {reportsToggleIcon}
                    </ReportsHeader>

                    {reportsOpen && (
                        <ReportsList>
                            {reportOptions.map((item) => (
                                <ReportRow key={item} type="button" onClick={() => { }}>
                                    <span className="dot">•</span>
                                    <span className="label">{item}</span>
                                    <FiChevronRight className="rightIcon" />
                                </ReportRow>
                            ))}
                        </ReportsList>
                    )}
                </ReportsBlock>
            </Body>
        </ModalSimple>
    );
};
