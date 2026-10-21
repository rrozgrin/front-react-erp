import styled, { css } from 'styled-components';
import { AppButtonBase } from '../../../common/components/Buttons/buttonBase';
import { Input } from '../../../common/components/Ui';

export const PageRoot = styled.div<{
    $accent: string;
    $accentStrong: string;
    $accentSoft: string;
}>`
    --mail-accent: ${({ $accent }) => $accent};
    --mail-accent-strong: ${({ $accentStrong }) => $accentStrong};
    --mail-accent-soft: ${({ $accentSoft }) => $accentSoft};

    display: grid;
    gap: var(--space-md);
`;

export const DashboardGrid = styled.div`
    display: grid;
    grid-template-columns: minmax(25rem, 1.08fr) minmax(22rem, 1fr);
    gap: var(--space-md);

    @media (max-width: 1050px) {
        grid-template-columns: 1fr;
    }
`;

export const ActionCardsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: var(--space-md);

    @media (max-width: 700px) {
        grid-template-columns: 1fr;
    }
`;

const cardStyles = css`
    border: 1px solid var(--theme-border, #dbe1ea);
    border-radius: var(--radius-md);
    background: var(--theme-surface, #ffffff);
    box-shadow: var(--shadow-panel);
    overflow: hidden;
`;

export const Card = styled.section`
    ${cardStyles}
`;

export const HighlightCard = styled(Card) <{ $tone?: 'orange' }>`
    border-color: ${({ $tone }) => ($tone === 'orange' ? 'rgba(245, 158, 11, 0.7)' : 'var(--theme-border, #dbe1ea)')};
`;

export const CardHeader = styled.header<{ $tone?: 'primary' | 'orange' | 'green' | 'purple' }>`
    display: flex;
    align-items: center;
    gap: var(--space-sm);
    min-height: 3.375rem;
    padding: var(--space-sm) var(--space-md);
    border-bottom: 1px solid var(--theme-border, #e6ebf2);
    /* background: ${({ $tone }) => {
        if ($tone === 'orange') {
            return 'rgba(245, 158, 11, 0.08)';
        }

        return 'linear-gradient(180deg, rgba(var(--bs-primary-rgb, 30, 94, 149), 0.1), rgba(var(--bs-primary-rgb, 30, 94, 149), 0.025))';
    }}; */
    color: ${({ $tone }) => ($tone === 'orange' ? '#d97706' : 'var(--theme-text, #172033)')};
`;

export const HeaderIcon = styled.span<{ $tone?: 'primary' | 'orange' | 'green' | 'purple' }>`
    width: 2.375rem;
    height: 2.375rem;
    flex: 0 0 2.375rem;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: var(--radius-pill);
    color: #ffffff;
    background: ${({ $tone }) => {
        if ($tone === 'orange') {
            return '#f59e0b';
        }

        if ($tone === 'green') {
            return '#16a34a';
        }

        if ($tone === 'purple') {
            return '#7c3aed';
        }

        return 'var(--mail-accent, var(--color-main, var(--bs-primary)))';
    }};
`;

export const CardTitle = styled.h2`
    margin: 0;
    color: inherit;
    font-size: var(--font-size-xs);
    font-weight: 500;
`;

export const CardBody = styled.div`
    padding: var(--space-md);
`;

export const FormGrid = styled.form`
    display: grid;
    gap: var(--space-md);
`;

export const FormRow = styled.div`
    display: grid;
    grid-template-columns: 12rem minmax(0, 1fr);
    align-items: center;
    gap: var(--space-md);

    @media (max-width: 620px) {
        grid-template-columns: 1fr;
        gap: var(--space-xs);
    }
`;

export const FieldLabel = styled.span`
    color: var(--theme-text, #172033);
    font-size: var(--font-size-xs);
    font-weight: 500;
`;

export const InlineOptions = styled.div`
    display: flex;
    align-items: center;
    gap: var(--space-lg);
    flex-wrap: wrap;
`;

export const RadioLabel = styled.label`
    display: inline-flex;
    align-items: center;
    gap: var(--space-xs);
    margin: 0;
    color: #000;
    font-size: var(--font-size-xs);
    font-weight: 500;
    cursor: pointer;

    input {
        width: 1rem;
        height: 1rem;
        margin: 0;
        accent-color: var(--mail-accent, var(--color-main, var(--bs-primary)));
    }
`;

export const FieldStack = styled.div`
    display: grid;
    gap: var(--space-xs);
`;

export const TextInput = styled(Input)`
    min-height: 2.125rem;
    font-size: var(--font-size-sm);
`;

export const HintText = styled.small`
    color: var(--mail-accent-strong, var(--color-secondary, #214e8c));
    font-size: var(--font-size-xs);
    font-weight: 500;
`;

export const PositionGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 10.75rem));
    gap: var(--space-sm);

    @media (max-width: 520px) {
        grid-template-columns: 1fr;
    }
`;

export const PositionField = styled.label`
    display: grid;
    gap: var(--space-2xs);
    color: var(--theme-text, #172033);
    font-size: var(--font-size-xs);
    font-weight: 500;
`;

export const NumberWithUnit = styled.div`
    display: grid;
    grid-template-columns: 4.25rem auto;
    align-items: center;
    gap: var(--space-xs);
    color: var(--theme-text-soft, #64748b);
    font-size: var(--font-size-xs);
    font-weight: 500;
`;

export const PrimaryActionButton = styled(AppButtonBase).attrs({ $size: 'modal' })`
    justify-self: center;
    min-width: 18rem;
    border-radius: var(--radius-xs);
    font-size: var(--font-size-sm);

    @media (max-width: 520px) {
        width: 100%;
        min-width: 0;
    }
`;

export const InfoIntro = styled.p`
    margin: 0 0 var(--space-md);
    color: var(--theme-text, #172033);
    font-size: var(--font-size-sm);
    line-height: 1.55;
`;

export const InfoSection = styled.article`
    display: grid;
    grid-template-columns: 2.375rem minmax(0, 1fr);
    gap: var(--space-sm);
    padding: var(--space-md) 0;
    border-top: 1px solid var(--theme-border, #e6ebf2);

    &:first-of-type {
        border-top: 0;
        padding-top: 0;
    }
`;

export const SectionIcon = styled.span`
    width: 2.125rem;
    height: 2.125rem;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: var(--mail-accent, var(--color-main, var(--bs-primary)));
    font-size: var(--font-size-sm);
`;

export const SectionTitle = styled.h3`
    margin: 0 0 var(--space-xs);
    color: var(--mail-accent-strong, var(--color-secondary, #214e8c));
    font-size: var(--font-size-xs);
    font-weight: 500;
    text-transform: uppercase;
`;

export const Paragraph = styled.p`
    margin: 0;
    color: var(--theme-text, #172033);
    font-size: var(--font-size-sm);
    line-height: 1.55;
`;

export const BenefitList = styled.ul`
    margin: 0;
    padding-left: var(--space-lg);
    color: var(--theme-text, #172033);
    font-size: var(--font-size-sm);
    line-height: 1.55;
`;

export const InfoCallout = styled.strong`
    display: block;
    margin-top: var(--space-sm);
    color: var(--mail-accent, var(--color-main, var(--bs-primary)));
    font-size: var(--font-size-xs);
    font-weight: 500;
    text-align: center;
`;

export const OrderCardBody = styled(CardBody)`
    display: grid;
    gap: var(--space-sm);
`;

export const OrderCardTitle = styled.div.attrs({ 'data-app-title': true })`
    display: grid;
    grid-template-columns: 2rem minmax(0, 1fr);
    gap: var(--space-sm);
    align-items: start;
    color: var(--theme-text, #172033);
    font-size: var(--font-size-xs);
    font-weight: 500;

    strong {
        color: #16a34a;
        font-weight: 900;
    }

    b {
        color: #7c3aed;
        font-weight: 900;
    }
`;

export const MiniCircleIcon = styled.span<{ $tone?: 'green' | 'purple' }>`
    width: 2rem;
    height: 2rem;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: var(--radius-pill);
    color: #ffffff;
    background: ${({ $tone }) => ($tone === 'purple' ? '#7c3aed' : '#16a34a')};
`;

export const IllustrationStage = styled.div`
    min-height: 13.75rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid var(--theme-border, #e6ebf2);
    /* background: linear-gradient(180deg, #ffffff 0%, #f8fafc 100%); */
    overflow: hidden;
`;

export const EnvelopeArt = styled.div`
    position: relative;
    width: min(21rem, 92%);
    aspect-ratio: 1.9 / 1;
    border: 1px solid #cbd5e1;
    /* background:
        linear-gradient(159deg, transparent 49.7%, #e2e8f0 50%, transparent 50.5%),
        linear-gradient(21deg, transparent 49.7%, #e2e8f0 50%, transparent 50.5%),
        linear-gradient(180deg, #ffffff 0%, #f8fafc 100%); */
    box-shadow: 0 1rem 1.75rem rgba(15, 23, 42, 0.12);

    &::before {
        content: 'cole aqui a etiqueta dos seus futuros clientes';
        position: absolute;
        left: 30%;
        top: 23%;
        width: 34%;
        min-height: 2.75rem;
        display: grid;
        place-items: center;
        border: 1px dashed #94a3b8;
        color: #94a3b8;
        font-size: var(--font-size-sm);
        text-align: center;
        padding: var(--space-xs);
    }

    &::after {
        content: 'Sera um privilegio te-lo como cliente !!!';
        position: absolute;
        left: 7%;
        bottom: 15%;
        color: #334155;
        font-size: var(--font-size-sm);
        font-style: italic;
    }
`;

export const LabelSheetArt = styled.div`
    position: relative;
    width: 9.25rem;
    min-height: 13rem;
    padding: var(--space-xs);
    border: 1px solid #94a3b8;
    background: #ffffff;
    box-shadow: 0 0.75rem 1.5rem rgba(15, 23, 42, 0.1);
`;

export const LabelGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.1875rem;
`;

export const LabelCell = styled.span`
    min-height: 1rem;
    border: 1px solid #94a3b8;
    border-radius: var(--radius-xs);
`;

export const SheetNumber = styled.span`
    position: absolute;
    inset: 0;
    display: grid;
    place-items: center;
    color: #111827;
    font-size: 3.25rem;
    font-weight: 400;
    pointer-events: none;
`;

export const RequestButton = styled(AppButtonBase).attrs({ $size: 'modal' }) <{ $tone?: 'green' | 'purple' }>`
    width: 100%;
    border-color: ${({ $tone }) => ($tone === 'purple' ? '#7c3aed' : '#16a34a')};
    background: ${({ $tone }) => ($tone === 'purple' ? '#7c3aed' : '#16a34a')};
    color: #ffffff;
    border-radius: var(--radius-sm);
    font-size: var(--font-size-sm);
`;

export const InstructionsBody = styled(CardBody)`
    display: grid;
    grid-template-columns: minmax(12rem, 18rem) minmax(0, 1fr);
    align-items: center;
    gap: var(--space-lg);
    min-height: 17rem;

    @media (max-width: 720px) {
        grid-template-columns: 1fr;
    }
`;

export const ComputerArt = styled.div`
    position: relative;
    justify-self: center;
    width: 12rem;
    height: 9rem;

    &::before {
        content: '';
        position: absolute;
        left: 1.5rem;
        top: 0.75rem;
        width: 8.5rem;
        height: 5.25rem;
        border: 0.375rem solid #bfdbfe;
        border-radius: var(--radius-sm);
        /* background:
            linear-gradient(#60a5fa 0 0) 0.875rem 0.875rem / 5.25rem 0.5rem no-repeat,
            linear-gradient(#bfdbfe 0 0) 0.875rem 2rem / 2rem 2.25rem no-repeat,
            repeating-linear-gradient(0deg, #bfdbfe 0 0.25rem, transparent 0.25rem 0.75rem) 3.25rem 2rem / 4.5rem 2.5rem no-repeat,
            #eff6ff; */
        box-shadow: 0 0.75rem 1.5rem rgba(37, 99, 235, 0.14);
    }

    &::after {
        content: '';
        position: absolute;
        left: 0.75rem;
        top: 6.25rem;
        width: 9.5rem;
        height: 1rem;
        transform: skewX(-20deg);
        border: 1px solid #bfdbfe;
        background: #dbeafe;
    }
`;

export const Magnifier = styled.span`
    position: absolute;
    right: 1.25rem;
    bottom: 1.25rem;
    width: 3.375rem;
    height: 3.375rem;
    border: 0.4375rem solid var(--mail-accent, var(--color-main, var(--bs-primary)));
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.62);

    &::after {
        content: '';
        position: absolute;
        width: 2.875rem;
        height: 0.4375rem;
        right: -2.125rem;
        bottom: -0.8125rem;
        border-radius: var(--radius-pill);
        transform: rotate(45deg);
        transform-origin: left center;
        background: var(--mail-accent, var(--color-main, var(--bs-primary)));
    }
`;

export const WarningText = styled.p`
    margin: 0;
    color: var(--theme-text, #172033);
    font-size: var(--font-size-sm);
    line-height: 1.55;

    strong {
        color: #dc2626;
        font-weight: 500;
    }
`;
