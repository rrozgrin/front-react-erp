import styled from 'styled-components';
import { ModalSimpleActionButton } from '@/common/components/ModalSimple';
import { Input as UiInput } from '@/common/components/Ui';

const Wrapper = styled.div`
    display: grid;
    gap: 18px;
`;

const HintBar = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px var(--space-sm);
    border-radius: var(--radius-sm);
    border: 1px solid var(--theme-border, rgba(37, 99, 235, 0.18));
    background: var(--theme-surface-soft, rgba(37, 99, 235, 0.06));
    color: #000;
    font-size: 13px;
`;

const ChoiceGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: var(--space-sm);

    @media (max-width: 767px) {
        grid-template-columns: 1fr;
    }
`;

const ChoiceCard = styled.button<{ $active: boolean }>`
    display: grid;
    grid-template-columns: 18px 54px 1fr;
    gap: var(--space-sm);
    align-items: center;
    min-height: 88px;
    border-radius: 0.5rem;
    border: 1px solid ${({ $active }) => ($active ? 'var(--color-main, var(--bs-primary))' : 'var(--theme-border, rgba(148, 163, 184, 0.28))')};
    background: #fff;
    color: #000;
    text-align: left;
    cursor: pointer;
    transition: transform 0.15s ease, border-color 0.15s ease, background 0.15s ease;

    &:hover {
        transform: translateY(-1px);
        border-color: var(--color-main, var(--bs-primary));
    }

    &:disabled {
        cursor: not-allowed;
        opacity: 0.55;
        transform: none;
    }
`;

const ChoiceRadio = styled.span<{ $active: boolean }>`
    width: 16px;
    height: 16px;
    border-radius: var(--radius-pill);
    border: 2px solid #000;
    background: #000;
    box-shadow: inset 0 0 0 3px var(--theme-surface, #ffffff);
`;

const ChoiceIcon = styled.div`
    width: 54px;
    height: 50px;
    border-radius: 14px;
    color: var(--color-main, var(--bs-primary));
    display: grid;
    place-items: center;
    font-size: 1.35rem;
`;

const ChoiceText = styled.div`
    display: grid;
    gap: var(--space-2xs);

    strong {
        font-size: 13px;
    }

    span {
        font-size: 13px;
        color: #000;
        line-height: 1.35;
    }
`;

const AlertBox = styled.div<{ $tone?: 'info' | 'warning' }>`
    display: flex;
    align-items: flex-start;
    gap: 10px;
    padding: 10px var(--space-sm);
    border-radius: var(--radius-sm);
    border: 1px solid ${({ $tone }) => ($tone === 'warning' ? 'rgba(245, 158, 11, 0.3)' : 'rgba(59, 130, 246, 0.28)')};
    background: ${({ $tone }) => ($tone === 'warning' ? 'rgba(254, 243, 199, 0.6)' : 'var(--theme-surface-soft, rgba(37, 99, 235, 0.06))')};
    color: var(--theme-text, #0f172a);
    font-size: 13px;
    line-height: 1.35;
`;

const FieldGrid = styled.div`
    display: grid;
    grid-template-columns: 180px minmax(0, 1fr);
    gap: var(--space-sm) var(--space-md);
    align-items: center;

    @media (max-width: 767px) {
        grid-template-columns: 1fr;
        gap: var(--space-xs);
    }
`;

const Label = styled.label`
    color: #000;
    font-size: 13px;
    font-weight: 400;
`;

const Input = styled(UiInput)`
    min-height: var(--control-height-sm);
    padding: 0 var(--space-sm);
    border: 1px solid var(--theme-border, rgba(148, 163, 184, 0.32));
    border-radius: var(--radius-sm);
    color: #000;

    &:focus {
        box-shadow: 0 0 0 3px rgba(var(--bs-primary-rgb, 59, 130, 246), 0.12);
    }
`;

const MobileStack = styled.div`
    display: none;

    @media (max-width: 767px) {
        display: grid;
        gap: var(--space-sm);
    }
`;

const DesktopLayout = styled.div`
    display: grid;
    gap: 14px;

    @media (max-width: 767px) {
        display: none;
    }
`;

const FooterBar = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: var(--space-sm);
    flex-wrap: wrap;
`;

const ShortcutChip = styled.span`
    display: inline-flex;
    align-items: center;
    min-height: 34px;
    padding: 0 10px;
    border: 1px solid var(--theme-border, rgba(148, 163, 184, 0.32));
    border-radius: var(--radius-sm);
    background: var(--theme-surface, #ffffff);
    color: #000;
    font-size: 13px;
    font-weight: 400;
`;

const ApplyButton = styled(ModalSimpleActionButton)`
    min-width: 180px;
`;

const DesktopFields = styled.div`
    display: grid;
    gap: var(--space-sm);
`;

export {
    Wrapper,
    HintBar,
    ChoiceGrid,
    ChoiceCard,
    ChoiceRadio,
    ChoiceIcon,
    ChoiceText,
    AlertBox,
    FieldGrid,
    Label,
    Input,
    MobileStack,
    DesktopLayout,
    FooterBar,
    ShortcutChip,
    ApplyButton,
    DesktopFields,
}
