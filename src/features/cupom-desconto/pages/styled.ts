import styled from 'styled-components';
import { Panel as UiPanel } from '../../../common/components/Ui';

export const couponColors = {
    blue: 'var(--color-main, var(--bs-primary))',
    blueDark: 'var(--color-secondary, var(--bs-secondary))',
    yellow: 'var(--color-tertiary, var(--bs-tertiary))',
    background: 'var(--theme-surface-muted, #F8FAFC)',
    card: 'var(--theme-surface, #FFFFFF)',
    border: 'var(--theme-border, #E5E7EB)',
    text: 'var(--theme-text, #0F172A)',
    muted: 'var(--theme-text-soft, #64748B)',
    green: 'var(--color-main, var(--bs-primary))',
};

export const CouponPageShell = styled.div`
    display: grid;
    min-height: 100%;
    background: ${couponColors.background};
    color: ${couponColors.text};

    @media (max-width: 991px) {
        min-height: 100%;
    }
`;

export const CouponSidebar = styled.aside`
    display: flex;
    flex-direction: column;
    gap: 18px;
    padding: 22px 14px;
    border-right: 1px solid ${couponColors.border};
    background: ${couponColors.card};

    @media (max-width: 991px) {
        border-right: 0;
        border-bottom: 1px solid ${couponColors.border};
    }
`;

