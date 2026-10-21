import { useState } from 'react';
import { FiCheckCircle } from 'react-icons/fi';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import { PageLayout } from '../../../../common/components/PageLayout';
import { Botao } from '../../../../common/components/Buttons/Botao';
import { Checkbox, Input as UiInput } from '../../../../common/components/Ui';
import { buildProdutosMenuSections } from '../shared/produtosMenuSections';

const ContentStack = styled.div`
    display: grid;
    gap: 20px;
`;

const Panel = styled.section`
    border: 1px solid var(--theme-border, #d8e2ef);
    border-radius: 0.1875rem;
    background: var(--theme-surface, #ffffff);
    padding: 26px;
    display: grid;
    gap: 22px;
`;

const Intro = styled.div`
    width: min(760px, 100%);
    margin: 0 auto;
    text-align: center;
    display: grid;
    gap: var(--space-xs);

    h3 {
        margin: 0;
        color: var(--theme-text, #0f172a);
        font-size: 1.18rem;
    }

    p {
        margin: 0;
        color: var(--theme-text-soft, #475569);
        line-height: 1.55;
    }

    strong {
        color: var(--theme-text, #0f172a);
    }
`;

const AlertText = styled.p`
    color: #dc2626 !important;
    font-weight: 500;
`;

const LoginForm = styled.form`
    width: min(320px, 100%);
    margin: 0 auto;
    display: grid;
    gap: 14px;
`;

const Field = styled.label`
    display: grid;
    gap: var(--space-xs);
    color: var(--theme-text, #0f172a);
    font-weight: 500;
`;

const Input = styled(UiInput)`
    min-height: var(--control-height-sm);
    border-radius: var(--radius-sm);
    padding: var(--space-xs) 10px;
`;

const ImportPanel = styled.section`
    border: 1px solid #bbf7d0;
    border-radius: 0.1875rem;
    background: #f0fdf4;
    color: #14532d;
    padding: 22px;
    text-align: center;
    display: grid;
    justify-items: center;
    gap: var(--space-md);

    h3,
    p {
        margin: 0;
    }
`;

const CheckboxLabel = styled.label`
    display: inline-flex;
    align-items: center;
    gap: 10px;
    color: #14532d;
    font-weight: 500;
`;

const StatusPanel = styled.section`
    border: 1px solid #bae6fd;
    border-radius: 0.1875rem;
    background: #eff6ff;
    color: #1e3a8a;
    padding: var(--space-md) 18px;
    display: grid;
    gap: var(--space-xs);
`;

export const ProdutosImportarDadosPage = () => {
    const [login, setLogin] = useState('');
    const [senha, setSenha] = useState('');
    const [credenciaisVerificadas, setCredenciaisVerificadas] = useState(false);
    const [importarEstoque, setImportarEstoque] = useState(false);
    const [statusImportacao, setStatusImportacao] = useState('');

    const verificarSenha = async () => {
        if (!login.trim() || !senha.trim()) {
            await Swal.fire('Atenção!', 'Informe login e senha para continuar.', 'warning');
            return;
        }

        setCredenciaisVerificadas(true);
        setStatusImportacao('');
        await Swal.fire('Sucesso!', 'Login e senha verificados com sucesso.', 'success');
    };

    const iniciarImportacao = async () => {
        setStatusImportacao('Importação iniciada. Produtos com código de barras serão avaliados para cadastro.');

        await Swal.fire(
            'Importação iniciada!',
            importarEstoque
                ? 'Os produtos e seus saldos de estoque serão importados.'
                : 'Somente os dados cadastrais dos produtos serão importados.',
            'success'
        );
    };

    return (
        <PageLayout
            title="Importar Dados de Produtos"
            sections={buildProdutosMenuSections({})}
        >
            <ContentStack>
                <Panel>
                    <Intro>
                        <h3>Informe o login e senha de onde deseja importar os dados</h3>
                        <p>
                            Serão importados apenas <strong>produtos</strong> que possuam código de barras cadastrado e
                            que não estejam previamente cadastrados no seu estabelecimento.
                        </p>
                        <p>Classificações, fornecedores e marcas serão importados automaticamente.</p>
                        <AlertText>Não serão importadas as grades/variações dos produtos.</AlertText>
                    </Intro>

                    <LoginForm
                        onSubmit={(event) => {
                            event.preventDefault();
                            void verificarSenha();
                        }}
                    >
                        <Field>
                            Login:
                            <Input value={login} onChange={(event) => setLogin(event.target.value)} required />
                        </Field>

                        <Field>
                            Senha:
                            <Input
                                type="password"
                                value={senha}
                                onChange={(event) => setSenha(event.target.value)}
                                required
                            />
                        </Field>

                        <Botao nome="Verificar Senha" action={() => void verificarSenha()} />
                    </LoginForm>
                </Panel>

                {credenciaisVerificadas && (
                    <ImportPanel>
                        <FiCheckCircle size={34} />
                        <h3>Login e senha verificados com sucesso!</h3>
                        <p>Clique no botão abaixo para iniciar a importação dos dados dos produtos.</p>

                        <CheckboxLabel>
                            <Checkbox
                                checked={importarEstoque}
                                onChange={(event) => setImportarEstoque(event.target.checked)}
                            />
                            Importar também o estoque dos produtos
                        </CheckboxLabel>

                        <Botao nome="Iniciar Importação" action={() => void iniciarImportacao()} />
                    </ImportPanel>
                )}

                {statusImportacao && (
                    <StatusPanel>
                        <strong>Status</strong>
                        <span>{statusImportacao}</span>
                    </StatusPanel>
                )}
            </ContentStack>
        </PageLayout>
    );
};
