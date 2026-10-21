import styled from 'styled-components';

const LiFavorite = styled.div`
  list-style: none;
  margin: 0;
  padding: 0;
  width: 100%;
  text-decoration: none;
  border: none;
  background: none;
  height: 100%;

  button {
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    width: 100%;
    height: 100%;
    min-height: 86px;
    color: var(--home-text, var(--bs-dark));
    background: #fff;
    border: 1px solid var(--home-border, var(--bs-gray-300));
    border-radius: var(--radius-lg);
    font-size: 0.78rem;
    font-weight: 400;
    line-height: 1.2;
    box-shadow: 0 6px 16px rgba(15, 23, 42, 0.04);

    transition: 0.2s;

    span {
      color: var(--color-secondary, var(--bs-secondary));
      font-size: 1.55rem;
      margin-bottom: 0.45rem;
      transition: 0.2s;
    }

    span svg,
    > svg {
      color: inherit;
      transition: 0.2s;
    }

    &:hover {
      border-color: var(--color-main, var(--bs-primary));
      background-color: var(--color-main, var(--bs-primary));
      color: #fff;
      transform: translateY(-1px);

      span,
      span svg,
      > svg {
        color: #fff !important;
      }
    }
  }
`;

export { LiFavorite };
