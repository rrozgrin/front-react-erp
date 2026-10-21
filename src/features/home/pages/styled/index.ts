import { Container } from 'react-bootstrap';
import styled from 'styled-components';
import { BackDefault } from '../../../../common/components/Templates/BackDefault';

const HomePage = styled.div.attrs({ 'data-app-font-exception': 'home' })`
  --home-border: #e6ebf2;
  --home-muted: #64748b;
  --home-text: #172033;
  --home-panel-shadow: 0 8px 24px rgba(15, 23, 42, 0.05);

  color: var(--home-text);
  padding-bottom: 0.25rem;

  ${BackDefault} {
    background: rgba(255, 255, 255, 0.96);
    border: 1px solid var(--home-border);
    border-radius: var(--radius-lg);
    box-shadow: var(--home-panel-shadow);
  }

  .home-chart-row {
    margin-top: 1rem;
  }

  .home-chart-row > [class*='col-'] {
    display: flex;
  }

  .home-chart-row > [class*='col-'] > * {
    width: 100%;
  }

  .home-chart-row ${BackDefault},
  .home-alert-panel,
  .home-favorites-panel {
    min-height: 349px;
  }

  .home-favorites-panel,
  .home-alert-panel {
    display: flex;
    flex-direction: column;
    height: 349px;
  }

  .home-chart-row h3 {
    color: var(--home-text);
    font-size: var(--font-size-xs);
    font-weight: 500;
    letter-spacing: 0;
  }

  .home-chart-row svg,
  .home-favorites-panel svg,
  .home-alert-panel .alerts-header svg,
  .dashboard-widget-content h3 svg {
    color: var(--color-secondary, var(--bs-primary));
  }

  .dashboard-widget-content h3,
  .home-favorites-header h3,
  .home-alert-panel .alerts-header h3 {
    color: var(--home-text);
    font-size: 15px !important;
  }

  .home-favorites-header {
    position: relative;
    padding-right: 2.25rem;
  }

  .home-favorites-config-button {
    position: absolute;
    top: -0.2rem;
    right: 0;
  }

  .dashboard-widget-content .border-bottom,
  .home-favorites-header,
  .home-alert-panel .alerts-header {
    border-color: #dee2e6 !important;
    border-bottom-color: #dee2e6 !important;
  }

  .favorite-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0.7rem;
    align-content: flex-start;
    flex: 1;
  }

  .favorite-grid-item {
    min-width: 0;
    min-height: 86px;
  }

  @media screen and (min-width: 1400px) {
    .favorite-grid {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
  }

  .home-dashboard-grid {
    display: grid;
    grid-template-columns: repeat(15, minmax(0, 1fr));
    grid-auto-flow: dense;
    gap: 1rem;
    align-items: stretch;
    margin-bottom: 1rem;
  }

  .dashboard-widget {
    position: relative;
    min-width: 0;
    transition: opacity 0.18s ease, transform 0.18s ease;
  }

  .dashboard-widget[data-size='normal'] {
    grid-column: span 5;
    min-height: 349px;
  }

  .dashboard-widget[data-size='small'] {
    grid-column: span 3;
    min-height: 94px;
  }

  .dashboard-widget.is-dragging {
    opacity: 0.48;
    transform: scale(0.98);
  }

  .dashboard-widget-locked {
    cursor: default;
  }

  .dashboard-widget-content,
  .dashboard-widget-content > div {
    height: 100%;
    min-width: 0;
  }

  .dashboard-widget-content .mb-3 {
    margin-bottom: 0 !important;
  }

  .dashboard-widget[data-size='normal'] .dashboard-widget-content > div {
    min-height: 349px;
  }

  .dashboard-widget-controls {
    position: absolute;
    top: -0.55rem;
    right: 0.6rem;
    z-index: 5;
    display: inline-flex;
    gap: 0.35rem;
    padding: 0.25rem;
    background: rgba(255, 255, 255, 0.88);
    border: 1px solid rgba(226, 232, 240, 0.9);
    border-radius: var(--radius-pill);
    box-shadow: 0 10px 24px rgba(15, 23, 42, 0.12);
    opacity: 0;
    transform: translateY(-2px);
    transition: opacity 0.18s ease, transform 0.18s ease;
  }

  .dashboard-widget:hover .dashboard-widget-controls,
  .dashboard-widget:focus-within .dashboard-widget-controls {
    opacity: 1;
    transform: translateY(0);
  }

  .dashboard-widget-control {
    display: grid;
    width: 28px;
    height: 28px;
    place-items: center;
    padding: 0;
    color: var(--color-secondary, var(--bs-primary));
    background: #fff;
    border: 1px solid #e2e8f0;
    border-radius: 50%;
    cursor: pointer;
  }

  .dashboard-widget-control svg {
    width: 12px;
    height: 12px;
  }

  .dashboard-widget-drag-handle {
    cursor: grab;
  }

  .dashboard-widget-drag-handle:active {
    cursor: grabbing;
  }

  .home-kpi-row {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 1rem;
    margin-bottom: 1rem;
  }

  .home-date-filter {
    display: grid;
    grid-template-columns: minmax(160px, 0.22fr) minmax(260px, 1fr) minmax(0, auto) auto;
    align-items: center;
    gap: 0.85rem;
    width: 100%;
    padding: 0.75rem;
    margin-bottom: 1rem;
    background: rgba(255, 255, 255, 0.96);
    border: 1px solid var(--home-border);
    border-radius: var(--radius-lg);
    box-shadow: var(--home-panel-shadow);
  }

  .home-date-filter-title {
    display: flex;
    align-items: center;
    gap: 0.45rem;
    margin-bottom: 0;
    color: var(--home-text);
    font-size: var(--font-size-xs);
    font-weight: 500;
  }

  .home-date-filter-title svg {
    color: var(--color-secondary, var(--bs-primary));
  }

  .home-date-status {
    display: block;
    margin-top: 0;
    color: var(--home-muted);
    font-size: var(--font-size-xs);
    font-weight: 500;
    text-align: right;
    white-space: nowrap;
  }

  .home-date-status.is-error {
    color: #dc2626;
  }

  .home-dashboard-actions {
    position: relative;
    justify-self: end;
  }

  .home-config-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.35rem;
    min-height: 38px;
    padding: 0 0.9rem;
    border: 1px solid var(--color-secondary, var(--bs-primary));
    border-radius: var(--radius-sm);
    background-color: var(--color-secondary, var(--bs-primary)) !important;
    color: #fff !important;
    font-size: 0.82rem;
    font-weight: 800;
    box-shadow: var(--home-panel-shadow);
    cursor: pointer;
  }

  .home-config-button:hover,
  .home-config-button:focus {
    border-color: var(--color-tertiary, var(--color-secondary, var(--bs-primary))) !important;
    background-color: var(--color-tertiary, var(--color-secondary, var(--bs-primary))) !important;
    color: #fff !important;
  }

  .home-config-panel {
    position: absolute;
    top: calc(100% + 0.5rem);
    right: 0;
    z-index: 20;
    width: min(330px, calc(100vw - 2rem));
    padding: 0.85rem;
    background: #fff;
    border: 1px solid var(--home-border);
    border-radius: var(--radius-lg);
    box-shadow: 0 18px 42px rgba(15, 23, 42, 0.16);
  }

  .home-config-panel-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.75rem;
    padding-bottom: 0.7rem;
    margin-bottom: 0.75rem;
    border-bottom: 1px solid var(--home-border);
    color: var(--home-text);
    font-size: 0.86rem;
  }

  .home-config-panel-header button {
    border: none;
    background: transparent;
    color: var(--color-secondary, var(--bs-primary));
    font-size: 0.75rem;
    font-weight: 800;
  }

  .home-config-panel-list {
    display: grid;
    gap: 0.55rem;
    max-height: 320px;
    overflow: auto;
  }

  .home-config-panel-list span {
    font-weight: 400;
  }

  .home-config-panel-list label {
    display: flex;
    align-items: center;
    gap: 0.55rem;
    min-height: 34px;
    padding: 0.45rem 0.55rem;
    margin: 0;
    color: var(--home-text);
    background: #f8fafc;
    border: 1px solid #eef2f7;
    border-radius: var(--radius-lg);
    font-size: var(--font-size-xs);
    font-weight: 500;
    cursor: pointer;
  }

  .home-config-panel-list em {
    margin-left: auto;
    color: var(--home-muted);
    font-size: 0.68rem;
    font-style: normal;
    font-weight: 800;
    text-transform: uppercase;
  }

  .home-config-panel-list input {
    width: 15px;
    height: 15px;
    accent-color: var(--color-secondary, var(--bs-primary));
  }

  @media screen and (max-width: 1199px) {
    .home-kpi-row {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .home-date-filter {
      grid-template-columns: 1fr;
      align-items: stretch;
    }

    .home-date-status {
      text-align: left;
      white-space: normal;
    }

    .home-dashboard-actions {
      justify-self: end;
    }

    .dashboard-widget[data-size='normal'] {
      grid-column: span 15;
    }

    .dashboard-widget[data-size='small'] {
      grid-column: span 5;
    }
  }

  @media screen and (max-width: 991px) {
    padding-bottom: 0;

    .home-kpi-row {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .home-chart-row ${BackDefault},
    .home-alert-panel,
    .home-favorites-panel {
      height: auto;
      min-height: auto;
    }

    .dashboard-widget[data-size='normal'],
    .dashboard-widget[data-size='small'],
    .dashboard-widget[data-size='normal'] .dashboard-widget-content > div {
      grid-column: span 15;
      min-height: auto;
    }
  }

  @media screen and (max-width: 575px) {
    .home-kpi-row {
      grid-template-columns: 1fr;
    }
  }
`;

