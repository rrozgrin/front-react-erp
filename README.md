# AppWebControl

Aplicação administrativa construída com React, Vite e TypeScript. O projeto está em migração gradual do código legado para módulos por domínio, preservando o comportamento existente durante a reorganização.

## Tecnologias

- React 19 e React Router DOM 7
- TypeScript e Vite 8
- styled-components e Bootstrap 5
- TanStack React Table
- Chart.js, ExcelJS e React Icons

## Como executar

```bash
npm install
npm run dev
```

O servidor de desenvolvimento abre em `http://localhost:5173`.

```bash
npm run lint       # ESLint e verificação TypeScript estrita
npm run typecheck  # verificação TypeScript
npm run build      # build de produção em dist/
npm run preview    # serve o build de dist/
```

`npm run preview` não possui atualização automática. Depois de alterar o código, execute `npm run build` novamente e recarregue a página.

### Publicação em produção

O servidor de produção não gera o build automaticamente. Antes de publicar alterações, execute `npm run build` e inclua a pasta `dist/` gerada no mesmo commit do código-fonte. O deploy deve enviar os arquivos do commit juntos, pois o `index.html` referencia chunks específicos daquele build. Não publique apenas o código-fonte nem misture arquivos `dist/` de builds diferentes.

## Estrutura atual

```text
src/
├── assets/             # imagens e estilos globais
├── common/
│   ├── components/     # componentes reutilizáveis de interface
│   ├── enums/          # enumerações compartilhadas
│   └── hooks/          # hooks comuns, incluindo useConsultaApi
├── context/            # contextos legados ainda em uso
├── features/           # módulos de negócio organizados por domínio
│   ├── auth/
│   ├── clientes/
│   ├── fornecedores/
│   ├── transportadoras/
│   ├── funcionarios/
│   ├── produtos/
│   ├── servicos/
│   ├── home/
│   ├── food99/
│   ├── financeiro/
│   └── ...
├── hooks/              # hooks de compatibilidade e domínios antigos
├── providers/          # composição dos providers da aplicação
├── router/             # roteador, lazy loading e agrupamento de rotas
├── services/           # cliente HTTP e serviços transversais
├── templates/          # layout global: Header, Navigation, Content e Footer
├── types/              # tipos compartilhados
└── utils/              # funções utilitárias
```

Cada feature deve concentrar páginas, tipos, dados temporários, serviços e itens compartilhados do próprio domínio.

```text
src/features/clientes/
├── data/
├── pages/
│   ├── Cadastro/
│   ├── Financeiro/
│   ├── Ocorrencias/
│   └── shared/
└── types/

src/features/food99/
├── adapters/
├── hooks/
├── pages/
├── services/
└── shared/
```

Evite criar novos módulos em estruturas antigas como `src/pages` ou `src/components`. Código legado nessas áreas deve ser movido somente quando houver uma mudança funcional relacionada.

## Layout e navegação

O layout raiz monta uma única vez:

1. `Header`
2. `Navigation`
3. área principal com `Outlet` do React Router
4. `Footer`

As rotas privadas são registradas em `router/routes/` e agrupadas por domínio em `privateRoutes.ts`. Cada página é carregada sob demanda com `lazyNamed`; o conteúdo da página entra no `Outlet`, sem recriar o layout global.

Algumas rotas operacionais, como frente de caixa e pedidos, usam visualização sem header e footer.

### Layout de página e menu lateral

`PageLayout` padroniza breadcrumb, barra de ferramentas, área de conteúdo e menu lateral contextual. O menu é opt-in: a página deve passar `sections` para exibi-lo.

```tsx
<PageLayout
  title="Clientes"
  sections={menuSections}
  toolbar={<BuscaSimples pesquisa={pesquisa} onChange={setPesquisa} />}
>
  <Table data={clientes} fields={campos} />
</PageLayout>
```

Menus devem ser declarativos e ficar em `shared/*MenuSections.ts` quando forem usados por mais de uma página. As páginas internas de cliente usam `ClienteDetalhePageLayout` para manter o menu contextual e o breadcrumb consistentes.

## Componentes reutilizáveis

Antes de criar um componente novo, procure equivalentes em `common/components`:

- `PageLayout`: estrutura de páginas com breadcrumb e menu contextual
- `Table`: tabela genérica com campos configuráveis
- `Templates/ListagemTemplate`: composição de telas de listagem
- `Buttons`, `FloatingActions`, `Inputs`, `Ui` e `Modal`
- `FinanceiroCliente`, `DetailView` e `MarketplacePageLayout`

Use `styled-components` para estilos estruturais de páginas e componentes. Mantenha os estilos próximos do componente; SCSS global deve ficar restrito a tokens, estilos globais e integrações do Bootstrap.

## Rotas

Para criar uma rota:

1. Crie a página dentro de `src/features/<dominio>/pages/`.
2. Exporte o componente com o nome que será usado no lazy loading.
3. Registre-a no arquivo `src/router/routes/<dominio>Routes.ts` com `lazyNamed`.
4. Inclua o grupo no agregador de rotas privadas quando for um domínio novo.

