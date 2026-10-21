import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import type { ExcelColumn } from '../../../../common/components/Actions/GerarExcel';
import { CadastroAuxiliarTemplate } from '../../../../common/components/Templates/CadastroAuxiliarTemplate';
import type { TableField } from '../../../../common/components/Table';
import { buildProdutosMenuSections } from '../shared/produtosMenuSections';
import { VolumeModal } from './VolumeModal';
import type { ProdutoVolume, VolumeFormValues } from './types';

const volumesMockData: ProdutoVolume[] = [
    { id: 1, descricao: 'Caixa Pequena', alturaCm: '10', larguraCm: '15', comprimentoCm: '20', pesoKg: '0.30' },
    { id: 2, descricao: 'Caixa Média', alturaCm: '20', larguraCm: '25', comprimentoCm: '35', pesoKg: '0.70' },
];

export const ProdutosVolumesPage: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [volumes, setVolumes] = useState<ProdutoVolume[]>(volumesMockData);
    const [modalOpen, setModalOpen] = useState(false);
    const [editingVolume, setEditingVolume] = useState<ProdutoVolume | undefined>();

    useEffect(() => {
        const params = new URLSearchParams(location.search);

        if (params.get('modal') !== 'add-volume') {
            return;
        }

        params.delete('modal');
        setEditingVolume(undefined);
        setModalOpen(true);
        navigate({
            pathname: location.pathname,
            search: params.toString() ? `?${params.toString()}` : '',
            hash: location.hash,
        }, { replace: true });
    }, [location.hash, location.pathname, location.search, navigate]);

    const menuSections = useMemo(
        () => buildProdutosMenuSections({
            onAddVolume: () => {
                setEditingVolume(undefined);
                setModalOpen(true);
            },
        }),
        []
    );

    const tableFields = useMemo<TableField<ProdutoVolume>[]>(() => [
        { id: 'descricao', header: 'Descrição', accessorKey: 'descricao', defaultVisible: true },
    ], []);

    const excelColumns = useMemo<ExcelColumn<ProdutoVolume>[]>(() => [
        { key: 'descricao', header: 'Descrição', accessorKey: 'descricao' },
        { key: 'alturaCm', header: 'Altura (cm)', accessorKey: 'alturaCm' },
        { key: 'larguraCm', header: 'Largura (cm)', accessorKey: 'larguraCm' },
        { key: 'comprimentoCm', header: 'Comprimento (cm)', accessorKey: 'comprimentoCm' },
        { key: 'pesoKg', header: 'Peso (kg)', accessorKey: 'pesoKg' },
    ], []);

    const handleSaveVolume = useCallback((values: VolumeFormValues) => {
        if (editingVolume) {
            setVolumes((current) => current.map((volume) =>
                volume.id === editingVolume.id
                    ? {
                        ...volume,
                        descricao: values.descricao || volume.descricao,
                        alturaCm: values.alturaCm,
                        larguraCm: values.larguraCm,
                        comprimentoCm: values.comprimentoCm,
                        pesoKg: values.pesoKg,
                    }
                    : volume
            ));
            return;
        }

        setVolumes((current) => [
            {
                id: Date.now(),
                descricao: values.descricao || 'NOVO VOLUME',
                alturaCm: values.alturaCm,
                larguraCm: values.larguraCm,
                comprimentoCm: values.comprimentoCm,
                pesoKg: values.pesoKg,
            },
            ...current,
        ]);
    }, [editingVolume]);

    return (
        <>
            <CadastroAuxiliarTemplate
                titulo="Controle Estoque - Volumes"
                secoes={menuSections}
                tituloTabela="Volumes cadastrados"
                descricaoTabela="Gerencie volumes usados no cadastro de produtos."
                dados={volumes}
                campos={tableFields}
                camposPesquisa={(volume) => [
                    volume.descricao,
                    volume.alturaCm,
                    volume.larguraCm,
                    volume.comprimentoCm,
                    volume.pesoKg,
                ]}
                acoes={[
                    {
                        label: 'Editar',
                        icon: <FiEdit2 size={16} />,
                        getTitle: (volume) => `Editar volume ${volume.descricao}`,
                        onClick: (volume) => {
                            setEditingVolume(volume);
                            setModalOpen(true);
                        },
                    },
                    {
                        label: 'Excluir',
                        icon: <FiTrash2 size={16} />,
                        variant: 'danger',
                        getTitle: (volume) => `Excluir volume ${volume.descricao}`,
                        onClick: (volume) => setVolumes((current) => current.filter((item) => item.id !== volume.id)),
                    },
                ]}
                mensagemVazia="Nenhum volume cadastrado."
                arquivoExcel="volumes_produtos"
                colunasExcel={excelColumns}
                impressao={{}}
                modalAberto={modalOpen}
            />

            {modalOpen && (
                <VolumeModal
                    initialData={editingVolume}
                    onClose={() => {
                        setModalOpen(false);
                        setEditingVolume(undefined);
                    }}
                    onSave={handleSaveVolume}
                />
            )}
        </>
    );
};