const HomeHeader = styled.header`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  align-items: start;
  margin-bottom: 1rem;

  h1 {
    margin: 0 0 0.25rem;
    color: var(--home-text);
    font-size: clamp(1.08rem, 1.4vw, 1.35rem);
    font-weight: 800;
    letter-spacing: 0;
    text-transform: uppercase;
  }

  p {
    margin: 0;
    color: var(--home-muted);
    font-size: 0.88rem;
  }

  .home-dashboard-actions {
    position: relative;
    justify-self: end;
  }

  .home-config-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.35rem;
    min-height: 38px;
    padding: 0 0.9rem;
    border: 1px solid var(--color-secondary, var(--bs-primary));
    border-radius: var(--radius-sm);
    background: var(--color-secondary, var(--bs-primary));
    color: #fff;
    font-size: 0.82rem;
    font-weight: 800;
    box-shadow: var(--home-panel-shadow);
    cursor: pointer;
  }

  .home-config-panel {
    position: absolute;
    top: calc(100% + 0.5rem);
    right: 0;
    z-index: 20;
    width: min(330px, calc(100vw - 2rem));
    padding: 0.85rem;
    background: #fff;
    border: 1px solid var(--home-border);
    border-radius: var(--radius-lg);
    box-shadow: 0 18px 42px rgba(15, 23, 42, 0.16);
  }

  .home-config-panel-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.75rem;
    padding-bottom: 0.7rem;
    margin-bottom: 0.75rem;
    border-bottom: 1px solid var(--home-border);
    color: var(--home-text);
    font-size: 0.86rem;
  }

  .home-config-panel-header button {
    border: none;
    background: transparent;
    color: var(--color-secondary, var(--bs-primary));
    font-size: 0.75rem;
    font-weight: 800;
  }

  .home-config-panel-list {
    display: grid;
    gap: 0.55rem;
    max-height: 320px;
    overflow: auto;
  }

  .home-config-panel-list label {
    display: flex;
    align-items: center;
    gap: 0.55rem;
    min-height: 34px;
    padding: 0.45rem 0.55rem;
    margin: 0;
    color: var(--home-text);
    background: #f8fafc;
    border: 1px solid #eef2f7;
    border-radius: var(--radius-lg);
    font-size: var(--font-size-xs);
    font-weight: 500;
    cursor: pointer;
  }

  .home-config-panel-list em {
    margin-left: auto;
    color: var(--home-muted);
    font-size: 0.68rem;
    font-style: normal;
    font-weight: 800;
    text-transform: uppercase;
  }

  .home-config-panel-list input {
    width: 15px;
    height: 15px;
    accent-color: var(--color-secondary, var(--bs-primary));
  }

  @media screen and (max-width: 991px) {
    flex-direction: column;

    .home-dashboard-actions {
      justify-self: start;
    }
  }
`;

