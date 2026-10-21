# Próximas etapas de arquitetura

## Objetivo

Consolidar a arquitetura do frontend antes de conectar os módulos às APIs reais. O foco é tornar a integração previsível: cada domínio deve ter contratos claros, acesso a dados encapsulado e páginas livres de detalhes de transporte, mocks e regras de infraestrutura.

O projeto não precisa passar por uma reescrita. As mudanças devem ser incrementais, preservar telas e fluxos existentes e sempre manter lint, typecheck e build aprovados.

## Estado atual

Já existem fundamentos importantes:

- features por domínio;
- rotas modularizadas e carregamento sob demanda;
- `apiClient` central com autenticação, renovação de token e tratamento de erros;
- serviços, DTOs, adapters e hooks especializados, validados pela integração 99Food;
- componentes de interface reutilizáveis;
- dados de demonstração em parte dos domínios;
- feature de operação comercial compartilhada por frente de caixa e pré-venda;
- aliases de importação e validações de `strictNullChecks` e `noImplicitAny`.

O padrão de acesso a dados já está definido e aplicado na 99Food. O principal trabalho restante é replicá-lo progressivamente para os domínios que receberão APIs reais.

## Decisões arquiteturais

### Camadas

```text
src/
  app/                         # bootstrap, providers e composição de rotas
  features/<dominio>/          # regras e interface de cada domínio
    api/                       # endpoints e DTOs
      dtos/                    # contratos exatos do backend
    adapters/                  # conversão entre DTO e modelo interno
    components/                # componentes específicos do domínio
    data/                      # fixtures e mocks temporários
    hooks/                     # queries e mutations da feature
    pages/                     # telas roteáveis
    types/                     # modelos usados pela interface
    utils/                     # regras auxiliares
    index.ts                   # API pública da feature
  services/                    # infraestrutura HTTP e autenticação
  shared/                      # UI e utilitários realmente agnósticos
```

Enquanto a migração não estiver concluída, `common` representa a camada legada de `shared`. Nenhum componente novo de negócio deve ser criado nela.

### Regras de dependência

- Uma feature pode importar `shared`, `services` e a API pública de outra feature.
- `shared` não pode importar uma feature.
- `services` não pode conhecer páginas, componentes ou tipos de tela.
- Páginas não chamam `apiClient` nem manipulam DTOs diretamente.
- Mocks não são importados diretamente por páginas; eles entram por uma camada de repositório, API temporária ou hook.
- Contexto global fica restrito a sessão, tema, permissões e preferências transversais.

### Modelo de dados

Cada integração deve separar três representações:

1. **DTO de entrada/saída**: formato exato do backend.
2. **Modelo de domínio/UI**: formato que a feature utiliza.
3. **Estado de formulário**: formato temporário da edição, quando for diferente do modelo de domínio.

O mapeamento entre DTO e modelo fica em `adapters`. A tela não deve depender de nomes, campos opcionais ou envelopes específicos do backend.

## Fase 1 — Consolidar a operação comercial — concluída

### Objetivo

Concluir a separação do fluxo reutilizado por frente de caixa, pedido, orçamento, ordem de serviço e venda consignada.

### Ações

- Manter `OperacaoComercialPage` e suas configurações na feature `operacao-comercial`.
- Migrar `ItemSelector`, alteração de item e cancelamento de item para essa feature se forem compartilhados pelos fluxos.
- Manter na frente de caixa somente telas e componentes exclusivos do fechamento de venda.
- Remover gradualmente a reexportação de compatibilidade da feature de frente de caixa quando não houver mais consumidores.
- Definir no contrato da operação comercial quais ações são configuráveis: finalizar, desconto, localizar, alterar, cancelar, cliente, produto e vendedor.

### Critério de conclusão

As páginas de pré-venda não importam arquivos internos da frente de caixa e a frente de caixa importa apenas a API pública de `operacao-comercial`.

### Resultado

- `OperacaoComercialPage` e seus componentes compartilhados pertencem à feature `operacao-comercial`.
- Frente de caixa, pedido, orçamento, ordem de serviço e venda consignada usam a API pública da operação comercial.
- A frente de caixa mantém somente o fechamento específico da venda.

## Fase 2 — Classificar e migrar componentes de domínio — concluída para componentes com dono evidente

### Objetivo

Esvaziar progressivamente `common` de componentes que conhecem regras de negócio.

### Método

Para cada componente em `common`, responder:

1. Ele conhece entidade, fluxo ou regra de negócio?
2. É usado por mais de uma feature?
3. Caso seja compartilhado, existe um domínio comercial claro que deve possuí-lo?

### Destino

- UI genérica: permanece em `shared`/`common`.
- Componente de uma entidade: vai para a feature da entidade.
- Componente de fluxo compartilhado: vai para a feature que representa esse fluxo, como `operacao-comercial`.
- Componente usado por dois domínios sem um dono claro: criar uma feature de capacidade compartilhada somente quando houver uso real; não antecipar abstrações.

### Prioridades

- `ItemSelector` e modais de alteração/cancelamento de item.
- Componentes financeiros que pertencem a clientes, contas ou financeiro.
- Modais de comunicação e aniversário vinculados a clientes.
- Templates que carregam regras de listagem ou relatório além da apresentação.

### Resultado

- Componentes de operação comercial, clientes, financeiro e home com dono claro foram removidos de `common`.
- Financeiro ganhou uma feature própria, reutilizada por cliente e relatórios financeiros.
- Itens genéricos permanecem em `common` enquanto a migração para `shared` é gradual.

## Fase 3 — Modularizar listagens e tabelas

### Objetivo

Reduzir responsabilidades de `ListagemTemplate` e `PageLayout` sem quebrar as páginas existentes.

