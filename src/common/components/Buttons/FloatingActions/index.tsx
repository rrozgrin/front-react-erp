import React, { RefObject, useEffect, useMemo, useState } from 'react';
import {
    Backdrop,
    MainButton,
    ActionButton,
    ActionsList,
    ChartOverlay,
    ChartDialog,
    ChartCloseButton,
    Wrapper,
} from './styled';
import {
    IoAdd,
    IoBarChartOutline,
    IoCloseOutline,
    IoPrintOutline,
} from 'react-icons/io5';
import { FaFileExcel } from 'react-icons/fa';
import type { ExcelColumn } from '../../Actions/GerarExcel';

type FloatingActionType = 'excel' | 'chart' | 'print';
type ExcelPrimitive = string | number | boolean | null | undefined | Date;

interface FloatingActionLabels {
    excel?: string;
    chart?: string;
    print?: string;
}

interface FloatingActionsProps<TData> {
    actions: FloatingActionType[];
    labels?: FloatingActionLabels;
    excel?: {
        data: TData[];
        columns: ExcelColumn<TData>[];
        fileName?: string;
        filename?: string;
        sheetName?: string;
        emptyCellValue?: string;
        onBeforeExport?: (rows: TData[]) => TData[];
    };
    excelConfig?: {
        data: TData[];
        columns: ExcelColumn<TData>[];
        fileName?: string;
        sheetName?: string;
        emptyCellValue?: string;
        onBeforeExport?: (rows: TData[]) => TData[];
    };
    chartContent?: React.ReactNode;
    onChartClick?: () => void;
    printTargetRef?: RefObject<HTMLElement | null>;
    printConfig?: {
        title?: string;
        subtitle?: string;
        orientation?: 'portrait' | 'landscape';
    };
    onPrint?: () => void;
    zIndex?: number;
}

function resolveCellValue<TData>(
    row: TData,
    column: ExcelColumn<TData>,
    emptyCellValue: string,
): ExcelPrimitive {
    const rawValue = column.accessorFn
        ? column.accessorFn(row)
        : column.accessorKey
            ? (row[column.accessorKey] as ExcelPrimitive)
            : emptyCellValue;

    const formattedValue = column.valueFormatter
        ? column.valueFormatter(rawValue, row)
        : rawValue;

    if (formattedValue === null || formattedValue === undefined || formattedValue === '') {
        return emptyCellValue;
    }

    if (formattedValue instanceof Date || ['string', 'number', 'boolean'].includes(typeof formattedValue)) {
        return formattedValue as ExcelPrimitive;
    }

    return String(formattedValue);
}

function capitalizeFirstLetter(value: string) {
    if (!value) {
        return value;
    }

    return value.charAt(0).toUpperCase() + value.slice(1);
}

function normalizeExcelFileName(fileName: string) {
    return fileName.replace(/\.(xlsx|xls)$/i, '');
}

function getColumnWidth<TData>(rows: Record<string, ExcelPrimitive>[], column: ExcelColumn<TData>) {
    const headerLength = capitalizeFirstLetter(column.header).length;
    const contentLength = rows.reduce((longest, row) => {
        const value = row[column.header];
        return Math.max(longest, String(value ?? '').length);
    }, 0);

    return Math.min(Math.max(headerLength, contentLength, 12), 32);
}

function parseRgbColor(color: string) {
    const rgbMatch = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/i);

    if (rgbMatch) {
        return {
            r: Number(rgbMatch[1]),
            g: Number(rgbMatch[2]),
            b: Number(rgbMatch[3]),
        };
    }

    const hex = color.trim().replace('#', '');

    if (hex.length === 3) {
        return {
            r: parseInt(hex[0] + hex[0], 16),
            g: parseInt(hex[1] + hex[1], 16),
            b: parseInt(hex[2] + hex[2], 16),
        };
    }

    if (hex.length === 6) {
        return {
            r: parseInt(hex.slice(0, 2), 16),
            g: parseInt(hex.slice(2, 4), 16),
            b: parseInt(hex.slice(4, 6), 16),
        };
    }

    return null;
}

