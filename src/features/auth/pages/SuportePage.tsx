import { IoMdDownload } from "react-icons/io";
import { useState } from 'react';
import type { MouseEvent } from 'react'
import {
    ModalSimple,
    ModalSimpleActionButton,
} from '../../../common/components/ModalSimple';
import {
    Aside,
    AsideDescription,
    AsideText,
    AsideTitle,
    BackButton,
    Container,
    Content,
    Divider,
    DownloadButton,
    ErrorAlert,
    Field,
    Header,
    Input,
    Logo,
    PageShell,
    Panel,
    ProgramInitials,
    ProgramItem,
    ProgramName,
    ProgramsCard,
    ProgramsHeader,
    ProgramsTitle,
    Title,
} from './SuportePage.styles';

interface ProgramRowProps {
    name: string
    initials: string
    accent: string
    href: string
}

const logo = '/logo-webcontrol.png'
const SUPPORT_PROGRAMS: ProgramRowProps[] = [
    {
        name: 'TeamViewer',
        initials: 'TV',
        accent: '#1d2676',
        href: 'https://www.teamviewer.com/pt-br/download/windows/',
    },
    {
        name: 'AnyDesk',
        initials: 'AD',
        accent: '#ff4d43',
        href: 'https://anydesk.com/pt/downloads/windows',
    },
    {
        name: 'WebControl PDV',
        initials: 'WC',
        accent: '#24558b',
        href: '#',
    },
]

const CORRECT_PASSWORD = 'seu_senha_aqui' // Altere para sua senha

const goToLogin = () => {
    window.history.pushState({}, '', '/')
    window.dispatchEvent(new PopStateEvent('popstate'))
}

function ProgramRow({ name, initials, accent, href, onPDVClick }: ProgramRowProps & { onPDVClick?: () => void }) {
    const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
        if (name === 'WebControl PDV') {
            e.preventDefault()
            onPDVClick?.()
        }
    }

    return (
        <ProgramItem>
            <ProgramInitials $accent={accent}>
                {initials}
            </ProgramInitials>

            <ProgramName>
                {name}
            </ProgramName>

            <DownloadButton
                href={href}
                onClick={handleClick}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                aria-label={`Baixar ${name}`}
                $accent={accent}
            >
                <IoMdDownload />
            </DownloadButton>
        </ProgramItem>
    )
}

function SuportePage() {
    const [openModal, setOpenModal] = useState(false)
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const handlePDVClick = () => {
        setOpenModal(true)
        setPassword('')
        setError('')
    }

    const handlePassword = () => {
        if (password === CORRECT_PASSWORD) {
            window.open('#', '_blank') // Altere '#' para a URL de instalação
            setOpenModal(false)
            setPassword('')
        } else {
            setError('Senha incorreta')
            setPassword('')
        }
    }

    return (
        <PageShell>
            <Container>
                <Panel>
                    <Header>
                        <Title>
                            Suporte
                        </Title>

                        <Logo
                            src={logo}
                            alt="Web Control"
                        />
                    </Header>

                    <Divider />

                    <Content>
                        <ProgramsCard>
                            <ProgramsHeader>
                                <ProgramsTitle>
                                    Programas Disponíveis
                                </ProgramsTitle>
                            </ProgramsHeader>

                            <div>
                                {SUPPORT_PROGRAMS.map((program, index) => (
                                    <div key={program.name}>
                                        {index > 0 && <Divider />}
                                        <ProgramRow {...program} onPDVClick={handlePDVClick} />
                                    </div>
                                ))}
                            </div>
                        </ProgramsCard>

                        <Aside>
                            <AsideText>
                                <AsideTitle>
                                    Baixe os Programas de Suporte
                                </AsideTitle>
                                <AsideDescription>
                                    Escolha uma ferramenta para conectar com nosso suporte técnico
                                </AsideDescription>
                            </AsideText>

                            <BackButton
                                type="button"
                                onClick={goToLogin}
                            >
                                ← Voltar para Login
                            </BackButton>
                        </Aside>
                    </Content>
                </Panel>
            </Container>

            {openModal ? (
                <ModalSimple
                    title="WebControl PDV - Senha para download"
                    onClose={() => setOpenModal(false)}
                    size="sm"
                    footer={(
                        <>
                            <ModalSimpleActionButton $variant="secondary" type="button" onClick={() => setOpenModal(false)}>
                                Cancelar
                            </ModalSimpleActionButton>
                            <ModalSimpleActionButton type="button" onClick={handlePassword}>
                                Confirmar
                            </ModalSimpleActionButton>
                        </>
                    )}
                >
                    {error ? <ErrorAlert>{error}</ErrorAlert> : null}
                    <Field>
                        Senha
                        <Input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handlePassword()}
                            autoFocus
                        />
                    </Field>
                </ModalSimple>
            ) : null}
        </PageShell>
    )
}

export default SuportePage
