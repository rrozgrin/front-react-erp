# Regras de totalizacao

## Fonte de verdade

O backend calcula e devolve os valores oficiais. O frontend pode apresentar estimativas para interacao, mas deve substituir seu estado pelo retorno consolidado apos cada mutacao.

## Ordem funcional de calculo

1. Definir preco unitario conforme produto, grade, lista de preco e tipo de compra.
2. Calcular valor bruto dos itens pela quantidade efetiva.
3. Aplicar descontos por item autorizados.
4. Aplicar promocoes elegiveis, respeitando bloqueios entre modalidades.
5. Aplicar desconto geral autorizado quando compativel com as promocoes.
6. Considerar impostos e demais valores retornados pelo backend.
7. Aplicar frete, entrada ou outros acrescimos quando a operacao os utilizar.
8. Definir total a pagar, saldo, valores recebidos e troco.

## Regras obrigatorias

- Estoque disponivel considera `qtd_atual - qtd_reservas - qtd_venda_atual`.
- Promocao multi-itens, Mais por Menos, desconto de grade e desconto manual podem ser mutuamente exclusivos conforme retorno do backend.
- Nenhum total de pagamento pode ser confirmado sem nova validacao depois de alterar itens, descontos ou promocoes.
- Valores monetarios devem usar representacao decimal consistente; nao usar texto formatado como fonte de calculo.
