# Documentacao funcional - buscaProdutoCodBarras

## Objetivo

`buscaProdutoCodBarras` e a rotina central da PreVenda para inserir um item na venda a partir de um codigo digitado/lido no campo de codigo de barras.

Na branch atual, a funcao principal foi reduzida para orquestrar o fluxo e delegar regras para funcoes menores. A regra de negocio continua no frontend legado, mas agora esta distribuida em etapas claras: validacao inicial, consulta de promocao kit, consulta do produto, validacoes comerciais/estoque, montagem dos dados do item, gravacao, aplicacao de promocoes e atualizacao da tela.

## Escopo da branch atual

A branch atual aplica a modularizacao da consulta e inclusao de produto em `js/PreVenda.js`, mantendo a funcao antiga `buscaProdutoCodBarras_PrevendaeOutros` como referencia/compatibilidade.

Principais blocos modularizados:

- `buscaProdutoCodBarras`: orquestra a consulta e inclusao.
- `deveConsultarPromocaoPorTipoDesconto`: define se promocoes automaticas podem ser consultadas.
- `verificaPromocaoKit` e `handleVerificaPromocaoKit`: consultam e tratam kit/combo automatico.
- `carregaProdutos` e `handleCarregaProdutos`: consultam produto e validam retorno.
- `salvaVenda`: cria a pre-venda quando o primeiro item esta sendo inserido.
- `handleProduto`: aplica validacoes antes de salvar o item.
- `handleDadosItem`: calcula preco, quantidade, total e monta payload.
- `salvaProdutosPreVenda`: grava item e dispara rotinas pos-gravacao.
- `consultarMultiItens` e `aplicarDescontoMultiItens`: tratam promocao mix/multi-itens.
- `consultaPromocaoMaisPorMenos`: trata promocao por quantidade.
- `carregarItensVenda` e `incluirProdutoTabela`: recarregam a grade e totais.
- `registrarEventosCalculoMetragem`: trata produtos com calculo M2/M3.

## Comparativo com a master

A `master` manteve a funcao principal longa, mas unificou processamentos importantes no backend, principalmente no retorno de `SalvaProdutosPreVenda.php`. A branch atual melhorou a estrutura do frontend, mas ainda nao incorporou toda a consolidacao funcional da `master`.

### O que a master consolidou

Na `master`, ao salvar o item, `SalvaProdutosPreVenda.php` pode retornar um pacote de resposta ja pronto para atualizar a tela:

- `resumoVenda`
- `htmlItensVenda`
- `promocaoMix`
- `promocaoQuantidade`
- `totalPagar`
- `totalPagarIncluiPromocaoMix`
- mensagens de promocao bloqueada
- dados de impostos

Esse retorno e aplicado por `aplicaRetornoVendaConsolidado`, que atualiza:

- tabela de itens;
- resumo financeiro da venda;
- desconto de itens;
- promocao multi-itens;
- promocao "Mais por Menos";
- total a pagar;
- mensagens de bloqueio entre tipos de promocao.

Na branch atual, depois de salvar o item, o frontend ainda executa chamadas separadas:

- consulta multi-itens em `PromocaoMultiItensApoio.php`;
- consulta "Mais por Menos" em `PromocaoQuantidade.php`;
- consulta total em `valorVenda.php`;
- recarga da grade em `UsuarioController.class.php?action=Dados_Venda`.

### Diferencas funcionais relevantes

1. Retorno consolidado da gravacao

- Master: usa o retorno completo de `SalvaProdutosPreVenda.php` para atualizar a tela.
- Branch atual: trata basicamente `retorno == 1` e ignora campos consolidados que possam vir do backend.
- Risco: totalizacao, impostos, bloqueio de promocoes e HTML da grade podem divergir da master.

2. Payload de `SalvaProdutosPreVenda.php`

A master envia campos que a branch atual nao envia hoje:

- `situacao`
- `idFuncionario`
- `idCliente`
- `consultarPromocaoMix`

Na criacao da venda, a master tambem envia:

- `idTipoVenda`

Risco: regras novas do backend podem nao ser executadas ou podem ser executadas com valores padrao incorretos.

3. Estoque disponivel

- Master: calcula disponibilidade como `qtd_atual - qtd_reservas - qtd_venda_atual`.
- Branch atual: calcula como `qtd_atual - qtd_reservas`.

