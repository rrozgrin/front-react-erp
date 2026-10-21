import styled from 'styled-components';

const UlBreadcrumb = styled.ul`
  align-items: center;
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0.4rem var(--space-md) 0.7rem;

  li {
    a {
      text-decoration: none;
      color: var(--bs-secondary);
      transition: 0.2s ease;
      font-weight: 600;
      font-size: 0.8rem;

      &:hover {
        color: var(--bs-primary);
      }
    }

    &:not(:last-child) {
      &::after {
        content: '/';
        color: var(--bs-gray-300);
        font-size: 0.8rem;
        font-weight: 600;
        margin-left: var(--space-sm);
        margin-right: var(--space-sm);
      }
    }
  }
`;

export { UlBreadcrumb };