function mixWithWhite(color: string, ratio = 0.82) {
    const parsed = parseRgbColor(color);

    if (!parsed) {
        return '#dcecff';
    }

    const mixChannel = (channel: number) => Math.round(channel + (255 - channel) * ratio);
    return `rgb(${mixChannel(parsed.r)}, ${mixChannel(parsed.g)}, ${mixChannel(parsed.b)})`;
}

function rgbToArgb(color: string) {
    const parsed = parseRgbColor(color);

    if (!parsed) {
        return 'FFDCECFF';
    }

    const toHex = (value: number) => value.toString(16).padStart(2, '0').toUpperCase();
    return `FF${toHex(parsed.r)}${toHex(parsed.g)}${toHex(parsed.b)}`;
}

function resolveThemeColors() {
    if (typeof window === 'undefined') {
        return {
            headerBackground: '#dcecff',
            headerText: '#2f5f8d',
            cellBorder: '#d6e2ee',
        };
    }

    const styles = getComputedStyle(document.documentElement);
    const themeMain = styles.getPropertyValue('--color-main').trim() || '#3b82f6';
    const themeSecondary = styles.getPropertyValue('--theme-border').trim() || '#d6e2ee';

    return {
        headerBackground: mixWithWhite(themeMain, 0.84),
        headerText: themeMain,
        cellBorder: themeSecondary,
    };
}

function buildPrintStyles(orientation: 'portrait' | 'landscape' = 'portrait') {
    return `
        @page {
            size: A4 ${orientation};
            margin: 14mm;
        }

        * {
            box-sizing: border-box;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
        }

        html, body {
            margin: 0;
            padding: 0;
            background: #ffffff;
        }

        .print-shell {
            display: flex;
            flex-direction: column;
            gap: 18px;
        }

        .print-header {
            padding-bottom: var(--space-sm);
            border-bottom: 2px solid #dbe6f2;
            margin-bottom: 14px;
        }

        .print-title {
            margin: 0;
            font-size: font-size: var(--font-size-xs);
            font-weight: 500;
            color: #1d4f91;
        }

        .print-subtitle {
            margin: 6px 0 0;
            font-size: var(--font-size-xs);
            color: #4b5563;
        }

        .print-content {
            width: 100%;
        }

        .print-content > * {
            width: 100% !important;
            max-width: 100% !important;
        }

        .print-content button,
        .print-content input,
        .print-content select,
        .print-content textarea {
            display: none !important;
        }

        .print-content [role="button"] {
            display: none !important;
        }

        .print-content .no-print {
            display: none !important;
        }

        .print-content [data-print-hidden="true"] {
            display: none !important;
        }

        .print-content .table-responsive,
        .print-content .clientes-table,
        .print-content .clientes-content {
            overflow: visible !important;
        }

        .print-content * {
            break-inside: avoid;
            page-break-inside: avoid;
        }
    `;
}

const PRINT_STYLE_PROPERTIES = [
    'display',
    'position',
    'top',
    'right',
    'bottom',
    'left',
    'z-index',
    'width',
    'height',
    'min-width',
    'max-width',
    'min-height',
    'max-height',
    'margin',
    'padding',
    'border',
    'border-top',
    'border-right',
    'border-bottom',
    'border-left',
    'border-radius',
    'background',
    'background-color',
    'background-image',
    'box-shadow',
    'color',
    'font',
    'font-family',
    'font-size',
    'font-style',
    'font-weight',
    'line-height',
    'letter-spacing',
    'text-transform',
    'text-align',
    'white-space',
    'word-break',
    'overflow',
    'overflow-x',
    'overflow-y',
    'opacity',
    'visibility',
    'transform',
    'grid-template-columns',
    'grid-template-rows',
    'grid-column',
    'grid-row',
    'gap',
    'align-items',
    'justify-content',
    'flex',
    'flex-direction',
    'flex-wrap',
    'object-fit',
    'object-position',
    'aspect-ratio',
];

