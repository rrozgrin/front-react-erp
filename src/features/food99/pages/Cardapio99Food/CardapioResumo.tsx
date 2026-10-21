import React from 'react';
import { FiBox, FiFolder, FiGrid, FiUploadCloud, FiX } from 'react-icons/fi';
import type { CardapioItem } from './cardapioUtils';
import { BottomSummaryCard, SummaryBadge, SummaryGrid, SummaryMetric } from './styled';

interface CardapioResumoProps {
    cardapio: CardapioItem;
    quantidadeAtivos: number;
    quantidadeInativos: number;
}

export const CardapioResumo: React.FC<CardapioResumoProps> = ({ cardapio, quantidadeAtivos, quantidadeInativos }) => (
    <BottomSummaryCard>
        <h3>Resumo do cardápio selecionado</h3>
        <SummaryBadge>{cardapio.nome}</SummaryBadge>
        <SummaryGrid>
            <SummaryMetric><FiFolder /><strong>{cardapio.categorias}</strong><span>categorias</span></SummaryMetric>
            <SummaryMetric><FiBox /><strong>{cardapio.itens}</strong><span>itens vinculados</span></SummaryMetric>
            <SummaryMetric><FiUploadCloud /><strong>{cardapio.status}</strong><span>status local</span></SummaryMetric>
            <SummaryMetric><FiGrid /><strong>{quantidadeAtivos}</strong><span>cardápios ativos</span></SummaryMetric>
            <SummaryMetric><FiX /><strong>{quantidadeInativos}</strong><span>cardápios inativos</span></SummaryMetric>
        </SummaryGrid>
    </BottomSummaryCard>
);
