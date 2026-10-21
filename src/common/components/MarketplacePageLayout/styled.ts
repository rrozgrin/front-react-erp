import { NavLink } from 'react-router-dom';
import styled, { css, keyframes } from 'styled-components';

export const MarketplaceShell = styled.div`
    display: grid;
    grid-template-columns: 280px minmax(0, 1fr);
    min-height: calc(100vh - 56px);
    width: 100%;
    overflow-x: clip;
    background:
        radial-gradient(circle at top left, rgba(255, 193, 7, 0.14), transparent 26%),
        linear-gradient(180deg, #fffdf8 0%, #ffffff 22%, #fffaf0 100%);

    @media (max-width: 1080px) {
        grid-template-columns: 1fr;
    }
`;

export const Sidebar = styled.aside`
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 28px 22px;
    background: rgba(255, 255, 255, 0.92);
    border-right: 1px solid rgba(15, 23, 42, 0.08);
    backdrop-filter: blur(18px);

    @media (max-width: 1080px) {
        padding: 20px var(--space-md);
        border-right: none;
        border-bottom: 1px solid rgba(15, 23, 42, 0.08);
    }
`;

export const StoreCard = styled.div`
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 18px var(--space-md);
    border-radius: 24px;
    background: #ffffff;
    box-shadow: 0 18px 40px rgba(148, 163, 184, 0.16);
`;

export const StoreAvatar = styled.div`
    width: var(--control-height-md);
    height: var(--control-height-md);
    border-radius: 1rem;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #111827, #374151);
    color: #ffffff;
    font-size: var(--font-size-xs);
    font-weight: 500;
    flex: 0 0 auto;
`;

export const StoreMeta = styled.div`
    min-width: 0;

    strong,
    span {
        display: block;
    }

    strong {
        color: #111827;
        font-size: var(--font-size-sm);
        line-height: 1.2;
    }

    span {
        margin-top: var(--space-2xs);
        color: #64748b;
        font-size: 0.95rem;
    }
`;

export const MenuBlock = styled.nav`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

export const MenuItemGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: var(--space-xs);
`;

const activeMenuItemStyles = css`
    background: linear-gradient(135deg, rgba(255, 193, 7, 0.18), rgba(255, 235, 180, 0.52));
    color: #111827;
    box-shadow: inset 0 0 0 1px rgba(245, 158, 11, 0.12);
`;

const menuItemStyles = css<{ $active?: boolean; $nested?: boolean }>`
    width: 100%;
    display: flex;
    align-items: center;
    gap: var(--space-sm);
    padding: ${({ $nested }) => ($nested ? 'var(--space-sm) 14px var(--space-sm) 18px' : '14px var(--space-md)')};
    border: none;
    border-radius: var(--space-2xs);
    color: #475569;
    background: ${({ $active }) => ($active ? 'transparent' : 'rgba(255, 255, 255, 0.7)')};
    text-decoration: none;
    font: inherit;
    font-weight: ${({ $active }) => ($active ? 500 : 400)};
    text-align: left;
    transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease, color 0.2s ease;
    cursor: pointer;

    ${({ $active }) => $active && activeMenuItemStyles}

    &:hover {
        transform: translateX(2px);
        color: #111827;
        box-shadow: 0 10px 24px rgba(148, 163, 184, 0.18);
    }
`;

export const MenuButton = styled.button<{ $active?: boolean; $nested?: boolean }>`
    ${menuItemStyles}
`;

export const MenuLink = styled(NavLink) <{ $nested?: boolean }>`
    ${menuItemStyles}

    &.active {
        ${activeMenuItemStyles}
        font-weight: 500;
    }
`;

export const MenuItemIcon = styled.span`
    width: 20px;
    height: 20px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: #111827;
    flex: 0 0 auto;
`;

export const NestedItems = styled.div`
    display: flex;
    flex-direction: column;
    gap: var(--space-xs);
    padding-left: 14px;
    border-left: 1px solid rgba(148, 163, 184, 0.2);
    margin-left: 10px;
`;

export const SupportCard = styled.div`
    margin-top: auto;
    padding: 20px 18px;
    border-radius: 24px;
    background: linear-gradient(180deg, rgba(255, 249, 219, 0.95), rgba(255, 244, 196, 0.95));
    border: 1px solid rgba(245, 158, 11, 0.14);
    box-shadow: 0 18px 36px rgba(245, 158, 11, 0.12);

    h4,
    p {
        margin: 0;
    }

    h4 {
        color: #111827;
        font-size: 1.12rem;
    }

    p {
        margin-top: 10px;
        color: #475569;
        line-height: 1.6;
    }
`;

