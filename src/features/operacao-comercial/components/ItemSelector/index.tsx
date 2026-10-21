import React, { useState } from 'react';
import { FaKeyboard } from 'react-icons/fa';
import { BuscaSimples } from '@/common/components/Inputs/BuscaSimples';
import {
    RootVars,
    ItemSelectorContainer,
    SearchBar,
    ProductGrid,
    ProductHeader,
    ProductName,
    ImageFrame,
    ProductImage,
    QuantityBox,
    UnitBox,
    BarcodeBox,
    TotalBox,
    DataLabel,
    DataValue,
    Shortcuts,
    ShortcutsTitle,
    ShortcutsColumns,
    ShortcutsList,
    ExitShortcutTrigger,
} from './styled';

export type ItemSelectorShortcut = {
    label: string;
    shortcut?: string;
    onClick?: () => void;
};

export type ItemSelectorProduct = {
    nome: string;
    quantidade: string;
    valorUnitario: string;
    codigoBarras: string;
    valorTotal: string;
    imageAlt?: string;
};

type ItemSelectorProps = {
    imageSrc?: string | null;
    product?: ItemSelectorProduct;
    primaryShortcuts?: ItemSelectorShortcut[];
    searchInputRef?: React.RefObject<HTMLInputElement | null>;
    searchPlaceholder?: string;
    searchShortcutLabel?: string;
    secondaryShortcuts?: ItemSelectorShortcut[];
    onExit?: () => void;
    onOpenAlterarItem?: () => void;
    onOpenCancelarItem?: () => void;
    onOpenSearchProduto?: () => void;
    onSearchProduto?: (codigo: string) => boolean;
};

const defaultProduct: ItemSelectorProduct = {
    nome: 'HAMBURGUER ARTESANAL 01',
    quantidade: '1,000',
    valorUnitario: '20,00',
    codigoBarras: '100',
    valorTotal: '20,00',
    imageAlt: 'Produto selecionado',
};

const buildShortcutText = (shortcut: ItemSelectorShortcut) => (
    shortcut.shortcut ? `(${shortcut.shortcut}) ${shortcut.label}` : shortcut.label
);

const renderShortcut = (shortcut: ItemSelectorShortcut) => {
    const text = buildShortcutText(shortcut);

    if (shortcut.onClick) {
        return (
            <ExitShortcutTrigger
                key={text}
                type="button"
                onClick={shortcut.onClick}
                aria-label={shortcut.label}
            >
                <span>{text}</span>
            </ExitShortcutTrigger>
        );
    }

    return <span key={text}>{text}</span>;
};

