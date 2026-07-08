# Aeterna — Dashboard (relatório): guia de atualização

Passo a passo para atualizar **dados** e **design** do relatório, sem precisar reinvestigar.

## Arquitetura (como funciona)

Página publicada: `group/aeterna/relatorio.html` (projeto Vercel "group" → victrixgroup.com.br).
Ela **não** contém dados. É composta de três partes:

1. **Chart.js** (inline).
2. `<script type="application/x-render" id="__renderCode">` — o código do dashboard (render), **inerte** (não roda sozinho).
3. `<script>` de **boot** — faz login no Supabase, baixa o JSON do cliente, coloca em `window.__DATA` e então executa o `#__renderCode` em escopo global (funções globais e handlers inline continuam funcionando).

Login: Supabase Auth, sessão em `sessionStorage` (senha é pedida a cada nova visita).

## Contrato de dados (o JSON)

- Fica no Supabase Storage, bucket **`relatorios`**.
- Caminho por usuário: **`<uid>/dados_dashboard.json`** (uid = ID do usuário no Supabase Auth).
- Chaves de topo esperadas: `meta`, `kpis`, `exposure`, `assets_by_month`, `contas`, `titularidade`.
- O código de render lê essas chaves. Se a estrutura mudar, o dashboard precisa ser regenerado (ver "Atualizar o design").

## 1) Atualizar os DADOS de um cliente (SEM deploy)

1. Gere o novo JSON (pipeline Dash-End-to-End).
2. Supabase → Storage → bucket `relatorios` → pasta `<uid-do-cliente>` → suba/sobrescreva `dados_dashboard.json`.
3. Pronto. No próximo carregamento o dashboard mostra os dados novos. **Sem commit, sem deploy.**

## 2) Novo usuário / vários logins para os mesmos dados

- Cada login (uid) lê **o próprio** arquivo `<uid>/dados_dashboard.json`.
- Para um usuário novo ver um conjunto de dados: suba o JSON na pasta **do uid dele** (`<novo-uid>/dados_dashboard.json`).
  A política de RLS do Storage (pasta = uid) já cobre isso; não precisa mexer em código.
- Atualizar esse arquivo reflete sozinho no dashboard daquele usuário.
- **Atenção:** é uma cópia independente por usuário. Se dois logins devem ver os MESMOS dados, hoje é preciso manter os dois arquivos atualizados.
  (Para uma fonte única servindo vários logins — ex.: uma família com várias pessoas — dá para migrar o caminho para um identificador de "conta/família" via tabela de mapeamento. Peça ao Claude quando quiser.)

## 3) Atualizar o DESIGN / CÓDIGO do dashboard (COM deploy)

Quando o modelo muda (layout, gráficos, novas seções), o pipeline gera um `dashboard_aeterna.html` novo (standalone, com `const DATA` embutido). Para publicar:

1. Copie (pelo **Explorer**, não por upload) o `dashboard_aeterna.html` completo para `group/aeterna/`.
2. Rode o transformador (troca o `const DATA` embutido pelo fetch do Supabase, mantém login):
   ```bash
   python docs/aeterna/wire_supabase.py group/aeterna/dashboard_aeterna.html group/aeterna/relatorio.html
   ```
3. (Opcional) valide o JS: `node --check` no bloco de render, ou só abra local.
4. Commit e push:
   ```bash
   git add group/aeterna/relatorio.html
   git commit -m "feat(aeterna): atualiza dashboard"
   git push origin main
   ```
5. A Vercel redeploya sozinho.

## Regras de segurança (importante)

- `group/aeterna/dashboard_aeterna.html` e `group/aeterna/dados_dashboard.json` contêm **dados reais** e estão no `.gitignore`. **Nunca** commite esses arquivos — o `relatorio.html` publicado tem só o código, sem dados.

## Diagnóstico

- Abra `victrixgroup.com.br/aeterna/relatorio.html` → F12 → Console: ele loga o UID e o caminho buscado.
- "Nenhum relatório disponível para esta conta" = não existe `<uid>/dados_dashboard.json` no bucket para esse usuário.