```tsx
const MinhaPagina = lazyNamed(
  () => import('../../features/clientes/pages/MinhaPagina'),
  'MinhaPagina',
);

export const clientesRoutes: PrivateRoute[] = [
  { path: '/clientes/minha-pagina', Page: MinhaPagina },
];
```

## Serviços e API

Todas as chamadas internas passam por um cliente configurado em `services/apiClients.ts`. O transporte genérico em `services/apiClient.ts` usa `fetch`, serializa objetos comuns como JSON, envia corpos nativos sem conversão e padroniza erros com `ApiError`. A escolha da API é explícita no service; o caminho da rota não escolhe o destino.

```tsx
const resposta = await webcontrolApi.get<RespostaApi<Cliente[]>>(
  '/api/v1/clientes',
  { query: { pagina: 1 } },
);
```

`baseUrl.ts` centraliza a origem legada do WebControl:

- em desenvolvimento, `localhost` ou `127.0.0.1`, usa `http://127.0.0.1:8000`;
- em produção pode receber `VITE_API_BASE_URL`;
- Food99 pode usar uma origem própria em `VITE_FOOD99_API_BASE_URL`;
- fora do ambiente local, mantém a compatibilidade com a resolução do backend legado.

`food99Api` usa `VITE_FOOD99_API_BASE_URL` quando definida e, caso contrário, a mesma origem do WebControl. As duas APIs usam o JWT emitido pelo WebControl; o endpoint de renovação pertence a esse backend. `viaCepApi` e `receitaWsApi` têm origens próprias e enviam requisições sem token e sem cookies.

Para cadastrar outra API, crie em `apiClients.ts` uma instância de `createApiClient` com resolvedor de URL base e política de credenciais. Configure autenticação e renovação apenas se essa API usar esses mecanismos. Importe a instância no service do domínio e use caminhos relativos à base configurada. Não adicione testes de prefixo de rota no transporte.

`auth: false` desativa o cabeçalho de token e a renovação para uma chamada específica, como login. `raw: true` retorna o objeto `Response` sem consumir o corpo, lançar `ApiError` para status HTTP ou renovar o token; o chamador trata esses casos. Requisições autenticadas não podem apontar para outra origem. Consultas canceláveis devem transmitir `signal`.

Não use `fetch` direto em páginas novas. Crie um serviço da feature e passe `AbortSignal` quando a consulta puder ser cancelada.

## Consultas assíncronas

O hook preferencial para novas consultas é `useConsultaApi`, em `common/hooks`. Ele oferece:

- cache com tempo de validade;
- deduplicação de consultas com a mesma chave;
- cancelamento quando não há consumidores;
- proteção contra respostas antigas sobrescreverem a tela;
- invalidação por chave ou prefixo;
- atualização periódica opcional.

```tsx
const { dados, carregando, atualizando, erro, recarregar } = useConsultaApi({
  chave: ['clientes', filtros.status],
  consultar: ({ signal }) => clientesService.listar(filtros, { signal }),
  tempoValidade: 30_000,
});
```

`useAsyncQuery` permanece apenas para compatibilidade com consultas antigas. Migre-o gradualmente para `useConsultaApi`, priorizando telas com filtros, troca frequente de rota ou múltiplos consumidores da mesma consulta.

Após mutações, invalide a chave afetada:

```tsx
invalidarConsultaApi(['food99', 'orders']);
```

## Convenções

- Componentes e tipos: `PascalCase`.
- Funções, props e variáveis: `camelCase`.
- Propriedades transientes de `styled-components`: prefixo `$`.
- Serviços: `*Service.ts` dentro da feature quando forem específicos do domínio.
- Dados temporários: `data/` ou `*MockData.ts`, separados da página.
- Elementos reutilizados por uma feature: `shared/`.
- Elementos reutilizados por domínios diferentes: `common/`.

Não extraia arquivos apenas por tamanho. Extraia quando houver responsabilidade independente, reutilização ou quando a página deixar de ser fácil de ler e manter.

## Checklist de mudança

- [ ] A página está dentro da feature correta.
- [ ] A rota usa lazy loading.
- [ ] O layout e o menu contextual são os componentes compartilhados adequados.
- [ ] A consulta usa o cliente configurado da API correta e recebe `signal` quando aplicável.
- [ ] Consultas frequentes usam `useConsultaApi` com chave estável.
- [ ] Dados mockados estão separados da interface.
- [ ] `npm run lint` e `npm run build` foram executados.

## Problemas comuns

### A API foi enviada para a porta do Vite

Use um caminho relativo com `food99Api`, como `/api/v1/food99/auth/shops`. Em ambiente local a origem final é `http://127.0.0.1:8000`, salvo configuração explícita. Não monte URLs com `window.location.origin` em páginas ou serviços.

### Um import dinâmico retorna 404 no preview

Execute `npm run build` e reinicie `npm run preview`. O preview serve arquivos estáticos de `dist/`; HTML e chunks de builds diferentes não podem ser misturados.

### O menu lateral não aparece

A página precisa usar `PageLayout` e fornecer `sections`. O layout global não monta menus contextuais automaticamente.

---

Última atualização: 29 de setembro de 2026.
