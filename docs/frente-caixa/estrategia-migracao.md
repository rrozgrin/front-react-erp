# Estrategia de migracao

## Sequencia recomendada

1. Estabilizar tipos, contratos e o estado central da venda.
2. Migrar consulta e inclusao por codigo de barras, com retorno consolidado como fonte principal.
3. Migrar alteracao, cancelamento e descontos de itens.
4. Migrar promocoes e totalizacao, removendo chamadas paralelas quando o backend atender o contrato consolidado.
5. Migrar selecao de cliente, vendedor, lista de preco e balanca.
6. Migrar pagamentos por modalidade e confirmacao de venda.
7. Migrar operacoes auxiliares: impressao, frete, WhatsApp e localizacao de venda.

## Criterios de aceite por etapa

- Mesmo resultado comercial e financeiro do legado para o mesmo cenario.
- Nenhuma chamada duplicada para gravar item ou confirmar pagamento.
- Resposta de erro funcional apresentada ao operador.
- Estado da tela atualizado exclusivamente a partir de dados tipados.
- Casos de teste criticos executados contra ambiente controlado.

## Fallback legado

Chamadas isoladas de total, promocao e recarga de itens podem existir temporariamente apenas quando o retorno consolidado nao vier do backend. Cada fallback deve ter responsavel e criterio objetivo de remocao.
