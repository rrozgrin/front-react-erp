import { Button } from "react-bootstrap";
import { FaFileExcel } from "react-icons/fa";
import styled from "styled-components";

export type ExcelPrimitive =
    string | number | boolean | null | undefined | Date;

export interface ExcelColumn<TData> {
    key: string;
    header: string;
    accessorKey?: keyof TData;
    accessorFn?: (row: TData) => unknown;
    valueFormatter?: (value: unknown, row: TData) => ExcelPrimitive;
}

interface GerarExcelProps<TData> {
    data: TData[];
    columns: ExcelColumn<TData>[];
    fileName?: string;
    sheetName?: string;
    buttonLabel?: string;
    disabled?: boolean;
    className?: string;
    emptyCellValue?: string;
    onBeforeExport?: (rows: TData[]) => TData[];
}

function resolveCellValue<TData>(
    row: TData,
    column: ExcelColumn<TData>,
    emptyCellValue: string,
): ExcelPrimitive {
    const rawValue: unknown = column.accessorFn
        ? column.accessorFn(row)
        : column.accessorKey
          ? (row[column.accessorKey] as ExcelPrimitive)
          : emptyCellValue;

    const formattedValue = column.valueFormatter
        ? column.valueFormatter(rawValue, row)
        : rawValue;

    if (
        formattedValue === null ||
        formattedValue === undefined ||
        formattedValue === ""
    ) {
        return emptyCellValue;
    }

    if (
        formattedValue instanceof Date ||
        ["string", "number", "boolean"].includes(typeof formattedValue)
    ) {
        return formattedValue as ExcelPrimitive;
    }

    return String(formattedValue);
}

export function GerarExcel<TData>({
    data,
    columns,
    fileName = "relatorio",
    sheetName = "Dados",
    buttonLabel = "Gerar Excel",
    disabled = false,
    className,
    emptyCellValue = "--",
    onBeforeExport,
}: GerarExcelProps<TData>) {
    const handleExport = async () => {
        const { default: ExcelJS } = await import("exceljs");
        const exportRows = onBeforeExport ? onBeforeExport(data) : data;

        const normalizedRows = exportRows.map((row) => {
            return columns.reduce<Record<string, ExcelPrimitive>>(
                (accumulator, column) => {
                    accumulator[column.header] = resolveCellValue(
                        row,
                        column,
                        emptyCellValue,
                    );
                    return accumulator;
                },
                {},
            );
        });

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet(sheetName);

        worksheet.columns = columns.map((column) => ({
            header: column.header,
            key: column.header,
            width: Math.max(column.header.length + 2, 12),
        }));

        normalizedRows.forEach((row) => {
            worksheet.addRow(row);
        });

        const buffer = await workbook.xlsx.writeBuffer();
        const blob = new Blob([buffer], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");

        link.href = url;
        link.download = `${fileName}.xlsx`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
    };

    return (
        <ExportButton
            className={className}
            onClick={handleExport}
            disabled={disabled || data.length === 0 || columns.length === 0}
        >
            <FaFileExcel size={18} />
            <span>{buttonLabel}</span>
        </ExportButton>
    );
}

const ExportButton = styled(Button)`
    display: inline-flex;
    align-items: center;
    gap: var(--space-xs);
    padding: var(--space-sm) var(--space-md);
    border-color: var(--color-main, var(--bs-primary));
    border-radius: 0.125rem;
    background-color: var(--color-main, var(--bs-primary));
    color: var(--color-font, var(--bs-white));
    font-size: var(--font-size-md);
    outline: none;
    transition: all 0.2s ease-in-out;
`;
