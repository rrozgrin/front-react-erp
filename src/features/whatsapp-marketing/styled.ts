import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import { AppButtonBase } from '../../common/components/Buttons/buttonBase';
import { Input, Panel, Select } from '../../common/components/Ui';

export const whatsappColors = {
    green: '#25D366',
    greenDark: '#128C4A',
    background: '#F8FAFC',
    card: '#FFFFFF',
    border: '#E5E7EB',
    text: '#111827',
    muted: '#6B7280',
};

export const ModuleTheme = styled.div`
    --color-main: ${whatsappColors.green};
    --color-secondary: ${whatsappColors.greenDark};
    --theme-surface: ${whatsappColors.card};
    --theme-surface-muted: ${whatsappColors.background};
    --theme-surface-soft: rgba(37, 211, 102, 0.1);
    --theme-border: ${whatsappColors.border};
    --theme-text: ${whatsappColors.text};
    --theme-text-soft: ${whatsappColors.muted};

    color: ${whatsappColors.text};
`;

export const PageIntro = styled.section`
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: var(--space-md);
    padding: 20px;
    border: 1px solid ${whatsappColors.border};
    border-radius: 0.5rem;
    background: ${whatsappColors.card};

    @media (max-width: 767px) {
        display: grid;
    }
`;

export const IntroText = styled.div.attrs({ 'data-app-title': true })`
    display: grid;
    gap: 6px;

    h2 {
        margin: 0;
        color: ${whatsappColors.text};
        font-size: 1.45rem;
        font-weight: 800;
    }

    p {
        margin: 0;
        color: ${whatsappColors.muted};
        font-size: 0.95rem;
    }
`;

export const PrimaryButton = styled(AppButtonBase).attrs({ $size: 'page', $variant: 'primary' })`
    gap: var(--space-xs);
    min-height: var(--control-height-sm);
    padding: 0 var(--space-md);
    border: 1px solid ${whatsappColors.green};
    border-radius: 0.5rem;
    background: ${whatsappColors.green};
    color: #ffffff;
    transition: transform 0.18s ease, box-shadow 0.18s ease, background 0.18s ease;

    &:hover {
        background: ${whatsappColors.greenDark};
        border-color: ${whatsappColors.greenDark};
        box-shadow: 0 12px 24px rgba(18, 140, 74, 0.18);
        transform: translateY(-1px);
    }
`;

export const SecondaryButton = styled(AppButtonBase).attrs({ $size: 'page', $variant: 'secondary' })`
    gap: var(--space-xs);
    min-height: var(--control-height-sm);
    padding: 0 14px;
    border: 1px solid ${whatsappColors.border};
    border-radius: 0.5rem;
    background: ${whatsappColors.card};
    color: ${whatsappColors.text};
    font-weight: 750;

    &:hover {
        border-color: ${whatsappColors.green};
        color: ${whatsappColors.greenDark};
        background: rgba(37, 211, 102, 0.08);
    }
`;

export const ButtonLink = styled(Link)`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-xs);
    min-height: var(--control-height-sm);
    padding: 0 var(--space-md);
    border: 1px solid ${whatsappColors.green};
    border-radius: 0.5rem;
    background: ${whatsappColors.green};
    color: #ffffff;
    font-weight: 800;
    text-decoration: none;

    &:hover {
        color: #ffffff;
        background: ${whatsappColors.greenDark};
        border-color: ${whatsappColors.greenDark};
    }
`;

export const WarningBanner = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 14px var(--space-md);
    margin-top: 10px;
    border: 1px solid #f59e0b;
    border-radius: 0.5rem;
    background: #fffbeb;
    color: #92400e;
    font-weight: 500;

    svg {
        flex: 0 0 auto;
    }