Risco: permitir venda acima do estoque disponivel quando ja existe quantidade da venda atual impactando a disponibilidade.

4. Permissao de inclusao de item

- Master: trata `retorno == 3` como "Acesso Negado".
- Branch atual: qualquer retorno diferente de `1` vira erro generico.

Risco: perda da mensagem funcional correta e comportamento diferente para usuario sem permissao.

5. Busca textual quando produto nao encontrado

- Master: aceita uma faixa maior de caracteres na busca textual, incluindo acentos e pontuacoes.
- Branch atual: aceita uma expressao mais restrita.

Risco: buscas por descricao com acentos, virgulas, pontos, aspas, percentual ou hifen podem nao abrir corretamente a busca avancada.

6. Balanca fisica para produtos KG

- Master: alem do codigo de balanca, tenta obter peso da balanca fisica quando `item.sigla === 'KG'` e `Balanca.possuiBalanca()`.
- Branch atual: cobre apenas codigo de balanca embutido no codigo de barras.

Risco: perda de fluxo operacional para empresas que usam balanca integrada.

7. Promocoes bloqueadas entre si

- Master: backend verifica conflito entre desconto de grade, multi-itens e "Mais por Menos", retornando mensagem de promocao bloqueada.
- Branch atual: aplica promocoes separadamente no frontend e nao trata claramente `promocaoBloqueada` / `mensagemPromocaoBloqueada`.

Risco: permitir combinacoes ou mensagens diferentes da regra consolidada atual.

8. Impostos

- Master: `SalvaProdutosPreVenda.php` calcula/grava impostos do item e retorna informacoes no resumo.
- Branch atual: nao documenta nem aplica diretamente esse retorno consolidado.

Risco: total exibido no frontend pode ficar diferente do total fiscal/comercial calculado no backend.

## Parecer tecnico

A branch atual esta melhor estruturada para a migracao React, porque separa responsabilidades e reduz a funcao principal para um orquestrador. Esse desenho deve ser preservado.

Porem, funcionalmente, a `master` deve ser considerada a referencia mais atual para retorno de gravacao, totalizacao, promocoes, impostos, permissao e bloqueios entre promocoes.

O ajuste recomendado nao e voltar para a funcao longa da master. O caminho ideal e manter os modulos da branch atual e adaptar `salvaProdutosPreVenda` para consumir primeiro o retorno consolidado da master. As chamadas separadas para promocao, total e recarga de itens devem ficar como fallback legado, nao como fluxo principal.

## Ajustes recomendados antes da migracao React

1. Atualizar o payload de `salvaVenda` para enviar `idTipoVenda`.
2. Atualizar o payload de `salvaProdutosPreVenda` para enviar `situacao`, `idFuncionario`, `idCliente` e `consultarPromocaoMix`.
3. Em `salvaProdutosPreVenda`, tratar `response.retorno == 3` com mensagem de acesso negado.
4. Em `salvaProdutosPreVenda`, quando o backend retornar `htmlItensVenda` ou `resumoVenda`, aplicar um fluxo consolidado equivalente a `aplicaRetornoVendaConsolidado`.
5. Manter `consultarMultiItens`, `consultaPromocaoMaisPorMenos`, `getVendaValue` e `carregarItensVenda` apenas como fallback quando o backend nao retornar dados consolidados.
6. Corrigir calculo de disponibilidade para considerar `qtd_venda_atual`.
7. Expandir regex da busca textual para manter compatibilidade com a master.
8. Avaliar portabilidade do fluxo de balanca fisica `Balanca.obterPeso()` para React.
9. Mapear `promocaoBloqueada` e `mensagemPromocaoBloqueada` como requisito funcional.
10. Mapear impostos retornados pelo backend como parte do resumo financeiro da venda.

## Entradas funcionais

Campos e estados usados pela rotina:

- Vendedor: `iptIdFuncionario`.
- Cliente: `iptIdCliente`.
- Quantidade: `iptQuantidade`; se vazio ou zero, assume `1`.
- Codigo de barras: `.iptCodBarras` / `iptCodigoDeBarras`.
- Venda atual: `iptIdVenda` / `iptIdVenda` por `name`.
- Tipo de venda: `idTipoVenda`.
- Tipo de compra/preco: `iptTipoCompra`, `tipoCompra` ou `slcTipoPreco`.
- Tipo de desconto do cliente/venda: `slcTipoDesconto`.
- Lista de preco ativa: `localStorage.id_lista_preco`.
- Permissoes: `window.permissoes`, `window.PERMISSOES` ou cookie `permissoes`.
- Estado do vendedor alterado: `window.mudouVendedor` e `localStorage.estadoVendedor:*`.
- Configuracoes de metragem: cookies `_CALCULAR_M2` e `_CALCULAR_M3`.

