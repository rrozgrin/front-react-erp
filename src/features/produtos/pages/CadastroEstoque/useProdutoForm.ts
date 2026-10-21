import { useCallback, useEffect, useMemo, useState } from 'react';
import {
    initialProdutoFormData,
    type ProdutoCaracteristica,
    type ProdutoFormData,
    type ProdutoLote,
} from '../../types/Produto';
import { buildProdutoFormState, formatProdutoCurrencyBRL, produtoCadastroSteps, type ProdutoPrecoCurrencyField } from './produtoFormConfig';

interface UseProdutoFormParams {
    show: boolean;
    mode: 'create' | 'edit';
    initialData?: ProdutoFormData;
    onClose: () => void;
    onSubmit: (data: ProdutoFormData) => void;
}

const emptyCaracteristica: ProdutoCaracteristica = { atributo: '', valor: '' };
const emptyLote: ProdutoLote = { numero: '', quantidade: '', fabricacao: '', validade: '' };

const toNumber = (value: string) => {
    const parsed = Number(value.replace(/\./g, '').replace(',', '.'));
    return Number.isFinite(parsed) ? parsed : 0;
};

export function useProdutoForm({ show, mode, initialData, onClose, onSubmit }: UseProdutoFormParams) {
    const [formData, setFormData] = useState<ProdutoFormData>(initialProdutoFormData);
    const [isCompleteMode, setIsCompleteMode] = useState(true);
    const [currentStep, setCurrentStep] = useState(0);
    const [marketplaceSettingsOpen, setMarketplaceSettingsOpen] = useState(false);
    const [videoInput, setVideoInput] = useState('');
    const [caracteristica, setCaracteristica] = useState<ProdutoCaracteristica>(emptyCaracteristica);
    const [loteDraft, setLoteDraft] = useState<ProdutoLote>(emptyLote);

    useEffect(() => {
        if (!show) return;
        setFormData(buildProdutoFormState(initialData));
        setCurrentStep(0);
        setIsCompleteMode(true);
        const handleEsc = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose(); };
        document.body.style.overflow = 'hidden';
        window.addEventListener('keydown', handleEsc);
        return () => {
            document.body.style.overflow = '';
            window.removeEventListener('keydown', handleEsc);
        };
    }, [initialData, mode, onClose, show]);

    const isDisabled = useMemo(() => !formData.nome.trim() || !formData.codigoBarras.trim(), [formData.codigoBarras, formData.nome]);

    const handleClose = useCallback(() => {
        setFormData(initialProdutoFormData);
        setVideoInput('');
        setMarketplaceSettingsOpen(false);
        setCaracteristica(emptyCaracteristica);
        setLoteDraft(emptyLote);
        onClose();
    }, [onClose]);

    const handleFieldChange = useCallback(<K extends keyof ProdutoFormData>(field: K, value: ProdutoFormData[K]) => {
        setFormData((previous) => ({ ...previous, [field]: value }));
    }, []);

    const handleNestedChange = useCallback(<S extends 'informacoesNutricionais' | 'informacoesFiscais' | 'precos' | 'frete', K extends keyof ProdutoFormData[S]>(section: S, field: K, value: ProdutoFormData[S][K]) => {
        setFormData((previous) => ({ ...previous, [section]: { ...previous[section], [field]: value } }));
    }, []);

    const handleCurrencyPriceChange = useCallback((field: ProdutoPrecoCurrencyField, value: string) => {
        handleNestedChange('precos', field, formatProdutoCurrencyBRL(value));
    }, [handleNestedChange]);

    const addListItem = useCallback((field: 'linksVideo' | 'imagens', value: string) => {
        const nextValue = value.trim();
        if (nextValue) setFormData((previous) => ({ ...previous, [field]: [...previous[field], nextValue] }));
    }, []);
    const removeListItem = useCallback((field: 'linksVideo' | 'imagens', index: number) => {
        setFormData((previous) => ({ ...previous, [field]: previous[field].filter((_, itemIndex) => itemIndex !== index) }));
    }, []);
    const addCaracteristica = useCallback(() => {
        if (!caracteristica.atributo.trim() || !caracteristica.valor.trim()) return;
        setFormData((previous) => ({ ...previous, caracteristicas: [...previous.caracteristicas, caracteristica] }));
        setCaracteristica(emptyCaracteristica);
    }, [caracteristica]);
    const removeCaracteristica = useCallback((index: number) => {
        setFormData((previous) => ({ ...previous, caracteristicas: previous.caracteristicas.filter((_, itemIndex) => itemIndex !== index) }));
    }, []);
    const addLote = useCallback(() => {
        if (!loteDraft.numero.trim() || !loteDraft.quantidade.trim()) return;
        setFormData((previous) => ({ ...previous, lotesControle: [...previous.lotesControle, loteDraft] }));
        setLoteDraft(emptyLote);
    }, [loteDraft]);
    const removeLote = useCallback((index: number) => {
        setFormData((previous) => ({ ...previous, lotesControle: previous.lotesControle.filter((_, itemIndex) => itemIndex !== index) }));
    }, []);
    const handleSubmit = useCallback((event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (isCompleteMode && currentStep < produtoCadastroSteps.length - 1) {
            setCurrentStep((previous) => Math.min(previous + 1, produtoCadastroSteps.length - 1));
            return;
        }
        onSubmit({ ...formData, codigoInterno: formData.codigoInterno || String(Date.now()), quantidadeDigitosEtiqueta: formData.quantidadeDigitosEtiqueta || '2', estoqueInicial: formData.estoqueInicial || String(toNumber(formData.estoqueInicial)) });
        handleClose();
    }, [currentStep, formData, handleClose, isCompleteMode, onSubmit]);

    return { formData, isDisabled, isCompleteMode, setIsCompleteMode, currentStep, setCurrentStep, marketplaceSettingsOpen, setMarketplaceSettingsOpen, videoInput, setVideoInput, caracteristica, setCaracteristica, loteDraft, setLoteDraft, handleClose, handleFieldChange, handleNestedChange, handleCurrencyPriceChange, addListItem, removeListItem, addCaracteristica, removeCaracteristica, addLote, removeLote, handleSubmit };
}
