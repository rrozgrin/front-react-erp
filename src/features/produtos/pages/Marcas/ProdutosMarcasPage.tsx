import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import { CadastroAuxiliarTemplate } from '../../../../common/components/Templates/CadastroAuxiliarTemplate';
import type { TableField } from '../../../../common/components/Table';
import type { ExcelColumn } from '../../../../common/components/Actions/GerarExcel';
import { buildProdutosMenuSections } from '../shared/produtosMenuSections';
import { MarcaModal } from './MarcaModal';
import type { MarcaFormValues, ProdutoMarca } from './types';

const marcasMockData: ProdutoMarca[] = [
    { id: 1, nome: '3 CORAÇÕES', lojaVirtual: false },
    { id: 2, nome: '4 LED', lojaVirtual: false },
    { id: 3, nome: 'ABOVE', lojaVirtual: false },
    { id: 4, nome: 'ABSOLUT', lojaVirtual: false },
    { id: 5, nome: 'ACHÉ', lojaVirtual: true },
    { id: 6, nome: 'ADIDAS', lojaVirtual: true },
    { id: 7, nome: 'ADIDAS', lojaVirtual: false },
    { id: 8, nome: 'ADIDAS', lojaVirtual: false },
    { id: 9, nome: 'ALPARGATAS', lojaVirtual: true },
];

export const ProdutosMarcasPage: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [marcas, setMarcas] = useState<ProdutoMarca[]>(marcasMockData);
    const [modalOpen, setModalOpen] = useState(false);
    const [editingMarca, setEditingMarca] = useState<ProdutoMarca | undefined>();

    useEffect(() => {
        const params = new URLSearchParams(location.search);

        if (params.get('modal') !== 'add-marca') {
            return;
        }

        params.delete('modal');
        setEditingMarca(undefined);
        setModalOpen(true);
        navigate({
            pathname: location.pathname,
            search: params.toString() ? `?${params.toString()}` : '',
            hash: location.hash,
        }, { replace: true });
    }, [location.hash, location.pathname, location.search, navigate]);

    const menuSections = useMemo(
        () => buildProdutosMenuSections({
            onAddMarca: () => {
                setEditingMarca(undefined);
                setModalOpen(true);
            },
        }),
        []
    );

    const tableFields = useMemo<TableField<ProdutoMarca>[]>(() => [
        { id: 'nome', header: 'Nome Marca', accessorKey: 'nome', defaultVisible: true },
    ], []);

    const excelColumns = useMemo<ExcelColumn<ProdutoMarca>[]>(() => [
        { key: 'nome', header: 'Nome Marca', accessorKey: 'nome' },
        { key: 'lojaVirtual', header: 'Loja Virtual', valueFormatter: (_, row) => (row.lojaVirtual ? 'Sim' : 'Não') },
    ], []);

    const handleSaveMarca = useCallback((values: MarcaFormValues) => {
        if (editingMarca) {
            setMarcas((current) => current.map((marca) =>
                marca.id === editingMarca.id
                    ? { ...marca, nome: values.nome || marca.nome, lojaVirtual: values.lojaVirtual, imagem: values.imagem?.name ?? marca.imagem }
                    : marca
            ));
            return;
        }

        setMarcas((current) => [
            {
                id: Date.now(),
                nome: values.nome || 'NOVA MARCA',
                lojaVirtual: values.lojaVirtual,
                imagem: values.imagem?.name,
            },
            ...current,
        ]);
    }, [editingMarca]);

    return (
        <>
            <CadastroAuxiliarTemplate
                titulo="Controle Estoque - Marcas de Produtos"
                secoes={menuSections}
                tituloTabela="Marcas cadastradas"
                descricaoTabela="Pesquise, edite e acompanhe as marcas de produtos."
                dados={marcas}
                campos={tableFields}
                camposPesquisa={(marca) => [marca.nome]}
                acoes={[
                    {
                        label: 'Editar',
                        icon: <FiEdit2 size={16} />,
                        getTitle: (marca) => `Editar marca ${marca.nome}`,
                        onClick: (marca) => {
                            setEditingMarca(marca);
                            setModalOpen(true);
                        },
                    },
                    {
                        label: 'Excluir',
                        icon: <FiTrash2 size={16} />,
                        variant: 'danger',
                        getTitle: (marca) => `Excluir marca ${marca.nome}`,
                        onClick: (marca) => setMarcas((current) => current.filter((item) => item.id !== marca.id)),
                    },
                ]}
                mensagemVazia="Nenhuma marca cadastrada."
                arquivoExcel="marcas_produtos"
                colunasExcel={excelColumns}
                impressao={{}}
                modalAberto={modalOpen}
            />

            {modalOpen && (
                <MarcaModal
                    initialData={editingMarca}
                    onClose={() => {
                        setModalOpen(false);
                        setEditingMarca(undefined);
                    }}
                    onSave={handleSaveMarca}
                />
            )}
        </>
    );
};