## Fluxo principal

1. Bloqueia execucoes concorrentes com `buscaProdutoCodBarrasLock`.
2. Sincroniza o estado do vendedor com o formulario.
3. Se a permissao `157` exigir troca de vendedor e o vendedor nao tiver sido alterado, exibe alerta e interrompe.
4. Le vendedor, cliente, quantidade, venda atual, quantidade de linhas da grade e codigo de barras.
5. Define se deve consultar promocoes automaticas:
   - consulta se `slcTipoDesconto` esta vazio;
   - nao consulta se ha desconto definido para o cliente/venda.
6. Quando nao deve consultar promocao, zera estado visual/global de promocao mix:
   - `window.id_desconto_promocao_mix = 0`;
   - `window.desconto_promocao_mix = 0`;
   - `window.descontos.multiItens = 0`;
   - oculta `.divShowDescontoMultiItens`.
7. Valida vendedor e cliente:
   - sem vendedor: abre `divModalSemVendedor`;
   - sem cliente: abre `divModalSemCliente`.
8. Valida sessao com `validaSessao`.
9. Se promocoes automaticas estiverem liberadas, consulta kit/combo.
10. Se kit/combo foi aplicado, atualiza a tela da pre-venda e encerra.
11. Consulta produto em `CarregaProdutos.php`.
12. Valida o retorno em `handleCarregaProdutos`.
13. Se encontrou produto e ele for `kit_combo == "S"`, chama `buscaKitCombo` e encerra.
14. Se for o primeiro item da grade, cria a venda em `SalvaPreVenda.php`.
15. Processa o produto normal em `handleProduto`.
16. Se nao encontrou produto normal, mas o codigo tem formato de balanca, tenta localizar pelo codigo interno da balanca.
17. Se o produto de balanca existir, cria venda se necessario e processa como produto de balanca.
18. Libera o lock no `finally`, mesmo em erro ou retorno antecipado.

## Consulta de promocao kit/combo

A consulta ocorre antes da busca do produto comum, mas somente quando `slcTipoDesconto` esta vazio.

Endpoint:

- `../../apoio/PromocaoKit.php`

Payload:

- `codigo_barra`
- `action = buscaComboCodBarras`
- `id_venda`
- `id_funcionario`
- `id_cliente`
- `qtd`

Retorno esperado:

- Quando `mensagem == 1`, o kit/combo ja foi processado no backend.

Efeitos quando o kit/combo e aplicado:

- Define `inputKitCombo = 1`.
- Atualiza `iptNumeroPedidoPreVenda` com `id_venda` retornado.
- Mostra `descricao_kit` no topo.
- Troca o filtro de busca para `numero_pedido`.
- Aciona `btnLocalizarPreVenda`.
- Limpa mensagens de validacao.
- Limpa o campo de codigo de barras.
- Registra quantidade em `totalQTDVendaItenskitCombo`.
- Zera `iptQuantidade`.
- Encerra o fluxo sem salvar produto comum.

## Consulta do produto

Endpoint:

- `../../apoio/CarregaProdutos.php`

Payload:

- `iptCodigoDeBarras`

Retorno esperado:

- Array com pelo menos um produto quando encontrado.
- `null` quando nao encontrado.
- Array vazio quando ha produto sem estoque conforme retorno legado.
- Objeto com `tamanholista` quando ha grades/opcoes para selecionar.
- `1` em caso especifico de produto indisponivel para locacao.

## Validacoes do retorno do produto

`handleCarregaProdutos` centraliza as validacoes logo apos a consulta.

Regras aplicadas:

- Salva dados temporarios do primeiro produto:
  - `sessionStorage.codigo_barra_temp`;
  - `id_unidade_atual`;
  - `descricao_atual`;
  - `preco_unitario_atual`.
