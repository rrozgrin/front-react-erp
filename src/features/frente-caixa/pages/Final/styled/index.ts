import styled from 'styled-components';
import { Input as UiInput, Select as UiSelect, Textarea as UiTextarea } from '@/common/components/Ui';

const ModalContent = styled.div`
    display: grid;
    grid-template-columns: minmax(0, 1fr) 320px;
    align-items: stretch;
    gap: 18px;
    color: #101f3d;

    @media (max-width: 860px) {
        grid-template-columns: 1fr;
    }
`;

const Card = styled.section`
    display: grid;
    gap: var(--space-sm);
    border: 1px solid var(--theme-border, #d8e2ef);
    border-radius: var(--radius-sm);
    background: var(--theme-surface, #ffffff);
    padding: 14px;
`;

const LeftColumn = styled.div`
    display: grid;
    gap: var(--space-sm);
    align-content: start;
    min-width: 0;
`;

const SidePanel = styled.aside`
    position: sticky;
    top: 18px;
    overflow: visible;
    display: grid;
    align-content: start;
    align-self: start;
    gap: 14px;
    min-width: 0;
    padding: 14px;
    background: #f8fafc;
    border-left: 1px solid #d8e2ef;
    box-shadow: -14px 0 30px rgba(15, 23, 42, 0.06);

    @media (max-width: 860px) {
        position: static;
        overflow: visible;
        border-left: 0;
        border-top: 1px solid #d8e2ef;
        box-shadow: none;
    }
`;

const SidePanelSection = styled.section`
    display: grid;
    gap: var(--space-2xs);
    padding: 7px;
    border: 1px solid #e2e8f0;
    border-radius: var(--radius-sm);
    background: #ffffff;
`;

const SectionTitle = styled.h4`
    margin: 0;
    padding-bottom: 8px;
    border-bottom: 1px solid var(--theme-border, #d8e2ef);
    display: flex;
    align-items: center;
    gap: var(--space-xs);
    color: #000;
    font-size: var(--font-size-sm);
    font-weight: 500;

    svg {
        color: var(--color-main, var(--bs-primary));
        flex: 0 0 auto;
    }
`;

const SectionBody = styled.div`
    display: grid;
    gap: var(--space-sm);
`;

const InfoList = styled.div`
    display: grid;
    gap: 2px;
`;

const InfoLine = styled.div`
    display: grid;
    color: #000;
    font-size: var(--font-size-sm);

    span {
        font-size: var(--font-size-xs);
        font-weight: 500;
        text-transform: uppercase;
    }

    strong {
        min-width: 0;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        font-weight: 400;
    }
`;

