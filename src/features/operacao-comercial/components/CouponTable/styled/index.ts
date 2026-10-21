import styled from 'styled-components';

const HEADER_TOTAL_HEIGHT = '40px';

const Container = styled.div`
  position: fixed;
  top: ${HEADER_TOTAL_HEIGHT};
  right: 0;
  bottom: 0;
  left: clamp(420px, 32vw, 620px);
  width: auto;
  background: #f5f4bf;
  color: #111;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  z-index: 1;

  @media (max-width: 1023px) {
    position: relative;
    top: 0;
    left: auto;
    right: auto;
    bottom: auto;
    width: 100%;
    min-height: 0;
    overflow: visible;
    padding-bottom: calc(96px + env(safe-area-inset-bottom, 0px));
  }
`;

const TopBar = styled.div`
  padding: var(--space-sm) 14px 0;
  background: #f5f4bf;
  flex-shrink: 0;

  @media (max-width: 1023px) {
    padding: var(--space-sm) var(--space-sm) 0;
  }
`;

const OrderInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: var(--space-xs) var(--space-md);
  flex-wrap: wrap;
  font-size: var(--font-size-xs);
  font-weight: 500;

  @media (max-width: 1023px) {
    font-size: var(--font-size-sm);
    line-height: 1.3;
  }
`;

const InfoRow = styled.div`
  margin-top: 18px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px var(--space-md);
  flex-wrap: wrap;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.45);
  font-size: var(--font-size-sm);

  @media (max-width: 1023px) {
    margin-top: var(--space-sm);
    gap: var(--space-xs);
    font-size: var(--font-size-sm);
  }
`;

const Info = styled.div`
  display: flex;
  align-items: center;
  gap: var(--space-xs);

  @media (max-width: 1023px) {
    width: 100%;
    padding: var(--space-xs) 10px;
    background: rgba(255, 255, 255, 0.24);
    border: 1px solid rgba(0, 0, 0, 0.08);
    border-radius: var(--radius-sm);
  }
`;

const tableColumns = `
  52px
  110px
  minmax(240px, 1fr)
  58px
  78px
  100px
  90px
  90px
  100px
  74px
`;

const TableHeader = styled.div`
  display: grid;
  grid-template-columns: ${tableColumns};
  padding: 9px 14px;
  font-size: var(--font-size-xs);
  font-weight: 500;
  background: rgba(0, 0, 0, 0.04);
  flex-shrink: 0;

  @media (max-width: 1023px) {
    display: none;
  }
`;

const ScrollArea = styled.div`
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  overflow-x: auto;
  position: relative;

  @media (max-width: 1023px) {
    overflow: visible;
  }
`;

const TableRow = styled.div`
  display: grid;
  grid-template-columns: ${tableColumns};
  padding: 10px 14px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  align-items: center;
  font-size: var(--font-size-sm);

  &:hover {
    background: rgba(0, 0, 0, 0.03);
  }

  @media (max-width: 1023px) {
    display: none;
  }
`;

const ProductName = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Money = styled.div<{ $color?: string }>`
  color: ${({ $color }) => $color || '#111'};
  font-weight: ${({ $color }) => ($color ? 500 : 400)};
`;

const Actions = styled.div`
  display: flex;
  gap: var(--space-sm);

  button {
    border: 0;
    background: transparent;
    padding: 0;
    color: inherit;
    cursor: pointer;
  }

  svg {
    cursor: pointer;
  }
`;

const MobileList = styled.div`
  display: none;
  gap: 10px;
  padding: 0 var(--space-sm) var(--space-sm);

  @media (max-width: 1023px) {
    display: grid;
  }
`;

const MobileTableHead = styled.div`
  display: none;

  @media (max-width: 1023px) {
    margin-top: var(--space-sm);
    display: grid;
    grid-template-columns: 56px minmax(0, 1fr) 60px 44px;
    gap: var(--space-xs);
    padding: 0 2px;
    color: #56708a;
    font-size: var(--font-size-xs);
    font-weight: 500;
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }
`;

const MobileRow = styled.div`
  display: none;
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: var(--radius-md);
  background: rgba(255, 255, 255, 0.34);
  overflow: hidden;

  @media (max-width: 1023px) {
    display: grid;
  }
