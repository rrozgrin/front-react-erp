import styled from 'styled-components'
import { Input as UiInput, Select as UiSelect, Textarea as UiTextarea } from '../../common/components/Ui'

export const FormStack = styled.div`
    display: grid;
    gap: 20px;
`

export const FormRow = styled.div`
    display: grid;
    gap: 20px;

    @media (min-width: 768px) {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }
`

export const ThreeColumnRow = styled(FormRow)`
    @media (min-width: 768px) {
        grid-template-columns: minmax(0, 1fr) minmax(0, 1fr) 130px;
    }
`

export const AddressRow = styled(FormRow)`
    @media (min-width: 768px) {
        grid-template-columns: minmax(0, 1fr) 130px;
    }
`

export const FieldBlock = styled.label`
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: var(--space-xs);
    color: #333;
    font-size: 0.98rem;
    font-weight: 500;
`

export const Input = styled(UiInput)`
    min-height: 43px;
    padding: 10px 14px;
    border: 1px solid rgba(0, 0, 0, 0.23);
    border-radius: 0;
    background: #fff;
    color: #1f2933;
    font: inherit;
    font-weight: 400;

    &:focus {
        border-color: #1f6fa8;
        box-shadow: 0 0 0 1px #1f6fa8;
        outline: none;
    }
`

export const TextArea = styled(UiTextarea)`
    min-height: 144px;
    padding: 10px 14px;
    border: 1px solid rgba(0, 0, 0, 0.23);
    border-radius: 0;
    background: #fff;
    color: #1f2933;
    font: inherit;
    font-weight: 400;
    resize: vertical;

    &:focus {
        border-color: #1f6fa8;
        box-shadow: 0 0 0 1px #1f6fa8;
        outline: none;
    }
`

export const Select = styled(UiSelect)`
    min-height: 43px;
    padding: 10px 14px;
    border: 1px solid rgba(0, 0, 0, 0.23);
    border-radius: 0;
    background: #fff;
    color: #1f2933;
    font: inherit;
    font-weight: 400;

    &:focus {
        border-color: #1f6fa8;
        box-shadow: 0 0 0 1px #1f6fa8;
        outline: none;
    }
`
