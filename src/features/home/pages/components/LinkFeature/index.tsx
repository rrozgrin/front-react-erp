import { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { LiContainer } from './styled';
import { IconFA } from '../../../../../common/components/Icons/IconFA';

export type Badge = {
    value: number;
    color?: "danger" | "warning" | "primary";
};

type Props = {
    to: string;
    text: string;
    iconName: string;
    badge?: number;
    badges?: Badge[];

    onClick?: () => void;
};


export const LinkFeature = ({
    to,
    text,
    iconName,
    badge,
    badges,
    onClick,
}: Props): ReactElement => {
    return (
        <LiContainer>
            <Link to={to} className="position-relative" onClick={onClick}>
                <IconFA iconName={iconName} className="me-2" />

                {text}

                {/* múltiplos badges */}
                {badges &&
                    badges.map((b, i) => (
                        <span
                            key={i}
                            className={`position-absolute badge rounded-pill bg-${b.color ?? "danger"}`}
                            style={{
                                top: "50%",
                                right: `${8 + i * 26}px`,
                                transform: "translateY(-50%)",
                                fontSize: 11,
                            }}
                        >
                            {b.value}
                        </span>
                    ))}

                {/* badge único */}
                {!badges && badge && (
                    <span className="position-absolute top-50 translate-middle badge rounded-pill bg-danger ms-3">
                        {badge}
                    </span>
                )}
            </Link>
        </LiContainer>
    );
};

