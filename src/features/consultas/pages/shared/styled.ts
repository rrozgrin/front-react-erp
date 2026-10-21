import styled, { css } from 'styled-components';
import { AppButtonBase } from '../../../../common/components/Buttons/buttonBase';
import { Input, Select } from '../../../../common/components/Ui';

export const ConsultationRoot = styled.div`
    display: grid;
    gap: var(--space-md);
`;

export const HeroPanel = styled.section`
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    gap: var(--space-sm);
    align-items: center;
    padding: var(--space-md);
    border: 1px solid var(--theme-border, #dbe1ea);
    border-radius: var(--radius-md);
    /* background:
        linear-gradient(135deg, rgba(var(--bs-primary-rgb, 30, 94, 149), 0.1), transparent 42%),
        var(--theme-surface, #ffffff); */
    box-shadow: var(--shadow-panel);

    @media (max-width: 760px) {
        grid-template-columns: 1fr;
    }
`;

export const HeroText = styled.div`
    display: grid;
    gap: var(--space-xs);

    h2 {
        margin: 0;
        color: var(--theme-text, #172033);
        font-size: var(--font-size-xs);
        font-weight: 500;
    }

    p {
        max-width: 52rem;
        margin: 0;
        color: var(--theme-text-soft, #64748b);
        font-size: var(--font-size-sm);
        line-height: 1.45;
    }
`;

export const HeroIcon = styled.div`
    width: 3.5rem;
    height: 3.5rem;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: var(--radius-md);
    background: var(--color-main, var(--bs-primary));
    color: var(--color-font, #ffffff);
    font-size: var(--font-size-sm);
    box-shadow: var(--shadow-panel-strong);
`;

export const ServiceGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr));
    gap: var(--space-sm);

    @media (max-width: 1120px) {
        grid-template-columns: repeat(3, minmax(0, 1fr));
    }

    @media (max-width: 700px) {
        grid-template-columns: 1fr;
    }
