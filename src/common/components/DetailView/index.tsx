import type { ReactNode } from 'react';
import styled from 'styled-components';

export interface DetailProfileBadge {
    icon?: ReactNode;
    label: ReactNode;
}

interface DetailProfileCardProps {
    name: string;
    imageUrl?: string;
    imageAlt?: string;
    badges?: DetailProfileBadge[];
}

const ProfileRoot = styled.div`
    width: 100%;
    display: grid;
    justify-items: center;
`;

const ProfileAvatar = styled.div`
    width: min(100%, 110px);
    aspect-ratio: 1.08 / 1;
    border-radius: 0.125rem;
    overflow: hidden;
    background: linear-gradient(145deg, #438af6 0%, #2f70da 100%);
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 8px 20px rgba(47, 112, 218, 0.16);
    color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: clamp(2.7rem, 5vw, 3.5rem);
    font-weight: 400;
    letter-spacing: 0.03em;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;

const ProfileName = styled.h2`
    margin: 10px 0;
    font-size: 16px;
    line-height: 1.15;
    font-weight: 500;
    color: #1f2d45;
    text-align: center;
    overflow-wrap: anywhere;
`;

const ProfileBadges = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: 6px;
`;

const ProfileBadge = styled.span`
    display: inline-flex;
    align-items: center;
    gap: 6px;
    min-height: 30px;
    padding: 4px 13px;
    border-radius: 999px;
    background: linear-gradient(180deg, #eef5ff 0%, #e2edff 100%);
    color: var(--color-main, var(--bs-primary));
    font-size: var(--font-size-sm);
    line-height: 1;
    white-space: nowrap;

    svg {
        flex: 0 0 auto;
        font-size: var(--font-size-sm);
    }
`;

function getInitials(name: string): string {
    const words = name.trim().split(/\s+/).filter(Boolean);

    if (!words.length) {
        return '--';
    }

    if (words.length === 1) {
        return words[0].slice(0, 2).toUpperCase();
    }

    return `${words[0][0] ?? ''}${words[1][0] ?? ''}`.toUpperCase();
}

export const DetailProfileCard = ({ name, imageUrl, imageAlt, badges = [] }: DetailProfileCardProps) => (
    <ProfileRoot>
        <ProfileAvatar>
            {imageUrl ? <img src={imageUrl} alt={imageAlt || name} /> : getInitials(name)}
        </ProfileAvatar>
        <ProfileName>{name}</ProfileName>
        {badges.length > 0 && (
            <ProfileBadges>
                {badges.map((badge, index) => (
                    <ProfileBadge key={`${String(badge.label)}-${index}`}>
                        {badge.icon}
                        {badge.label}
                    </ProfileBadge>
                ))}
            </ProfileBadges>
        )}
    </ProfileRoot>
);

export const HeaderActions = styled.div`
    margin-left: auto;
    display: flex;
    align-items: center;
    gap: var(--space-xs);
    flex-wrap: wrap;

    button {
        min-height: 34px;
    }
`;

export const MainCard = styled.div`
    box-sizing: border-box;
    width: 100%;
    max-width: 100%;
    margin-inline: auto;
    padding: 0;
    border-radius: 0.125rem;
    background: #f7f8fa;
`;

export const TopGrid = styled.div`
    width: 100%;
    min-width: 0;
    display: grid;
    grid-template-columns: 280px minmax(0, 1fr);
    gap: var(--space-sm);
    align-items: start;

    @media (max-width: 960px) {
        grid-template-columns: 1fr;
    }
`;

export const FotoColumn = styled.aside`
    padding: 15px 24px 2px;
    border: 1px solid #edf0f5;
    border-radius: 0.125rem;
    background: #ffffff;
    box-shadow: 0 3px 14px rgba(31, 45, 69, 0.07);
    display: flex;
    flex-direction: column;
    gap: 10px;

    @media (max-width: 960px) {
        max-width: none;
    }
`;

export const QuickInfo = styled.dl`
    width: 100%;
    margin: 0px 0 0;
    display: grid;
`;

export const QuickItem = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2px;
    padding: 6px 0;
    color: #22324d;
    border-bottom: 1px solid #e9edf3;

    &:last-child {
        border-bottom: 0;
    }

    dt {
        font-size: var(--font-size-sm);
        letter-spacing: 0;
        color: #22324d;
        font-weight: 500;
    }

    dd {
        margin: 0;
        font-size: var(--font-size-sm);
        line-height: 1.45;
        font-weight: 400;
        color: #34435d;
        overflow-wrap: anywhere;
    }
`;

export const SectionsColumn = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
    min-width: 0;
`;

export const SectionBlock = styled.section`
    border: 1px solid #edf0f5;
    border-radius: 0.125rem;
    background: #ffffff;
    box-shadow: 0 3px 14px rgba(31, 45, 69, 0.07);
    overflow: hidden;
`;

export const SectionHeader = styled.header`
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 14px;
    min-height: 42px;
    padding: 0px 24px;
    background: #ffffff;
    border-bottom: 1px solid #e9edf3;

    > .icon,
    > svg {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        flex: 0 0 auto;
        font-size: 16px;
        line-height: 1;
        color: var(--color-main, var(--bs-primary));
    }

    h3 {
        margin: 0;
        font-size: var(--font-size-xs);
        line-height: 1.25;
        font-weight: 500;
        letter-spacing: 0;
        color: #1f2d45;
    }

    @media (max-width: 600px) {
        gap: 10px;
        padding: 14px 16px;
    }
`;

export const FieldsGrid = styled.dl`
    margin: 0;
    padding: 15px 0 2px;
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));

    @media (max-width: 1180px) {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    @media (max-width: 600px) {
        grid-template-columns: 1fr;
    }
`;

export const FieldCard = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1px;
    margin-bottom: 12px;
    padding: 0 24px 2px;
    border-left: 1px solid #e9edf3;

    &:nth-child(3n + 1) {
        border-left: 0;
    }

    dt {
        font-size: var(--font-size-xs);
        line-height: 0.35;
        letter-spacing: 0;
        color: #22324d;
        font-weight: 500;
    }

    dd {
        margin: 0;
        font-size: var(--font-size-sm);
        line-height: 2;
        font-weight: 400;
        color: #34435d;
        overflow-wrap: anywhere;
    }

    @media (max-width: 1180px) {
        &:nth-child(3n + 1) {
            border-left: 1px solid #e9edf3;
        }

        &:nth-child(2n + 1) {
            border-left: 0;
        }
    }

    @media (max-width: 600px) {
        border-left: 0 !important;
        min-height: auto;
        padding-bottom: 14px;
    }
`;

export const EmptyState = styled.div`
    padding: var(--space-xl);
    text-align: center;
    color: #34435d;
    border-radius: 0.125rem;
    border: 1px dashed #cfd8e5;
    background: #ffffff;
`;