const KpiGrid = styled.section`
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 1rem;
  margin-bottom: 1rem;

  @media screen and (max-width: 1399px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  @media screen and (max-width: 991px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media screen and (max-width: 575px) {
    grid-template-columns: 1fr;
  }
`;

const KpiCard = styled(BackDefault) <{ $accent?: string }>`
  display: flex;
  align-items: center;
  gap: 0.9rem;
  min-height: 94px;
  padding: 1rem;

  .kpi-icon {
    display: grid;
    flex: 0 0 48px;
    width: 48px;
    height: 48px;
    place-items: center;
    color: #fff;
    background: ${({ $accent }) => $accent || 'var(--color-secondary, var(--bs-primary))'};
    border-radius: 50%;
    box-shadow: 0 10px 20px rgba(30, 94, 149, 0.16);
  }

  .kpi-content {
    min-width: 0;
  }

  .kpi-label {
    margin: 0 0 0.3rem;
    color: var(--home-muted);
    font-size: var(--font-size-xs);
    font-weight: 500;
  }

  .kpi-value {
    margin: 0;
    color: var(--home-text);
    font-size: clamp(1rem, 1.35vw, 1.22rem);
    font-weight: 800;
    line-height: 1.15;
    overflow-wrap: anywhere;
  }

  .kpi-trend {
    display: flex;
    gap: 0.25rem;
    align-items: center;
    margin-top: 0.4rem;
    color: #16a34a;
    font-size: var(--font-size-xs);
    font-weight: 500;
  }

  .kpi-trend.negative {
    color: #dc2626;
  }
`;