`;

export const ServiceCard = styled.button<{ $selected?: boolean; $featured?: boolean }>`
    min-height: 7.25rem;
    display: grid;
    grid-template-rows: auto 1fr auto;
    gap: var(--space-xs);
    padding: var(--space-sm);
    border: 1px solid ${({ $selected }) => ($selected ? 'var(--color-main, var(--bs-primary))' : 'var(--theme-border, #dbe1ea)')};
    border-radius: var(--radius-md);
    background: ${({ $selected }) => ($selected ? 'rgba(var(--bs-primary-rgb, 30, 94, 149), 0.08)' : 'var(--theme-surface, #ffffff)')};
    box-shadow: ${({ $selected }) => ($selected ? 'var(--shadow-panel-strong)' : 'var(--shadow-panel)')};
    color: var(--theme-text, #172033);
    text-align: left;
    cursor: pointer;
    transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;

    &:hover,
    &:focus {
        transform: translateY(-2px);
        border-color: var(--color-main, var(--bs-primary));
        box-shadow: var(--shadow-panel-strong);
        outline: none;
    }

    ${({ $featured }) => $featured && css`
        /* background:
            linear-gradient(135deg, rgba(var(--bs-primary-rgb, 30, 94, 149), 0.12), rgba(22, 163, 74, 0.08)),
            var(--theme-surface, #ffffff); */
    `}
`;

export const ServiceHeader = styled.span`
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: var(--space-sm);
`;

export const ServiceTitle = styled.span.attrs({ 'data-app-title': true })`
    display: grid;
    gap: var(--space-2xs);

    strong {
        color: var(--theme-text, #172033);
        font-size: var(--font-size-xs);
        font-weight: 500;
    }

    small {
        color: var(--theme-text-soft, #64748b);
        font-size: var(--font-size-xs);
        font-weight: 500;
    }
`;

export const ServicePrice = styled.span`
    flex: 0 0 auto;
    padding: var(--space-2xs) var(--space-xs);
    border-radius: var(--radius-pill);
    background: var(--color-main, var(--bs-primary));
    color: var(--color-font, #ffffff);
    font-size: var(--font-size-xs);
    font-weight: 500;
`;

export const ServiceDescription = styled.span`
    color: var(--theme-text-soft, #64748b);
    display: -webkit-box;
    overflow: hidden;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    font-size: var(--font-size-xs);
    line-height: 1.35;
`;

export const ServiceBadge = styled.span`
    width: fit-content;
    padding: var(--space-2xs) var(--space-sm);
    border: 1px solid rgba(var(--bs-primary-rgb, 30, 94, 149), 0.24);
    border-radius: var(--radius-pill);
    color: var(--color-main, var(--bs-primary));
    background: rgba(var(--bs-primary-rgb, 30, 94, 149), 0.08);
    font-size: var(--font-size-xs);
    font-weight: 500;
`;

export const DetailGrid = styled.div<{ $wideForm?: boolean }>`
    display: grid;
    grid-template-columns: ${({ $wideForm }) =>
        $wideForm ? 'minmax(28rem, 1.35fr) minmax(20rem, 0.65fr)' : 'minmax(22rem, 0.9fr) minmax(24rem, 1.1fr)'};
    gap: var(--space-md);
    align-items: start;

    @media (max-width: 1050px) {
        grid-template-columns: 1fr;
    }
`;

export const Panel = styled.section`
    border: 1px solid var(--theme-border, #dbe1ea);
    border-radius: var(--radius-md);
    background: var(--theme-surface, #ffffff);
    box-shadow: var(--shadow-panel);
    overflow: hidden;
    scroll-margin-top: var(--space-md);
`;

export const PanelHeader = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-md);
    padding: var(--space-sm) var(--space-md);
    border-bottom: 1px solid var(--theme-border, #dbe1ea);
    background: var(--theme-surface-muted, #f8fafc);

    h3 {
        margin: 0;
        color: var(--color-secondary, var(--bs-primary));
        font-size: var(--font-size-xs);
        font-weight: 500;
        text-transform: uppercase;
    }
`;

export const HeaderPrice = styled.strong`
    color: var(--status-danger, #dc2626);
    font-size: var(--font-size-xs);
    font-weight: 500;
`;

export const PanelBody = styled.div`
    padding: var(--space-md);

    @media (min-width: 1051px) {
        max-height: calc(100vh - 18rem);
        overflow-y: auto;
        scrollbar-width: thin;
    }
`;

export const Form = styled.form`
    display: grid;
    gap: var(--space-sm);
`;

export const FieldRow = styled.label`
    display: grid;
    grid-template-columns: 11rem minmax(0, 1fr);
    align-items: center;
    gap: var(--space-sm);
    margin: 0;
    color: var(--theme-text, #172033);
    font-size: var(--font-size-xs);
    font-weight: 500;

    @media (max-width: 620px) {
        grid-template-columns: 1fr;
        gap: var(--space-xs);
    }
`;

export const CompactInput = styled(Input)`
    min-height: 2rem;
`;

export const CompactSelect = styled(Select)`
    min-height: 2rem;
`;

export const InlineOptions = styled.div`
    display: flex;
    align-items: center;
    gap: var(--space-md);
    flex-wrap: wrap;
`;

export const RadioLabel = styled.label`
    display: inline-flex;
    align-items: center;
    gap: var(--space-xs);
    margin: 0;
    color: var(--theme-text, #172033);
    font-size: var(--font-size-xs);
    font-weight: 500;
    cursor: pointer;

    input {
        width: 1rem;
        height: 1rem;
        margin: 0;
        accent-color: var(--color-main, var(--bs-primary));
    }
`;

export const ValueRow = styled.div`
    display: grid;
    grid-template-columns: 11rem minmax(0, 1fr);
    align-items: center;
    gap: var(--space-md);
    color: var(--status-danger, #dc2626);
    font-size: var(--font-size-xs);
    font-weight: 500;

    strong {
        font-size: var(--font-size-xs);
        font-weight: 500;
    }

    @media (max-width: 620px) {
        grid-template-columns: 1fr;
        gap: var(--space-xs);
    }
`;

export const SectionTitle = styled.h4`
    margin: var(--space-xs) 0 0;
    color: var(--color-secondary, var(--bs-primary));
    font-size: var(--font-size-xs);
    font-weight: 500;
    text-align: center;
`;

export const SplitInputs = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: var(--space-xs);

    @media (max-width: 620px) {
        grid-template-columns: 1fr;
    }
`;

export const CheckboxRow = styled.label`
    display: grid;
    grid-template-columns: auto 1fr;
    gap: var(--space-xs);
    align-items: center;
    margin: 0;
    color: var(--theme-text, #172033);
    font-size: var(--font-size-xs);
    font-weight: 500;

    input {
        width: 1rem;
        height: 1rem;
        accent-color: var(--color-main, var(--bs-primary));
    }
`;

export const Hint = styled.small`
    color: var(--theme-text-soft, #64748b);
    font-size: var(--font-size-xs);
`;

export const OptionsBox = styled.div`
    display: grid;
    gap: var(--space-2xs);
    padding: var(--space-sm);
    border: 1px solid var(--theme-border, #dbe1ea);
    border-radius: var(--radius-sm);
    background: var(--theme-surface-muted, #f8fafc);
`;

export const OptionLine = styled.label`
    display: grid;
    grid-template-columns: auto 1fr auto;
    gap: var(--space-xs);
    align-items: center;
    margin: 0;
    color: var(--theme-text, #172033);
    font-size: var(--font-size-sm);
    cursor: pointer;

    input {
        width: 1rem;
        height: 1rem;
        accent-color: var(--color-main, var(--bs-primary));
    }

    strong {
        color: var(--theme-text, #172033);
        font-weight: 800;
    }
`;

export const NeighborBox = styled.div`
    display: grid;
    gap: var(--space-2xs);
    padding: var(--space-sm);
    border: 1px solid var(--theme-border, #dbe1ea);
    border-radius: var(--radius-sm);
    background: var(--theme-surface-muted, #f8fafc);

    strong {
        color: var(--theme-text, #172033);
        font-size: var(--font-size-xs);
        font-weight: 500;
    }
`;

export const SubmitButton = styled(AppButtonBase).attrs({ $size: 'page' })`
    justify-self: center;
    min-width: 13rem;
`;

export const InfoPanel = styled(Panel)`
    display: grid;
`;

export const InfoList = styled.ul`
    display: grid;
    gap: var(--space-2xs);
    margin: 0;
    padding: 0;
    list-style: none;
`;

export const InfoItem = styled.li`
    display: grid;
    grid-template-columns: 1.5rem minmax(0, 1fr);
    gap: var(--space-xs);
    align-items: start;
    color: var(--theme-text, #172033);
    font-size: var(--font-size-xs);
    line-height: 1.35;

    svg {
        margin-top: 0.125rem;
        color: var(--color-main, var(--bs-primary));
    }
`;

export const Footnote = styled.p`
    margin: var(--space-sm) 0 0;
    color: var(--theme-text-soft, #64748b);
    font-size: var(--font-size-xs);
    font-weight: 500;
`;

export const WarningPanel = styled.section`
    display: grid;
    grid-template-columns: 2.75rem minmax(0, 1fr);
    gap: var(--space-sm);
    align-items: center;
    margin-top: var(--space-sm);
    padding: var(--space-sm);
    border: 1px solid rgba(245, 158, 11, 0.42);
    border-radius: var(--radius-md);
    background: rgba(245, 158, 11, 0.08);

    @media (max-width: 640px) {
        grid-template-columns: 1fr;
    }
`;

export const WarningIcon = styled.span`
    width: 2.75rem;
    height: 2.75rem;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: var(--radius-md);
    background: #f59e0b;
    color: #ffffff;
    font-size: var(--font-size-sm);
`;

export const WarningText = styled.div`
    display: grid;
    gap: var(--space-xs);

    h3 {
        margin: 0;
        color: #b45309;
        font-size: var(--font-size-xs);
        font-weight: 500;
    }

    p {
        margin: 0;
        color: var(--theme-text, #172033);
        font-size: var(--font-size-xs);
        line-height: 1.35;
    }

    strong {
        color: var(--status-danger, #dc2626);
        font-weight: 900;
    }
`;

export const UtilityLinks = styled.div`
    display: flex;
    align-items: center;
    gap: var(--space-xs);
    flex-wrap: wrap;
    color: var(--theme-text-soft, #64748b);
    font-size: var(--font-size-sm);

    button {
        border: 0;
        background: transparent;
        color: var(--color-main, var(--bs-primary));
        font: inherit;
        font-weight: 800;
        cursor: pointer;
        padding: 0;
    }
`;

export const CheckFormLayout = styled.div`
    display: grid;
    gap: var(--space-md);
`;

export const CheckPreview = styled.div`
    position: relative;
    display: grid;
    gap: var(--space-md);
    width: 100%;
    min-height: 18rem;
    margin: 0 auto;
    padding: var(--space-lg);
    border: 1px solid rgba(var(--bs-primary-rgb, 30, 94, 149), 0.2);
    border-radius: var(--radius-md);
    /* background:
        radial-gradient(circle at 10% 20%, rgba(var(--bs-primary-rgb, 30, 94, 149), 0.08), transparent 22%),
        linear-gradient(90deg, rgba(148, 163, 184, 0.2) 0 0.0625rem, transparent 0.0625rem 100%) 0 0 / 0.75rem 100%,
        linear-gradient(180deg, #ffffff 0%, #f8fafc 100%); */
    box-shadow: var(--shadow-panel-strong);
    overflow: hidden;

    &::before {
        content: '';
        position: absolute;
        inset: 4.25rem var(--space-lg) auto var(--space-lg);
        height: 0.0625rem;
        background: var(--theme-border, #dbe1ea);
    }

    &::after {
        content: '';
        position: absolute;
        inset: 8rem var(--space-lg) auto var(--space-lg);
        height: 0.0625rem;
        background: var(--theme-border, #dbe1ea);
    }

    @media (max-width: 620px) {
        padding: var(--space-md);
    }
`;

export const CheckTopGrid = styled.div`
    display: grid;
    grid-template-columns: 3.5rem 4.25rem 4.25rem 2.5rem minmax(5rem, 1fr) 2.5rem minmax(5rem, 1fr) 2.5rem minmax(5rem, 1fr);
    gap: var(--space-xs);

    @media (max-width: 900px) {
        grid-template-columns: repeat(3, minmax(0, 1fr));
    }

    @media (max-width: 520px) {
        grid-template-columns: 1fr 1fr;
    }
`;

export const CheckPreviewField = styled.div`
    min-width: 0;
    display: grid;
    gap: var(--space-2xs);

    span {
        color: var(--theme-text-soft, #64748b);
        font-size: var(--font-size-xs);
        font-weight: 500;
        white-space: nowrap;
    }

`;

export const CheckPreviewInput = styled(Input)`
    min-height: 2rem;
    padding: 0 var(--space-xs);
    border: 1px solid var(--theme-border, #dbe1ea);
    border-radius: var(--radius-xs);
    background: rgba(255, 255, 255, 0.88);
    color: var(--theme-text, #172033);
    font: inherit;
    font-size: var(--font-size-xs);
    font-weight: 500;
    transition: border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;

    &:focus {
        border-color: var(--color-main, var(--bs-primary));
        background: #ffffff;
        box-shadow: var(--shadow-focus, 0 0 0 1px var(--color-main, var(--bs-primary)));
    }
`;

export const CheckAmountLine = styled.div`
    display: grid;
    grid-template-columns: minmax(0, 1fr) 8rem;
    gap: var(--space-sm);
    align-items: center;
    min-height: 4.5rem;

    @media (max-width: 620px) {
        grid-template-columns: 1fr;
    }
`;

export const CheckPayLine = styled.div`
    display: grid;
    gap: var(--space-xs);
    color: var(--theme-text-soft, #64748b);
    font-size: var(--font-size-xs);
    font-weight: 500;

    input {
        min-height: 2.25rem;
        border: 0;
        border-bottom: 1px solid var(--theme-border, #dbe1ea);
        background: transparent;
        color: var(--theme-text, #172033);
        font-size: var(--font-size-xs);
        font-weight: 500;
        outline: none;

        &:focus {
            border-color: var(--color-main, var(--bs-primary));
        }
    }
`;

export const CheckMetaGrid = styled.div`
    display: grid;
    grid-template-columns: minmax(10rem, 1fr) minmax(14rem, 1.2fr);
    gap: var(--space-md);

    @media (max-width: 720px) {
        grid-template-columns: 1fr;
    }
`;

export const CheckBankInfo = styled.div`
    align-self: end;
    color: var(--theme-text-soft, #64748b);
    font-size: var(--font-size-xs);
    font-weight: 500;
    line-height: 1.35;
`;

export const CheckSideFields = styled.div`
    display: grid;
    gap: var(--space-xs);
`;

export const CheckSideRow = styled.div`
    display: grid;
    grid-template-columns: 6rem minmax(0, 1fr);
    gap: var(--space-xs);
    align-items: center;
    color: var(--theme-text-soft, #64748b);
    font-size: var(--font-size-xs);
    font-weight: 500;

    input {
        min-height: 1.75rem;
        padding: 0 var(--space-xs);
        border: 1px solid var(--theme-border, #dbe1ea);
        border-radius: var(--radius-xs);
        background: #ffffff;
        color: var(--theme-text, #172033);
        font: inherit;
        font-weight: 800;
        outline: none;

        &:focus {
            border-color: var(--color-main, var(--bs-primary));
            box-shadow: var(--shadow-focus, 0 0 0 1px var(--color-main, var(--bs-primary)));
        }
    }
`;

export const CheckCmc7Preview = styled.div`
    display: grid;
    grid-template-columns: 4rem repeat(3, minmax(0, 1fr));
    gap: var(--space-xs);
    align-items: center;
    color: var(--theme-text, #172033);
    font-size: var(--font-size-xs);
    font-weight: 500;

    input {
        min-height: 1.75rem;
        padding: 0 var(--space-xs);
        border: 1px solid var(--theme-border, #dbe1ea);
        border-radius: var(--radius-xs);
        background: #ffffff;
        color: var(--theme-text, #172033);
        font: inherit;
        font-size: var(--font-size-xs);
        font-weight: 500;
        outline: none;

        &:focus {
            border-color: var(--color-main, var(--bs-primary));
            box-shadow: var(--shadow-focus, 0 0 0 1px var(--color-main, var(--bs-primary)));
        }
    }

    @media (max-width: 520px) {
        grid-template-columns: 1fr;
    }
`;

export const CheckFieldsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: var(--space-sm);

    @media (max-width: 1100px) {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    @media (max-width: 620px) {
        grid-template-columns: 1fr;
    }
`;

export const CheckField = styled.label`
    display: grid;
    gap: var(--space-2xs);
    color: var(--theme-text, #172033);
    font-size: var(--font-size-xs);
    font-weight: 500;
`;

export const CheckFormSection = styled.div`
    display: grid;
    gap: var(--space-sm);
    padding: var(--space-sm);
    border: 1px solid var(--theme-border, #dbe1ea);
    border-radius: var(--radius-sm);
    background: var(--theme-surface-muted, #f8fafc);
`;

export const CheckFormBody = styled.form`
    display: grid;
    gap: var(--space-sm);
`;

export const VehicleFormBody = styled.form`
    display: grid;
    gap: var(--space-md);
`;

export const VehicleFields = styled.div`
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: var(--space-sm);

    @media (max-width: 620px) {
        grid-template-columns: 1fr;
    }
`;

export const VehicleField = styled.label`
    display: grid;
    gap: var(--space-2xs);
    color: var(--theme-text, #172033);
    font-size: var(--font-size-xs);
    font-weight: 500;
`;

export const VehicleOptionsTitle = styled.h4`
    margin: 0;
    color: var(--color-secondary, var(--bs-primary));
    font-size: var(--font-size-xs);
    font-weight: 500;
    text-transform: uppercase;
`;

export const VehicleOptionsBox = styled.div`
    display: grid;
    gap: var(--space-xs);
`;

export const VehicleOptionLine = styled.label`
    display: grid;
    grid-template-columns: auto minmax(0, 1fr) auto;
    gap: var(--space-sm);
    align-items: center;
    min-height: 2.5rem;
    margin: 0;
    padding: var(--space-xs) var(--space-sm);
    border: 1px solid var(--theme-border, #dbe1ea);
    border-radius: var(--radius-sm);
    background: var(--theme-surface-muted, #f8fafc);
    color: var(--theme-text, #172033);
    font-size: var(--font-size-sm);
    cursor: pointer;
    transition: border-color 0.2s ease, background 0.2s ease, box-shadow 0.2s ease;

    input {
        width: 1rem;
        height: 1rem;
        margin: 0;
        accent-color: var(--color-main, var(--bs-primary));
    }

    strong {
        color: var(--theme-text, #172033);
        font-weight: 900;
        white-space: nowrap;
    }

    &:hover,
    &:focus-within {
        border-color: rgba(var(--bs-primary-rgb, 30, 94, 149), 0.55);
        background: rgba(var(--bs-primary-rgb, 30, 94, 149), 0.06);
        box-shadow: var(--shadow-panel);
    }

    @media (max-width: 520px) {
        grid-template-columns: auto minmax(0, 1fr);

        strong {
            grid-column: 2;
        }
    }
`;

export const NoticePanel = styled(Panel)`
    margin-bottom: var(--space-sm);
`;

export const NoticeList = styled.div`
    display: grid;
    gap: var(--space-xs);
`;

export const NoticeItem = styled.div`
    display: grid;
    grid-template-columns: 1.25rem minmax(0, 1fr);
    gap: var(--space-xs);
    align-items: center;
    color: var(--theme-text, #172033);
    font-size: var(--font-size-xs);
    font-weight: 500;

    svg {
        color: var(--color-main, var(--bs-primary));
    }
`;
