import styled from "styled-components";
import { Input } from "../../../../common/components/Ui";

const COLORS = {
    primary: "#105D92",
    primaryDark: "#0d4e7a",
    text: "#5d7183",
    lightText: "#666",
    lightBg: "rgba(16, 93, 146, 0.06)",
    borderLight: "rgba(16, 93, 146, 0.16)",
    error: "#b42318",
};

const PageShell = styled.div<{ $backgroundImage: string }>`
  min-height: 100vh;
  display: flex;
  justify-content: flex-end;
  background-image: ${({ $backgroundImage }) => `url(${$backgroundImage})`};
  background-size: cover;
  background-position: center;

  @media (min-width: 900px) {
    height: 100dvh;
    min-height: 0;
    overflow: hidden;
  }
`;

const PageColumn = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: flex-end;

  @media (min-width: 900px) {
    width: auto;
    height: 100dvh;
    min-height: 0;
    padding-inline: 16px;
  }
`;

const LoginPanel = styled.div`
  width: 100%;
  max-width: 430px;
  min-height: 100vh;
  background: #fff;
  display: flex;
  flex-direction: column;
  padding: var(--space-xl) var(--space-lg);

  @media (min-width: 600px) {
    padding-inline: 40px;
  }

  @media (min-width: 900px) {
    height: 100dvh;
    min-height: 0;
    overflow: hidden;
    padding-block: clamp(14px, 3.3vh, 32px);
    box-shadow: -16px 0 40px rgba(0, 0, 0, 0.08);
  }
`;

const QuickLinksWrap = styled.div`
  margin-bottom: var(--space-xl);

  @media (min-width: 900px) {
    margin-bottom: clamp(8px, 3.5vh, 40px);
  }
`;

const QuickLinksRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2xs);
`;

const QuickLinkButton = styled.button`
  min-height: 33px;
  padding-inline: 8px;
  border: 0;
  border-radius: var(--radius-sm);
  background: transparent;
  font: inherit;
  font-size: 0.89rem;
  color: ${COLORS.text};
  cursor: pointer;
  transition: background-color 0.2s ease, color 0.2s ease;

  &:hover {
    background-color: ${COLORS.lightBg};
    color: ${COLORS.primary};
  }
`;

const QuickLinkAnchor = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding-inline: 8px;
  min-width: auto;
  min-height: 33px;
  border-radius: var(--radius-sm);
  text-decoration: none;
  font-size: 0.89rem;
  color: ${COLORS.text};
  transition: background-color 0.2s ease, color 0.2s ease;

  &:hover {
    background-color: ${COLORS.lightBg};
    color: ${COLORS.primary};
  }
`;

const Logo = styled.img`
  width: 100%;
  max-width: 290px;
  margin: 0 auto var(--space-lg);

  @media (min-width: 900px) {
    max-width: clamp(170px, 26vh, 290px);
    margin-bottom: clamp(10px, 2.6vh, var(--space-lg));
  }
`;

const FormSection = styled.div`
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Title = styled.h1`
  color: ${COLORS.primary};
  margin: 0;
  font-size: var(--font-size-xs);
  line-height: 1.1;
  font-weight: 500;

  @media (min-width: 900px) {
    font-size: clamp(1.65rem, 4.8vh, 2.8rem);
  }
`;

const Subtitle = styled.p.attrs({ 'data-app-title': true })`
  font-size: 0.82rem;
  color: ${COLORS.lightText};
  margin-top: 0.8rem;
  margin-bottom: var(--space-xl);

  @media (min-width: 900px) {
    margin-top: clamp(0.45rem, 1.3vh, 0.8rem);
    margin-bottom: clamp(0.8rem, 3vh, var(--space-xl));
  }
`;

const FormFields = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-md);

  @media (min-width: 900px) {
    gap: clamp(8px, 1.8vh, 16px);
  }
`;

const FieldWrap = styled.label`
  display: flex;
  flex-direction: column;
  gap: 6px;
  color: ${COLORS.text};
  font-size: 0.82rem;
  font-weight: 600;
`;

const TextInput = styled(Input)`
  min-height: 56px;
  padding: var(--space-md) 14px;
  border: 1px solid rgba(0, 0, 0, 0.23);
  border-radius: var(--radius-sm);
  background: #fff;
  color: #1f2933;
  font: inherit;
  font-size: var(--font-size-sm);
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &:focus {
    border-color: ${COLORS.primary};
    box-shadow: 0 0 0 1px ${COLORS.primary};
    outline: none;
  }

  @media (min-width: 900px) {
    min-height: clamp(var(--control-height-sm), 6.4vh, 56px);
    padding-block: clamp(10px, 1.8vh, 16px);
  }
`;

const PasswordFieldWrap = styled.div`
  position: relative;
`;

const TogglePasswordButton = styled.button`
  position: absolute;
  right: 8px;
  bottom: 8px;
  min-width: auto;
  padding: var(--space-9calc(6px * -1));
  border: 0;
  background: transparent;
  color: ${COLORS.text};
  cursor: pointer;

  @media (min-width: 900px) {
    bottom: clamp(4px, 1vh, 8px);
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  min-height: var(--control-height-md);
  border: 0;
  border-radius: var(--radius-sm);
  background-color: ${COLORS.primary};
  padding-block: 12.8px;
  font-weight: 500;
  font-size: var(--font-size-xs);
  color: #fff;
  cursor: pointer;
  transition: background-color 0.2s ease, opacity 0.2s ease;

  @media (min-width: 900px) {
    min-height: clamp(40px, 5.8vh, var(--control-height-md));
    padding-block: clamp(9px, 1.8vh, 12.8px);
  }

  &:hover {
    background-color: ${COLORS.primaryDark};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.7;
  }
`;

const ClientButton = styled.button`
  min-height: var(--control-height-sm);
  padding-inline: 16px;
  border: 1px solid ${COLORS.borderLight};
  border-radius: var(--radius-sm);
  background: transparent;
  font: inherit;
  font-weight: 500;
  font-size: var(--font-size-xs);
  color: ${COLORS.primary};
  cursor: pointer;
  transition: border-color 0.2s ease, background-color 0.2s ease;

  @media (min-width: 900px) {
    min-height: clamp(34px, 5vh, var(--control-height-sm));
  }

  &:hover {
    border-color: rgba(16, 93, 146, 0.24);
    background-color: ${COLORS.lightBg};
  }
`;

const ErrorMessage = styled.p`
  margin: 0;
  color: ${COLORS.error};
  font-size: 0.85rem;
`;

const Footer = styled.div`
  font-size: 0.72rem;
  color: ${COLORS.lightText};
  text-align: center;
  margin-top: var(--space-xl);
  line-height: 1.4;

  @media (min-width: 900px) {
    margin-top: clamp(10px, 3vh, 32px);
    line-height: 1.25;
  }
`;

const FooterLine = styled.p`
  margin: var(--space-xs) 0;

  @media (min-width: 900px) {
    margin-block: clamp(0.18rem, 0.8vh, 0.5rem);
  }
`;

const FooterLink = styled.a`
  color: ${COLORS.primary};
  text-decoration: none;
  font-weight: 500;
`;

export {
    ClientButton,
    ErrorMessage,
    FieldWrap,
    Footer,
    FooterLine,
    FooterLink,
    FormFields,
    FormSection,
    LoginPanel,
    Logo,
    PageColumn,
    PageShell,
    PasswordFieldWrap,
    QuickLinkAnchor,
    QuickLinkButton,
    QuickLinksRow,
    QuickLinksWrap,
    SubmitButton,
    Subtitle,
    TextInput,
    Title,
    TogglePasswordButton,
};
