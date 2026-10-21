import React, { memo, useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { MdOutlineClose } from "react-icons/md";
import { IoIosArrowForward } from "react-icons/io";

import { FiChevronDown, FiChevronRight } from 'react-icons/fi';
import {
    SidebarWrapper,
    SidebarHeader,
    SidebarTitle,
    CloseMenuButton,
    ToggleButton,
    MenuContainer,
    SectionWrapper,
    SectionTitle,
    SectionToggle,
    ToggleIndicator,
    PageList,
    PageButton,
    PageExpandButton,
    PageItemRow,
    PageLink,
    SubPageList,
} from './styled';

interface Page {
    titulo: string;
    href?: string;
    icone?: string;
    action?: () => void;
    children?: Page[];
}

interface Section {
    titulo?: string;
    paginas: Page[];
}

interface SideMenuPagesProps {
    secoes: Section[];
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    showToggle?: boolean;
}

const SideMenuPagesComponent: React.FC<SideMenuPagesProps> = ({ secoes, open, setOpen, showToggle = true }) => {
    const location = useLocation();
    const [menuMontado, setMenuMontado] = useState(false);
    const [closedSections, setClosedSections] = useState<Record<string, boolean>>({});
    const [openPages, setOpenPages] = useState<Record<string, boolean>>({});
    const handleOpen = useCallback(() => setOpen(true), [setOpen]);
    const handleClose = useCallback(() => setOpen(false), [setOpen]);
    const handleToggleSection = useCallback((sectionKey: string) => {
        setClosedSections((prev) => ({
            ...prev,
            [sectionKey]: !prev[sectionKey],
        }));
    }, []);
    const handleTogglePage = useCallback((pageKey: string) => {
        setOpenPages((prev) => ({
            ...prev,
            [pageKey]: !prev[pageKey],
        }));
    }, []);

    useEffect(() => {
        if (open) {
            setMenuMontado(true);
        }
    }, [open]);

    const isCurrentPath = useCallback((href?: string) => {
        if (!href) {
            return false;
        }

        return location.pathname === href;
    }, [location.pathname]);

    const hasActiveChild = useCallback((pagina: Page): boolean => {
        if (isCurrentPath(pagina.href)) {
            return true;
        }

        return pagina.children?.some((child) => hasActiveChild(child)) ?? false;
    }, [isCurrentPath]);

    const renderPageItem = (pagina: Page, pageKey: string): React.ReactNode => {
        const hasChildren = Boolean(pagina.children?.length);
        const active = isCurrentPath(pagina.href);
        const childOpen = openPages[pageKey] ?? hasActiveChild(pagina);
        const label = (
            <>
                {pagina.icone && <img src={pagina.icone} alt="" />}
                {pagina.titulo}
            </>
        );

        if (hasChildren) {
            const mainItem = pagina.href ? (
                <PageLink
                    to={pagina.href}
                    $active={active}
                    onClick={(event) => {
                        if (pagina.action) {
                            event.preventDefault();
                            pagina.action();
                        }
                    }}
                >
                    {label}
                </PageLink>
            ) : (
                <PageButton
                    type="button"
                    $active={active}
                    onClick={() => {
                        if (pagina.action) {
                            pagina.action();
                            return;
                        }

                        handleTogglePage(pageKey);
                    }}
                >
                    {label}
                </PageButton>
            );

            return (
                <React.Fragment key={pageKey}>
                    <PageItemRow>
                        {mainItem}
                        <PageExpandButton
                            type="button"
                            $open={childOpen}
                            aria-expanded={childOpen}
                            aria-label={`${childOpen ? 'Fechar' : 'Abrir'} opções de ${pagina.titulo}`}
                            onClick={() => handleTogglePage(pageKey)}
                        >
                            {childOpen ? <FiChevronDown /> : <FiChevronRight />}
                        </PageExpandButton>
                    </PageItemRow>
                    <SubPageList $open={childOpen}>
                        {pagina.children?.map((child, childIndex) => renderPageItem(child, `${pageKey}-${childIndex}`))}
                    </SubPageList>
                </React.Fragment>
            );
        }

        if (pagina.href) {
            return (
                <PageLink
                    key={pageKey}
                    to={pagina.href}
                    $active={active}
                    onClick={(event) => {
                        if (pagina.action) {
                            event.preventDefault();
                            pagina.action();
                        }
                    }}
                >
                    {label}
                </PageLink>
            );
        }

        return (
            <PageButton
                key={pageKey}
                type="button"
                $active={active}
                onClick={() => {
                    pagina.action?.();
                }}
            >
                {label}
            </PageButton>
        );
    };

    return (
        <>
            {showToggle && !open && (
                <ToggleButton onClick={handleOpen} aria-label="Abrir menu lateral">
                    <IoIosArrowForward size={22} />
                </ToggleButton>
            )}

            <SidebarWrapper open={open}>
                <SidebarHeader>
                    <SidebarTitle>Menu da pagina</SidebarTitle>
                    <CloseMenuButton type="button" onClick={handleClose} aria-label="Fechar menu lateral">
                        <MdOutlineClose size={20} />
                    </CloseMenuButton>
                </SidebarHeader>

                {menuMontado && <MenuContainer>
                    {secoes.map((secao, idx) => (
                        <SectionWrapper key={`${secao.titulo || 'Outros'}-${idx}`}>
                            {(() => {
                                const sectionTitle = secao.titulo || 'Outros';
                                const sectionKey = `${sectionTitle}-${idx}`;
                                const sectionOpen = !closedSections[sectionKey];

                                return (
                                    <>
                                        <SectionToggle
                                            type="button"
                                            aria-expanded={sectionOpen}
                                            aria-controls={`side-menu-section-${idx}`}
                                            onClick={() => handleToggleSection(sectionKey)}
                                        >
                                            <SectionTitle>{sectionTitle}</SectionTitle>
                                            <ToggleIndicator $open={sectionOpen}>{sectionOpen ? <FiChevronDown /> : <FiChevronRight />}</ToggleIndicator>
                                        </SectionToggle>

                                        <PageList id={`side-menu-section-${idx}`} $open={sectionOpen}>
                                            {secao.paginas.map((pagina, i) => renderPageItem(pagina, `${sectionKey}-${i}`))}
                                        </PageList>
                                    </>
                                );
                            })()}
                        </SectionWrapper>
                    ))}
                </MenuContainer>}
            </SidebarWrapper>
        </>
    );
};

export const SideMenuPages = memo(SideMenuPagesComponent);
