import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { VisibilityState } from "@tanstack/react-table";
import styled from "styled-components";
import { FiSliders } from "react-icons/fi";
import { Botao } from "../Buttons/Botao";
import { Checkbox } from "../Ui";
import type { TableField } from "../Table";

interface ConfigTableProps<TData> {
    fields: TableField<TData>[];
    columnVisibility: VisibilityState;
    onColumnVisibilityChange: (nextVisibility: VisibilityState) => void;
}

type ConfigPanelPlacement = "left" | "right";

export function createTableColumnVisibility<TData>(
    fields: TableField<TData>[],
): VisibilityState {
    return fields.reduce<VisibilityState>((accumulator, field) => {
        accumulator[field.id] = field.defaultVisible ?? true;
        return accumulator;
    }, {});
}

export function ConfigTable<TData>({
    fields,
    columnVisibility,
    onColumnVisibilityChange,
}: ConfigTableProps<TData>) {
    const [open, setOpen] = useState(false);
    const [panelPlacement, setPanelPlacement] =
        useState<ConfigPanelPlacement>("left");
    const configWrapRef = useRef<HTMLDivElement>(null);

    const hideableFields = useMemo(
        () => fields.filter((field) => field.canHide ?? true),
        [fields],
    );

    const visibleHideableFields = hideableFields.filter(
        (field) => columnVisibility[field.id] ?? true,
    );

    const updatePanelPlacement = useCallback(() => {
        if (!configWrapRef.current) {
            return;
        }

        const buttonPosition = configWrapRef.current.getBoundingClientRect();
        const buttonCenter = buttonPosition.left + buttonPosition.width / 2;
        const isOnLeftSide = buttonCenter <= window.innerWidth / 2;

        setPanelPlacement(isOnLeftSide ? "right" : "left");
    }, []);

    useEffect(() => {
        if (!open) {
            return undefined;
        }

        updatePanelPlacement();
        window.addEventListener("resize", updatePanelPlacement);

        return () => window.removeEventListener("resize", updatePanelPlacement);
    }, [open, updatePanelPlacement]);

    const handleToggleField = (fieldId: string) => {
        const isVisible = columnVisibility[fieldId] ?? true;

        if (isVisible && visibleHideableFields.length <= 1) {
            return;
        }

        onColumnVisibilityChange({
            ...columnVisibility,
            [fieldId]: !isVisible,
        });
    };

    if (hideableFields.length === 0) {
        return null;
    }

    return (
        <ConfigWrap ref={configWrapRef} data-print-hidden="true">
            <Botao
                nome={`${visibleHideableFields.length} coluna(s)`}
                icone={<FiSliders />}
                action={() => {
                    if (!open) {
                        updatePanelPlacement();
                    }

                    setOpen((current) => !current);
                }}
                ariaLabel="Configurar colunas visiveis"
            />

            {open && (
                <ConfigPanel $placement={panelPlacement}>
                    <ConfigHeader>
                        <strong>Colunas</strong>
                    </ConfigHeader>

                    <ConfigList>
                        {hideableFields.map((field) => {
                            const isVisible =
                                columnVisibility[field.id] ?? true;
                            const isLastVisible =
                                isVisible && visibleHideableFields.length <= 1;

                            return (
                                <ConfigOption key={field.id}>
                                    <Checkbox
                                        checked={isVisible}
                                        disabled={isLastVisible}
                                        onChange={() =>
                                            handleToggleField(field.id)
                                        }
                                    />
                                    <span>{field.header}</span>
                                </ConfigOption>
                            );
                        })}
                    </ConfigList>
                </ConfigPanel>
            )}
        </ConfigWrap>
    );
}

const ConfigWrap = styled.div`
    position: relative;
    display: inline-flex;
    align-items: center;
    gap: var(--space-xs);
    width: fit-content;
    margin: 0;
    align-self: center;
`;

const ConfigPanel = styled.div<{ $placement: ConfigPanelPlacement }>`
    position: absolute;
    top: calc(100% + var(--space-xs));
    ${({ $placement }) => ($placement === "right" ? "left: 0;" : "right: 0;")}
    z-index: 20;
    width: min(22rem, calc(100vw - 2rem));
    max-width: calc(100vw - 2rem);
    border: 1px solid var(--theme-border, #dbe1ea);
    border-radius: 0.1875rem;
    background: var(--theme-surface, #ffffff);
    box-shadow: var(--shadow-panel-strong);
    padding: var(--space-md);

    @media (max-width: 767px) {
        position: fixed;
        top: auto;
        right: var(--space-sm);
        left: var(--space-sm);
        width: auto;
        max-width: none;
    }
`;

const ConfigHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: var(--space-sm);
    color: #000;
    font-size: var(--font-size-xs);
`;

const ConfigList = styled.div`
    display: grid;
    gap: var(--space-xs);
    max-height: 18rem;
    overflow-y: auto;
    font-weight: 400;
`;

const ConfigOption = styled.label`
    display: flex;
    align-items: center;
    gap: var(--space-sm);
    min-height: 1.75rem;
    color: #000;
    font-size: var(--font-size-xs);
    cursor: pointer;

    span {
        font-weight: 400;
    }

    &:has(input:disabled) {
        cursor: not-allowed;
        opacity: 0.65;
    }
`;
