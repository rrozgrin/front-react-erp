import { useEffect, useState } from 'react';
import type { Dispatch, ReactNode, RefObject, SetStateAction } from 'react';
import { useLocation } from 'react-router-dom';
import { SideMenuPages } from '../SideMenuPages';
import { Titulos, type BreadcrumbItem } from '../Titulo';
import {
    PageContent,
    PageHeader,
    PageShell,
    PageTitleArea,
    PageTitleRow,
    TableSection,
    Toolbar,
} from './styled';

export interface PageLayoutMenuItem {
    titulo: string;
    href?: string;
    icone?: string;
    action?: () => void;
    children?: PageLayoutMenuItem[];
}

export interface PageLayoutMenuSection {
    titulo?: string;
    paginas: PageLayoutMenuItem[];
}

interface PageLayoutProps {
    title: string;
    breadcrumbs?: BreadcrumbItem[];
    sections?: PageLayoutMenuSection[];
    menuOpen?: boolean;
    setMenuOpen?: Dispatch<SetStateAction<boolean>>;
    toolbar?: ReactNode;
    titlePrefix?: ReactNode;
    contentRef?: RefObject<HTMLDivElement | null>;
    children: ReactNode;
}

export const PageLayout = ({
    title,
    breadcrumbs,
    sections,
    menuOpen: controlledMenuOpen,
    setMenuOpen: setControlledMenuOpen,
    toolbar,
    titlePrefix,
    contentRef,
    children,
}: PageLayoutProps) => {
    const location = useLocation();
    const [internalMenuOpen, setInternalMenuOpen] = useState(false);
    const [previewMenuOpen, setPreviewMenuOpen] = useState(() => Boolean(sections?.length));
    const [menuTouched, setMenuTouched] = useState(false);
    const menuOpen = controlledMenuOpen ?? internalMenuOpen;
    const effectiveMenuOpen = Boolean(sections?.length) && (menuOpen || previewMenuOpen);
    const updateMenuOpen: Dispatch<SetStateAction<boolean>> = (value) => {
        setMenuTouched(true);
        setPreviewMenuOpen(false);
        const nextValue = typeof value === 'function' ? value(menuOpen) : value;
        (setControlledMenuOpen ?? setInternalMenuOpen)(nextValue);
    };

    useEffect(() => {
        setMenuTouched(false);
    }, [location.key]);

    useEffect(() => {
        if (!sections?.length || menuOpen || menuTouched) {
            setPreviewMenuOpen(false);
            return;
        }

        setPreviewMenuOpen(true);
        const timeoutId = window.setTimeout(() => setPreviewMenuOpen(false), 1000);

        return () => window.clearTimeout(timeoutId);
    }, [location.key, menuOpen, menuTouched, sections?.length]);

    return (
        <PageShell $menuOpen={effectiveMenuOpen}>
            <PageContent $menuOpen={effectiveMenuOpen}>
                <PageHeader>
                    {sections?.length ? <SideMenuPages secoes={sections} open={effectiveMenuOpen} setOpen={updateMenuOpen} showToggle={false} /> : null}
                    <PageTitleArea>
                        {titlePrefix ? (
                            <PageTitleRow>
                                {titlePrefix}
                                <Titulos
                                    titulo={title}
                                    caminhos={breadcrumbs}
                                    showMenuButton={Boolean(sections?.length)}
                                    menuOpen={menuOpen}
                                    onToggleMenu={() => updateMenuOpen((current) => !current)}
                                />
                            </PageTitleRow>
                        ) : (
                            <Titulos
                                titulo={title}
                                caminhos={breadcrumbs}
                                showMenuButton={Boolean(sections?.length)}
                                menuOpen={menuOpen}
                                onToggleMenu={() => updateMenuOpen((current) => !current)}
                            />
                        )}
                    </PageTitleArea>
                </PageHeader>

                {toolbar ? <Toolbar>{toolbar}</Toolbar> : null}

                <TableSection ref={contentRef}>
                    {children}
                </TableSection>
            </PageContent>
        </PageShell>
    );
};
