import { useState } from 'react';
import styled from 'styled-components';
import { Field, InputShell, StepActionButton } from '../../../../common/components/BaseStepModal/styled';
import { Input } from '../../../../common/components/Ui';

export const CheckboxGroup = styled.div`
    display: flex; flex-wrap: wrap; gap: var(--space-md); min-height: 54px; align-items: center; padding: 0 var(--space-2xs);
`;

export const CheckboxOption = styled.label`
    display: inline-flex; align-items: center; gap: var(--space-xs); color: #000000; font-size: 0.94rem;
`;

export const FullWidthField = styled(Field)`grid-column: 1 / -1;`;
export const Stack = styled.div`display: flex; flex-direction: column; gap: var(--space-sm);`;
export const InlineActions = styled.div`display: flex; gap: 10px; flex-wrap: wrap;`;
export const TagList = styled.div`display: flex; flex-wrap: wrap; gap: var(--space-xs);`;

export const Tag = styled.span`
    display: inline-flex; align-items: center; gap: var(--space-xs); padding: var(--space-xs) var(--space-sm);
    border: 1px solid #d8e2ef; border-radius: var(--radius-pill); background: #f8fafc; color: #000000; font-size: 0.88rem;
`;

export const TagRemove = styled.button`border: none; background: transparent; color: #495057; font-weight: 500;`;
export const MiniButton = styled(StepActionButton)`min-width: 0; min-height: 40px; padding: 0 14px;`;
export const Hint = styled.p`margin: 0; color: #495057; font-size: 0.88rem; line-height: 1.5;`;

const SearchableSelectWrap = styled.div`position: relative;`;
const SearchableOptions = styled.div`
    position: absolute; z-index: 3; top: calc(100% + 6px); left: 0; right: 0; max-height: 220px; overflow-y: auto;
    border: 1px solid #d8e2ef; border-radius: var(--radius-md); background: #ffffff; box-shadow: 0 18px 40px rgba(15, 23, 42, 0.14);
`;
const SearchableOption = styled.button`
    width: 100%; padding: 11px 14px; border: none; border-bottom: 1px solid #d8e2ef; background: transparent;
    color: #000000; text-align: left; font-size: 0.9rem;
    &:hover { background: #f8fafc; }
    &:last-child { border-bottom: none; }
`;
const EmptyOption = styled.div`padding: var(--space-sm) 14px; color: #495057; font-size: 0.88rem;`;

interface SearchableMultiSelectProps {
    options: string[];
    value: string[];
    onChange: (value: string[]) => void;
    placeholder: string;
    emptyMessage: string;
}

export const SearchableMultiSelect = ({ options, value, onChange, placeholder, emptyMessage }: SearchableMultiSelectProps) => {
    const [query, setQuery] = useState('');
    const [open, setOpen] = useState(false);
    const filteredOptions = options
        .filter((item) => !value.includes(item))
        .filter((item) => item.toLowerCase().includes(query.trim().toLowerCase()))
        .slice(0, 8);

    const handleSelect = (item: string) => {
        onChange([...value, item]);
        setQuery('');
        setOpen(false);
    };

    return (
        <Stack>
            <SearchableSelectWrap>
                <InputShell>
                    <Input value={query} onBlur={() => window.setTimeout(() => setOpen(false), 120)} onChange={(event) => { setQuery(event.target.value); setOpen(true); }} onFocus={() => setOpen(true)} placeholder={placeholder} />
                </InputShell>
                {open && <SearchableOptions>{filteredOptions.length ? filteredOptions.map((item) => <SearchableOption key={item} type="button" onClick={() => handleSelect(item)}>{item}</SearchableOption>) : <EmptyOption>{emptyMessage}</EmptyOption>}</SearchableOptions>}
            </SearchableSelectWrap>
            <TagList>{value.map((item, index) => <Tag key={`${item}-${index}`}>{item}<TagRemove type="button" onClick={() => onChange(value.filter((_, itemIndex) => itemIndex !== index))}>x</TagRemove></Tag>)}</TagList>
        </Stack>
    );
};
