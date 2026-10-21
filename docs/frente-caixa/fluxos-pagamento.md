# Fluxos de pagamento

## Escopo

O dominio de pagamentos abrange dinheiro, cartao, PIX, cheque, boleto, crediario, entrada, parcelas, vencimentos, troco e confirmacao da venda.

## Fluxo comum

1. Receber o total oficial da venda.
2. Selecionar forma de pagamento e carregar suas configuracoes.
3. Informar valor, quantidade de parcelas e vencimentos quando aplicavel.
4. Validar limites, dados obrigatorios e saldo restante.
5. Recalcular troco ou falta de valor.
6. Persistir pagamentos temporarios, quando o legado exigir.
7. Confirmar os pagamentos e finalizar a venda.

## Regras de isolamento

- O modulo nao altera itens, descontos ou promocoes diretamente.
- Qualquer mudanca comercial que altere o total invalida os pagamentos temporarios incompatíveis.
- Parcelamento deve usar regras puras para juros, multa, dia fixo e datas de vencimento.
- A finalizacao deve ser idempotente para evitar cobranca ou gravacao duplicada em caso de duplo clique ou falha de rede.
