import styled from 'styled-components';
import { Input, Select } from '@/common/components/Ui';

const Page = styled.main`
    min-height: 100vh;
    width: 100%;
    color: #000;
    padding: 14px 18px 84px;
    box-sizing: border-box;

    svg {
        color: var(--color-main, var(--bs-primary, #1e5e95));
    }

    @media (max-width: 45rem) {
        padding: 10px;
    }
`;

const Header = styled.header`
    min-height: var(--control-height-lg);
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-md);
    margin: calc(14px * -1) calc(18px * -1) 0;
    padding: 0 18px;
    background: #ffffff;
    border-bottom: 1px solid #dce4ef;
    box-shadow: 0 2px 10px rgba(16, 32, 63, 0.04);

    @media (max-width: 45rem) {
        align-items: stretch;
        flex-direction: column;
        margin: calc(10px * -1) calc(10px * -1) 0;
        padding: 10px;
        gap: 10px;
    }
`;

const TitleGroup = styled.div`
    display: flex;
    align-items: center;
    gap: var(--space-sm);
    min-width: 0;
`;

const HeaderIcon = styled.div`
    width: 38px;
    height: 38px;
    border-radius: var(--radius-md);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: #eaf2ff;
    color: #000;
    font-size: var(--font-size-sm);
    flex: 0 0 auto;
`;

const Title = styled.h1`
    margin: 0;
    font-size: 14px;
    line-height: 1.1;
    font-weight: 400;
    color: #000;

    @media (max-width: 520px) {
        font-size: 13px;
    }
`;

const MetaBar = styled.section`
    display: grid;
    grid-template-columns: minmax(90px, 100px) minmax(160px, 400px) minmax(120px, 400px) minmax(180px, 300px);
    gap: 18px;
    align-items: center;
    min-height: 46px;
    padding: 0 18px;
    margin: 0 calc(18px * -1) var(--space-sm);
    background: #ffffff;
    border-bottom: 1px solid #e4ebf5;
    font-size: var(--font-size-base);

    @media (max-width: 920px) {
        grid-template-columns: repeat(2, minmax(0, 1fr));
        padding: var(--space-sm) 18px;
    }

    @media (max-width: 520px) {
        grid-template-columns: 1fr;
        gap: var(--space-xs);
        margin: 0 calc(10px * -1) 10px;
        padding: 10px;
    }
`;

const MetaItem = styled.div`
    display: flex;
    gap: 10px;
    min-width: 0;
    font-size: 13px;

    strong {
        font-weight: 400;
        min-width: 0;
        gap: var(--space-sm);
        overflow-wrap: anywhere;
    }

    span{
        font-weight: 500;
        min-width: 0;
        gap: 34px;
    }
`;

const SuccessAlert = styled.div`
    min-height: var(--control-height-sm);
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-sm);
    margin-bottom: var(--space-sm);
    padding: 0 14px;
    border: 1px solid #aee8c2;
    border-radius: 5px;
    background: #d8f8e2;
    color: #11692e;
    font-size: var(--font-size-sm);
    font-weight: 400;

    svg {
        flex: 0 0 auto;
    }

    @media (max-width: 520px) {
        align-items: flex-start;
        padding: 11px var(--space-sm);
    }
`;

const SuccessText = styled.span`
    display: inline-flex;
    align-items: center;
    gap: 10px;

    @media (max-width: 520px) {
        align-items: flex-start;
    }
`;

const TopGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: var(--space-sm);

    @media (max-width: 760px) {
        grid-template-columns: 1fr;
    }
`;

const AddressGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: var(--space-sm);
    margin-top: var(--space-sm);

    @media (max-width: 760px) {
        grid-template-columns: 1fr;
    }
`;

const ContentGrid = styled.div`
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(300px, 0.42fr);
    gap: var(--space-sm);
    margin-top: var(--space-sm);

    > div:first-child {
        grid-column: 1 / -1;
        min-width: 0;
    }

    @media (max-width: 1040px) {
        grid-template-columns: 1fr;
    }
`;

const RightStack = styled.div`
    display: grid;
    gap: var(--space-sm);
    align-content: start;
`;

const Card = styled.section`
    background: #ffffff;
    border: 1px solid #dfe7f2;
    border-radius: var(--radius-md);
    box-shadow: 0 5px 18px rgba(16, 32, 63, 0.045);
    overflow: hidden;
    min-width: 0;
`;

const CardTitle = styled.div.attrs({ 'data-app-title': true })`
    min-height: var(--control-height-sm);
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 0 14px;
    border-bottom: 1px solid #e4ebf4;
    color: #000;
    font-size: var(--font-size-sm);
    font-weight: 500;

    svg {
        font-size: 17px;
    }
`;

const CardBody = styled.div`
    padding: 14px;
`;

const DetailsGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-sm) 34px;

    @media (max-width: 520px) {
        grid-template-columns: 1fr;
        gap: 10px;
    }
