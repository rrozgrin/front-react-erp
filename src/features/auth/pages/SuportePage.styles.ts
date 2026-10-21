import styled from 'styled-components'
import { Input as UiInput } from '../../../common/components/Ui'

export const PageShell = styled.main`
    min-height: 100vh;
    background: linear-gradient(135deg, #0f5d90 0%, #1976d2 100%);
    padding: var(--space-xl) var(--space-md);

    @media (min-width: 768px) {
        padding-block: var(--control-height-md);
    }
`

export const Container = styled.div`
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
`

export const Panel = styled.section`
    overflow: hidden;
    background: #fff;
    box-shadow: 0 20px 60px rgba(15, 93, 144, 0.15);
`

export const Header = styled.header`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-lg);
    padding: var(--space-lg);

    @media (min-width: 768px) {
        flex-direction: row;
        padding: 48px;
    }
`

export const Title = styled.h1`
    margin: 0;
    color: #0f5d90;
    font-size: 2.2rem;
    font-weight: 800;

    @media (min-width: 768px) {
        font-size: var(--font-size-2-8rem);
    }
`

export const Logo = styled.img`
    width: 100%;
    max-width: 280px;
    height: auto;
    filter: drop-shadow(0 8px 16px rgba(15, 93, 144, 0.1));
`

export const Divider = styled.div`
    height: 1px;
    background: #e0e0e0;
`

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 400px;

    @media (min-width: 768px) {
        flex-direction: row;
    }
`

export const ProgramsCard = styled.section`
    flex: 1.3;
    background: #fafbfc;
`

export const ProgramsHeader = styled.div`
    padding: 20px var(--space-lg);
    background: linear-gradient(90deg, #0f5d90, #1976d2);
    color: #fff;

    @media (min-width: 576px) {
        padding-inline: 32px;
    }
`

export const ProgramsTitle = styled.h2`
    margin: 0;
    font-size: var(--font-size-xs);
    font-weight: 500;

    @media (min-width: 576px) {
        font-size: var(--font-size-2xl);
    }
`

export const ProgramItem = styled.div`
    display: flex;
    align-items: center;
    gap: var(--space-md);
    padding: 20px var(--space-md);
    border-radius: var(--radius-sm);
    transition: background-color 0.2s ease;

    &:hover {
        background: #f8fbff;
    }

    @media (min-width: 576px) {
        padding-inline: 24px;
    }
`

export const ProgramInitials = styled.div<{ $accent: string }>`
    width: var(--control-height-md);
    height: var(--control-height-md);
    display: grid;
    place-items: center;
    flex-shrink: 0;
    background: ${({ $accent }) => $accent};
    box-shadow: ${({ $accent }) => `0 4px 12px ${$accent}20`};
    color: #fff;
    font-size: var(--font-size-md);
    font-weight: 800;
`

export const ProgramName = styled.h3`
    flex: 1;
    margin: 0;
    color: #131313;
    font-size: var(--font-size-md);
    font-weight: 600;

    @media (min-width: 576px) {
        font-size: 1.1rem;
    }
`

export const DownloadButton = styled.a<{ $accent: string }>`
    width: 44px;
    height: 44px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: var(--radius-sm);
    background: ${({ $accent }) => $accent};
    color: #fff;
    font-size: font-size: var(--font-size-xs);
    font-weight: 500;
    text-decoration: none;
    transition: transform 0.2s ease, box-shadow 0.2s ease;

    &:hover {
        transform: translateY(-2px);
        box-shadow: ${({ $accent }) => `0 6px 16px ${$accent}40`};
        color: #fff;
    }
`

export const Aside = styled.aside`
    min-width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: var(--space-xl) var(--space-lg);
    background: #fff;
    text-align: center;

    @media (min-width: 768px) {
        min-width: 300px;
        padding: 48px var(--space-xl);
    }
`

export const AsideText = styled.div`
    max-width: 360px;
`

export const AsideTitle = styled.h2`
    margin: 0 0 var(--space-md);
    color: #000;
    font-size: 1.8rem;
    line-height: 1.2;
    font-weight: 800;

    @media (min-width: 768px) {
        font-size: 2.2rem;
    }
`

export const AsideDescription = styled.p`
    margin: 0;
    color: #000;
    font-size: 0.95rem;
    font-weight: 500;
    opacity: 0.9;
`

export const BackButton = styled.button`
    margin-top: var(--space-xl);
    padding: 11px var(--space-xl);
    border: 0;
    border-radius: var(--radius-sm);
    background: #fff;
    color: #0f5d90;
    font: inherit;
    font-size: var(--font-size-xs);
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease;

    &:hover {
        background: #f0f0f0;
        box-shadow: 0 8px 20px rgba(15, 93, 144, 0.25);
        transform: translateY(-2px);
    }
`

export const ErrorAlert = styled.div`
    margin-bottom: var(--space-md);
    padding: var(--space-sm) 14px;
    border: 1px solid #f1b7b7;
    border-radius: var(--radius-sm);
    background: #fdecec;
    color: #9f1d1d;
`

export const Field = styled.label`
    display: flex;
    flex-direction: column;
    gap: 6px;
    color: #5d7183;
    font-size: 0.82rem;
    font-weight: 600;
`

export const Input = styled(UiInput)`
    min-height: 56px;
    padding: var(--space-md) 14px;
    border: 1px solid rgba(0, 0, 0, 0.23);
    border-radius: var(--radius-sm);
    font: inherit;

    &:focus {
        border-color: #0f5d90;
        box-shadow: 0 0 0 1px #0f5d90;
        outline: none;
    }
`