`;

const MobileRowSummary = styled.div`
  display: grid;
  grid-template-columns: 56px minmax(0, 1fr) 60px 44px;
  gap: var(--space-xs);
  align-items: center;
  width: 100%;
  padding: var(--space-sm);
  border: 0;
  background: transparent;
  color: inherit;
  text-align: left;
`;

const MobileRowCell = styled.div<{ $muted?: boolean }>`
  min-width: 0;
  font-size: ${({ $muted }) => ($muted ? '11px' : '13px')};
  font-weight: ${({ $muted }) => ($muted ? 500 : 500)};
  color: ${({ $muted }) => ($muted ? '#56708a' : '#343228')};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const MobileRowButton = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const MobileExpandButton = styled.button<{ $open?: boolean }>`
  width: 38px;
  height: 38px;
  border: 1px solid rgba(31, 101, 159, 0.18);
  border-radius: var(--radius-sm);
  background: rgba(31, 101, 159, 0.08);
  color: #1f659f;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: transform 0.2s ease, background 0.2s ease;

  svg {
    transition: transform 0.2s ease;
    transform: ${({ $open }) => ($open ? 'rotate(90deg)' : 'rotate(0deg)')};
  }
`;

const MobileDetails = styled.div`
  display: grid;
  gap: var(--space-xs);
  padding: 0 var(--space-sm) var(--space-sm);
`;

const MobileDetailGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--space-xs);

  @media (max-width: 420px) {
    grid-template-columns: 1fr;
  }
`;

const MobileDetail = styled.div`
  display: grid;
  gap: 2px;
  padding: var(--space-xs) 10px;
  border-radius: var(--radius-sm);
  background: rgba(255, 255, 255, 0.36);
  border: 1px solid rgba(0, 0, 0, 0.06);
`;

const MobileDetailLabel = styled.div`
  font-size: font-size: var(--font-size-xs);
  font-weight: 500;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: #56708a;
`;

const MobileDetailValue = styled.div`
  font-size: var(--font-size-sm);
  font-weight: 500;
  color: #343228;
`;

const MobileActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

const MobileActionButton = styled.button<{ $danger?: boolean }>`
  min-height: 38px;
  min-width: 38px;
  padding: 0 var(--space-sm);
  border: 1px solid ${({ $danger }) => ($danger ? 'rgba(229, 57, 53, 0.25)' : 'rgba(31, 101, 159, 0.2)')};
  border-radius: var(--radius-sm);
  background: ${({ $danger }) => ($danger ? 'rgba(229, 57, 53, 0.08)' : 'rgba(31, 101, 159, 0.08)')};
  color: ${({ $danger }) => ($danger ? '#e53935' : '#1f659f')};
  cursor: pointer;
  font-weight: 500;
`;

const BottomBar = styled.div`
  padding: 10px 14px var(--space-sm);
  display: flex;
  gap: var(--space-sm);
  background: #f5f4bf;
  flex-shrink: 0;
  align-items: stretch;

  @media (max-width: 1023px) {
    flex-direction: column;
    margin-bottom: var(--space-xs);
  }
`;

const Buttons = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 10px;

  @media (max-width: 1023px) {
    display: none;
  }

  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 640px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

const MobileActionsGroup = styled.div`
  display: grid;
  gap: var(--space-xs);
`;

const MobileActionsGroupTitle = styled.div.attrs({ 'data-app-title': true })`
  font-size: var(--font-size-xs);
  font-weight: 500;
  color: #56708a;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const MobileActionsToggle = styled.button`
  display: none;
  width: 100%;
  min-height: var(--control-height-sm);
  padding: 0 14px;
  border: 1px solid rgba(31, 101, 159, 0.18);
  border-radius: var(--radius-sm);
  background: rgba(255, 255, 255, 0.34);
  color: #1f659f;
  cursor: pointer;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-sm);
  font-size: var(--font-size-sm);
  font-weight: 500;

  svg {
    transition: transform 0.2s ease;
  }

  &[aria-expanded='true'] svg {
    transform: rotate(180deg);
  }

  @media (max-width: 1023px) {
    display: inline-flex;
  }
