# Contratos de API da frente de caixa

## Principio

Os endpoints React devem ter contratos tipados e estaveis. O modulo deve encapsular endpoints legados nos `services`; componentes e regras nao podem montar payloads diretamente.

## Contratos prioritarios

| Caso de uso | Entrada minima | Retorno esperado |
| --- | --- | --- |
| Criar venda | vendedor, cliente, tipo de venda | identificador, situacao e resumo inicial. |
| Consultar produto | codigo de barras ou termo de busca | produto, estoque, grade, preco e restricoes. |
| Incluir item | venda, produto, quantidade, preco, contexto comercial | resultado, itens, resumo, promocoes, impostos e mensagens. |
| Alterar item | venda, item, quantidade/preco/descricao | item atualizado e retorno consolidado da venda. |
| Cancelar item | venda, item e autorizacao quando exigida | retorno consolidado da venda. |
| Aplicar desconto | venda, tipo, valor e autorizacao | desconto autorizado e retorno consolidado. |
| Consultar pagamentos | venda e forma de pagamento | configuracao, parcelas e vencimentos. |
| Confirmar pagamento | venda e pagamentos validados | confirmacao, troco, status e dados fiscais. |

## Retorno consolidado da venda

Sempre que possivel, operacoes que alteram itens devem retornar um pacote equivalente a:

- `resumoVenda`;
- itens normalizados ou `htmlItensVenda` durante a transicao;
- promocoes aplicadas e bloqueadas;
- total a pagar;
- impostos e descontos;
- mensagens funcionais;
- situacao da venda.

O tipo React interno nao deve depender de campos de HTML retornados pelo legado. Quando esse retorno existir, ele deve ser convertido por mapper e removido gradualmente do contrato.
