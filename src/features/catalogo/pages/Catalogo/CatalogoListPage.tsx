import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { FiSearch, FiX } from 'react-icons/fi';
import { StatusBadge } from '../../../../common/components/PageLayout/styled';
import { ListagemTemplate } from '../../../../common/components/Templates/ListagemTemplate';
import { type TableField } from '../../../../common/components/Table';
import { buildCatalogoMenuSections, type CatalogoConfig } from './catalogoConfig';
import {
    catalogoItemsMockData,
    formatCurrency,
    type CatalogoItem,
} from './catalogoData';
import { ServicoFormModal, type ServicoFormValues } from './ServicoFormModal';
import { FaPlus } from "react-icons/fa";

interface CatalogoListPageProps {
    config: CatalogoConfig;
}

export const CatalogoListPage = ({ config }: CatalogoListPageProps) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [pesquisa, setPesquisa] = useState('');
    const [items, setItems] = useState(() => catalogoItemsMockData.filter((item) => item.prodServ === config.prodServ));
    const [showServicoModal, setShowServicoModal] = useState(false);

    const fields = useMemo<TableField<CatalogoItem>[]>(() => [
        { id: 'codigo', header: config.labels.code, accessorKey: 'codigo', defaultVisible: true },
        { id: 'nome', header: config.labels.name, accessorKey: 'nome', defaultVisible: true },
        { id: 'classificacao', header: 'Classificação', accessorKey: 'classificacao', defaultVisible: true },
        { id: 'fornecedor', header: 'Fornecedor', accessorKey: 'fornecedor' },
        { id: 'unidade', header: 'Unidade', accessorKey: 'unidade' },
        { id: 'estoque', header: 'Qtde. Estoque', accessorKey: 'estoque', align: 'center', defaultVisible: config.prodServ === 'P' },
        { id: 'custo', header: 'Valor Custo', accessorFn: (row) => formatCurrency(row.custo), align: 'right', defaultVisible: true },
        { id: 'venda', header: config.labels.saleValue, accessorFn: (row) => formatCurrency(row.venda), align: 'right', defaultVisible: true },
        { id: 'percentualCustoVenda', header: 'Porcentagem Custo Venda', accessorKey: 'percentualCustoVenda', align: 'right', defaultVisible: config.prodServ === 'S' },
        {
            id: 'status',
            header: 'Status',
            accessorKey: 'status',
            align: 'center',
            defaultVisible: true,
            cell: (value) => <StatusBadge $variant={value === 'ativo' ? 'ativo' : 'inativo'}>{value === 'ativo' ? 'Ativo' : 'Excluído'}</StatusBadge>,
        },
    ], [config.labels.code, config.labels.name, config.labels.saleValue, config.prodServ]);

    const addItem = (item: Omit<CatalogoItem, 'id' | 'prodServ'>) => {
        setItems((current) => [
            {
                id: Date.now(),
                ...item,
            },
            ...current,
        ]);
    };

    const criarServico = (values: ServicoFormValues) => {
        addItem({
            codigo: values.codigo || String(Date.now()).slice(-10),
            nome: values.nome,
            classificacao: values.classificacao || 'Sem classificação',
            fornecedor: values.fornecedor || 'Interno',
            unidade: values.unidade || 'UN',
            custo: values.custo,
            venda: values.valor,
            estoque: 0,
            percentualCustoVenda: values.custo ? Number((((values.valor - values.custo) / Math.abs(values.custo)) * 100).toFixed(2)) : 0,
            status: values.situacao === 'E' ? 'excluido' : 'ativo',
            dataExclusao: values.situacao === 'E' ? new Date().toISOString() : undefined,
        });
        setShowServicoModal(false);
    };

    const criar = async () => {
        if (config.prodServ === 'S') {
            setShowServicoModal(true);
            return;
        }

        const result = await Swal.fire<{ codigo: string; nome: string; valor: number }>({
            title: config.labels.create,
            html: `
                <input id="catalogo-codigo" class="swal2-input" placeholder="${config.labels.code}">
                <input id="catalogo-nome" class="swal2-input" placeholder="${config.labels.name}">
                <input id="catalogo-valor" class="swal2-input" placeholder="${config.labels.saleValue}">
            `,
            showCancelButton: true,
            confirmButtonText: 'Salvar',
            cancelButtonText: 'Cancelar',
            preConfirm: () => {
                const codigo = (document.getElementById('catalogo-codigo') as HTMLInputElement | null)?.value.trim() ?? '';
                const nome = (document.getElementById('catalogo-nome') as HTMLInputElement | null)?.value.trim() ?? '';
                const valor = Number((document.getElementById('catalogo-valor') as HTMLInputElement | null)?.value.replace(',', '.') ?? 0);
                if (!codigo || !nome) {
                    Swal.showValidationMessage(`Informe ${config.labels.code.toLowerCase()} e ${config.labels.name.toLowerCase()}.`);
                    return false;
                }
                return { codigo, nome, valor };
            },
        });

        if (!result.isConfirmed || !result.value) return;
        const novoItem = result.value;

        addItem({
            codigo: novoItem.codigo,
            nome: novoItem.nome,
            classificacao: 'Sem classificação',
            fornecedor: 'Interno',
            unidade: 'UN',
            custo: 0,
            venda: novoItem.valor,
            estoque: 0,
            percentualCustoVenda: 0,
            status: 'ativo',
        });
    };

    useEffect(() => {
        const params = new URLSearchParams(location.search);

        if (params.get('modal') !== 'create') {
            return;
        }

        params.delete('modal');
        void criar();
        navigate({
            pathname: location.pathname,
            search: params.toString() ? `?${params.toString()}` : '',
            hash: location.hash,
        }, { replace: true });
    }, [location.hash, location.pathname, location.search, navigate]);

    const excluir = async (item: CatalogoItem) => {
        const result = await Swal.fire({
            title: `Exclusão de ${config.labels.singular}`,
            text: `Deseja excluir "${item.nome}"?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: `Excluir ${config.labels.singular}`,
            cancelButtonText: 'Cancelar',
        });

        if (!result.isConfirmed) return;

        setItems((current) => current.map((currentItem) =>
            currentItem.id === item.id ? { ...currentItem, status: 'excluido', dataExclusao: new Date().toISOString() } : currentItem
        ));
    };

    return (
        <>
            <ListagemTemplate
                titulo={config.labels.listTitle}
                secoes={buildCatalogoMenuSections(config, { onCreate: criar })}
                tituloTabela={`${config.labels.plural} cadastrados`}
                dados={items.filter((item) => item.status === 'ativo')}
                campos={fields}
                camposPesquisa={(item) => [item.codigo, item.nome, item.classificacao, item.fornecedor]}
                valorPesquisa={pesquisa}
                onPesquisaChange={setPesquisa}
                placeholderPesquisa="Busca Avançada"
                mensagemVazia={`Nenhum ${config.labels.singular.toLowerCase()} encontrado.`}
                botaoPrincipal={{ nome: config.labels.create, color: config.prodServ === 'S' ? 'add' : undefined, action: () => void criar(), icone: <FaPlus /> }}
                acoes={[
                    { label: 'Visualizar', icon: <FiSearch />, onClick: (row) => navigate(`${config.basePath}/visualizar/${row.id}`) },
                    { label: 'Excluir', icon: <FiX />, variant: 'danger', onClick: (row) => void excluir(row) },
                ]}
                modaisAbertos={showServicoModal}
                configurarColunas="tabela"
                impressao={false}
                exibirAcoesFlutuantes={false}
            />

            {showServicoModal ? <ServicoFormModal onClose={() => setShowServicoModal(false)} onSubmit={criarServico} /> : null}
        </>
    );
};