`;

export const Grid = styled.div<{ $columns?: string }>`
    display: grid;
    grid-template-columns: ${({ $columns }) => $columns || 'repeat(4, minmax(0, 1fr))'};
    gap: var(--space-md);

    @media (max-width: 1199px) {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    @media (max-width: 767px) {
        grid-template-columns: 1fr;
    }
`;

export const Card = styled(Panel)`
    min-width: 0;
    border: 1px solid ${whatsappColors.border};
    border-radius: 0.5rem;
    background: ${whatsappColors.card};
    box-shadow: 0 14px 34px rgba(15, 23, 42, 0.05);
`;

export const MetricCard = styled(Card)`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 14px;
    padding: 18px;
`;

export const MetricInfo = styled.div`
    min-width: 0;

    span {
        display: block;
        color: ${whatsappColors.muted};
        font-size: 0.82rem;
        font-weight: 500;
    }

    strong {
        display: block;
        margin-top: var(--space-2xs);
        color: ${whatsappColors.text};
        font-size: 1.45rem;
        line-height: 1.1;
    }

    small {
        display: block;
        margin-top: var(--space-2xs);
        color: ${whatsappColors.muted};
        font-size: 0.78rem;
    }
`;

export const IconBubble = styled.span<{ $tone?: 'green' | 'blue' | 'orange' | 'red' | 'purple' }>`
    width: var(--control-height-sm);
    height: var(--control-height-sm);
    border-radius: 0.5rem;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex: 0 0 42px;
    color: ${({ $tone }) => {
        if ($tone === 'blue') return '#2563eb';
        if ($tone === 'orange') return '#d97706';
        if ($tone === 'red') return '#dc2626';
        if ($tone === 'purple') return '#7c3aed';
        return whatsappColors.greenDark;
    }};
    background: ${({ $tone }) => {
        if ($tone === 'blue') return '#dbeafe';
        if ($tone === 'orange') return '#fef3c7';
        if ($tone === 'red') return '#fee2e2';
        if ($tone === 'purple') return '#ede9fe';
        return 'rgba(37, 211, 102, 0.14)';
    }};
`;

export const StepsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: var(--space-md);
    margin: 10px 0 10px 0;

    @media (max-width: 991px) {
        grid-template-columns: 1fr;
    }
`;

export const StepCard = styled(Card)`
    display: grid;
    gap: var(--space-md);
    padding: 22px;
`;

export const StepHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-sm);
`;

export const StepNumber = styled.span`
    width: 30px;
    height: 30px;
    border-radius: var(--radius-pill);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: ${whatsappColors.green};
    color: #ffffff;
    font-weight: 900;
`;

export const StepBody = styled.div`
    display: grid;
    gap: var(--space-xs);

    h3 {
        margin: 0;
        color: ${whatsappColors.text};
        font-size: 1.05rem;
        font-weight: 800;
    }

    p {
        margin: 0;
        color: ${whatsappColors.muted};
        line-height: 1.55;
    }
`;

export const SectionHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-sm);
    margin-bottom: 14px;

    h3 {
        margin: 0;
        color: ${whatsappColors.text};
        font-size: 1.1rem;
        font-weight: 850;
    }

    @media (max-width: 767px) {
        display: grid;
    }
`;

export const FiltersCard = styled(Card)`
    display: grid;
    gap: 14px;
    padding: var(--space-md);
`;

export const FiltersGrid = styled.div<{ $columns?: string }>`
    display: grid;
    grid-template-columns: ${({ $columns }) => $columns || 'repeat(4, minmax(0, 1fr))'};
    gap: var(--space-sm);

    @media (max-width: 991px) {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    @media (max-width: 767px) {
        grid-template-columns: 1fr;
    }
`;

const fieldControlStyles = css`
    width: 100%;
    min-height: 44px;
    border: 1px solid ${whatsappColors.border};
    border-radius: 0.5rem;
    padding: 10px var(--space-sm);
    background: ${whatsappColors.card};
    color: ${whatsappColors.text};
    outline: none;
    transition: border-color 0.18s ease, box-shadow 0.18s ease;

    &:focus {
        border-color: ${whatsappColors.green};
        box-shadow: 0 0 0 3px rgba(37, 211, 102, 0.16);
    }
`;

export const Field = styled.label`
    display: grid;
    gap: 7px;
    color: ${whatsappColors.text};
    font-weight: 750;

    span {
        color: ${whatsappColors.muted};
        font-size: 0.8rem;
        font-weight: 500;
    }

    input,
    select,
    textarea {
        ${fieldControlStyles}
    }

    textarea {
        min-height: 174px;
        resize: vertical;
        line-height: 1.55;
    }
`;

export const CampaignLayout = styled.div`
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(300px, 380px);
    gap: 18px;
    align-items: start;

    @media (max-width: 1199px) {
        grid-template-columns: 1fr;
    }
`;

export const FormCard = styled(Card)`
    display: grid;
    gap: 18px;
    padding: 18px;
`;

export const FormSection = styled.section`
    display: grid;
    gap: var(--space-sm);

    h3 {
        margin: 0;
        color: ${whatsappColors.text};
        font-size: var(--font-size-xs);
        font-weight: 500;
    }
`;

export const TemplateRow = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-xs);
`;

export const TemplateButton = styled.button<{ $active?: boolean }>`
    min-height: 36px;
    padding: 0 var(--space-sm);
    border: 1px solid ${({ $active }) => ($active ? whatsappColors.green : whatsappColors.border)};
    border-radius: 0.5rem;
    background: ${({ $active }) => ($active ? 'rgba(37, 211, 102, 0.14)' : whatsappColors.card)};
    color: ${({ $active }) => ($active ? whatsappColors.greenDark : whatsappColors.text)};
    font-weight: 800;
