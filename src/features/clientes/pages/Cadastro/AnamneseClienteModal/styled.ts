import styled from 'styled-components';

export const ProcedimentoActions = styled.div`
    display:flex; align-items:flex-end; justify-content:flex-end; gap:var(--space-sm); flex-wrap:wrap;
    @media (max-width:768px){display:grid;grid-template-columns:1fr;}
`;
export const AreaOptionsGrid = styled.div`display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:10px;`;
export const AreaOption = styled.label`
    display:flex;align-items:center;gap:var(--space-xs);min-height:44px;padding:10px var(--space-sm);border:1px solid var(--theme-border,var(--bs-border-color));border-radius:.125rem;background:var(--theme-surface,var(--bs-white));color:var(--theme-text,var(--bs-body-color));font-weight:600;
    input{width:16px;height:16px;}
`;
export const ProcedimentosSummary = styled.div`display:flex;flex-direction:column;gap:var(--space-sm);padding:var(--space-md);border:1px solid var(--theme-border,var(--bs-border-color));border-radius:.125rem;background:var(--theme-surface-soft,var(--bs-light-bg-subtle));`;
export const ProcedimentosSummaryHeader = styled.div`display:flex;align-items:center;justify-content:space-between;gap:var(--space-sm);color:var(--theme-text,var(--bs-body-color));font-weight:800;`;
export const CountBadge = styled.span`display:inline-flex;align-items:center;justify-content:center;min-width:34px;height:28px;padding:0 10px;border-radius:var(--radius-pill);color:var(--color-font,var(--bs-white));background:var(--color-main,var(--bs-primary));font-size:.86rem;`;
export const ProcedimentoList = styled.div`display:grid;gap:10px;`;
export const ProcedimentoItem = styled.div`
    display:grid;grid-template-columns:minmax(0,1fr) auto;gap:var(--space-sm);align-items:center;padding:var(--space-sm);border:1px solid var(--theme-border,var(--bs-border-color));border-radius:.125rem;background:var(--theme-surface,var(--bs-white));
    strong,span{display:block;overflow-wrap:anywhere;} span{margin-top:var(--space-2xs);color:var(--theme-text-soft,var(--bs-secondary));font-size:.9rem;}
`;
export const RemoveProcedureButton = styled.button`min-height:36px;padding:0 var(--space-sm);border:1px solid var(--theme-border,var(--bs-border-color));border-radius:.125rem;background:var(--theme-surface,var(--bs-white));color:var(--theme-text,var(--bs-body-color));font-weight:500;`;
export const EmptyProcedimentos = styled.p`margin:0;color:var(--theme-text-soft,var(--bs-secondary));`;
