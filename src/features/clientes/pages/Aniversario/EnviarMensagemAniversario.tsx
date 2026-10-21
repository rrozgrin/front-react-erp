import React, { useCallback, useMemo, useState } from 'react';
import { BuscaSimples } from '../../../../common/components/Inputs/BuscaSimples';
import { PeriodoInput } from '../../../../common/components/Inputs/PeriodoInput';
import { Botao } from '../../../../common/components/Buttons/Botao';
import { PageLayout } from '../../../../common/components/PageLayout';
import { SearchWrapper } from '../../../../common/components/PageLayout/styled';
import { MensagemAniversarioModal } from '../../components/MensagemAniversarioModal';
import { ModalVisualizarMensagemAniversario } from './MensagensAniversarioModal';
import { buildClientesMenuSections } from '../shared/clientesMenuSections';

export const EnviarMensagemAniversario: React.FC = () => {
    const [modalCriarMensagem, setModalCriarMensagem] = useState(false);
    const [modalVisualizarMensagem, setModalVisualizarMensagem] = useState(false);
    const [pesquisa, setPesquisa] = useState('');
    const [dataInicio, setDataInicio] = useState('');
    const [dataFim, setDataFim] = useState('');

    const handlePesquisa = useCallback((value: string) => {
        setPesquisa(value);
    }, []);

    const handleDateSearch = useCallback((inicio: string, fim: string) => {
        setDataInicio(inicio);
        setDataFim(fim);
    }, []);

    const secoes = useMemo(() => buildClientesMenuSections(), []);

    void dataInicio;
    void dataFim;

    return (
        <>
            <PageLayout
                title="Enviar Mensagens de Aniversário"
                sections={secoes}
                toolbar={(
                    <>
                        <SearchWrapper>
                            <BuscaSimples pesquisa={pesquisa} onChange={handlePesquisa} />
                        </SearchWrapper>

                        <SearchWrapper>
                            <PeriodoInput modo="confirmar" onChange={handleDateSearch} />
                        </SearchWrapper>

                        <div style={{ marginLeft: 'auto', display: 'flex', gap: 10 }}>
                            <Botao
                                nome="Visualizar Mensagens"
                                action={() => setModalVisualizarMensagem(true)}
                            />

                            <Botao
                                nome="Criar Mensagem"
                                action={() => setModalCriarMensagem(true)}
                            />
                        </div>
                    </>
                )}
            >
                {null}
            </PageLayout>

            {modalCriarMensagem && (
                <MensagemAniversarioModal
                    open={modalCriarMensagem}
                    modo="criar"
                    onClose={() => setModalCriarMensagem(false)}
                    onSave={(data) => console.log(data)}
                />
            )}
            {modalVisualizarMensagem && (
                <ModalVisualizarMensagemAniversario
                    open={modalVisualizarMensagem}
                    onClose={() => setModalVisualizarMensagem(false)}
                />
            )}
        </>
    );
};
