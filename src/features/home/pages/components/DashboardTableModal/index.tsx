import type { ReactNode } from 'react';
import styled from 'styled-components';
import { IconFA } from '@/common/components/Icons/IconFA';
import { Table as CommonTable, TableField } from '@/common/components/Table';
import { AppButtonBase } from '@/common/components/Buttons/buttonBase';

type Align = 'left' | 'right' | 'center';

export interface DashboardColumn<TRow> {
  key: string;
  header: string;
  align?: Align;
  render: (row: TRow, index: number) => ReactNode;
}

interface DashboardTableModalProps<TRow> {
  columns: DashboardColumn<TRow>[];
  emptyMessage: string;
  iconName: string;
  onClose: () => void;
  rows: TRow[];
  title: string;
  width?: string;
  getRowState?: (row: TRow, index: number) => { highlighted?: boolean };
  onRowClick?: (row: TRow, index: number) => void;
}

export function DashboardTableModal<TRow>({
  columns,
  emptyMessage,
  iconName,
  onClose,
  rows,
  title,
  width = '700px',
  getRowState,
  onRowClick,
}: DashboardTableModalProps<TRow>) {
  const fields: TableField<{ row: TRow; index: number }>[] = columns.map((column) => ({
    id: column.key,
    header: column.header,
    align: column.align,
    cell: (_, item) => column.render(item.row, item.index),
  }));
  const tableRows = rows.map((row, index) => ({ row, index }));

  return (
    <Overlay onClick={onClose}>
      <Dialog $width={width} onClick={(event) => event.stopPropagation()}>
        <CloseButton type="button" onClick={onClose}>
          ×
        </CloseButton>

        <Title>
          <IconFA iconName={iconName} className="me-2" />
          {title}
        </Title>

        <Content $vazia={rows.length === 0}>
          <CommonTable
            data={tableRows}
            fields={fields}
            emptyMessage={emptyMessage}
            showColumnSelector={false}
            showHeader={false}
            compact
            isRowHighlighted={getRowState ? (item) => Boolean(getRowState(item.row, item.index).highlighted) : undefined}
            onRowClick={onRowClick ? (item) => onRowClick(item.row, item.index) : undefined}
          />
        </Content>

        <Footer>
          <CloseAction type="button" onClick={onClose}>
            Fechar
          </CloseAction>
        </Footer>
      </Dialog>
    </Overlay>
  );
}

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.3);
`;

const Dialog = styled.div<{ $width: string }>`
  position: relative;
  width: min(${({ $width }) => $width}, calc(100vw - 32px));
  max-height: 85vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  padding: var(--space-lg);
  border-radius: 0.5rem;
  background: #fff;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
`;

const CloseButton = styled.button`
  position: absolute;
  top: 8px;
  right: 12px;
  border: 0;
  background: none;
  font-size: 28px;
  cursor: pointer;
`;

const Title = styled.h3`
  margin: 0 0 20px;
  text-align: center;
  font-size: var(--font-size-xl);
  font-weight: 600;

  svg {
    color: var(--color-secondary, var(--bs-primary));
  }
`;

const Content = styled.div<{ $vazia: boolean }>`
  flex: 1;
  overflow-y: auto;
  padding-right: 6px;

  section > div table tbody > tr > td > div {
    margin-top: 1rem;
  }

  ${({ $vazia }) => $vazia && `
    section > div {
      overflow-x: hidden;
    }

    section > div > table {
      min-width: 100%;
    }
  `}
`;

const Footer = styled.div`
  margin-top: 20px;
  text-align: center;
`;

const CloseAction = styled(AppButtonBase).attrs({ $size: 'modal' })``;