function applyInlineComputedStyles(source: Element, target: Element) {
    const computedStyle = window.getComputedStyle(source);
    const inlineStyle = PRINT_STYLE_PROPERTIES
        .map((property) => `${property}:${computedStyle.getPropertyValue(property)};`)
        .join('');

    const currentStyle = target.getAttribute('style');
    target.setAttribute('style', `${currentStyle ? `${currentStyle};` : ''}${inlineStyle}`);

    const sourceChildren = Array.from(source.children);
    const targetChildren = Array.from(target.children);
    const limit = Math.min(sourceChildren.length, targetChildren.length);

    for (let index = 0; index < limit; index += 1) {
        applyInlineComputedStyles(sourceChildren[index], targetChildren[index]);
    }
}

function createPrintableClone(target: HTMLElement) {
    const clone = target.cloneNode(true) as HTMLElement;
    applyInlineComputedStyles(target, clone);

    clone.querySelectorAll('button, input, select, textarea, [role="button"], .no-print, [data-print-hidden="true"]').forEach((element) => {
        element.remove();
    });

    return clone;
}

function collectDocumentStyles() {
    const styleNodes = Array.from(document.querySelectorAll('style, link[rel="stylesheet"]'));
    return styleNodes.map((node) => node.outerHTML).join('\n');
}

async function exportExcelFile<TData>(config: NonNullable<FloatingActionsProps<TData>['excelConfig']>) {
    const { default: ExcelJS } = await import('exceljs');
    const {
        data,
        columns,
        fileName = 'relatorio',
        sheetName = 'Dados',
        emptyCellValue = '--',
        onBeforeExport,
    } = config;

    const exportRows = onBeforeExport ? onBeforeExport(data) : data;
    const normalizedRows = exportRows.map((row) => {
        return columns.reduce<Record<string, ExcelPrimitive>>((accumulator, column) => {
            accumulator[column.header] = resolveCellValue(row, column, emptyCellValue);
            return accumulator;
        }, {});
    });
    const { headerBackground, headerText, cellBorder } = resolveThemeColors();
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet(capitalizeFirstLetter(sheetName));
    const borderColor = rgbToArgb(cellBorder);
    const headerBackgroundColor = rgbToArgb(headerBackground);
    const headerTextColor = rgbToArgb(headerText);

    worksheet.columns = columns.map((column) => ({
        header: capitalizeFirstLetter(column.header),
        key: column.header,
        width: getColumnWidth(normalizedRows, column),
        style: {
            font: {
                name: 'Calibri',
                size: 11,
                color: { argb: 'FF1F2937' },
            },
            alignment: {
                vertical: 'middle',
            },
            border: {
                top: { style: 'thin', color: { argb: borderColor } },
                left: { style: 'thin', color: { argb: borderColor } },
                bottom: { style: 'thin', color: { argb: borderColor } },
                right: { style: 'thin', color: { argb: borderColor } },
            },
        },
    }));

    normalizedRows.forEach((row) => {
        const nextRow = columns.reduce<Record<string, ExcelPrimitive>>((accumulator, column) => {
            accumulator[column.header] = row[column.header];
            return accumulator;
        }, {});

        worksheet.addRow(nextRow);
    });

    const headerRow = worksheet.getRow(1);
    headerRow.height = 24;
    headerRow.eachCell((cell) => {
        cell.font = {
            name: 'Calibri',
            size: 11,
            bold: true,
            color: { argb: headerTextColor },
        };
        cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: headerBackgroundColor },
        };
        cell.alignment = {
            vertical: 'middle',
            horizontal: 'center',
        };
        cell.border = {
            top: { style: 'thin', color: { argb: borderColor } },
            left: { style: 'thin', color: { argb: borderColor } },
            bottom: { style: 'thin', color: { argb: borderColor } },
            right: { style: 'thin', color: { argb: borderColor } },
        };
    });

    worksheet.eachRow((row, rowNumber) => {
        if (rowNumber === 1) {
            return;
        }

        row.height = 22;
        row.eachCell((cell) => {
            cell.alignment = {
                vertical: 'middle',
            };
        });
    });

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');

    link.href = url;
    link.download = `${normalizeExcelFileName(fileName)}.xlsx`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
}

