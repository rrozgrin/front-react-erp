import styled from 'styled-components';

const ContainerMenu = styled.div`
  position: sticky;
  top: 0;
  z-index: 15;
`;

const RowMenu = styled.div`
  background-color: var(--color-secondary, var(--bs-primary));
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 40px;
  margin-right: calc(-0.5 * var(--bs-gutter-x));
  margin-left: calc(-0.5 * var(--bs-gutter-x));
  padding-right: calc(0.5 * var(--bs-gutter-x));
  position: sticky;
  top: 0;
`;

const UserActions = styled.div`
  display: flex;
  align-items: center;
  gap: var(--space-xs);

  @media screen and (max-width: 765px) {
    p,
    span {
      display: none;
    }
  }
`;

const UserInfo = styled.p`
  display: flex;
  align-items: center;
  gap: var(--space-2xs);
  margin: 0;
  color: white;
  font-size: var(--font-size-sm);
  font-weight: 500;
`;

const Separator = styled.span`
  color: white;
`;

const LogoutButton = styled.button`
  padding: 0 var(--space-xs);
  color: white;
  background: transparent;
  border: none;
  font-size: var(--font-size-sm);
  font-weight: 500;

  &:hover,
  &:focus {
    color: white;
  }
`;

const LogoutText = styled.b`
  display: inline-flex;
  align-items: center;
  gap: var(--space-2xs);
  color: white;
`;

export { ContainerMenu, LogoutButton, LogoutText, RowMenu, Separator, UserActions, UserInfo };