export const SupportButton = styled.a`
    margin-top: 18px;
    width: 100%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding: 14px var(--space-md);
    border-radius: 1rem;
    background: linear-gradient(135deg, #ffb800, #ffcf33);
    color: #111827;
    font-weight: 500;
    text-decoration: none;
    box-shadow: 0 14px 28px rgba(245, 158, 11, 0.22);
`;

export const MainArea = styled.main`
    min-width: 0;
    padding: 0 var(--space-lg) 28px;
    overflow-x: hidden;

    @media (max-width: 1080px) {
        padding: 0 var(--space-md) var(--space-lg);
    }
`;

export const Banner = styled.header`
    margin: 0 calc(var(--space-lg) * -1) 15px;
    padding: var(--space-md) 28px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 18px;
    background:
        linear-gradient(125deg, #ffc107 0%, #ffd548 46%, #ffcc20 46%, #ffe598 100%);
    border-bottom-left-radius: 8px;
    // border-bottom-right-radius: 12px;
    box-shadow: 10px 5px 12px rgba(121, 105, 39, 0.4);

    @media (max-width: 1080px) {
        margin: 0 calc(16px * -1) 22px;
        padding: 18px 18px 20px;
        border-bottom-left-radius: 22px;
        border-bottom-right-radius: 22px;
        flex-direction: column;
        align-items: flex-start;
    }
`;

export const Brand = styled.div`
    color: #111827;
    font-size: var(--font-size-xs);
    line-height: 1;
    font-weight: 500;
    letter-spacing: -0.05em;

    span {
        font-weight: 500;
    }
`;

export const AccountBadge = styled.div`
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 14px 18px;
    border-radius: var(--radius-pill);
    background: rgba(255, 255, 255, 0.42);
    color: #111827;
    backdrop-filter: blur(10px);
`;

export const AccountInitial = styled.div`
    width: 44px;
    height: 44px;
    border-radius: var(--radius-pill);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: #111827;
    color: #ffffff;
    font-size: var(--font-size-xs);
    font-weight: 500;
`;

export const AccountText = styled.div`
    strong,
    span {
        display: block;
    }

    strong {
        font-size: var(--font-size-sm);
        line-height: 1.2;
    }

    span {
        margin-top: var(--space-2xs);
        font-size: 0.92rem;
    }
`;

export const TopCardsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 18px;
    margin-bottom: 28px;

    @media (max-width: 1260px) {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    @media (max-width: 45rem) {
        grid-template-columns: 1fr;
    }
`;

const newOrderPulse = keyframes`
    0%,
    100% {
        transform: translateY(0);
        box-shadow: 0 20px 40px rgba(148, 163, 184, 0.12);
    }

    50% {
        transform: translateY(-2px);
        box-shadow: 0 24px 48px rgba(239, 68, 68, 0.22);
    }
`;

export const TopCard = styled.section<{ $highlight?: boolean }>`
    display: flex;
    align-items: center;
    gap: 14px;
    min-width: 0;
    padding: 22px 20px;
    border-radius: 24px;
    background: ${({ $highlight }) =>
        $highlight
            ? 'linear-gradient(180deg, rgba(255, 245, 245, 0.98), rgba(255, 255, 255, 0.98))'
            : 'rgba(255, 255, 255, 0.92)'};
    border: 1px solid ${({ $highlight }) => ($highlight ? 'rgba(239, 68, 68, 0.38)' : 'rgba(226, 232, 240, 0.9)')};
    box-shadow: ${({ $highlight }) =>
        $highlight
            ? '0 20px 40px rgba(239, 68, 68, 0.18)'
            : '0 20px 40px rgba(148, 163, 184, 0.12)'};
    animation: ${({ $highlight }) => ($highlight ? css`${newOrderPulse} 1.4s ease-in-out infinite` : 'none')};
`;

export const TopCardIcon = styled.div`
    width: 54px;
    height: 54px;
    border-radius: 18px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: rgba(255, 193, 7, 0.12);
    color: #111827;
    flex: 0 0 auto;
    font-size: 1.4rem;
`;

export const TopCardText = styled.div`
    min-width: 0;

    strong,
    span,
    small {
        display: block;
    }

    strong {
        color: #111827;
        font-size: 1.15rem;
        line-height: 1.2;
    }

    span {
        margin-top: 6px;
        color: #334155;
        font-size: var(--font-size-sm);
        word-break: break-word;
    }

    small {
        margin-top: 6px;
        color: #64748b;
        font-size: 0.9rem;
    }
`;

export const ContentHeader = styled.div`
    margin-bottom: 20px;

    h1,
    p {
        margin: 0;
    }

    h1 {
        color: #111827;
        font-size: clamp(1.85rem, 3vw, 2.5rem);
        line-height: 1.1;
    }

    p {
        margin-top: var(--space-xs);
        color: #475569;
        font-size: 1.02rem;
        line-height: 1.7;
    }
`;
