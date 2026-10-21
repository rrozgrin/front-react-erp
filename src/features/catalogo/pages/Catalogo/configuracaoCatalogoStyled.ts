import styled from 'styled-components';
import { Input, Panel, Select, Textarea } from '../../../../common/components/Ui';

export const CatalogSettingsRoot = styled.div`
    display: grid;
    gap: var(--space-md);
`;

export const IntroPanel = styled(Panel)`
    display: grid;
    grid-template-columns: auto minmax(0, 1fr) auto;
    gap: var(--space-md);
    align-items: center;
    background:
        radial-gradient(circle at top left, rgba(var(--bs-primary-rgb, 30, 94, 149), 0.12), transparent 28%),
        var(--theme-surface, #ffffff);

    @media (max-width: 760px) {
        grid-template-columns: 1fr;
    }
`;

export const IntroIcon = styled.span`
    width: 3.25rem;
    height: 3.25rem;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: var(--radius-md);
    background: rgba(var(--bs-primary-rgb, 30, 94, 149), 0.1);
    color: var(--color-main, var(--bs-primary));
    font-size: var(--font-size-xl);
`;

export const IntroText = styled.div`
    display: grid;
    gap: var(--space-2xs);

    h2 {
        margin: 0;
        color: var(--theme-text, #172033);
        font-size: var(--font-size-lg);
        font-weight: 850;
    }

    p {
        margin: 0;
        color: var(--theme-text-soft, #64748b);
        font-size: var(--font-size-sm);
        line-height: 1.45;
    }
`;

export const ContentGrid = styled.div`
    display: grid;
    grid-template-columns: minmax(26rem, 1.16fr) minmax(22rem, 0.84fr);
    gap: var(--space-md);
    align-items: start;

    @media (max-width: 1080px) {
        grid-template-columns: 1fr;
    }
`;

export const SectionPanel = styled(Panel)`
    display: grid;
    gap: var(--space-md);
`;

export const SectionHeader = styled.header`
    display: flex;
    align-items: center;
    gap: var(--space-xs);
    padding-bottom: var(--space-sm);
    border-bottom: 1px solid var(--theme-border, #dbe1ea);
    color: var(--theme-text, #172033);

    h3 {
        margin: 0;
        font-size: var(--font-size-base);
        font-weight: 850;
    }

    svg {
        color: var(--color-main, var(--bs-primary));
    }
`;

export const OptionsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: var(--space-sm);

    @media (max-width: 720px) {
        grid-template-columns: 1fr;
    }
`;

export const OptionCard = styled.section`
    display: grid;
    gap: var(--space-sm);
    min-height: 7.25rem;
    padding: var(--space-sm);
    border: 1px solid var(--theme-border, #dbe1ea);
    border-radius: var(--radius-md);
    background: var(--theme-surface-muted, #f8fafc);
`;

export const OptionTitle = styled.div.attrs({ 'data-app-title': true })`
    display: grid;
    gap: var(--space-2xs);

    strong {
        color: var(--theme-text, #172033);
        font-size: var(--font-size-sm);
        font-weight: 850;
    }

    small {
        color: var(--theme-text-soft, #64748b);
        font-size: var(--font-size-xs);
        line-height: 1.35;
    }
`;

export const InlineOptions = styled.div`
    display: flex;
    align-items: center;
    gap: var(--space-md);
    flex-wrap: wrap;
`;

export const ChoiceLabel = styled.label`
    display: inline-flex;
    align-items: center;
    gap: var(--space-xs);
    margin: 0;
    color: var(--theme-text, #172033);
    font-size: var(--font-size-sm);
    font-weight: 750;
    cursor: pointer;

    input {
        width: 1rem;
        height: 1rem;
        margin: 0;
        accent-color: var(--color-main, var(--bs-primary));
    }
`;

export const FieldStack = styled.div`
    display: grid;
    gap: var(--space-xs);
`;

export const FormLabel = styled.label`
    display: grid;
    gap: var(--space-xs);
    color: var(--theme-text, #172033);
    font-size: var(--font-size-sm);
    font-weight: 800;
`;

export const CatalogInput = styled(Input)`
    min-height: 2.625rem;
`;

export const CatalogSelect = styled(Select)`
    min-height: 2.625rem;
`;

export const LinkInputWrap = styled.div`
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    gap: var(--space-xs);
`;

export const IconButton = styled.button`
    width: 2.625rem;
    min-height: 2.625rem;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border: 1px solid var(--theme-border, #dbe1ea);
    border-radius: var(--radius-xs);
    background: var(--theme-surface, #ffffff);
    color: var(--color-main, var(--bs-primary));
    cursor: pointer;
    transition: border-color 0.2s ease, box-shadow 0.2s ease;

    &:hover,
    &:focus {
        border-color: var(--color-main, var(--bs-primary));
        box-shadow: var(--shadow-control-hover);
        outline: none;
    }
`;

export const HelperLink = styled.a`
    width: fit-content;
    color: var(--color-main, var(--bs-primary));
    font-size: var(--font-size-sm);
    font-weight: 800;
    text-decoration: none;

    &:hover {
        text-decoration: underline;
    }
`;

export const CatalogTextarea = styled(Textarea)`
    min-height: 5.25rem;
`;

export const FieldsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: var(--space-xs);

    @media (max-width: 640px) {
        grid-template-columns: 1fr;
    }
`;

export const CatalogFieldCard = styled.label`
    display: grid;
    grid-template-columns: auto auto minmax(0, 1fr);
    gap: var(--space-xs);
    align-items: center;
    min-height: 3.25rem;
    padding: var(--space-xs) var(--space-sm);
    border: 1px solid var(--theme-border, #dbe1ea);
    border-radius: var(--radius-sm);
    background: var(--theme-surface, #ffffff);
    color: var(--theme-text, #172033);
    font-size: var(--font-size-sm);
    font-weight: 750;
    cursor: pointer;
    transition: border-color 0.2s ease, background 0.2s ease, transform 0.2s ease;

    input {
        width: 1rem;
        height: 1rem;
        margin: 0;
        accent-color: var(--color-main, var(--bs-primary));
    }

    &:hover,
    &:focus-within {
        transform: translateY(-1px);
        border-color: rgba(var(--bs-primary-rgb, 30, 94, 149), 0.42);
        background: rgba(var(--bs-primary-rgb, 30, 94, 149), 0.05);
    }
`;

export const FieldIcon = styled.span`
    min-width: 1.5rem;
    color: var(--theme-text-soft, #64748b);
    font-size: var(--font-size-xs);
    font-weight: 900;
    text-align: center;
`;

export const SideActions = styled.div`
    display: flex;
    justify-content: flex-start;
    gap: var(--space-sm);
    flex-wrap: wrap;

    @media (max-width: 620px) {
        display: grid;

        > button {
            width: 100%;
        }
    }
`;

export const FooterActions = styled.div`
    display: flex;
    justify-content: space-between;
    gap: var(--space-sm);
    flex-wrap: wrap;

    @media (max-width: 620px) {
        display: grid;

        > button {
            width: 100%;
        }
    }
`;
