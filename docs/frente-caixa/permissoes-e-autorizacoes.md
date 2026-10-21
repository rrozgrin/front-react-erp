# Permissoes e autorizacoes

## Principio

Permissoes definem se a acao pode ser iniciada. A senha master e uma segunda autorizacao para regras configuradas como sensiveis. O backend deve validar ambas; o frontend apenas orienta o fluxo e apresenta o motivo da negacao.

## Acoes que exigem mapeamento

| Acao | Validacao esperada |
| --- | --- |
| Incluir item | Permissao de inclusao; retorno de acesso negado deve ser tratado explicitamente. |
| Trocar vendedor | Regra de vendedor obrigatorio e permissao especifica. |
| Alterar preco unitario | Permissao e senha master quando a configuracao exigir. |
| Alterar descricao do produto | Permissao e senha master quando a configuracao exigir. |
| Aplicar desconto geral ou por item | Limites, permissao e senha master conforme politica. |
| Cancelar item ou venda | Permissao, motivo e autorizacao quando exigidos. |
| Finalizar venda | Acesso ao caixa e validacao das formas de pagamento. |

## Requisito de comportamento

O React deve diferenciar negacao de permissao, erro de validacao e indisponibilidade tecnica. Mensagens genericas nao devem substituir retornos funcionais como `retorno == 3` do legado.