- Bloqueia inclusao se `idTipoVenda == 4`, pois venda consignada nao permite adicionar item.
- Se produto nao foi encontrado e promocoes estao liberadas, consulta combo por codigo em `PromocaoKit.php` com `action = verificaComboCodBarras`.
- Se o codigo nao foi encontrado e e numerico, exibe alerta "Codigo de barras nao encontrado".
- Se o codigo permite busca textual e nao e codigo de balanca, abre a busca avancada de produto.
- Se ha varias grades (`tamanholista > 1`) e `itemPai` esta `false`, abre modal de grade.
- Se retorno e array vazio, exibe "Produto sem estoque".
- Calcula disponibilidade como `qtd_atual - qtd_reservas`.
- Se `vender_estoque_zerado == "N"` e disponibilidade e menor ou igual a zero, bloqueia.
- Se `vender_estoque_zerado == "N"` e quantidade solicitada e maior que disponibilidade, bloqueia.
- Se `produto_indisponivel_locacao == 1`, mostra aviso de indisponibilidade para locacao.
- Se produto nao foi encontrado, mostra `divProdutoNaoEncontrado`, limpa codigo e volta foco.

## Tratamento de produto de balanca

A rotina so tenta balanca depois de nao encontrar produto comum.

Condicoes:

- Codigo inicia com `2`.
- Codigo possui 13 digitos.

Passos:

1. Le `iptQtdDigitoBalanca`.
2. Extrai o codigo interno com `codigoBarra.substr(1, QtdDig)`.
3. Consulta novamente `CarregaProdutos.php` usando o codigo interno.
4. Se encontrar, processa com `balanca = true`.
5. Em `handleDadosItem`, extrai o valor total do codigo com `codigoBarraDigitado.substr(7, 5) / 100`.
6. Calcula a quantidade por `valorTotalBalanca / valorUnitario`.

Observacao funcional: primeiro a rotina tenta encontrar o codigo completo como produto comum, para preservar o caso legado de produtos comuns iniciados com `2`.

## Validacoes antes de salvar o item

`handleProduto` executa as validacoes comerciais finais.

Regras:

- Esconde avisos de produto nao encontrado e indisponivel para locacao.
- Se `solicitar_vrtotal == "S"`, abre `divModalValorTotal` e interrompe.
- Verifica estoque minimo em `verificaEstoqueMinimo`.
- Se `bloqueado_venda == "S"`, exibe erro, limpa entrada e interrompe.
- Se preco de varejo e atacado sao zero ou negativos, exibe alerta, limpa entrada e interrompe.
- Se existe `observacao`, exibe alerta informativo.
- Se `data_validade` existe e `alertar_validade == "S"`:
  - vencimento em ate 30 dias: alerta;
  - produto vencido: exige confirmacao para continuar.

## Regra de estoque minimo

`verificaEstoqueMinimo` aplica alerta quando o produto e mercadoria (`prod_serv == "P"`) e:

- a quantidade atual ficara menor ou igual ao estoque minimo; ou
- a quantidade atual ja e zero/negativa.

Efeitos:

- Atualiza `iptTtEstoque`.
- Aplica classe visual amarela/vermelha.
- Exibe popover de alerta.
- Consulta permissoes em `permissoes_geral.php`.
- Se permissao `140` estiver ativa, exige senha master em `VerificarSenhaMaster.php`.
- Se a senha for cancelada/incorreta, limpa codigo, limpa estoque e interrompe inclusao.

## Montagem dos dados do item

`handleDadosItem` prepara o payload para `SalvaProdutosPreVenda.php`.

Regras de preco:

- Base padrao: `valor_unitario`.
- Se tipo de compra for `A`, usa `valor_unitario_atacado`.
- Se tipo de compra for `P` e `custo_medio_venda_prazo` for valido, usa `custo_medio_venda_prazo`.
- Se existir `localStorage.id_lista_preco` e o produto possuir `id_grade`, consulta `ConsultaProdutoPreco.php`.
- Se a lista de preco retornar valor valido, sobrescreve o valor unitario.

Regras de quantidade e total:

- Quantidade final e formatada com 3 casas.
- Total = quantidade final * valor unitario.
- Se `truncar_vlr_total == "S"`, arredonda com `_.round`.
- Caso contrario, formata com `number_format`.

Payload montado:

- `idVenda`
- `idProduto`
- `nomeProduto`
- `quantidade`
- `valorUnitario`
- `codigoDeBarras`
- `valorTotalItem`
- `idUnidade`
- `valorPrecoCusto`
- `idGrade`
- `iptTipoCompra`
- `truncar_vlr_venda`
- `deveConsultarPromocao`
- `codigoBarraDigitado`

