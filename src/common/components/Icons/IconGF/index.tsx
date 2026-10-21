import { ReactElement } from "react";
import type { IconType } from "react-icons";
import {
    MdAddBox,
    MdAssignmentAdd,
    MdAssignmentTurnedIn,
    MdBadge,
    MdBarcodeReader,
    MdChat,
    MdContentPasteSearch,
    MdConveyorBelt,
    MdEditDocument,
    MdEditNote,
    MdEditSquare,
    MdFactCheck,
    MdInbox,
    MdLanguage,
    MdLocalAtm,
    MdManageSearch,
    MdPayments,
    MdPhone,
    MdPriceChange,
    MdQueryStats,
    MdSettings,
    MdWallet,
    MdOutlineAccountBalanceWallet,
    MdOutlineAccountBox,
    MdOutlineBook,
    MdOutlineBuild,
    MdOutlineBusinessCenter,
    MdOutlineCampaign,
    MdOutlineContactMail,
    MdOutlineCreditCard,
    MdOutlineDirectionsCar,
    MdOutlineDownload,
    MdOutlineEvent,
    MdOutlineFindInPage,
    MdOutlineFolderOpen,
    MdOutlineGavel,
    MdOutlineGroup,
    MdOutlineHandyman,
    MdOutlineHistoryEdu,
    MdOutlineListAlt,
    MdOutlineLocalActivity,
    MdOutlineLocalPizza,
    MdOutlineLoyalty,
    MdOutlineManageAccounts,
    MdOutlineMap,
    MdOutlineMarkEmailUnread,
    MdOutlineNoteAlt,
    MdOutlinePermContactCalendar,
    MdOutlinePersonRemove,
    MdOutlinePointOfSale,
    MdOutlinePriceCheck,
    MdOutlineRequestQuote,
    MdOutlineSms,
    MdOutlineStorefront,
    MdOutlineThumbDown,
} from "react-icons/md";
import { IconWrap } from "./styled";

type Props = {
    iconName: string;
    iconSize?: number;
    className?: string;
};

const iconMap: Record<string, IconType> = {
    account_balance_wallet: MdOutlineAccountBalanceWallet,
    account_box: MdOutlineAccountBox,
    approval_delegation: MdAssignmentTurnedIn,
    assignment_add: MdAssignmentAdd,
    barcode: MdBarcodeReader,
    book: MdOutlineBook,
    box_add: MdAddBox,
    build: MdOutlineBuild,
    business_center: MdOutlineBusinessCenter,
    campaign: MdOutlineCampaign,
    chat: MdChat,
    captive_portal: MdLanguage,
    checkbook: MdWallet,
    conditions: MdFactCheck,
    contact_mail: MdOutlineContactMail,
    content_paste_search: MdContentPasteSearch,
    contract_edit: MdEditNote,
    conveyor_belt: MdConveyorBelt,
    credit_card: MdOutlineCreditCard,
    delivery_truck_speed: MdOutlineDirectionsCar,
    directions_car: MdOutlineDirectionsCar,
    download: MdOutlineDownload,
    edit_document: MdEditDocument,
    edit_square: MdEditSquare,
    event_upcoming: MdOutlineEvent,
    finance: MdQueryStats,
    find_in_page: MdOutlineFindInPage,
    folder_open: MdOutlineFolderOpen,
    gavel: MdOutlineGavel,
    group: MdOutlineGroup,
    group_search: MdManageSearch,
    handyman: MdOutlineHandyman,
    history_edu: MdOutlineHistoryEdu,
    id_card: MdBadge,
    list_alt: MdOutlineListAlt,
    local_activity: MdOutlineLocalActivity,
    local_atm: MdLocalAtm,
    local_pizza: MdOutlineLocalPizza,
    loyalty: MdOutlineLoyalty,
    manage_accounts: MdOutlineManageAccounts,
    map: MdOutlineMap,
    mark_email_unread: MdOutlineMarkEmailUnread,
    note_alt: MdOutlineNoteAlt,
    payments: MdPayments,
    perm_contact_calendar: MdOutlinePermContactCalendar,
    person_remove: MdOutlinePersonRemove,
    phone: MdPhone,
    point_of_sale: MdOutlinePointOfSale,
    price_change: MdPriceChange,
    price_check: MdOutlinePriceCheck,
    request_quote: MdOutlineRequestQuote,
    service_toolbox: MdOutlineHandyman,
    settings: MdSettings,
    sms: MdOutlineSms,
    stacked_inbox: MdInbox,
    storefront: MdOutlineStorefront,
    thumb_down: MdOutlineThumbDown,
    universal_currency_alt: MdOutlineCreditCard,
    wallet: MdWallet,
};

export const IconGF = ({
    iconName,
    iconSize,
    className,
}: Props): ReactElement | null => {
    const size = iconSize || 24;
    const SvgIcon = iconMap[iconName];

    if (SvgIcon) {
        return (
            <IconWrap className={className} $size={size}>
                <SvgIcon size={size} />
            </IconWrap>
        );
    }

    return null;
};
