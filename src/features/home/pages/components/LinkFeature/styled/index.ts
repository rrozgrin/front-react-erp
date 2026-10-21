import styled from 'styled-components';

const LiContainer = styled.li`
  list-style: none;

  a {
    position: relative;
    display: flex;
    align-items: center;
    min-height: 52px;
    padding: 0.55rem 2.5rem 0.55rem 3.3rem;
    text-decoration: none;
    color: var(--home-text, var(--bs-dark));
    background: #fff;
    font-size: 0.8rem;
    font-weight: 400;
    line-height: 1.2;
    border: 1px solid #edf2f7;
    border-radius: 0.5rem;
    box-shadow: 0 5px 14px rgba(15, 23, 42, 0.035);
    transition: background-color 0.2s ease, border-color 0.2s ease, color 0.2s ease;

    svg {
      position: absolute;
      top: 50%;
      left: 0.7rem;
      width: 22px;
      height: 22px;
      padding: 0.32rem;
      color: var(--color-secondary, var(--bs-primary));
      background: color-mix(in srgb, var(--color-secondary, var(--bs-primary)) 18%, white);
      border-radius: 50%;
      transform: translateY(-50%);
    }

    .badge {
      top: 50% !important;
      right: 0.7rem;
      left: auto !important;
      transform: translateY(-50%) !important;
      min-width: 20px;
      height: 20px;
      display: inline-grid;
      place-items: center;
      font-size: 0.65rem;
    }

    &:hover {
      background: #f8fafc;
      border-color: color-mix(in srgb, var(--color-secondary, var(--bs-primary)) 35%, white);
      color: var(--color-tertiary, var(--bs-primary));
    }
  }
`;

export { LiContainer };