Efeitos visuais:

- Atualiza descricao do produto no topo.
- Atualiza `.iptVlrUnit`.
- Atualiza `.iptVlrTotal`.
- Limpa o campo de codigo de barras.

## Criacao da venda

Quando a grade ainda nao possui itens, a rotina cria a pre-venda antes de salvar o produto.

Endpoint:

- `../../apoio/SalvaPreVenda.php`

Payload:

- `idFuncionario`
- `idCliente`
- `tipoVenda = slcTipoPreco`

Efeitos:

- Atualiza `iptIdVenda`.
- Atualiza `.divNumeroPedido`.
- Atualiza o input `name="iptIdVenda"`.

## Gravacao do item

Endpoint:

- `../../apoio/SalvaProdutosPreVenda.php`

Antes de gravar:

- Se `situacaoPreVenda == "F"`, bloqueia a inclusao porque a venda ja esta faturada.

Retorno esperado:

- `retorno == 1` indica sucesso.
- `idVendaItem` identifica o item salvo.

Efeitos em sucesso:

- Atualiza `id_venda_item_atual`.
- Atualiza o ultimo registro de `localStorage.codigo_barra` com `n_item` e `idVendaItem`.
- Se promocoes automaticas estiverem liberadas, consulta multi-itens.
- Consulta promocao "Mais por Menos".
- Se unidade atual for M2 e calculo estiver ativo, abre modal M2.
- Se unidade atual for M3 e calculo estiver ativo, abre modal M3.
- Caso contrario, recarrega a tabela de itens.
- Registra eventos dos modais de metragem.

## Promocao multi-itens

A promocao multi-itens so e consultada quando `deveConsultarPromocao` e verdadeiro, ou seja, quando nao ha desconto em `slcTipoDesconto`.

Endpoint:

- `../../apoio/promocao-multi-itens/PromocaoMultiItensApoio.php`

Payload:

- `codigo_barra`
- `action = buscaExistePromocaoMixNova`
- `id_venda`
- `id_funcionario`
- `id_cliente`
- `qtd`
- `truncar_vlr_venda`

Retorno esperado:

- Campo `desconto_aplicado`.
- Campo `id` da promocao, quando aplicavel.

Efeitos quando nao ha desconto:

- Oculta bloco de desconto multi-itens.
- Restaura texto padrao.
- Zera `window.descontos.multiItens`.
- Zera `window.id_desconto_promocao_mix`.
- Zera `window.desconto_promocao_mix`.
- Recalcula totais.

Efeitos quando ha desconto:

- Armazena `window.id_desconto_promocao_mix`.
- Armazena `window.desconto_promocao_mix`.
- Armazena `window.descontos.multiItens`.
- Oculta desconto geral.
- Mostra bloco de desconto multi-itens.
- Atualiza `spanValorTotalDescontoMultiItens`.
- Recalcula totais.

## Promocao Mais por Menos

Essa promocao e consultada apos salvar o item, independentemente de `deveConsultarPromocao`.

Endpoint:

- `../../apoio/PromocaoQuantidade.php`

Payload:

- `id_grade`
- `id_venda`
- `action = buscaPromocaoPorItem`

Retorno esperado:

- `valor_desconto`

Efeitos:

- Se desconto diferente de zero, mostra `.descMaisPorMenos`, atualiza `iptValorDescMaisPorMenos` e `window.descontos.maisPorMenos`.
- Se desconto zero, oculta `.descMaisPorMenos`, zera `iptValorDescMaisPorMenos` e `window.descontos.maisPorMenos`.
- Recalcula totais.

## Calculo dos totais

`atualizarTotaisDesconto` considera:

- Total base em `iptValorTotalVenda`.
- Desconto multi-itens em `window.desconto_promocao_mix`.
- Desconto "Mais por Menos" em `iptValorDescMaisPorMenos`.

Fluxo:

1. Calcula `totalComMix = totalBase - desconto_promocao_mix`.
2. Chama `getVendaValue(totalComMix)`.
3. `getVendaValue` consulta `valorVenda.php` com:
   - `action = getVendaValue`;
   - `id_venda`;
   - `id_cadastro`;
   - `mais_por_menos`.
