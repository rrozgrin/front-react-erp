import { FiCalendar, FiDollarSign, FiInfo, FiPercent, FiSave, FiSettings, FiTag, FiUsers } from 'react-icons/fi';
import { Botao } from '../../../common/components/Buttons/Botao';
import { PageLayout } from '../../../common/components/PageLayout';
import { FinanceiroSummaryCards } from '@/features/financeiro';
import { Input, Radio, Select } from '../../../common/components/Ui';
import { cupomDescontoMenuSections } from './cupomDescontoMenuSections';
import {
    ConfigForm,
    ConfigLayout,
    ContentStack,
    CouponContent,
    CouponPageShell,
    Field,
    FormGrid,
    InfoNote,
    InlineInput,
    MoneyInput,
    MutedOption,
    Panel,
    PanelInner,
    RadioOption,
    RadioRow,
    SaveRow,
    SectionTitle,
    SummaryBox,
    SummaryCardsColumn,
    SummaryTitle,
} from './styled';

export const CupomDescontoPage = () => {
    const couponSummaryItems = [
        {
            label: 'Desconto - Meus Clientes',
            value: '10,00%',
            icon: <FiUsers />,
        },
        {
            label: 'Desconto - Outras Empresas',
            value: '5,00%',
            icon: <FiPercent />,
        },
        {
            label: 'Válido por',
            value: '90 dias',
            icon: <FiCalendar />,
        },
        {
            label: 'Valor mínimo',
            value: 'R$ 50,00',
            icon: <FiDollarSign />,
        },
    ];

    return (
        <CouponPageShell>
            <PageLayout title="Cupom de Desconto" sections={cupomDescontoMenuSections}>
                <CouponContent>
                    <ContentStack>
                        <Panel>
                            <PanelInner>
                                <SectionTitle>
                                    <FiTag size={20} />
                                    <div>
                                        <h2>Configurações do Cupom</h2>
                                    </div>
                                </SectionTitle>

                                <ConfigLayout>
                                    <ConfigForm onSubmit={(event) => event.preventDefault()}>
                                        <RadioRow>
                                            <RadioOption>
                                                <Radio name="coupon-status" defaultChecked />
                                                Ativar cupom de desconto
                                            </RadioOption>
                                            <RadioOption>
                                                <Radio name="coupon-status" />
                                                Desativar cupom de desconto
                                            </RadioOption>
                                        </RadioRow>

                                        <FormGrid>
                                            <Field>
                                                Meus Clientes
                                                <InlineInput>
                                                    <Input defaultValue="10,00" />
                                                    <span>% de Desconto</span>
                                                </InlineInput>
                                            </Field>

                                            <Field>
                                                Clientes de outras empresas
                                                <InlineInput>
                                                    <Input defaultValue="5,00" />
                                                    <span>% de Desconto</span>
                                                </InlineInput>
                                            </Field>

                                            <Field>
                                                Segmento Empresarial
                                                <Select defaultValue="">
                                                    <option value="" disabled>Selecione...</option>
                                                    <option>Varejo</option>
                                                    <option>Serviços</option>
                                                    <option>Alimentação</option>
                                                </Select>
                                            </Field>

                                            <Field>
                                                Regras de segmento
                                                <MutedOption>
                                                    <FiUsers size={16} />
                                                    Ignorar outras empresas do mesmo segmento
                                                </MutedOption>
                                            </Field>

                                            <Field>
                                                Válido por
                                                <InlineInput>
                                                    <Input defaultValue="90" />
                                                    <span>dias</span>
                                                </InlineInput>
                                            </Field>

                                            <Field>
                                                Valor mínimo
                                                <MoneyInput>
                                                    <span>R$</span>
                                                    <Input defaultValue="50,00" />
                                                </MoneyInput>
                                            </Field>
                                        </FormGrid>

                                        <InfoNote>
                                            <FiInfo size={16} />
                                            Determine um valor mínimo de compra para gerar o cupom de desconto.
                                        </InfoNote>

                                        <SaveRow>
                                            <Botao type="submit" variant="primary" nome="Salvar" action={() => undefined} icone={<FiSave size={16} />} />
                                        </SaveRow>
                                    </ConfigForm>

                                    <SummaryBox>
                                        <SummaryTitle>
                                            <FiSettings size={18} />
                                            Resumo do Cupom
                                        </SummaryTitle>
                                        <SummaryCardsColumn>
                                            <FinanceiroSummaryCards items={couponSummaryItems} />
                                        </SummaryCardsColumn>
                                        <InfoNote>
                                            <FiInfo size={16} />
                                            O cupom será aplicado conforme as regras configuradas ao lado.
                                        </InfoNote>
                                    </SummaryBox>
                                </ConfigLayout>
                            </PanelInner>
                        </Panel>
                    </ContentStack>
                </CouponContent>
            </PageLayout>
        </CouponPageShell>
    );
};