### Extrações previstas

- hook de busca e normalização;
- hook de filtro por período;
- toolbar de ações;
- configuração e visibilidade de colunas;
- paginação local e paginação remota;
- seleção e ações em lote;
- exportação e impressão;
- estados de carregamento, vazio e erro.

### Regra

O template deve coordenar composição visual. Regras de filtro, seleção, exportação e paginação devem estar em hooks ou componentes especializados. Novas props booleanas só devem ser adicionadas quando não houver uma composição mais clara.

### Critério de conclusão

Uma nova tela de listagem consegue escolher somente os recursos necessários, sem receber uma API extensa e obrigatória.

## Fase 4 — Padronizar acesso a dados — concluída na 99Food

### Objetivo

Definir o caminho único entre API e página.

### Estrutura por feature

```text
features/clientes/
    api/
      clientesApi.ts
      dtos/
        clientesDtos.ts
    adapters/
      clientesAdapter.ts
  hooks/
    useClientesQuery.ts
    useClienteQuery.ts
    useClienteMutations.ts
  types/
    Cliente.ts
  data/
    clientesFixtures.ts
```

### Responsabilidades

- `apiClient`: URL base, headers, token, refresh, serialização e erro HTTP.
- `api`: endpoint, DTO, unwrap do envelope e mapper.
- `hooks`: cache, carregamento, erro, invalidação e mutação.
- página: renderização e composição de ações.
- componente: interface e callbacks tipados.

### Referência implementada: 99Food

- Autenticação, pedidos e catálogo possuem `api/dtos`, `types`, `adapters` e hooks.
- Páginas não chamam serviços ou arquivos de `api` diretamente.
- Consultas expõem `dados`, `carregando`, `atualizando`, `erro` e `recarregar`.
- Mutations expõem estado próprio e invalidam o cache de consultas após sucesso.
- Os hooks legados com cache imperativo foram removidos do catálogo e autenticação.
- Tabelas da 99Food respeitam a largura disponível da página quando o menu lateral abre ou fecha.

### Uso de mocks

Durante a transição, o hook deve manter a mesma assinatura ao consumir fixture ou API. Exemplo conceitual: uma listagem usa `useClientesQuery`; a origem pode ser fixture em desenvolvimento ou endpoint real posteriormente.

## Fase 5 — Integrar APIs por domínio

### Ordem sugerida

1. Autenticação, usuário e permissões.
2. Clientes.
3. Produtos.
4. Fornecedores e transportadoras.
5. Operação comercial e frente de caixa.
6. Relatórios e integrações especializadas.

### Checklist por endpoint

- Definir DTO de request e response.
- Validar o contrato com backend e documentar campos ambíguos.
- Criar mapper para o modelo interno.
- Criar hook de query ou mutation.
- Implementar carregamento, vazio, erro e retry quando aplicável.
- Invalidar ou atualizar cache após mutação.
- Remover o mock somente após o fluxo estar validado.
- Criar caso de teste para mapper e regra crítica.

## Fase 6 — Estado global e autorização

### Objetivo

Evitar providers globais que armazenem estado de tela e padronizar proteção de rotas.

### Ações

- Revisar cada contexto e registrar sua responsabilidade.
- Separar dados de sessão, permissões e preferências de estados voláteis de interface.
- Criar uma abstração de rota privada baseada em sessão e permissões.
- Associar permissões aos metadados de rota, não a verificações repetidas em páginas.

## Fase 7 — Qualidade e performance

### Tipagem

- Migrar `.jsx` para `.tsx` quando os arquivos forem alterados.
- Manter `strictNullChecks` e `noImplicitAny`.
- Avaliar `noUncheckedIndexedAccess` depois de estabilizar os contratos.
- Eliminar `any` novo; exceções devem ser justificadas e localizadas.

### Imports e lint

- Substituir imports com três ou mais níveis por aliases gradualmente.
- Aplicar lint também a arquivos TypeScript quando houver uma versão de parser compatível com a versão adotada de TypeScript.

### Bundle

- Manter páginas e modais pesados em lazy loading.
- Preservar carregamento dinâmico do Excel apenas na exportação.
- Medir o bundle após cada integração de dependência pesada.
- Separar bibliotecas grandes por domínio apenas quando a medição mostrar benefício.

### Situação atual

- `strictNullChecks` e `noImplicitAny` estão habilitados.
- Lint, typecheck e build são executados a cada etapa de refatoração.
- O bundle principal e o chunk do Excel ainda devem ser medidos antes de uma otimização dedicada; o aviso de tamanho atual não bloqueia a aplicação.

## Rotina para cada refatoração

1. Mapear consumidores com busca textual.
2. Mover um conceito por vez.
3. Preservar a API pública ou criar adaptação temporária.
4. Atualizar imports para aliases.
5. Executar lint, typecheck e build.
6. Registrar o commit com escopo do domínio.
7. Remover a compatibilidade temporária apenas depois de não haver consumidores.

## Definição de pronto para iniciar APIs reais

O projeto estará pronto quando:

- cada domínio prioritário tiver estrutura de `api`, `hooks`, `types` e `data`;
- páginas não consumirem mocks ou serviços diretamente;
- operação comercial estiver independente da implementação interna de frente de caixa;
- componentes de domínio não forem criados em `common`;
- fluxos principais tiverem estados padronizados de carregamento, vazio e erro;
- contratos de API e modelos de tela estiverem separados;
- lint, typecheck e build estiverem estáveis.

## Próxima etapa recomendada

Aplicar o padrão da 99Food no primeiro domínio com API real, começando por clientes: criar DTOs, adapter, hooks declarativos e substituir o acesso direto a mocks sem alterar a assinatura consumida pelas páginas.