const ProductKpiCard = styled(BackDefault)`
  min-height: 94px;
  padding: 0.7rem 0.8rem;
  overflow: hidden;
`;

const AlertsCard = styled(BackDefault)`
  padding: 1rem;

  .alerts-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.75rem;
  }

  .row {
    flex: 1;
    align-content: flex-start;
  }

  .alerts-content {
    --bs-gutter-x: 1rem;
    --bs-gutter-y: 0.65rem;
  }

  .alerts-header h3 {
    display: flex;
    align-items: center;
    margin: 0;
  }

  .alerts-list {
    display: grid;
    gap: 0.65rem;
    padding: 0;
    margin: 0;
  }
`;

const FavoritesEmpty = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  min-height: 220px;
  padding: 1rem;
  color: var(--home-muted);
  font-size: 0.92rem;
  text-align: center;
  background: #f8fafc;
  border: 1px dashed #cbd5e1;
  border-radius: var(--radius-lg);
`;

const InfoHome = styled(Container)`
  .info-bottom {
    h3 {
      display: flex;
      align-items: center;

      svg {
        background-color: var(--bs-primary);
        color: var(--bs-white);
        padding: 0.9rem;
        border-radius: 5%;
      }
    }
  }

  button {
      background: transparent;
      border: none;
      width: 100%;
      text-align: left;
      height: 70px;
      border-radius: var(--radius-md);
      cursor: pointer;
      transition: background-color 0.25s ease;
      h3 {
        margin: 0;
        color: var(--bs-black); /* texto claro */
      }
    }

    /* Hover apenas sobre o botão */
    button:hover {
      background-color: var(--color-quaternary, var(--bs-primary));
    }


  @media screen and (max-width: 765px) {
    .info-bottom {
      justify-content: start !important;
      margin-bottom: 10px;

      button {
        text-align: start;
      }
    }
  }
`;

export {
    AlertsCard,
    FavoritesEmpty,
    HomeHeader,
    HomePage,
    InfoHome,
    KpiCard,
    KpiGrid,
    ProductKpiCard,
};
