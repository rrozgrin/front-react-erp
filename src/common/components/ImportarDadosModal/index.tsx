import { useEffect, useMemo, useState, type ReactNode } from 'react';
import styled from 'styled-components';
import { ModalSimple, ModalSimpleActionButton } from '../ModalSimple';
import { FeedbackFormulario, FormField, FormGrid, Input } from '../Ui';

export interface ImportarDadosModalProps {
    show?: boolean;
    onClose: () => void;
    entidadePlural: string;
    nomeEntidade?: string;
    descricao?: ReactNode;
    expectedLogin?: string;
    expectedSenha?: string;
    loginInicial?: string;
    onIniciarImportacao?: () => void;
}

const Body = styled.div`
    display: grid;
    gap: 14px;

    @media (max-width: 768px) {
        gap: var(--space-sm);
    }
`;

const Description = styled.p`
    margin: 0;
    text-align: center;
    color: #475569;
    font-size: 1.02rem;
    line-height: 1.35;

    strong { color: #334155; }
`;

const CredentialGrid = styled(FormGrid)`
    width: min(var(--table-min-width-compact), 100%);
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 10px var(--space-sm);
    align-items: end;

    @media (max-width: 640px) {
        grid-template-columns: 1fr;
    }
`;

const CredentialField = styled(FormField)`
    > input {
        min-height: 40px;
        border-radius: 0.125rem;
        background: #eaf2ff;
        color: #1f2937;
        padding: 0 var(--space-sm);
        font-size: 0.95rem;
    }
`;

const Divider = styled.div`
    border-top: 1px solid #e5e7eb;
`;

const SuccessWrap = styled.div`
    text-align: center;
    display: grid;
    gap: var(--space-xs);
    padding-top: var(--space-2xs);

    h4 {
        margin: 0;
        font-size: 2rem;
        color: #475569;
        font-weight: 500;
    }

    p {
        margin: 0;
        font-size: var(--font-size-xs);
        color: #475569;
        font-weight: 500;
    }

    @media (max-width: 768px) {
        h4 { font-size: 1.35rem; }
        p { font-size: 1.08rem; }
    }
`;

export const ImportarDadosModal = ({
    show = true,
    onClose,
    entidadePlural,
    nomeEntidade = entidadePlural,
    descricao,
    expectedLogin = '17001',
    expectedSenha = '123456',
    loginInicial = '17001',
    onIniciarImportacao,
}: ImportarDadosModalProps) => {
    const [login, setLogin] = useState(loginInicial);
    const [senha, setSenha] = useState('');
    const [verificado, setVerificado] = useState(false);
    const [erro, setErro] = useState('');
    const canVerify = useMemo(() => login.trim() !== '' && senha.trim() !== '', [login, senha]);

    useEffect(() => {
        if (!show) {
            setLogin(loginInicial);
            setSenha('');
            setVerificado(false);
            setErro('');
            return;
        }

        const previousOverflow = document.body.style.overflow;
        const onEsc = (event: KeyboardEvent) => {
            if (event.key === 'Escape') onClose();
        };

        document.body.style.overflow = 'hidden';
        window.addEventListener('keydown', onEsc);

        return () => {
            document.body.style.overflow = previousOverflow;
            window.removeEventListener('keydown', onEsc);
        };
    }, [loginInicial, onClose, show]);

    if (!show) return null;

    const handleVerificarSenha = () => {
        if (!canVerify) {
            setErro('Preencha login e senha para verificar.');
            return;
        }

        if (login.trim() !== expectedLogin || senha.trim() !== expectedSenha) {
            setVerificado(false);
            setErro('Login ou senha incorretos.');
            return;
        }

        setErro('');
        setVerificado(true);
    };

    return (
        <ModalSimple
            title={verificado ? 'Importação de Dados' : 'Informe o login e senha de onde deseja importar os dados'}
            onClose={onClose}
            size="lg"
            footer={verificado ? (
                <ModalSimpleActionButton
                    type="button"
                    onClick={() => {
                        onIniciarImportacao?.();
                        onClose();
                    }}
                >
                    Iniciar Importação
                </ModalSimpleActionButton>
            ) : null}
        >
            {!verificado ? (
                <Body>
                    <Description>
                        {descricao ?? <>Serão importados dados de <strong>{entidadePlural}</strong> somente quando possuírem CPF ou CNPJ cadastrado.</>}
                    </Description>

                    <CredentialGrid $columns={2}>
                        <CredentialField>
                            <span>Login:</span>
                            <Input value={login} onChange={(event) => setLogin(event.target.value)} placeholder="Digite o login" />
                        </CredentialField>
                        <div />
                        <CredentialField>
                            <span>Senha:</span>
                            <Input type="password" value={senha} onChange={(event) => setSenha(event.target.value)} placeholder="Digite a senha" />
                        </CredentialField>
                        <ModalSimpleActionButton type="button" onClick={handleVerificarSenha}>
                            Verificar Senha
                        </ModalSimpleActionButton>
                    </CredentialGrid>

                    {erro ? <FeedbackFormulario>{erro}</FeedbackFormulario> : null}
                </Body>
            ) : (
                <Body>
                    <SuccessWrap>
                        <h4>Login e senha verificados com sucesso!</h4>
                        <p>Clique no botão abaixo para iniciar a importação dos dados de {nomeEntidade}.</p>
                    </SuccessWrap>
                    <Divider />
                    <FeedbackFormulario tom="success">Credenciais validadas com sucesso.</FeedbackFormulario>
                </Body>
            )}
        </ModalSimple>
    );
};