function printElement(
    target: HTMLElement,
    config?: FloatingActionsProps<unknown>['printConfig'],
) {
    const printWindow = window.open('', '_blank', 'width=1024,height=768');

    if (!printWindow) {
        return;
    }

    const title = config?.title;
    const subtitle = config?.subtitle;
    const orientation = config?.orientation ?? 'portrait';
    const documentStyles = collectDocumentStyles();
    const printableClone = createPrintableClone(target);
    const hasHeader = Boolean(title || subtitle);

    const printHeaderHtml = hasHeader
        ? `
                    <header class="print-header">
                        ${title ? `<h1 class="print-title">${title}</h1>` : ''}
                        ${subtitle ? `<p class="print-subtitle">${subtitle}</p>` : ''}
                    </header>
                `
        : '';

    printWindow.document.write(`
        <html>
            <head>
                <title>${title ?? 'Impressao'}</title>
                ${documentStyles}
                <style>
                    ${buildPrintStyles(orientation)}
                </style>
            </head>
            <body>
                <div class="print-shell">
                    ${printHeaderHtml}
                    <main class="print-content">${printableClone.outerHTML}</main>
                </div>
            </body>
        </html>
    `);

    printWindow.document.close();

    const triggerPrint = () => {
        printWindow.focus();
        printWindow.print();
    };

    printWindow.onload = triggerPrint;
    setTimeout(triggerPrint, 500);
}

