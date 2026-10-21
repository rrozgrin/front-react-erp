# Excecoes e cenarios operacionais

| Cenario | Comportamento esperado |
| --- | --- |
| Codigo de barras inexistente | Informar erro para codigo numerico ou abrir busca textual quando o termo for valido. |
| Produto sem estoque | Bloquear ou seguir a politica comercial retornada pelo backend. |
| Estoque parcial | Exibir disponibilidade correta, considerando a quantidade ja presente na venda. |
| Produto com grade | Solicitar selecao obrigatoria antes da inclusao. |
| Produto de balanca | Interpretar codigo embutido ou consultar balanca fisica quando disponivel. |
| Balanca offline | Permitir continuidade somente conforme regra comercial e informar indisponibilidade. |
| Promocao bloqueada | Manter valor oficial e apresentar a mensagem retornada pelo backend uma unica vez por venda. |
| Cliente sem credito | Impedir a forma de pagamento dependente de credito e explicar o motivo. |
| Cliente sem documento | Aplicar a regra exigida para crediario, promissoria ou emissao fiscal. |
| Falha de rede | Nao duplicar inclusao ou pagamento; permitir nova tentativa segura. |
| Permissao negada | Manter a venda sem alteracao e mostrar motivo especifico. |
