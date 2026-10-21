import React, { useEffect, useMemo, useRef, useState } from "react";
import { Body, SelectedBar } from "./styled";
import { ModalSimple } from '@/common/components/ModalSimple';
import { Table, type TableField } from '@/common/components/Table';
import { Botao } from '@/common/components/Buttons/Botao';
interface VendedorItem {
    id: string;
    nome: string;
    apelido: string;
}

interface SelectVendedorProps {
    open: boolean;
    onClose: () => void;
    onSelect?: (vendedor: VendedorItem) => void;
}

const vendedoresMock: VendedorItem[] = [
    { id: "1", nome: "Julio Lima", apelido: "Julio" },
    { id: "2", nome: "Roberta Seixas", apelido: "Roberta" },
    { id: "3", nome: "Endertein Gomes", apelido: "Endertein" },
    { id: "4", nome: "Winglidth Oliveira", apelido: "Winglidth" },
];

export const SelectVendedor: React.FC<SelectVendedorProps> = ({
    open,
    onClose,
    onSelect,
}) => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const selectedIndexRef = useRef(0);

    useEffect(() => {
        if (!open) {
            return;
        }

        setSelectedIndex(0);
        selectedIndexRef.current = 0;

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "ArrowDown") {
                event.preventDefault();
                setSelectedIndex((current) => {
                    const next = Math.min(
                        current + 1,
                        vendedoresMock.length - 1,
                    );
                    selectedIndexRef.current = next;
                    return next;
                });
                return;
            }

            if (event.key === "ArrowUp") {
                event.preventDefault();
                setSelectedIndex((current) => {
                    const next = Math.max(current - 1, 0);
                    selectedIndexRef.current = next;
                    return next;
                });
                return;
            }

            if (event.key === "Enter") {
                event.preventDefault();
                onSelect?.(vendedoresMock[selectedIndexRef.current]);
                onClose();
                return;
            }

            if (event.key === "Escape") {
                event.preventDefault();
                onClose();
            }
        };

        document.body.style.overflow = "hidden";
        window.addEventListener("keydown", handleKeyDown);

        return () => {
            document.body.style.overflow = "";
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [open, onClose, onSelect]);

    const fields = useMemo<TableField<VendedorItem>[]>(
        () => [
            {
                id: "nome",
                header: "Vendedor",
                accessorKey: "nome",
            },
            {
                id: "apelido",
                header: "Apelido",
                accessorKey: "apelido",
            },
        ],
        [],
    );

    if (!open) {
        return null;
    }

    const selectedVendedor = vendedoresMock[selectedIndex];

    return (
        <ModalSimple
            title="Selecionar Vendedor"
            subtitle="Use as setas para navegar e Enter para selecionar."
            onClose={onClose}
            footer={<Botao nome="Fechar" action={onClose} />}
        >
            <Body>
                <SelectedBar>
                    Selecionado:
                    <span>{selectedVendedor?.nome ?? "--"}</span>
                </SelectedBar>

                <Table<VendedorItem>
                    data={vendedoresMock}
                    fields={fields}
                    showHeader={false}
                    showColumnSelector={false}
                    compact
                    rowAction={{
                        label: "Selecionar",
                        getTitle: (vendedor) => `Selecionar ${vendedor.nome}`,
                        onClick: (vendedor) => {
                            onSelect?.(vendedor);
                            onClose();
                        },
                    }}
                />
            </Body>
        </ModalSimple>
    );
};

export const BuscaVendedor = SelectVendedor;
export default SelectVendedor;
