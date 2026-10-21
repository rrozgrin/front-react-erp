import { useNavigate } from 'react-router-dom';
import { FaWhatsapp } from 'react-icons/fa';
import { FiAlertTriangle, FiBarChart2, FiDollarSign, FiList, FiMessageCircle, FiSend, FiUsers } from 'react-icons/fi';
import { WhatsappMarketingPage, SummaryCard } from './components';
import { formatNumber } from './whatsappMarketingData';
import {
    ButtonLink,
    Grid,
    IconBubble,
    IntroText,
    PageIntro,
    PrimaryButton,
    StepBody,
    StepCard,
    StepHeader,
    StepNumber,
    StepsGrid,
    WarningBanner,
} from './styled';

const stepCards = [
    {
        number: 1,
        title: 'Criar lista de contatos',
        description: 'Organize telefones, segmente clientes e prepare a base para o envio automático.',
        action: 'Ir para listas',
        path: '/whatsapp/listas',
        icon: <FiUsers size={24} />,
    },
    {
        number: 2,
        title: 'Criar mensagem',
        description: 'Monte a campanha, escolha um modelo, anexe imagem e visualize no preview.',
        action: 'Criar campanha',
        path: '/whatsapp/campanha',
        icon: <FiMessageCircle size={24} />,
    },
    {
        number: 3,
        title: 'Acompanhar resultados',
        description: 'Veja entregas, leituras, respostas, erros e custo total por campanha.',
        action: 'Ver resultados',
        path: '/whatsapp/resultados',
        icon: <FiBarChart2 size={24} />,
    },
];

export const WhatsappMarketingDashboardPage = () => {
    const navigate = useNavigate();

    return (
        <WhatsappMarketingPage title="WhatsApp Marketing">
            <PageIntro>
                <IntroText>
                    <h2>Olá, Admin!</h2>
                    <p>Crie campanhas, envie mensagens e acompanhe seus resultados em um fluxo simples.</p>
                </IntroText>
                <ButtonLink to="/whatsapp/campanha">
                    <FaWhatsapp size={18} />
                    Nova campanha
                </ButtonLink>
            </PageIntro>

            <WarningBanner>
                <FiAlertTriangle size={18} />
                Campanhas criadas após as 18h serão enviadas no dia seguinte.
            </WarningBanner>

            <StepsGrid>
                {stepCards.map((step) => (
                    <StepCard key={step.number}>
                        <StepHeader>
                            <IconBubble>{step.icon}</IconBubble>
                            <StepNumber>{step.number}</StepNumber>
                        </StepHeader>
                        <StepBody>
                            <h3>{step.title}</h3>
                            <p>{step.description}</p>
                        </StepBody>
                        <PrimaryButton type="button" onClick={() => navigate(step.path)}>
                            {step.action}
                            <FiSend size={16} />
                        </PrimaryButton>
                    </StepCard>
                ))}
            </StepsGrid>

            <Grid>
                <SummaryCard
                    label="Custo por envio"
                    value="R$ 0,01"
                    helper="por número enviado"
                    tone="orange"
                    icon={<FiDollarSign size={22} />}
                />
                <SummaryCard
                    label="Listas de contatos"
                    value="28"
                    helper="listas criadas"
                    icon={<FiList size={22} />}
                />
                <SummaryCard
                    label="Campanhas enviadas"
                    value="316"
                    helper="total de campanhas"
                    tone="blue"
                    icon={<FiSend size={22} />}
                />
                <SummaryCard
                    label="Mensagens enviadas"
                    value={formatNumber(156980)}
                    helper="total de mensagens"
                    tone="purple"
                    icon={<FaWhatsapp size={22} />}
                />
            </Grid>
        </WhatsappMarketingPage>
    );
};
