import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { IoMdAdd } from 'react-icons/io';
import { ListagemTemplate } from '../../../../common/components/Templates/ListagemTemplate';
import { ModalAddTransportadoras } from './ModalAddTransportadoras';
import {
    defaultTransportadoraSearchFields,
    defaultTransportadorasExcelColumns,
    defaultTransportadorasTableFields,
    transportadorasMockData,
} from '../shared/transportadorasListConfig';
import { ImportarDadosModal } from '../../../../common/components/ImportarDadosModal';
import type { Transportadoras } from '../../types/Transportadoras';
import { buildTransportadorasMenuSections } from '../shared/transportadorasMenuSections';

export const TransportadorasPage: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [openMalaDireta] = useState(false);
    const [openMensagemAniversario] = useState(false);
    const [openImportarDados, setOpenImportarDados] = useState(false);
    const [showAddTrasportadoraModal, setShowAddTrasportadoraModal] = useState(false);
    const [transportadoras, setTransportadoras] = useState<Transportadoras[]>(transportadorasMockData);

    useEffect(() => {
        const params = new URLSearchParams(location.search);

        if (params.get('modal') !== 'add-transportadora') {
            return;
        }

        params.delete('modal');
        setShowAddTrasportadoraModal(true);
        navigate({
            pathname: location.pathname,
            search: params.toString() ? `?${params.toString()}` : '',
            hash: location.hash,
        }, { replace: true });
    }, [location.hash, location.pathname, location.search, navigate]);

    const secoes = useMemo(
        () => buildTransportadorasMenuSections({
            onAddTransportadora: () => setShowAddTrasportadoraModal(true),
            onOpenImportarDados: () => setOpenImportarDados(true),
        }),
        []
    );

    const handleAddTrasportadora = useCallback((data: Transportadoras) => {
        setTransportadoras((prev) => [{ ...data }, ...prev]);
    }, []);

    return (
        <>
            <ListagemTemplate
                titulo="Gestão de Transportadoras"
                secoes={secoes}
                dados={transportadoras}
                campos={defaultTransportadorasTableFields}
                colunasExcel={defaultTransportadorasExcelColumns}
                camposPesquisa={defaultTransportadoraSearchFields}
                botaoPrincipal={{
                    nome: 'Trasportadora',
                    icone: <IoMdAdd size={18} />,
                    action: () => setShowAddTrasportadoraModal(true),
                }}
                arquivoExcel="transportadoras"
                tituloTabela="Transportadoras cadastrados"
                descricaoTabela="Escolha quais colunas quer exibir e use a busca para filtrar os dados."
                mensagemVazia="Nenhuma trasportadora encontrado para o filtro informado."
                modaisAbertos={showAddTrasportadoraModal || openMalaDireta || openMensagemAniversario || openImportarDados}
            />

            <ModalAddTransportadoras
                show={showAddTrasportadoraModal}
                onClose={() => setShowAddTrasportadoraModal(false)}
                onSubmit={handleAddTrasportadora}
            />

            <ImportarDadosModal
                show={openImportarDados}
                onClose={() => setOpenImportarDados(false)}
                entidadePlural="transportadoras"
                nomeEntidade="Transportadoras"
            />
        </>
    );
};
