import styled from 'styled-components';

const FooterContainer = styled.footer`
  background: #f3f4f6;
  border-color: #d1d5db !important;

  h3 {
    display: flex;
    align-items: center;
    padding: var(--space-xs);

    svg {
      color: var(--bs-white);
      padding: 0.9rem;
      border-radius: 5%;
    }
  }

  .all-rights {
    font-size: 0.85rem;
    color: #000;
    margin-bottom:20px !important;
  }
`;

export { FooterContainer };
