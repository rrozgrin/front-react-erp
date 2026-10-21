# Documentacao da Frente de Caixa

Este diretorio organiza a referencia funcional e arquitetural da migracao da frente de caixa para React.

## Indice

- [Arquitetura e requisitos](arquitetura-e-requisitos.md): organizacao do modulo, limites entre dominios e decisoes de migracao.
- [Fluxo de busca por codigo de barras](fluxo-busca-produto-codigo-barras.md): comportamento legado, comparacao com a master e requisitos da inclusao de item.
- [Maquina de estados da venda](maquina-estados-venda.md): estados e transicoes permitidas da venda.
- [Contratos de API](contratos-api.md): contratos que devem ser estabilizados entre React e backend.
- [Regras de totalizacao](regras-totalizacao.md): ordem de calculo de totais, descontos, promocoes e impostos.
- [Permissoes e autorizacoes](permissoes-e-autorizacoes.md): acoes restritas e validacoes por senha master.
- [Fluxos de pagamento](fluxos-pagamento.md): formas de pagamento, parcelas, troco e confirmacao.
- [Excecoes operacionais](excecoes-e-cenarios-operacionais.md): cenarios de erro e comportamentos esperados.
- [Estrategia de migracao](estrategia-migracao.md): etapas de substituicao do legado e criterios de aceite.
- [Casos de teste funcionais](casos-teste-funcionais.md): cenarios minimos de validacao.
- [Pendencias e riscos](pendencias-e-riscos.md): pontos ainda dependentes de validacao funcional ou tecnica.
