import styled from 'styled-components';
import { AppButtonBase } from '../../../../../../common/components/Buttons/buttonBase';
import { Input as UiInput } from '../../../../../../common/components/Ui';

export const Overlay = styled.div`
    position: fixed;
    inset: 0;
    z-index: 1200;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 18px;
    background: var(--theme-overlay, rgba(15, 23, 42, 0.52));
    backdrop-filter: blur(2px);
`;

export const Dialog = styled.section`
    width: min(920px, 100%);
    max-height: min(92vh, 760px);
    border: 1px solid var(--theme-border, rgba(15, 23, 42, 0.16));
    border-radius: 0.5rem;
    background: var(--theme-surface, #ffffff);
    box-shadow: 0 26px 70px rgba(15, 23, 42, 0.34);
    display: flex;
    flex-direction: column;
    overflow: hidden;
`;

export const ReportDialog = styled(Dialog)`
    width: min(980px, 100%);
    max-height: min(92vh, 780px);
`;

export const Header = styled.header`
    padding: 18px 20px;
    border-bottom: 1px solid var(--theme-border, rgba(15, 23, 42, 0.12));
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: var(--space-md);
`;

export const HeaderLeft = styled.div`
    display: flex;
    align-items: flex-start;
    gap: 14px;
    min-width: 0;
`;

export const HeaderIcon = styled.div`
    width: var(--control-height-sm);
    height: var(--control-height-sm);
    border-radius: var(--radius-pill);
    background: var(--theme-surface-soft, rgba(37, 99, 235, 0.1));
    color: #000;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex: 0 0 auto;

    svg {
        font-size: var(--font-size-sm);
    }
`;

export const TitleWrap = styled.div`
    min-width: 0;

    h2 {
        margin: 0;
        color: #000;
        font-size: var(--font-size-xs);
        line-height: 1.2;
        font-weight: 500;
    }

    p {
        margin: var(--space-2xs) 0 0;
        color: #000;
        font-size: var(--font-size-sm);
    }
`;

export const Body = styled.div`
    padding: var(--space-md) 20px 18px;
    display: grid;
    gap: var(--space-sm);
    overflow-y: auto;
`;

export const SummaryWrap = styled.div`
    > div {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    @media (max-width: 640px) {
        > div {
            grid-template-columns: 1fr;
        }
    }
`;

export const Panel = styled.section`
    border: 1px solid var(--theme-border, rgba(15, 23, 42, 0.14));
    border-radius: 0.5rem;
    background: var(--theme-surface, #ffffff);
    padding: var(--space-sm) 14px;
`;

export const PanelTitle = styled.h3`
    margin: 0 0 10px;
    color: #000;
    font-size: var(--font-size-xs);
    font-weight: 500;
`;

export const TableWrap = styled.div`
    > section {
        box-shadow: none;
        background: var(--theme-surface, #ffffff);
    }

    > section > div:first-child {
        padding: var(--space-sm) 14px;
        gap: var(--space-2xs);
    }

    > section h3 {
        font-size: var(--font-size-sm);
    }

    > section p {
        font-size: var(--font-size-xs);
    }

    th {
        padding: 10px 14px;
        font-size: var(--font-size-sm);
    }

    td {
        padding: var(--space-sm) 14px;
        font-size: var(--font-size-sm);
    }
`;

export const LaunchForm = styled.form`
    display: grid;
    grid-template-columns: 230px minmax(220px, 1fr) 170px auto;
    gap: var(--space-sm);
    align-items: end;

    @media (max-width: 860px) {
        grid-template-columns: 1fr 1fr;
    }

    @media (max-width: 35rem) {
        grid-template-columns: 1fr;
    }
`;

export const FieldGroup = styled.label`
    display: grid;
    gap: 6px;
    color: #000;
    font-size: var(--font-size-xs);
    font-weight: 500;
`;

export const Segmented = styled.div`
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 6px;
`;

export const TypeButton = styled.button<{ $active: boolean; $variant: 'credito' | 'debito' }>`
    min-height: 34px;
    border-radius: 5px;
    border: 1px solid ${({ $variant }) => ($variant === 'credito' ? 'rgba(22, 163, 74, 0.35)' : 'rgba(220, 38, 38, 0.28)')};
    background: ${({ $active, $variant }) => {
        if (!$active) return 'var(--theme-surface, #ffffff)';
        return $variant === 'credito' ? 'rgba(22, 163, 74, 0.1)' : 'rgba(220, 38, 38, 0.08)';
    }};
    color: ${({ $variant }) => ($variant === 'credito' ? '#15803d' : '#dc2626')};
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    font-size: var(--font-size-xs);
    font-weight: 500;
    cursor: pointer;
`;

export const Input = styled(UiInput)`
    min-height: 36px;
    border-radius: 5px;
    padding: 0 10px;
    font-size: var(--font-size-sm);

    &:focus {
        box-shadow: 0 0 0 3px rgba(var(--bs-primary-rgb), 0.12);
    }
`;

export const Footer = styled.footer`
    padding: var(--space-sm) 20px;
    border-top: 1px solid var(--theme-border, rgba(15, 23, 42, 0.12));
    display: flex;
    gap: 10px;
    align-items: center;
    justify-content: flex-end;
`;

export const FooterLeft = styled.div`
    margin-right: auto;
    display: inline-flex;
    align-items: center;
    gap: 10px;
`;

export const ModalActionButton = styled(AppButtonBase).attrs({ $size: 'modal' })``;

export const ReportBody = styled(Body)`
    gap: 14px;
`;

export const ReportFilters = styled.div`
    display: grid;
    gap: var(--space-sm);

    > div {
        margin: 0;
    }
`;

export const TypeFilter = styled.div`
    border: 1px solid var(--theme-border, rgba(15, 23, 42, 0.14));
    border-radius: 0.5rem;
    background: var(--theme-surface, #ffffff);
    padding: var(--space-sm) 14px;
    display: grid;
    gap: var(--space-xs);

    > span {
        color: #000;
        font-size: var(--font-size-xs);
        font-weight: 500;
    }

    ${Segmented} {
        grid-template-columns: repeat(3, minmax(0, 1fr));
    }

    @media (max-width: 35rem) {
        ${Segmented} {
            grid-template-columns: 1fr;
        }
    }
`;

export const TypeBadge = styled.span<{ $variant: 'credito' | 'debito' }>`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 68px;
    border-radius: var(--radius-pill);
    padding: var(--space-2xs) 10px;
    background: ${({ $variant }) => ($variant === 'credito' ? 'rgba(22, 163, 74, 0.12)' : 'rgba(220, 38, 38, 0.1)')};
    color: ${({ $variant }) => ($variant === 'credito' ? '#15803d' : '#dc2626')};
    font-size: var(--font-size-xs);
    font-weight: 500;
`;