`;

export const UploadBox = styled.div`
    min-height: 154px;
    display: grid;
    place-items: center;
    gap: var(--space-xs);
    padding: 22px;
    border: 1px dashed #cbd5e1;
    border-radius: 0.5rem;
    background: ${whatsappColors.background};
    color: ${whatsappColors.muted};
    text-align: center;

    strong {
        color: ${whatsappColors.text};
    }
`;

export const ContactListPicker = styled.div`
    display: grid;
    gap: var(--space-xs);
`;

export const ContactListOption = styled.label<{ $selected?: boolean }>`
    display: grid;
    grid-template-columns: auto minmax(0, 1fr) auto;
    align-items: center;
    gap: 10px;
    padding: var(--space-sm);
    border: 1px solid ${({ $selected }) => ($selected ? whatsappColors.green : whatsappColors.border)};
    border-radius: 0.5rem;
    background: ${({ $selected }) => ($selected ? 'rgba(37, 211, 102, 0.08)' : whatsappColors.card)};
    cursor: pointer;

    input {
        width: 18px;
        height: 18px;
        accent-color: ${whatsappColors.green};
    }

    strong {
        display: block;
        color: ${whatsappColors.text};
        font-size: 0.9rem;
    }

    span {
        color: ${whatsappColors.muted};
        font-size: 0.78rem;
    }
`;

export const RadioGroup = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
`;

export const RadioCard = styled.label<{ $selected?: boolean }>`
    display: inline-flex;
    align-items: center;
    gap: var(--space-xs);
    min-height: var(--control-height-sm);
    padding: 0 var(--space-sm);
    border: 1px solid ${({ $selected }) => ($selected ? whatsappColors.green : whatsappColors.border)};
    border-radius: 0.5rem;
    background: ${({ $selected }) => ($selected ? 'rgba(37, 211, 102, 0.09)' : whatsappColors.card)};
    color: ${whatsappColors.text};
    font-weight: 750;

    input {
        accent-color: ${whatsappColors.green};
    }
`;

export const PreviewAside = styled.aside`
    position: sticky;
    top: 18px;
    display: grid;
    gap: var(--space-sm);

    @media (max-width: 1199px) {
        position: static;
    }
`;

export const PhoneFrame = styled.div`
    width: 100%;
    max-width: 360px;
    margin: 0 auto;
    border: 10px solid #111827;
    border-radius: 32px;
    background: #e5ddd5;
    overflow: hidden;
    box-shadow: 0 24px 42px rgba(15, 23, 42, 0.18);
`;

export const PhoneTopBar = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    padding: var(--space-sm);
    background: #075e54;
    color: #ffffff;

    strong {
        display: block;
        font-size: 0.92rem;
    }

    span {
        display: block;
        font-size: 0.74rem;
        opacity: 0.82;
    }
`;

export const PhoneAvatar = styled.span`
    width: 34px;
    height: 34px;
    border-radius: var(--radius-pill);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: ${whatsappColors.green};
    color: #ffffff;
`;

export const PhoneBody = styled.div`
    min-height: 460px;
    padding: 18px var(--space-sm);
    display: flex;
    align-items: flex-start;
    justify-content: flex-end;
`;

export const MessageBubble = styled.div`
    max-width: 86%;
    padding: var(--space-sm) var(--space-sm) var(--space-xs);
    border-radius: 0.5rem;
    background: #dcf8c6;
    color: #1f2937;
    white-space: pre-line;
    line-height: 1.48;
    font-size: 0.9rem;
    box-shadow: 0 2px 7px rgba(15, 23, 42, 0.12);
`;

export const BubbleTime = styled.span`
    display: block;
    margin-top: var(--space-xs);
    color: #667085;
    font-size: 0.72rem;
    text-align: right;
`;

export const PhoneComposer = styled.div`
    display: grid;
    grid-template-columns: minmax(0, 1fr) 38px;
    gap: var(--space-xs);
    padding: 10px;
    background: #f0f2f5;

    span,
    button {
        min-height: 38px;
        border-radius: var(--radius-pill);
        display: inline-flex;
        align-items: center;
    }

    span {
        padding: 0 14px;
        background: #ffffff;
        color: ${whatsappColors.muted};
        font-size: 0.82rem;
    }

    button {
        justify-content: center;
        border: 0;
        background: ${whatsappColors.green};
        color: #ffffff;
    }
`;

export const StatusPill = styled.span<{ $status: 'draft' | 'scheduled' | 'sending' | 'sent' | 'error' | 'active' | 'processing' }>`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 94px;
    padding: 7px 10px;
    border-radius: var(--radius-pill);
    font-size: 0.76rem;
    font-weight: 850;
    color: ${({ $status }) => {
        if ($status === 'sent' || $status === 'active') return '#067647';
        if ($status === 'sending' || $status === 'scheduled' || $status === 'processing') return '#b54708';
        if ($status === 'error') return '#b42318';
        return '#344054';
    }};
    background: ${({ $status }) => {
        if ($status === 'sent' || $status === 'active') return '#dcfae6';
        if ($status === 'sending' || $status === 'scheduled' || $status === 'processing') return '#fef0c7';
        if ($status === 'error') return '#fee4e2';
        return '#f2f4f7';
    }};