const SummaryLine = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-sm);
    min-height: 34px;
    border-bottom: 1px solid var(--theme-border, #e2e8f0);
    color: #000;
    font-size: var(--font-size-sm);

    strong {
        font-weight: 400;
        font-size: var(--font-size-md);
    }
`;

const TotalLine = styled(SummaryLine)`
    border-bottom: 0;

    strong {
        color: #078b2f;
        white-space: nowrap;
        font-size: 20px;
    }

    span {
        font-size: 15px;
    }
`;

const PaymentFields = styled.div`
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: var(--space-sm);

    @media (max-width: 640px) {
        grid-template-columns: 1fr;
    }
`;

const PaymentMethodGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(86px, 1fr));
    gap: 8px;

    @media (max-width: 640px) {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }
`;

const PaymentMethodCard = styled.button<{ $active?: boolean }>`
    min-height: 58px;
    display: grid;
    grid-template-rows: 22px auto;
    place-items: center;
    gap: 5px;
    padding: 8px 6px;
    border: 1px solid ${({ $active }) => ($active ? 'var(--color-main, var(--bs-primary))' : '#d8e2ef')};
    border-radius: var(--radius-sm);
    background: ${({ $active }) => ($active ? 'rgba(var(--bs-primary-rgb, 30, 94, 149), 0.08)' : '#ffffff')};
    color: #0f172a;
    text-align: center;
    cursor: pointer;
    box-shadow: ${({ $active }) => ($active ? '0 10px 24px rgba(30, 94, 149, 0.14)' : '0 1px 0 rgba(15, 23, 42, 0.03)')};
    transition: border-color 0.16s ease, box-shadow 0.16s ease, transform 0.16s ease, background 0.16s ease;

    > svg {
        width: 22px;
        height: 22px;
        padding: 0;
        border-radius: var(--radius-sm);
        color: ${({ $active }) => ($active ? 'var(--color-main, var(--bs-secondary))' : 'var(--color-main, var(--bs-primary))')};
        background: transparent;
    }

    strong {
        max-width: 100%;
        overflow: hidden;
        color: #0f172a;
        font-size: var(--font-size-xs);
        font-weight: 600;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    &:hover {
        transform: translateY(-1px);
        border-color: var(--color-main, var(--bs-primary));
        box-shadow: 0 10px 22px rgba(15, 23, 42, 0.1);
    }

    &:focus-visible {
        outline: 2px solid rgba(var(--bs-primary-rgb, 30, 94, 149), 0.32);
        outline-offset: 2px;
    }
`;

const Field = styled.label`
    display: grid;
    gap: var(--space-sm);
    color: #000;
    font-size: var(--font-size-sm);
`;

const Input = styled(UiInput)`
    min-height: 40px;
    border-radius: var(--radius-md);
    font-size: var(--font-size-sm);
    color: #000;
`;

const Select = styled(UiSelect)`
    min-height: 40px;
    border-radius: var(--radius-md);
    font-size: var(--font-size-sm);
    color: #000;
`;

const Textarea = styled(UiTextarea)`
    min-height: 108px;
    border-radius: var(--radius-md);
    font-size: var(--font-size-sm);
`;

const StatusGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    border: 1px solid var(--theme-border, #d8e2ef);
    border-radius: var(--radius-sm);
    overflow: hidden;

    @media (max-width: 640px) {
        grid-template-columns: 1fr;
    }
`;

const StatusBox = styled.div<{ $danger?: boolean }>`
    min-height: 58px;
    border-right: 1px solid var(--theme-border, #d8e2ef);
    background: transparent;
    color: ${({ $danger }) => ($danger ? '#b11118' : '#078b2f')};
    display: grid;
    grid-template-columns: 28px 1fr;
    align-items: center;
    gap: var(--space-sm);
    padding: 0 var(--space-sm);
    box-sizing: border-box;

    &:last-child {
        border-right: 0;
    }

    @media (max-width: 640px) {
        border-right: 0;
        border-bottom: 1px solid var(--theme-border, #d8e2ef);

        &:last-child {
            border-bottom: 0;
        }
    }

    svg {
        font-size: 20px;
    }
`;

const StatusText = styled.div`
    display: grid;
    gap: 4px;

    small {
        color: inherit;
        font-size: var(--font-size-xs);
    }

    strong {
        font-size: var(--font-size-lg);
    }
`;

const PaymentItem = styled.div`
    min-height: 40px;
    border-bottom: 1px solid var(--theme-border, #e2e8f0);
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-sm);
    color: #000;
    font-size: var(--font-size-sm);

    &:last-child {
        border-bottom: 0;
    }

    span {
        display: inline-flex;
        align-items: center;
        gap: var(--space-sm);
        min-width: 0;
    }

    strong {
        font-weight: 400;
        white-space: nowrap;
    }
`;

const FooterActions = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: var(--space-sm);
    flex-wrap: wrap;
`;

export {
    ModalContent,
    Card,
    LeftColumn,
    SidePanel,
    SidePanelSection,
    SectionTitle,
    SectionBody,
    InfoList,
    InfoLine,
    SummaryLine,
    TotalLine,
    PaymentFields,
    PaymentMethodGrid,
    PaymentMethodCard,
    Field,
    Input,
    Select,
    Textarea,
    StatusGrid,
    StatusBox,
    StatusText,
    PaymentItem,
    FooterActions,

}
