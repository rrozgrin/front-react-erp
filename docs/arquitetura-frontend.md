# Arquitetura de frontend

## Camadas

- `app`: inicialização, composição de providers e roteamento.
- `features/<dominio>`: regras de negócio, páginas, componentes e dados de um domínio.
- `shared`: elementos agnósticos de domínio que podem ser reutilizados por qualquer feature.
- `services`: infraestrutura transversal, como cliente HTTP, autenticação e integrações.

Enquanto a migração estiver em andamento, `common` é a localização legada equivalente a `shared`. Nenhum componente novo de domínio deve ser criado nessa pasta.

## Estrutura de uma feature

```text
features/<dominio>/
  api/
    dtos/
  adapters/
  components/
  data/
  hooks/
  pages/
  types/
  utils/
  index.ts
```

Use apenas as pastas necessárias ao domínio. A página coordena a tela; regras de domínio reutilizáveis ficam em hooks, componentes ou utilitários da própria feature. Formatação, normalização de texto, tratamento de erros HTTP e outras operações independentes do domínio ficam em `utils` ou `services` compartilhados.

Componentes que conhecem um fluxo específico permanecem próximos à página proprietária. A feature `food99`, por exemplo, mantém filtros, resumos e modais como componentes locais, enquanto estado derivado e transformação de modelos ficam em hooks e utilitários locais. Suas listagens usam a tabela configurável compartilhada: cada tela declara campos, células e ações, e o componente comum mantém estrutura, seleção, responsividade e paginação. Não replique essas capacidades em tabelas feitas manualmente.

### Utilitários transversais

- `src/utils/formatadores.ts` concentra formatação e conversão de valores monetários; `src/types/Formatadores.ts` reexporta os nomes antigos por compatibilidade.
- `src/utils/texto.ts` concentra normalização de slug e escape de HTML.
- `src/services/errosApi.ts` padroniza a leitura de mensagens e detalhes de `ApiError`, recebendo a mensagem padrão específica da operação.
- `src/services/alertas.ts` exibe erros de API com escape seguro de HTML.
- Funções que conhecem entidades, estados ou regras da 99Food permanecem na feature. Só mova para `utils`/`services` quando forem independentes do domínio e houver uso ou intenção real de reutilização.

## Integrações HTTP

Uma integração segue esta fronteira:

```text
página → hook → api/service → cliente configurado → transporte HTTP
                  ↓
              DTO ↔ adapter ↔ type
```

- `api/dtos`: contratos exatos enviados e recebidos pelo backend.
- `types`: modelos consumidos pela feature e pela interface.
- `adapters`: conversão entre DTO e modelo interno.
- `hooks`: única entrada de dados para as páginas; encapsulam consulta, mutation e invalidação.

O service conhece apenas transporte e DTOs. A página não importa `api`, DTOs ou `apiClient`.

### Contrato de hooks

Consultas retornam `dados`, `carregando`, `atualizando`, `erro` e `recarregar`. Mutations retornam `executar`, `carregando`, `erro` e `limparErro`; após sucesso, invalidam as chaves de consulta do domínio. Este é o padrão validado na feature `food99`.

### Convenção de nomes

- Entidades, modelos, variáveis, funções e componentes usam os termos do domínio em português.
- Termos técnicos usuais, como `get`, `list`, `add`, `upsert`, `payload`, `response`, `query`, `hook` e `mutation`, podem permanecer em inglês.
- DTOs também usam nomes de domínio em português, mas suas propriedades preservam exatamente os nomes definidos pela API, inclusive `snake_case` e termos em inglês.
- A tradução do contrato externo para o vocabulário interno acontece exclusivamente nos adapters.

## Regras de dependência

- Uma feature pode depender de `shared`, `services` e de contratos públicos de outra feature.
- `shared` não pode depender de uma feature.
- `services` não pode depender da interface de uma feature.
- Contexto global é reservado para sessão, tema, permissões e preferências transversais.
- Estado de formulário, modal, filtro e listagem pertence à página ou à feature.

## Componentes compartilhados

Um componente só é compartilhado quando não conhece termos, tipos ou regras de um domínio. Por exemplo, tabela, modal base, campo de texto e paginação podem ser compartilhados; componentes que conhecem cliente, produto, cupom ou venda devem ficar na feature responsável.

Prefira composição a props booleanas. Quando um componente precisar controlar busca, filtros, tabela, paginação, exportação e ações em lote, extraia essas responsabilidades em partes menores antes de adicionar novas props.

## Dados e integrações

- O cliente HTTP e tratamento de autenticação permanecem em `services`.
- Endpoints e DTOs de negócio ficam em `features/<dominio>/api`; modelos de tela ficam em `features/<dominio>/types` e a conversão em `adapters`.
- Páginas consomem hooks da feature, não mocks ou chamadas HTTP diretamente.
- Mocks ficam em `data`, com identificação explícita de uso temporário.

## Imports e tipos

- Use aliases `@/features`, `@/services`, `@/assets` e `@` para evitar imports com três ou mais níveis relativos.
- Novos arquivos devem ser TypeScript.
- Não use `any`; modele contratos e estados nulos explicitamente.
- Mantenha `strictNullChecks` e `noImplicitAny` habilitados.

## Roteamento

As rotas de cada domínio devem ser declaradas pela própria feature e agregadas pelo roteador da aplicação. Metadados de breadcrumb, permissão e tratamento de erro devem permanecer próximos à declaração da rota.

## Build e publicação

O servidor de produção recebe o código e os arquivos estáticos gerados, mas não executa o build automaticamente. Por isso, `dist/` não é ignorado e precisa acompanhar no commit o código-fonte correspondente.

Antes de publicar:

1. Execute `npm run build` depois das alterações.
2. Inclua no mesmo commit o código-fonte e a pasta `dist/` recém-gerada.
3. Publique esse commit por inteiro, mantendo juntos `index.html` e os chunks referenciados por ele.

Não reutilize um `dist/` antigo: o HTML pode apontar para nomes de chunks gerados em outro build.