4. Se houver desconto mix, exibe o retorno do backend com aviso de promocao mix.
5. Se nao houver desconto mix, calcula total final localmente subtraindo "Mais por Menos".
6. Aplica truncamento conforme `DIGITOS_ATUAIS`.
7. Se existir `aplicaTipoDescontoVisual`, executa a rotina visual de desconto geral.

## Recarregamento dos itens

`carregarItensVenda` busca os dados atualizados da venda.

Endpoint:

- `../../controller/sistema/UsuarioController.class.php`

Payload:

- `action = Dados_Venda`
- `idEmpresa`
- `idVenda`

`incluirProdutoTabela` espera uma string separada por `|`.

Campos usados:

- Posicao `0`: total da venda.
- Posicao `2`: HTML dos itens.
- Posicao `4`: total final.

Efeitos:

- Atualiza `tbodyProdutosVenda`.
- Rola a grade ate o fim.
- Atualiza descricao do ultimo item no topo.
- Ajusta colunas.
- Atualiza `valorTotalVenda`, `iptVrTotalVendaSD` e `iptValorTotalVenda`.
- Recalcula total a pagar.
- Limpa `iptQuantidade`.
- Foca `iptCodigoDeBarras`.

## Calculo de metragem M2/M3

Depois que o item e salvo:

- Se `id_unidade_atual == 14` e `_CALCULAR_M2 == 1`, abre `modalCalculoM2`.
- Se `id_unidade_atual == 15` e `_CALCULAR_M3 == 1`, abre `modalCalculoM3`.
- Caso contrario, recarrega os itens imediatamente.

Eventos registrados:

- Ao abrir modal, foca o campo de largura.
- Botao calcular M2 chama `CalculoMetragem.php` com `action = metro_quadrado`.
- Botao calcular M3 chama `CalculoMetragem.php` com `action = metro_cubico`.
- Cancelar ou pressionar ESC remove/cancela o item em `CalculoMetragem.php` com `action = cancelar_calculo`.
- Apos calcular ou cancelar, recarrega a venda, fecha modais, foca codigo de barras e limpa campos.

## Saidas e retornos possiveis

A funcao principal nao retorna objeto de dominio para o chamador. O resultado e aplicado por efeitos colaterais no DOM, no backend e em estados globais.

Saidas de sucesso:

- Venda criada, se era o primeiro item.
- Produto salvo na pre-venda.
- Promocoes recalculadas.
- Grade de itens atualizada ou modal de metragem aberto.
- Total a pagar atualizado.
- Campo de codigo preparado para proxima leitura.

Interrupcoes esperadas:

- Execucao concorrente em andamento.
- Vendedor obrigatorio nao informado.
- Cliente obrigatorio nao informado.
- Vendedor nao alterado quando permissao `157` exige.
- Kit/combo processado.
- Produto de valor total manual.
- Produto bloqueado.
- Produto com preco zerado.
- Produto vencido sem confirmacao.
- Venda faturada.
- Venda consignada.
- Produto nao encontrado.
- Produto sem estoque.
- Estoque insuficiente ou venda com estoque zerado/negativo nao autorizada.
- Estoque minimo sem senha master valida.
- Produto indisponivel para locacao.
- Grade com multiplas opcoes aguardando selecao.

## Requisitos funcionais para migracao React

RF01 - A tela deve impedir inclusoes concorrentes do mesmo codigo.

RF02 - A tela deve exigir vendedor e cliente antes de iniciar a inclusao.

RF03 - Quando a permissao `157` estiver ativa, a venda so pode iniciar apos alteracao/sincronizacao do vendedor.

RF04 - Quantidade vazia ou zero deve ser tratada como `1`.

RF05 - Promocoes automaticas de kit e multi-itens so devem ser consultadas quando `slcTipoDesconto` estiver vazio.

RF06 - Ao existir desconto definido no cliente/venda, o desconto multi-itens deve ser zerado e ocultado.

RF07 - A consulta de kit/combo deve acontecer antes da consulta comum do produto.

RF08 - Quando o backend retornar kit/combo aplicado, a venda deve ser localizada/atualizada e o fluxo comum deve ser encerrado.

RF09 - A busca deve tentar primeiro o codigo completo como produto comum.

RF10 - Se o produto comum nao existir e o codigo tiver formato de balanca, deve tentar localizar pelo codigo interno de balanca.

RF11 - A venda deve ser criada automaticamente antes de salvar o primeiro item.

RF12 - Venda faturada nao pode receber item novo.

