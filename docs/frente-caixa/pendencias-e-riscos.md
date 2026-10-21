# Pendencias e riscos

## Pendencias de contrato

- Confirmar contrato definitivo do retorno consolidado de gravacao de item.
- Mapear impostos retornados pelo backend e seu impacto no resumo da venda.
- Definir se o backend devolvera itens estruturados durante a transicao, substituindo `htmlItensVenda`.
- Consolidar os endpoints legados utilizados por pagamentos e confirmacao.

## Riscos funcionais conhecidos

- Branch de modularizacao pode nao enviar todos os campos que a master utiliza: `situacao`, `idFuncionario`, `idCliente`, `consultarPromocaoMix` e `idTipoVenda`.
- Calculo de estoque pode ignorar `qtd_venda_atual`.
- A permissao de inclusao pode perder a mensagem especifica de acesso negado.
- Busca textual pode aceitar menos caracteres que a master.
- Fluxo de balanca fisica pode nao ter sido preservado na branch modularizada.
- Promocoes e impostos podem divergir se o frontend continuar usando consultas separadas como fluxo principal.

## Validacoes necessarias com negocio

- Quais modalidades de desconto podem coexistir em cada tipo de venda.
- Regras de venda sem estoque, estoque parcial e produto de balanca offline.
- Documentos obrigatorios por forma de pagamento.
- Politica de cancelamento apos pagamento ou emissao fiscal.
- Ordem de prioridade entre preco de grade, lista de preco, promocao e desconto manual.
