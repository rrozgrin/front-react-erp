import styled from 'styled-components';
import { BackDefault } from '../../../../../common/components/Templates/BackDefault';

export const FixedChartCard = styled(BackDefault)`
  height: 349px;

  h3 {
    color: var(--home-text, var(--bs-dark));
    font-size: 15px !important;
  }

  h3 svg {
    color: var(--color-secondary, var(--bs-primary));
  }
`;

export const PermissionPlaceholder = styled.div`
  height: 250px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px dashed #d1d5db;
  border-radius: var(--radius-md);
  background: #f7f9fc;
  color: var(--color-secondary, var(--bs-primary));
  font-size: 25px;
`;

export const ChartFill = styled.div`
  width: 100%;
  height: 100%;
`;