`;

const Detail = styled.div`
    display: grid;
    gap: var(--space-2xs);
    font-size: var(--font-size-sm);

    span {
        color: #000;
        font-weight: 400;
    }

    strong {
        color: #000;
        font-weight: 500;
        font-size: var(--font-size-xs);
        word-break: break-word;
    }
`;

const SummaryList = styled.div`
    display: grid;
    gap: 14px;
    font-size: var(--font-size-md);
`;

const SummaryLine = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 14px;

    span:first-child {
        color: #000;
        font-weight: 400;
    }

    strong {
        color: #000;
        font-weight: 400;
        white-space: nowrap;
    }

    @media (max-width: 380px) {
        align-items: flex-start;
        flex-direction: column;
        gap: var(--space-2xs);
    }
`;

const SummaryTotal = styled(SummaryLine)`
    align-items: flex-end;
    margin-top: 5px;
    padding-top: 15px;
    border-top: 1px dashed #c8d4e4;

    strong {
        color: #079238;
        font-size: var(--font-size-2xl);
        line-height: 1;
    }
`;

const PaymentTable = styled.div`
    display: grid;
    gap: var(--space-xs);
    font-size: var(--font-size-sm);
`;

const PaymentRow = styled.div<{ $head?: boolean; $total?: boolean }>`
    display: grid;
    grid-template-columns: 36px 1fr minmax(86px, 0.8fr) minmax(80px, 0.7fr);
    gap: 10px;
    align-items: center;
    min-height: ${({ $head, $total }) => ($head || $total ? '34px' : '30px')};
    padding: ${({ $total }) => ($total ? '0 5px' : '0 5px')};
    border-radius: ${({ $total }) => ($total ? '5px' : '0')};
    background: ${({ $total }) => ($total ? '#f3f7fc' : 'transparent')};
    color: #000;
    font-weight:400;

    strong {
        color: #079238;
        text-align: right;
    }

    b {
        font-weight:500;
        font-size: var(--font-size-xs);
    }

    span:last-child {
        text-align: right;
        white-space: nowrap;
    }

    @media (max-width: 430px) {
        grid-template-columns: 26px 1fr;

        span:nth-child(1) {
            grid-row: span 3;
        }

        span:nth-child(2) {
            min-width: 0;
            overflow-wrap: anywhere;
        }

        span:nth-child(3),
        span:nth-child(4),
        strong {
            text-align: left;
            grid-column: 2;
        }

        ${({ $head }) => $head ? 'display: none;' : ''}
    }
`;

const ProductCard = styled(Card)`
    min-width: 0;
`;

const TableWrap = styled.div`
    height: 280px;
    overflow: hidden;

    > section {
        height: 100%;
        border: 0;
        border-radius: 0;
        background: #ffffff;
        box-shadow: none;
        display: flex;
        flex-direction: column;
    }

    > section > div {
        flex: 1;
        overflow: auto;
    }

    table {
        font-size: var(--font-size-xs);
    }

    thead th {
        position: sticky;
        top: 0;
        z-index: 1;
    }

    @media (max-width: 640px) {
        height: 320px;
    }
`;

const ProductDescription = styled.div`
    display: flex;
    align-items: center;
    gap: var(--space-xs);
    min-width: 0;

    span {
        min-width: 0;
        overflow-wrap: anywhere;
    }

    .product-edit-button {
        width: 24px;
        height: 24px;
        min-height: 24px;
        border: 0;
        padding: 0;
        border-radius: var(--radius-sm);
        background: transparent;
        color: #000;
        flex: 0 0 auto;

        span {
            position: absolute;
            width: 1px;
            height: 1px;
            padding: 0;
            margin: -1px;
            overflow: hidden;
            clip: rect(0, 0, 0, 0);
            white-space: nowrap;
            border: 0;
        }
    }
`;

const SmallSelect = styled(Select)`
    min-height: 34px;
    border: 1px solid #ccd7e6;
    border-radius: var(--radius-sm);
    background: #ffffff;
    color: #000;
    padding: 0 var(--space-xs);
    font: inherit;
    font-size: 13px;
`;

const SmallInput = styled(Input)`
    min-height: 34px;
    border: 1px solid #ccd7e6;
    border-radius: var(--radius-sm);
    color: #000;
    padding: 0 var(--space-xs);
    box-sizing: border-box;
    font: inherit;
`;

const ProductsFooter = styled.div`
    display: grid;
    gap: 0;
    padding: 0 14px 10px;
    font-size: var(--font-size-lg);
    font-weight: 400;
`;

const ProductsFooterLine = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 14px;
    padding: var(--space-xs) 0;
    border-bottom: 1px solid #edf2f8;
    font-size: var(--font-size-md);

    strong {
        color: #079238;
    }

    b {
        font-weight: 500;
        font-size: var(--font-size-sm);
    }

    @media (max-width: 380px) {
        flex-direction: column;
        gap: var(--space-2xs);
    }
`;

const MobileProductsList = styled.div`
    display: none;

    @media (max-width: 640px) {
        display: grid;
        gap: 10px;
        padding: var(--space-sm);
    }
`;

const MobileProductCard = styled.article`
    display: grid;
    gap: 10px;
    padding: var(--space-sm);
    border: 1px solid #e1e8f2;
    border-radius: var(--radius-md);
    background: #fbfdff;
