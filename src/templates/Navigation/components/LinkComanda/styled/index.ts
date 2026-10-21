import styled from "styled-components";

const ComandaButton = styled.button`
  text-decoration: none !important;
  display: flex;
  align-items: flex-start;
  gap: var(--space-xs);
  color: var(--bs-gray-900) !important;
  font-weight: 400;
  transition: 0.2s ease;
  font-size: var(--font-size-sm);
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;

  &:hover {
    color: var(--color-secondary, var(--bs-primary)) !important;
    text-decoration: none !important;
  }

  &:visited,
  &:active,
  &:focus {
    color: var(--color-secondary, var(--bs-primary)) !important;
    text-decoration: none !important;
  }
`;

const IconSlot = styled.span`
  width: 1rem;
  min-width: 1rem;
  display: inline-flex;
  justify-content: center;
  margin-top: 0.0625rem; /* 1px */
`;

const TitleText = styled.span`
  display: block;
  white-space: normal;
  line-height: 1.35;
  text-align: left;
`;

export { ComandaButton, IconSlot, TitleText };
