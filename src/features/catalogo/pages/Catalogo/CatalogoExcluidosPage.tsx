import { useMemo, useState } from 'react';
import Swal from 'sweetalert2';
import { FiRefreshCw } from 'react-icons/fi';
import { ListagemTemplate } from '../../../../common/components/Templates/ListagemTemplate';
import type { TableField } from '../../../../common/components/Table';
import { buildCatalogoMenuSections, type CatalogoConfig } from './catalogoConfig';
import {
    catalogoItemsMockData,
    formatCurrency,
    formatDateTime,
    type CatalogoItem,
} from './catalogoData';

interface CatalogoExcluidosPageProps {
    config: CatalogoConfig;
}

export const CatalogoExcluidosPage = ({ config }: CatalogoExcluidosPageProps) => {
    const [items, setItems] = useState(() => catalogoItemsMockData.filter((item) => item.prodServ === config.prodServ));

    const fields = useMemo<TableField<CatalogoItem>[]>(() => [
        { id: 'codigo', header: config.labels.code, accessorKey: 'codigo', defaultVisible: true },
        { id: 'nome', header: config.labels.name, accessorKey: 'nome', defaultVisible: true },
        { id: 'classificacao', header: 'Classificação', accessorKey: 'classificacao', defaultVisible: true },
        { id: 'venda', header: config.labels.saleValue, accessorFn: (row) => formatCurrency(row.venda), align: 'right', defaultVisible: true },
        { id: 'dataExclusao', header: 'Data Exclusão', accessorFn: (row) => row.dataExclusao ? formatDateTime(row.dataExclusao) : '-', defaultVisible: true },
    ], [config.labels.code, config.labels.name, config.labels.saleValue]);

    const excluidos = useMemo(() => items.filter((item) => item.status === 'excluido'), [items]);

    const reativar = async (item: CatalogoItem) => {
        const result = await Swal.fire({
            title: `Reativar ${config.labels.singular}`,
            text: `Deseja reativar "${item.nome}"?`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Reativar',
            cancelButtonText: 'Cancelar',
        });

        if (!result.isConfirmed) return;

        setItems((current) => current.map((currentItem) =>
            currentItem.id === item.id ? { ...currentItem, status: 'ativo', dataExclusao: undefined } : currentItem
        ));
    };

    return (
        <ListagemTemplate
            titulo={config.labels.excluded}
            secoes={buildCatalogoMenuSections(config)}
            tituloTabela={config.labels.excluded}
            dados={excluidos}
            campos={fields}
            mensagemVazia={`Nenhum ${config.labels.singular.toLowerCase()} excluído encontrado.`}
            acoes={[{ label: 'Reativar', icon: <FiRefreshCw />, variant: 'success', onClick: (row) => void reativar(row) }]}
            impressao={false}
            exibirAcoesFlutuantes={false}
            configurarColunas="tabela"
        />
    );
};