export function FloatingActions<TData>({
    actions,
    labels,
    excel,
    excelConfig,
    chartContent,
    onChartClick,
    printTargetRef,
    printConfig,
    onPrint,
    zIndex = 1500,
}: FloatingActionsProps<TData>) {
    const [open, setOpen] = useState(false);
    const [chartOpen, setChartOpen] = useState(false);
    const normalizedExcelConfig = excelConfig ?? (excel
        ? {
            ...excel,
            fileName: excel.fileName ?? excel.filename,
        }
        : undefined);

    const visibleActions = useMemo(() => {
        const uniqueActions = Array.from(new Set(actions));
        return uniqueActions.filter((action) => ['excel', 'chart', 'print'].includes(action));
    }, [actions]);

    useEffect(() => {
        if (!open) {
            return;
        }

        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setOpen(false);
                setChartOpen(false);
            }
        };

        window.addEventListener('keydown', handleEscape);
        return () => window.removeEventListener('keydown', handleEscape);
    }, [open]);

    if (visibleActions.length === 0) {
        return null;
    }

    const handleExcel = async () => {
        if (!normalizedExcelConfig || normalizedExcelConfig.data.length === 0 || normalizedExcelConfig.columns.length === 0) {
            return;
        }

        await exportExcelFile(normalizedExcelConfig);
        setOpen(false);
    };

    const handleChart = () => {
        if (onChartClick) {
            onChartClick();
        }

        if (chartContent) {
            setChartOpen(true);
        }

        setOpen(false);
    };

    const handlePrint = () => {
        if (onPrint) {
            onPrint();
            setOpen(false);
            return;
        }

        if (printTargetRef?.current) {
            printElement(printTargetRef.current, printConfig);
            setOpen(false);
        }
    };

    if (visibleActions.length === 1) {
        const singleAction = visibleActions[0];

        if (singleAction === 'excel') {
            return (
                <Wrapper $zIndex={zIndex}>
                    <ActionButton
                        type="button"
                        onClick={handleExcel}
                        data-tooltip={labels?.excel ?? 'Gerar excel'}
                        aria-label={labels?.excel ?? 'Gerar excel'}
                        title={labels?.excel ?? 'Gerar excel'}
                    >
                        <FaFileExcel size={20} />
                    </ActionButton>
                </Wrapper>
            );
        }

        if (singleAction === 'chart') {
            return (
                <>
                    <Wrapper $zIndex={zIndex}>
                        <ActionButton
                            type="button"
                            onClick={handleChart}
                            data-tooltip={labels?.chart ?? 'Gerar grafico'}
                            aria-label={labels?.chart ?? 'Gerar grafico'}
                            title={labels?.chart ?? 'Gerar grafico'}
                        >
                            <IoBarChartOutline size={20} />
                        </ActionButton>
                    </Wrapper>

                    {chartOpen && chartContent && (
                        <ChartOverlay onClick={() => setChartOpen(false)}>
                            <ChartDialog onClick={(event) => event.stopPropagation()}>
                                <ChartCloseButton type="button" onClick={() => setChartOpen(false)} aria-label="Fechar grafico">
                                    <IoCloseOutline size={22} />
                                </ChartCloseButton>
                                {chartContent}
                            </ChartDialog>
                        </ChartOverlay>
                    )}
                </>
            );
        }

        return (
            <Wrapper $zIndex={zIndex}>
                <ActionButton
                    type="button"
                    onClick={handlePrint}
                    data-tooltip={labels?.print ?? 'Imprimir'}
                    aria-label={labels?.print ?? 'Imprimir'}
                    title={labels?.print ?? 'Imprimir'}
                >
                    <IoPrintOutline size={20} />
                </ActionButton>
            </Wrapper>
        );
    }

    return (
        <>
            {open && <Backdrop type="button" aria-label="Fechar acoes flutuantes" onClick={() => setOpen(false)} $zIndex={zIndex - 1} />}

            <Wrapper $zIndex={zIndex}>
                {open && (
                    <ActionsList>
                        {visibleActions.includes('excel') && (
                            <ActionButton
                                type="button"
                                onClick={handleExcel}
                                data-tooltip={labels?.excel ?? 'Gerar excel'}
                                aria-label={labels?.excel ?? 'Gerar excel'}
                                title={labels?.excel ?? 'Gerar excel'}
                            >
                                <FaFileExcel size={20} />
                            </ActionButton>
                        )}

                        {visibleActions.includes('chart') && (
                            <ActionButton
                                type="button"
                                onClick={handleChart}
                                data-tooltip={labels?.chart ?? 'Gerar grafico'}
                                aria-label={labels?.chart ?? 'Gerar grafico'}
                                title={labels?.chart ?? 'Gerar grafico'}
                            >
                                <IoBarChartOutline size={20} />
                            </ActionButton>
                        )}

                        {visibleActions.includes('print') && (
                            <ActionButton
                                type="button"
                                onClick={handlePrint}
                                data-tooltip={labels?.print ?? 'Imprimir'}
                                aria-label={labels?.print ?? 'Imprimir'}
                                title={labels?.print ?? 'Imprimir'}
                            >
                                <IoPrintOutline size={20} />
                            </ActionButton>
                        )}
                    </ActionsList>
                )}

                <MainButton
                    type="button"
                    aria-label={open ? 'Fechar acoes' : 'Abrir acoes'}
                    onClick={() => setOpen((current) => !current)}
                    $open={open}
                >
                    <IoAdd size={22} />
                </MainButton>
            </Wrapper>

            {chartOpen && chartContent && (
                <ChartOverlay onClick={() => setChartOpen(false)}>
                    <ChartDialog onClick={(event) => event.stopPropagation()}>
                        <ChartCloseButton type="button" onClick={() => setChartOpen(false)} aria-label="Fechar grafico">
                            <IoCloseOutline size={22} />
                        </ChartCloseButton>
                        {chartContent}
                    </ChartDialog>
                </ChartOverlay>
            )}
        </>
    );
}