`;

export const TableName = styled.div`
    display: grid;
    gap: 3px;

    strong {
        color: ${whatsappColors.text};
        font-weight: 850;
    }

    span {
        color: ${whatsappColors.muted};
        font-size: 0.78rem;
    }
`;

export const TableToolbar = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-sm);
    margin-bottom: 14px;

    @media (max-width: 767px) {
        display: grid;
    }
`;

export const ToolbarActions = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: var(--space-xs);
    flex-wrap: wrap;
`;

export const InlineSelect = styled(Select)`
    min-height: var(--control-height-sm);
    border: 1px solid ${whatsappColors.border};
    border-radius: 0.5rem;
    padding: 0 var(--space-sm);
    background: ${whatsappColors.card};
    color: ${whatsappColors.text};
`;

export const ModalSteps = styled.div`
    display: grid;
    gap: 14px;
`;

export const ModalStepCard = styled.section`
    display: grid;
    gap: 14px;
    padding: 14px;
    border: 1px solid ${whatsappColors.border};
    border-radius: 0.5rem;
    background: ${whatsappColors.card};
`;

export const ModalStepHeader = styled.div`
    display: grid;
    grid-template-columns: 30px minmax(0, 1fr);
    gap: 10px;
    align-items: start;
`;

export const ModalStepNumber = styled.span`
    width: 28px;
    height: 28px;
    border-radius: var(--radius-pill);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: ${whatsappColors.green};
    color: #ffffff;
    font-weight: 900;
    font-size: 0.85rem;
`;

export const ModalStepTitle = styled.div.attrs({ 'data-app-title': true })`
    display: grid;
    gap: 3px;

    strong {
        color: ${whatsappColors.text};
        font-size: 0.98rem;
        font-weight: 850;
    }

    span {
        color: ${whatsappColors.muted};
        font-size: 0.82rem;
    }
`;

export const ModalInput = styled(Input)`
    min-height: 44px;
    border: 1px solid ${whatsappColors.border};
    border-radius: 0.5rem;
    padding: 10px var(--space-sm);
    color: ${whatsappColors.text};

    &:focus {
        border-color: ${whatsappColors.green};
        box-shadow: 0 0 0 3px rgba(37, 211, 102, 0.16);
    }
`;

export const ImportMethodList = styled.div`
    display: grid;
    gap: 10px;
`;

export const ImportMethodOption = styled.label<{ $selected?: boolean }>`
    display: grid;
    grid-template-columns: auto 44px minmax(0, 1fr);
    gap: var(--space-sm);
    align-items: center;
    padding: var(--space-sm);
    border: 1px solid ${({ $selected }) => ($selected ? whatsappColors.green : whatsappColors.border)};
    border-radius: 0.5rem;
    background: ${({ $selected }) => ($selected ? 'rgba(37, 211, 102, 0.07)' : whatsappColors.card)};
    cursor: pointer;

    input {
        width: 18px;
        height: 18px;
        accent-color: ${whatsappColors.green};
    }

    strong {
        display: block;
        color: ${whatsappColors.text};
        font-size: 0.9rem;
        font-weight: 850;
    }

    span {
        display: block;
        margin-top: 3px;
        color: ${whatsappColors.muted};
        font-size: 0.78rem;
    }

    @media (max-width: 640px) {
        grid-template-columns: auto 38px minmax(0, 1fr);
        padding: 10px;
    }
`;

export const ModalIconBox = styled.span`
    width: 44px;
    height: 44px;
    border-radius: 0.5rem;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: rgba(37, 211, 102, 0.14);
    color: ${whatsappColors.greenDark};
`;

export const UploadDropzone = styled.div`
    display: grid;
    place-items: center;
    gap: var(--space-xs);
    min-height: 92px;
    margin: 0 10px 6px 74px;
    padding: var(--space-md);
    border: 1px dashed #cbd5e1;
    border-radius: 0.5rem;
    background: ${whatsappColors.background};
    color: ${whatsappColors.muted};
    text-align: center;

    strong {
        color: ${whatsappColors.greenDark};
    }

    p {
        margin: 0;
        font-size: 0.8rem;
    }

    @media (max-width: 640px) {
        margin-left: 0;
    }
`;

export const DownloadActions = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    flex-wrap: wrap;

    button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: var(--space-xs);
    }
`;

export const ModalFooterActions = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    flex-wrap: wrap;

    button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: var(--space-xs);
    }

    @media (max-width: 640px) {
        width: 100%;

        button {
            flex: 1 1 100%;
        }
    }
`;