`;

const MobileProductHeader = styled.div`
    display: grid;
    grid-template-columns: 28px 1fr 30px;
    gap: 10px;
    align-items: start;
    color: #000;
    font-size: var(--font-size-xs);
    font-weight: 400;

    button {
        width: 30px;
        height: 30px;
        border: 1px solid #d3deec;
        border-radius: 5px;
        background: #ffffff;
        color: #000;
        display: inline-flex;
        align-items: center;
        justify-content: center;
    }
`;

const MobileProductGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: var(--space-xs);

    @media (max-width: 380px) {
        grid-template-columns: 1fr;
    }
`;

const MobileProductInfo = styled.div`
    display: grid;
    gap: 3px;
    font-size: var(--font-size-xs);

    span {
        color: #64728a;
        font-weight: 400;
    }

    strong {
        color: #142645;
        font-weight: 400;
    }
`;

const MobileProductControls = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-xs);

    @media (max-width: 380px) {
        grid-template-columns: 1fr;
    }
`;

const AddressBody = styled(CardBody)`
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(82px, 100px);
    gap: var(--space-sm);

    .address-action-button {
        min-height: 40px;
        border: 1px solid #d3deec;
        border-radius: 5px;
        background: #ffffff;
        color: #000;
        font-size: var(--font-size-xs);
        font-weight: 400;
    }

    @media (max-width: 420px) {
        grid-template-columns: 1fr;
    }
`;

const ActionArea = styled(Card)`
    margin-top: var(--space-sm);
    grid-column: 1 / -1;
`;

const PrintGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(6, minmax(120px, 1fr));
    gap: var(--space-sm);
    padding: 14px;

    .print-action-button {
        min-height: var(--control-height-sm);
        border: 1px solid #cbd9ee;
        border-radius: 5px;
        background: #ffffff;
        color: #000;
        gap: 9px;
        padding: 0 var(--space-sm);
        font-size: var(--font-size-2xs);
        font-weight: 400;
        text-align: center;
        white-space: normal;
        overflow-wrap: anywhere;

        &:disabled {
            border-color: #dde5ef;
            background: #f1f4f8;
            color: #000;
        }
    }

    .print-action-button-wide {
        grid-column: span 2;
    }

    @media (max-width: 1200px) {
        grid-template-columns: repeat(3, minmax(0, 1fr));
    }

    @media (max-width: 45rem) {
        grid-template-columns: repeat(2, minmax(0, 1fr));

        .print-action-button-wide {
            grid-column: auto;
        }
    }

    @media (max-width: 460px) {
        grid-template-columns: 1fr;
    }
`;

const RobotOption = styled.label`
    min-height: var(--control-height-sm);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-xs);
    color: #6b7890;
    font-size: var(--font-size-2xs);
    font-weight: 400;
    text-align: center;
`;

const Footer = styled.footer`
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: grid;
    grid-template-columns: auto auto 1fr auto auto auto;
    gap: var(--space-sm);
    align-items: center;
    padding: var(--space-sm) 18px;
    background: rgba(255, 255, 255, 0.97);
    border-top: 1px solid #dfe7f2;
    box-shadow: 0 -4px 16px rgba(16, 32, 63, 0.06);
    z-index: 5;

    .footer-action-button {
        min-height: 40px;
        border-radius: 5px;
        gap: 9px;
        padding: 0 var(--space-md);
        font-size: var(--font-size-xs);
        font-weight: 400;
        white-space: nowrap;
        max-width: 100%;

        svg {
            color: currentColor;
        }
    }

    @media (max-width: 880px) {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    @media (max-width: 45rem) {
        position: static;
        margin: var(--space-sm) calc(10px * -1) calc(10px * -1);
        box-shadow: none;
    }

    @media (max-width: 460px) {
        grid-template-columns: 1fr;
        padding: 10px;

        .footer-action-button {
            width: 100%;
            white-space: normal;
            text-align: center;
            line-height: 1.25;
        }
    }
`;

const FooterSpacer = styled.div`
    @media (max-width: 880px) {
        display: none;
    }
`;

export {
    Page,
    Header,
    TitleGroup,
    HeaderIcon,
    Title,
    MetaBar,
    MetaItem,
    SuccessAlert,
    SuccessText,
    TopGrid,
    AddressGrid,
    ContentGrid,
    RightStack,
    Card,
    CardTitle,
    CardBody,
    DetailsGrid,
    Detail,
    SummaryList,
    SummaryLine,
    SummaryTotal,
    PaymentTable,
    PaymentRow,
    ProductCard,
    TableWrap,
    ProductDescription,
    SmallSelect,
    SmallInput,
    ProductsFooter,
    ProductsFooterLine,
    MobileProductsList,
    MobileProductCard,
    MobileProductHeader,
    MobileProductGrid,
    MobileProductInfo,
    MobileProductControls,
    AddressBody,
    ActionArea,
    PrintGrid,
    RobotOption,
    Footer,
    FooterSpacer,
};