export const Brand = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    min-height: var(--control-height-md);
`;

export const BrandIcon = styled.span`
    width: 38px;
    height: 38px;
    border-radius: 0.5rem;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: ${couponColors.yellow};
    color: var(--color-font, #ffffff);
`;

export const BrandText = styled.div`
    display: grid;
    line-height: 1.15;

    span {
        color: ${couponColors.text};
        font-size: 0.86rem;
        font-weight: 500;
    }

    strong {
        color: ${couponColors.blue};
        font-size: var(--font-size-xs);
        font-weight: 500;
    }
`;

export const SideNav = styled.nav`
    display: grid;
    gap: var(--space-xs);
`;

export const SideNavButton = styled.button<{ $active?: boolean }>`
    display: flex;
    align-items: center;
    gap: 10px;
    min-height: var(--control-height-sm);
    padding: 0 var(--space-sm);
    border: 0;
    border-radius: 0.5rem;
    background: ${({ $active }) => ($active ? 'rgba(var(--bs-primary-rgb), 0.1)' : 'transparent')};
    color: ${({ $active }) => ($active ? couponColors.blue : couponColors.muted)};
    font-weight: 800;
    text-align: left;

    &:hover {
        background: rgba(var(--bs-primary-rgb), 0.08);
        color: ${couponColors.blue};
    }
`;

export const HelpCard = styled.div`
    margin-top: auto;
    display: grid;
    gap: var(--space-2xs);
    padding: 14px;
    border: 1px solid ${couponColors.border};
    border-radius: 0.5rem;
    background: ${couponColors.card};
    color: ${couponColors.muted};
    font-size: 0.8rem;

    strong {
        color: ${couponColors.text};
        font-size: 0.88rem;
    }
`;

export const CouponContent = styled.main`
    min-width: 0;
    display: grid;
    align-content: start;
`;

export const Hero = styled.section`
    min-height: 110px;
    display: flex;
    align-items: center;
    padding: var(--space-lg) 34px;
    color: var(--color-font, #ffffff);
    background:
        radial-gradient(circle at 82% 18%, rgba(255, 255, 255, 0.22), transparent 18%),
        linear-gradient(135deg, ${couponColors.blue} 0%, ${couponColors.blueDark} 100%);

    h1 {
        margin: 0;
        font-size: 1.55rem;
        font-weight: 900;
    }

    p {
        margin: 6px 0 0;
        font-size: 0.92rem;
        opacity: 0.9;
    }

    @media (max-width: 767px) {
        padding: 22px 18px;
    }
`;

export const ContentStack = styled.div`
    display: grid;
    gap: 18px;

    @media (max-width: 767px) {
        padding: 18px 14px 28px;
    }
`;

export const Panel = styled(UiPanel)`
    min-width: 0;
    border: 1px solid ${couponColors.border};
    background: ${couponColors.card};
    box-shadow: 0 18px 45px rgba(15, 23, 42, 0.06);
    padding: 0;
`;

export const PanelInner = styled.div`
    padding: 20px;

    @media (max-width: 767px) {
        padding: var(--space-md);
    }
`;

export const SectionTitle = styled.div.attrs({ 'data-app-title': true })`
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 18px;

    h2 {
        margin: 0;
        color: ${couponColors.blue};
        font-size: 1.12rem;
        font-weight: 900;
    }

    p {
        margin: var(--space-2xs) 0 0;
        color: ${couponColors.muted};
        font-size: 0.86rem;
    }
`;

export const ConfigLayout = styled.div`
    display: grid;
    grid-template-columns: minmax(0, 1fr) 320px;
    gap: 22px;
    align-items: start;

    @media (max-width: 1199px) {
        grid-template-columns: 1fr;
    }
`;

export const ConfigForm = styled.form`
    display: grid;
    gap: var(--space-md);
`;

export const RadioRow = styled.div`
    display: flex;
    gap: 40px;
    flex-wrap: wrap;
`;

export const RadioOption = styled.label`
    display: inline-flex;
    align-items: center;
    gap: var(--space-xs);
    color: ${couponColors.muted};
    font-size: 0.86rem;
    font-weight: 500;

    input {
        width: 16px;
        height: 16px;
        accent-color: ${couponColors.blue};
    }
`;

export const FormGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 14px 22px;

    @media (max-width: 767px) {
        grid-template-columns: 1fr;
    }
`;

export const Field = styled.label`
    display: grid;
    gap: 7px;
    color: ${couponColors.muted};
    font-size: 0.82rem;
    font-weight: 800;

    input,
    select {
        width: 100%;
        min-height: 40px;
        border: 1px solid ${couponColors.border};
        border-radius: 7px;
        padding: 9px 11px;
        background: ${couponColors.card};
        color: ${couponColors.text};
        outline: none;

        &:focus {
            border-color: ${couponColors.blue};
            box-shadow: 0 0 0 3px rgba(var(--bs-primary-rgb), 0.12);
        }
    }
`;

export const InlineInput = styled.div`
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    gap: var(--space-xs);
    align-items: center;

    span {
        color: ${couponColors.muted};
        font-size: 0.78rem;
        font-weight: 800;
    }
`;

export const MoneyInput = styled.div`
    display: grid;
    grid-template-columns: 54px minmax(0, 1fr);
    border: 1px solid ${couponColors.border};
    border-radius: 7px;
    overflow: hidden;
    background: ${couponColors.card};

    span {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        background: ${couponColors.background};
        color: ${couponColors.muted};
        font-weight: 900;
    }

    input {
        border: 0;
        border-radius: 0;
        box-shadow: none;
    }
`;

export const MutedOption = styled.div`
    min-height: 40px;
    display: flex;
    align-items: center;
    gap: var(--space-xs);
    padding: 0 var(--space-sm);
    border-radius: 7px;
    background: ${couponColors.background};
    color: ${couponColors.muted};
    font-size: 0.82rem;
    font-weight: 800;
`;

export const SaveRow = styled.div`
    display: flex;
    justify-content: center;
`;

export const SummaryBox = styled.aside`
    display: grid;
    gap: var(--space-sm);
    padding: 18px;
    border: 1px solid ${couponColors.border};
    border-radius: 0.5rem;
    background: linear-gradient(180deg, ${couponColors.background} 0%, var(--theme-surface-soft, rgba(var(--bs-primary-rgb), 0.08)) 100%);
`;

export const SummaryCardsColumn = styled.div`
    > div {
        grid-template-columns: 1fr;
    }
`;

export const SummaryTitle = styled.div.attrs({ 'data-app-title': true })`
    display: flex;
    align-items: center;
    gap: var(--space-xs);
    color: ${couponColors.blue};
    font-weight: 900;
`;

export const SummaryLine = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-sm);
    color: ${couponColors.muted};
    font-size: 0.86rem;
    font-weight: 750;

    strong {
        color: ${couponColors.blue};
        font-weight: 900;
    }
`;

export const InfoNote = styled.div`
    display: flex;
    gap: var(--space-xs);
    padding: var(--space-sm);
    border-radius: 0.5rem;
    background: var(--theme-surface-soft, rgba(var(--bs-primary-rgb), 0.12));
    color: ${couponColors.blue};
    font-size: 0.82rem;
    font-weight: 800;
`;

export const ReportHeader = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 14px;
    padding: 20px 20px 0;

    @media (max-width: 767px) {
        display: grid;
    }
`;

export const FiltersBar = styled.div`
    display: grid;
    grid-template-columns: 1.2fr auto 1.2fr 1.1fr auto;
    gap: 10px;
    align-items: end;
    padding: 18px 20px 0;

    @media (max-width: 991px) {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    @media (max-width: 640px) {
        grid-template-columns: 1fr;
    }
`;

export const FilterLabel = styled.label`
    display: grid;
    gap: 6px;
    color: ${couponColors.muted};
    font-size: 0.78rem;
    font-weight: 850;

    input,
    select {
        min-height: 40px;
        border: 1px solid ${couponColors.border};
        border-radius: 7px;
        padding: 0 11px;
        background: ${couponColors.card};
        color: ${couponColors.text};
    }
`;

export const DateSeparator = styled.span`
    align-self: center;
    color: ${couponColors.muted};
    font-weight: 800;

    @media (max-width: 991px) {
        display: none;
    }
`;

export const MetricsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(5, minmax(0, 1fr));
    gap: var(--space-sm);
    padding: 18px 20px;

    @media (max-width: 1199px) {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    @media (max-width: 640px) {
        grid-template-columns: 1fr;
    }
`;

export const SummaryCardsArea = styled.div`
    padding: 18px 20px;
`;

export const MetricCard = styled.div`
    display: flex;
    align-items: center;
    gap: var(--space-sm);
    min-width: 0;
    padding: 15px;
    border: 1px solid ${couponColors.border};
    border-radius: 0.5rem;
    background: ${couponColors.card};
`;

export const MetricIcon = styled.span<{ $tone?: 'blue' | 'green' | 'yellow' | 'purple' }>`
    width: var(--control-height-sm);
    height: var(--control-height-sm);
    border-radius: 0.5rem;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: ${({ $tone }) => {
        if ($tone === 'green') return 'var(--color-main, var(--bs-primary))';
        if ($tone === 'yellow') return 'var(--color-tertiary, var(--bs-tertiary))';
        if ($tone === 'purple') return 'var(--color-secondary, var(--bs-secondary))';
        return couponColors.blue;
    }};
    background: ${({ $tone }) => {
        if ($tone === 'green') return 'var(--theme-surface-soft, rgba(var(--bs-primary-rgb), 0.12))';
        if ($tone === 'yellow') return 'var(--theme-surface-muted, rgba(var(--bs-primary-rgb), 0.08))';
        if ($tone === 'purple') return 'var(--theme-surface-soft, rgba(var(--bs-primary-rgb), 0.12))';
        return 'var(--theme-surface-soft, rgba(var(--bs-primary-rgb), 0.12))';
    }};
`;

export const MetricText = styled.div`
    min-width: 0;

    span {
        display: block;
        color: ${couponColors.muted};
        font-size: var(--font-size-xs);
        font-weight: 500;
    }

    strong {
        display: block;
        margin-top: 3px;
        color: ${couponColors.blue};
        font-size: 1.2rem;
        font-weight: 950;
    }

    small {
        display: block;
        margin-top: 2px;
        color: ${couponColors.muted};
        font-size: 0.76rem;
    }
`;

export const StatusPill = styled.span<{ $status: 'active' | 'paused' | 'expired' }>`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 70px;
    padding: 6px 10px;
    border-radius: var(--radius-pill);
    color: ${({ $status }) => ($status === 'active' ? '#067647' : $status === 'paused' ? '#B54708' : '#B42318')};
    background: ${({ $status }) => ($status === 'active' ? '#DCFAE6' : $status === 'paused' ? '#FEF0C7' : '#FEE4E2')};
    font-size: 0.76rem;
    font-weight: 900;
`;

export const TableActions = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 7px;
`;

export const PaginationBar = styled.div`
    display: flex;
    justify-content: space-between;
    gap: var(--space-sm);
    align-items: center;
    padding: 14px 20px 20px;
    color: ${couponColors.muted};
    font-size: 0.82rem;

    @media (max-width: 767px) {
        display: grid;
    }
`;

export const PageButtons = styled.div`
    display: flex;
    align-items: center;
    gap: 6px;

    button,
    select {
        min-height: 34px;
        border: 1px solid ${couponColors.border};
        border-radius: 7px;
        background: ${couponColors.card};
        color: ${couponColors.text};
        padding: 0 10px;
    }

    button[aria-current='page'] {
        border-color: ${couponColors.blue};
        background: ${couponColors.blue};
        color: var(--color-font, #ffffff);
    }
`;