`;

const ShortcutButton = styled.button`
  min-height: 38px;
  border: none;
  border-radius: 0.1875rem;
  background: #ece9ad;
  color: #111;
  font-size: var(--font-size-xs);
  font-weight: 500;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  width: 100%;
  padding: 0 var(--space-sm);
  text-align: left;

  span {
    min-width: 0;
  }
`;

const ShortcutBadge = styled.strong`
  min-width: 44px;
  padding: 3px var(--space-xs);
  border-radius: var(--radius-pill);
  background: rgba(31, 101, 159, 0.12);
  color: #1f659f;
  font-size: var(--font-size-2xs);
  font-weight: 800;
  text-align: center;
  flex: 0 0 auto;
`;

const MobileActionsPanel = styled.div<{ $open?: boolean }>`
  display: none;

  @media (max-width: 1023px) {
    display: grid;
    width: 100%;
    gap: ${({ $open }) => ($open ? 'var(--space-sm)' : '0')};
    max-height: ${({ $open }) => ($open ? '420px' : '0')};
    overflow: hidden;
    opacity: ${({ $open }) => ($open ? 1 : 0)};
    transition: max-height 0.25s ease, opacity 0.2s ease, gap 0.2s ease;
    border: ${({ $open }) => ($open ? '1px solid rgba(31, 101, 159, 0.12)' : '0')};
    border-radius: var(--radius-sm);
    padding: ${({ $open }) => ($open ? 'var(--space-sm)' : '0 var(--space-sm)')};
    background: rgba(255, 255, 255, 0.22);

    ${Buttons} {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 10px;
    }
  }
`;

const Button = styled.button`
  min-height: 38px;
  border: none;
  border-radius: 0.1875rem;
  background: #ece9ad;
  color: #111;
  font-size: var(--font-size-sm);
  font-weight: 400;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #dfdc98;
  }

  @media (max-width: 640px) {
    min-height: 44px;
    font-size: var(--font-size-xs);
    padding: 0 10px;
    white-space: normal;
    line-height: 1.2;
  }
`;

const TotalBox = styled.div.attrs({ 'data-app-font-exception': 'frente-caixa-total' })`
  width: 32%;
  min-width: 270px;
  background-color: var(--color-secondary);
  color: var(--color-font, var(--bs-white));
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 0.1875rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h3 {
    margin: 0;
    font-size: var(--font-size-sm);
    font-weight: 700;
  }

  span {
    margin-top: 10px;
    font-size: 28px;
    font-weight: 700;
  }

  @media (max-width: 1200px) {
    min-width: 240px;
    width: 28%;
  }

  @media (max-width: 1023px) {
    width: 100%;
    min-width: 0;
    min-height: 110px;
  }

  @media (max-width: 640px) {
    order: -1;
    min-height: 92px;

    span {
      font-size: var(--font-size-2xl);
    }
  }
`;

const responsiveTableMinWidth = '820px';

const ResponsiveTableWrapper = styled.div`
  min-width: ${responsiveTableMinWidth};

  @media (max-width: 1023px) {
    min-width: 760px;
  }
`;

export {
    TotalBox,
    Button,
    Buttons,
    MobileActionsGroup,
    MobileActionsGroupTitle,
    BottomBar,
    TopBar,
    Actions,
    Money,
    ProductName,
    TableHeader,
    TableRow,
    tableColumns,
    ScrollArea,
    ResponsiveTableWrapper,
    MobileList,
    MobileTableHead,
    MobileRow,
    MobileRowSummary,
    MobileRowCell,
    MobileRowButton,
    MobileExpandButton,
    MobileDetails,
    MobileDetailGrid,
    MobileDetail,
    MobileDetailLabel,
    MobileDetailValue,
    MobileActions,
    MobileActionButton,
    MobileActionsToggle,
    ShortcutButton,
    ShortcutBadge,
    MobileActionsPanel,
    Info,
    InfoRow,
    OrderInfo,
    Container
}
