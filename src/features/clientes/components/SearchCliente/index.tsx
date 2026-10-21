import React, { useEffect, useState } from 'react';
import { ModalSimple } from '@/common/components/ModalSimple';
import {
    Content,
} from './styled';
import { Botao } from '@/common/components/Buttons/Botao';
import { BuscaSimples } from '@/common/components/Inputs/BuscaSimples';

interface SearchClienteProps {
    open: boolean;
    onClose: () => void;
    onOpenCreateCliente?: () => void;
    onSearch?: (term: string) => void;
}

export const SearchCliente: React.FC<SearchClienteProps> = ({
    open,
    onClose,
    onOpenCreateCliente,
    onSearch,
}) => {
    const [term, setTerm] = useState('');

    useEffect(() => {
        if (!open) {
            return;
        }

        document.body.style.overflow = 'hidden';

        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                event.preventDefault();
                onClose();
            }
        };

        window.addEventListener('keydown', handleEsc);

        return () => {
            document.body.style.overflow = '';
            window.removeEventListener('keydown', handleEsc);
        };
    }, [open, onClose]);

    useEffect(() => {
        if (!open) {
            setTerm('');
        }
    }, [open]);

    if (!open) {
        return null;
    }

    const handleSearch = (value = term) => {
        const searchTerm = value.trim();

        setTerm(searchTerm);
        onSearch?.(searchTerm);
    };

    return (
        <ModalSimple
            title="Buscar Cliente"
            onClose={onClose}
            size="sm"
            footer={(
                <Botao nome="Fechar" action={onClose} />
            )}
        >
            <Content>
                <BuscaSimples
                    pesquisa={term}
                    onChange={setTerm}
                    onSearch={handleSearch}
                    placeholder="Digite o que quiser"
                    ariaLabel="Pesquisar cliente"
                />
                {onOpenCreateCliente ? (
                    <Botao nome="Cadastrar" action={onOpenCreateCliente} />
                ) : null}
            </Content>
        </ModalSimple>
    );
};

export const BuscaCliente = SearchCliente;
export default SearchCliente;
