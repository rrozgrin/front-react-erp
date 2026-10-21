import {
    FiBox,
    FiClipboard,
    FiGrid,
    FiLock,
    FiSettings,
    FiShoppingBag,
} from "react-icons/fi";
import type { MarketplaceNavItem } from "../../../common/components/MarketplacePageLayout";

export const food99NavItems: MarketplaceNavItem[] = [
    {
        label: "Pedidos 99Food",
        href: "/food99/pedidos",
        icon: <FiClipboard />,
    },
    {
        label: "Cardápio 99Food",
        href: "/food99/cardapio",
        icon: <FiShoppingBag />,
        children: [
            {
                label: "Catálogo",
                href: "/food99/cardapio/catalogo",
                icon: <FiGrid />,
            },
            {
                label: "Itens do catálogo",
                href: "/food99/cardapio/itens",
                icon: <FiBox />,
            },
        ],
    },
    {
        label: "Autenticação",
        href: "/food99/autenticacao",
        icon: <FiLock />,
    },
    {
        label: "Configurações",
        href: "/food99/configuracoes",
        icon: <FiSettings />,
    },
];
