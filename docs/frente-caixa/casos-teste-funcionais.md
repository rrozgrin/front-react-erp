# Casos de teste funcionais

## Inclusao de item

- Incluir produto comum por codigo de barras em venda nova.
- Incluir produto em venda existente sem exceder estoque.
- Tentar incluir quantidade acima do estoque, considerando itens ja adicionados.
- Incluir produto com grade obrigatoria.
- Incluir produto KG por codigo de balanca e por balanca fisica.
- Informar codigo inexistente e buscar por descricao com acentos e pontuacao.

## Promocoes e descontos

- Aplicar kit/combo antes da busca comum de produto.
- Aplicar promocao multi-itens e Mais por Menos.
- Validar bloqueio entre promocao e desconto manual.
- Aplicar desconto geral e desconto de item com autorizacao master.

## Pagamentos

- Finalizar em dinheiro com e sem troco.
- Finalizar com multiplas formas de pagamento.
- Parcelar cartao, boleto, cheque e crediario conforme configuracao.
- Alterar a venda apos iniciar pagamento e validar invalidação do pagamento temporario.
- Repetir a confirmacao por falha de rede sem duplicar venda ou cobranca.

## Permissoes

- Negar inclusao de item sem permissao.
- Exigir vendedor quando a configuracao determinar.
- Bloquear alteracao de preco ou descricao sem senha master.
- Impedir cancelamento sem autorizacao.
