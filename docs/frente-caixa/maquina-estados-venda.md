# Maquina de estados da venda

## Estados propostos

| Estado | Descricao | Acoes permitidas |
| --- | --- | --- |
| `nova` | Nenhum item foi gravado; a venda ainda pode nao possuir identificador. | Selecionar vendedor/cliente, inserir primeiro item. |
| `aberta` | Venda criada e editavel. | Incluir, alterar ou cancelar item; aplicar desconto; selecionar cliente. |
| `em_pagamento` | Operador iniciou a composicao dos pagamentos. | Incluir, alterar ou remover pagamentos; voltar para venda aberta quando permitido. |
| `aguardando_confirmacao` | Valores de pagamento fecham o total e aguardam confirmacao. | Confirmar, cancelar ou corrigir pagamento. |
| `finalizada` | Venda confirmada e encerrada comercialmente. | Consultar, imprimir ou iniciar novo atendimento. |
| `cancelada` | Venda cancelada conforme permissao. | Consultar historico; nao permitir novas alteracoes. |

## Transicoes criticas

```text
nova -> aberta -> em_pagamento -> aguardando_confirmacao -> finalizada
                 |                    |
                 +--------------------+

aberta -> cancelada
em_pagamento -> aberta
```

## Regras

- A venda so entra em `em_pagamento` se possuir itens e total atualizado pelo backend.
- A confirmacao exige pagamentos validos e total quitado, considerando troco quando aplicavel.
- Alteracao de item, desconto ou promocao apos iniciar pagamento exige recalcular o total e invalidar pagamentos temporarios que nao correspondam mais ao saldo.
- Estados fiscais, emissao de documento e integracoes externas devem ser modelados separadamente do estado operacional acima.