RF13 - Venda consignada nao pode receber item novo no fluxo atual.

RF14 - Produto com multiplas grades deve abrir selecao antes da inclusao.

RF15 - Produto sem estoque, estoque insuficiente ou estoque zerado/negativo nao autorizado deve bloquear inclusao.

RF16 - Produto que atinge estoque minimo deve alertar e, se a permissao `140` exigir, solicitar senha master.

RF17 - Produto bloqueado para venda deve impedir inclusao.

RF18 - Produto com preco zerado deve impedir inclusao.

RF19 - Produto com observacao deve exibir alerta antes de continuar.

RF20 - Produto com validade proxima deve alertar; produto vencido deve exigir confirmacao.

RF21 - Produto com `solicitar_vrtotal == "S"` deve abrir modal de valor total e nao seguir pelo fluxo padrao.

RF22 - O preco deve respeitar tipo de compra: varejo, atacado ou prazo.

RF23 - Lista de preco ativa deve sobrescrever o preco base quando houver preco valido para a grade.

RF24 - Produto de balanca deve converter valor total embutido no codigo em quantidade.

RF25 - O payload de gravacao deve preservar id da venda, produto, grade, unidade, quantidade, valor unitario, total, tipo de compra e codigo digitado.

RF26 - Apos salvar item, a tela deve atualizar o ultimo item em `localStorage.codigo_barra` com `idVendaItem`.

RF27 - Apos salvar item, a promocao multi-itens deve ser consultada quando habilitada.

RF28 - Apos salvar item, a promocao "Mais por Menos" deve ser consultada.

RF29 - Totais devem considerar descontos multi-itens e "Mais por Menos", preservando truncamento por `DIGITOS_ATUAIS`.

RF30 - Quando produto exigir M2/M3, a tela deve abrir o modal de calculo antes de recarregar definitivamente a grade.

RF31 - Cancelar calculo M2/M3 deve remover/cancelar o item salvo para calculo.

RF32 - Apos sucesso sem metragem, a grade deve ser recarregada, os totais atualizados, a quantidade limpa e o foco voltar ao codigo de barras.

## Dependencias externas a preservar

Endpoints:

- `CarregaProdutos.php`
- `SalvaPreVenda.php`
- `SalvaProdutosPreVenda.php`
- `PromocaoKit.php`
- `PromocaoQuantidade.php`
- `PromocaoMultiItensApoio.php`
- `valorVenda.php`
- `UsuarioController.class.php?action=Dados_Venda`
- `CalculoMetragem.php`
- `permissoes_geral.php`
- `VerificarSenhaMaster.php`
- `ConsultaProdutoPreco.php`

Bibliotecas/infra de frontend:

- jQuery
- SweetAlert/Swal
- Bootstrap modal
- Lodash (`_.round`)
- Funcoes globais legadas: `validaSessao`, `tiraGradeNomeProd`, `number_format`, `truncate`, `formatarReal`, `formatarMascaraQtd`, `ajustaColunas`, `buscaKitCombo`, `consultaProdutoPreco`, `aplicaTipoDescontoVisual`.

Estados globais:

- `window.mudouVendedor`
- `window.vendedorInicialId`
- `window.desconto_promocao_mix`
- `window.id_desconto_promocao_mix`
- `window.aviso_promocao_mix`
- `window.descontos`
- `inputKitCombo`
- `id_venda_item_atual`
- `id_unidade_atual`
- `descricao_atual`
- `preco_unitario_atual`

## Pontos de atencao para React

- A funcao atual depende fortemente de efeitos colaterais em DOM e variaveis globais. Na migracao, esses estados devem virar estado de tela/contexto/store.
- O backend retorna formatos heterogeneos: JSON, texto parseavel como JSON e strings separadas por `|`.
- O fluxo de promocao kit pode encerrar a inclusao antes de existir produto comum.
- O fluxo de balanca so roda apos falha da busca comum.
- M2/M3 salva o item antes de confirmar as medidas; cancelar deve desfazer o item.
- Promocao multi-itens e desconto geral sao mutuamente sensiveis: quando ha mix, o desconto geral visual e ocultado.
- `Mais por Menos` e consultado mesmo quando multi-itens esta desabilitado por desconto de cliente/venda.
- O total final ainda depende de `valorVenda.php`, entao a regra completa de totalizacao nao esta toda no frontend.