export const ItemSelector: React.FC<ItemSelectorProps> = ({
    imageSrc,
    onExit,
    onOpenAlterarItem,
    onOpenCancelarItem,
    onOpenSearchProduto,
    onSearchProduto,
    primaryShortcuts,
    product = defaultProduct,
    searchInputRef,
    searchPlaceholder = 'Busque por nome ou codigo...',
    searchShortcutLabel,
    secondaryShortcuts,
}) => {
    void searchShortcutLabel;
    const [pesquisaProduto, setPesquisaProduto] = useState('');
    const [searchError, setSearchError] = useState('');
    const handleSearchProduto = (value: string) => {
        const codigo = value.trim();
        if (!codigo) return;
        if (!onSearchProduto) {
            onOpenSearchProduto?.();
            return;
        }
        if (onSearchProduto(codigo)) {
            setPesquisaProduto('');
            setSearchError('');
        } else {
            setSearchError('Produto não encontrado.');
        }
    };
    const hasImage = Boolean(imageSrc);
    const resolvedPrimaryShortcuts = primaryShortcuts ?? [
        { shortcut: 'F5', label: 'Localizar Pedido' },
        { shortcut: 'F6', label: 'Desconto' },
        { shortcut: 'F7', label: 'Alterar Item', onClick: onOpenAlterarItem },
        { shortcut: 'F8', label: 'Cancelar Item', onClick: onOpenCancelarItem },
        { shortcut: 'F9', label: 'Consultar Precos' },
        { shortcut: 'F10', label: 'Finalizar Venda' },
        { shortcut: 'F11', label: 'Cancelar Venda' },
        { shortcut: 'F12', label: 'Sair', onClick: onExit },
    ];
    const primaryShortcutsWithSearch = [
        { shortcut: 'F4', label: 'Buscar Produto', onClick: onOpenSearchProduto },
        ...resolvedPrimaryShortcuts,
    ];
    const resolvedSecondaryShortcuts = secondaryShortcuts ?? [
        { shortcut: 'CTRL + A', label: 'Aplicar Entrada' },
        { shortcut: 'CTRL + S', label: 'Sangria' },
        { shortcut: 'CTRL + E', label: 'Entrada de Valores' },
        { shortcut: 'CTRL + V', label: 'Fechar Caixa' },
        { shortcut: 'CTRL + Q', label: 'Agendar Comandas' },
        { shortcut: 'CTRL + D', label: 'Despachar' },
        { shortcut: 'CTRL + R', label: 'Conta Corrente Cliente' },
        { shortcut: 'CTRL + P', label: 'Recebimentos' },
        { shortcut: 'CTRL + F6', label: 'Acrescimo' },
        { shortcut: 'ALT + N', label: 'Nova Venda' },
    ];

    return (
        <RootVars>
            <ItemSelectorContainer>
                <SearchBar>
                    <BuscaSimples
                        ref={searchInputRef}
                        pesquisa={pesquisaProduto}
                        onChange={(value) => {
                            setPesquisaProduto(value);
                            setSearchError('');
                        }}
                        onSearch={handleSearchProduto}
                        placeholder={searchPlaceholder}
                        ariaLabel="Código de barras ou código do produto"
                    />
                    {searchError ? <span role="alert">{searchError}</span> : null}
                </SearchBar>

                <ProductGrid $hasImage={hasImage}>
                    <ProductHeader>
                        <DataLabel>Produto</DataLabel>
                        <ProductName>{product.nome}</ProductName>
                    </ProductHeader>

                    {hasImage ? (
                        <>
                            <ImageFrame>
                                <ProductImage
                                    src={imageSrc ?? ''}
                                    alt={product.imageAlt ?? product.nome}
                                />
                            </ImageFrame>

                            <QuantityBox>
                                <DataLabel>Quantidade</DataLabel>
                                <DataValue>{product.quantidade}</DataValue>
                            </QuantityBox>

                            <UnitBox>
                                <DataLabel>Valor unitário</DataLabel>
                                <DataValue>{product.valorUnitario}</DataValue>
                            </UnitBox>

                            <BarcodeBox>
                                <DataLabel>Código de barras</DataLabel>
                                <DataValue>{product.codigoBarras}</DataValue>
                            </BarcodeBox>

                            <TotalBox>
                                <DataLabel>Valor total</DataLabel>
                                <DataValue>{product.valorTotal}</DataValue>
                            </TotalBox>
                        </>
                    ) : (
                        <>
                            <QuantityBox>
                                <DataLabel>QUANTIDADE</DataLabel>
                                <DataValue>{product.quantidade}</DataValue>
                            </QuantityBox>

                            <UnitBox>
                                <DataLabel>VALOR UNITARIO</DataLabel>
                                <DataValue>{product.valorUnitario}</DataValue>
                            </UnitBox>

                            <BarcodeBox>
                                <DataLabel>CODIGO DE BARRAS</DataLabel>
                                <DataValue>{product.codigoBarras}</DataValue>
                            </BarcodeBox>

                            <TotalBox>
                                <DataLabel>VALOR TOTAL</DataLabel>
                                <DataValue>{product.valorTotal}</DataValue>
                            </TotalBox>
                        </>
                    )}
                </ProductGrid>

                <Shortcuts>
                    <ShortcutsTitle>
                        <FaKeyboard size={20} /> Atalhos
                    </ShortcutsTitle>
                    <ShortcutsColumns>
                        <ShortcutsList>
                            {primaryShortcutsWithSearch.map(renderShortcut)}
                        </ShortcutsList>

                        <ShortcutsList>
                            {resolvedSecondaryShortcuts.map(renderShortcut)}
                        </ShortcutsList>
                    </ShortcutsColumns>
                </Shortcuts>
            </ItemSelectorContainer>
        </RootVars>
    );
};
