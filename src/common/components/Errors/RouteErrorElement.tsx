import { isRouteErrorResponse, Link, useRouteError } from 'react-router-dom';
import styled from 'styled-components';

const isDynamicImportError = (message: string): boolean => {
    return /Failed to fetch dynamically imported module|Importing a module script failed|Loading chunk [\d]+ failed|Failed to load module script/i.test(
        message
    );
};

const getErrorMessage = (error: unknown): string => {
    if (isRouteErrorResponse(error)) {
        return `${error.status} ${error.statusText}`.trim();
    }

    if (error instanceof Error) {
        return error.message;
    }

    return 'Não foi possível carregar esta página no momento.';
};

export const RouteErrorElement = () => {
    const error = useRouteError();
    const message = getErrorMessage(error);
    const hasChunkIssue = isDynamicImportError(message);

    return (
        <div className="container py-5">
            <ErrorCardWrap className="mx-auto">
                <div className="card shadow-sm border-0">
                    <div className="card-body p-4 p-md-5">
                        <h1 className="h4 mb-2">Deu Ruim =(</h1>
                        <p className="text-muted mb-4">
                            {hasChunkIssue
                                ? 'Detectamos uma falha ao carregar módulos da aplicação. Isso pode acontecer após atualização de código no ambiente local.'
                                : 'Ocorreu um erro inesperado ao processar sua navegação.'}
                        </p>

                        <div className="d-flex flex-wrap gap-2">
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={() => window.location.reload()}
                            >
                                Recarregar página
                            </button>
                            <Link to="/home" className="btn btn-outline-secondary">
                                Ir para início
                            </Link>
                        </div>

                        {import.meta.env.DEV && (
                            <details className="mt-4">
                                <summary>Detalhes técnicos (dev)</summary>
                                <pre className="mt-2 mb-0 p-3 bg-light border rounded small">{message}</pre>
                            </details>
                        )}
                    </div>
                </div>
            </ErrorCardWrap>
        </div>
    );
};

const ErrorCardWrap = styled.div`
    max-width: var(--table-min-width);
`;
