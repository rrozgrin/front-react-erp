# Arquitetura e requisitos da frente de caixa

## Contexto

Os arquivos legados `PreVenda.js` e `FrenteCaixa.js` concentram mais de 20 mil linhas e varios dominios de negocio. A migracao React deve preservar as regras, mas separar responsabilidade de interface, estado, chamadas HTTP e calculos puros.

O backend deve permanecer como fonte de verdade para a venda, totais, promocoes, impostos e permissoes. O frontend interpreta o retorno, atualiza o estado da venda e apresenta os resultados ao operador.

## Estrutura proposta

```text
features/frente-caixa/
  venda/
  itens/
  produtos/
  promocoes/
  descontos/
  pagamentos/
  clientes/
  caixa/
  balanca/
  compartilhado/
```

Cada dominio pode conter `components`, `hooks`, `services`, `rules` e `types` quando necessario. A estrutura deve crescer por responsabilidade de negocio, e nao por tipo de arquivo em um unico diretorio global.

## Limites dos dominios

| Dominio | Responsabilidade |
| --- | --- |
| `venda` | Criacao, carregamento, estado e resumo da venda aberta. |
| `itens` | Inclusao, alteracao, cancelamento e recarga de itens. |
| `produtos` | Codigo de barras, busca textual, grade, lista de preco e estoque. |
| `promocoes` | Kit/combo, multi-itens, Mais por Menos e bloqueios. |
| `descontos` | Desconto geral, por item e autorizacao. |
| `pagamentos` | Formas de pagamento, parcelas, troco e confirmacao. |
| `clientes` | Cliente balcao, credito, limite e enderecos. |
| `caixa` | Acesso, abertura, operador e fechamento de caixa. |
| `balanca` | Disponibilidade e leitura de peso local. |

## Responsabilidade das camadas

- `services`: somente comunicacao HTTP pelo `apiClient`.
- `hooks`: casos de uso e orquestracao de acoes assincronas.
- `rules`: funcoes puras, sem React, DOM ou HTTP.
- `mappers`: adaptacao do retorno legado para os tipos internos.
- `components`: interface e eventos; sem regra comercial.

## Estado da venda

O estado central da venda aberta deve conter ao menos identificacao da venda, situacao, vendedor, cliente, itens, totais, descontos, promocoes, impostos e permissoes aplicaveis. Modais devem manter somente estados transitorios de interface.

Dados de venda nao devem permanecer em configuracoes estaticas nem ser reconstruidos pela leitura do DOM.

## Decisoes de migracao

- Usar o retorno consolidado do backend como fluxo principal apos gravar um item.
- Manter consultas legadas isoladas como fallback temporario, apenas quando faltarem dados no retorno consolidado.
- Nao aplicar cache para estoque, inclusao de item ou promocoes da venda aberta.
- Isolar pagamentos do dominio de itens: pagamentos recebem o total da venda e devolvem pagamentos validados.
- Reutilizar os dominios entre pre-venda, pedido, orcamento, ordem de servico e consignada; as diferencas devem ser configuracoes e regras de capacidade.
