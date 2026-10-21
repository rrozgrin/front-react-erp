import React, { Fragment } from "react";
import { useLocation } from "react-router-dom";
import {
    Banner,
    Brand,
    MainArea,
    MarketplaceShell,
    MenuBlock,
    MenuButton,
    MenuItemGroup,
    MenuItemIcon,
    MenuLink,
    NestedItems,
    Sidebar,
    StoreAvatar,
    StoreCard,
    StoreMeta,
    SupportButton,
    SupportCard,
    TopCard,
    TopCardIcon,
    TopCardText,
    TopCardsGrid,
} from "./styled";

export interface MarketplaceNavItem {
    label: string;
    href?: string;
    icon?: React.ReactNode;
    onClick?: () => void;
    children?: MarketplaceNavItem[];
}

export interface MarketplaceTopCard {
    title: string;
    value: string;
    caption?: string;
    icon?: React.ReactNode;
    highlight?: boolean;
}

export interface MarketplaceSupportInfo {
    title: string;
    description: string;
    actionLabel: string;
    href: string;
}

interface MarketplacePageLayoutProps {
    brand: React.ReactNode;
    storeName: string;
    storeCode: string;
    accountName: string;
    // accountLabel: string;
    navItems: MarketplaceNavItem[];
    topCards?: MarketplaceTopCard[];
    support?: MarketplaceSupportInfo;
    children: React.ReactNode;
}

const hasActivePath = (pathname: string, item: MarketplaceNavItem): boolean => {
    if (item.href && pathname === item.href) {
        return true;
    }

    return (
        item.children?.some((child) => hasActivePath(pathname, child)) ?? false
    );
};

const getInitials = (value: string) =>
    value
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map((token) => token[0]?.toUpperCase() ?? "")
        .join("") || "MP";

export const MarketplacePageLayout: React.FC<MarketplacePageLayoutProps> = ({
    brand,
    storeName,
    storeCode,
    accountName: _accountName,
    // accountLabel,
    navItems,
    topCards = [],
    support,
    children,
}) => {
    const location = useLocation();

    const renderNavItem = (
        item: MarketplaceNavItem,
        nested = false,
    ): React.ReactNode => {
        const active = hasActivePath(location.pathname, item);
        const label = (
            <>
                {item.icon ? <MenuItemIcon>{item.icon}</MenuItemIcon> : null}
                <span>{item.label}</span>
            </>
        );

        return (
            <Fragment key={item.href || item.label}>
                {item.href ? (
                    <MenuLink to={item.href} $nested={nested}>
                        {label}
                    </MenuLink>
                ) : (
                    <MenuButton
                        type="button"
                        onClick={item.onClick}
                        $active={active}
                        $nested={nested}
                    >
                        {label}
                    </MenuButton>
                )}

                {item.children?.length ? (
                    <NestedItems>
                        {item.children.map((child) =>
                            renderNavItem(child, true),
                        )}
                    </NestedItems>
                ) : null}
            </Fragment>
        );
    };

    return (
        <MarketplaceShell>
            <Sidebar>
                <StoreCard>
                    <StoreAvatar>{getInitials(storeName)}</StoreAvatar>
                    <StoreMeta>
                        <strong>{storeName}</strong>
                        <span>{storeCode}</span>
                    </StoreMeta>
                </StoreCard>

                <MenuBlock>
                    {navItems.map((item) => (
                        <MenuItemGroup key={item.href || item.label}>
                            {renderNavItem(item)}
                        </MenuItemGroup>
                    ))}
                </MenuBlock>

                {support ? (
                    <SupportCard>
                        <h4>{support.title}</h4>
                        <p>{support.description}</p>
                        <SupportButton
                            href={support.href}
                            target="_blank"
                            rel="noreferrer"
                        >
                            {support.actionLabel}
                        </SupportButton>
                    </SupportCard>
                ) : null}
            </Sidebar>

            <MainArea>
                <Banner>
                    <Brand>{brand}</Brand>
                </Banner>

                {topCards.length ? (
                    <TopCardsGrid>
                        {topCards.map((card) => (
                            <TopCard
                                key={card.title}
                                $highlight={card.highlight}
                            >
                                {card.icon ? (
                                    <TopCardIcon>{card.icon}</TopCardIcon>
                                ) : null}
                                <TopCardText>
                                    <strong>{card.title}</strong>
                                    <span>{card.value}</span>
                                    {card.caption ? (
                                        <small>{card.caption}</small>
                                    ) : null}
                                </TopCardText>
                            </TopCard>
                        ))}
                    </TopCardsGrid>
                ) : null}

                {children}
            </MainArea>
        </MarketplaceShell>
    );
};
