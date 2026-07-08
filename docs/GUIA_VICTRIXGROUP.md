# Guia — Colocar o victrixgroup.com.br no ar

> ⚠️ **HISTÓRICO / PARCIALMENTE OBSOLETO (jul/2026).** A arquitetura de roteamento
> por `vercel.json` descrita abaixo **foi abandonada** por ser frágil. Hoje são
> **dois projetos Vercel independentes** (um por domínio, cada um com sua raiz física):
> Capital = raiz `.`, Group = pasta `group`. Não existe mais `vercel.json`.
> **Fonte da verdade atual: `README.md` e `DEPLOY.md`.** Mantido apenas o passo a passo
> de Supabase e DNS, que continua válido.

Este guia liga o novo domínio **www.victrixgroup.com.br** ao mesmo repositório do
site, ativa a área logada (Aeterna) e mantém o **victrixcapital.com.br** intacto.

---

## O que já está pronto no repositório

```
site_victrix/
├── index.html                    ← victrixcapital.com.br (intacto)
├── empresa_pj.html, para_voce.html
├── vercel.json                   ← roteamento por domínio (NOVO)
├── assets/                       ← compartilhado pelos dois domínios
└── group/                        ← NOVO
    ├── index.html                → victrixgroup.com.br (hub, 2 botões)
    ├── GUIA_VICTRIXGROUP.md       → este guia
    └── aeterna/
        ├── index.html            → /aeterna (landing institucional)
        ├── login.html            → /aeterna/login.html
        ├── relatorio.html        → dashboard do cliente
        ├── redefinir.html        → redefinição de senha
        ├── config.js             → PREENCHER com as chaves do Supabase
        ├── config.example.js
        ├── supabase_setup.sql
        ├── EXEMPLO_dados_dashboard.json
        └── SETUP.md              → detalhes do Supabase/LGPD
```

Fluxo dos botões: **hub** → *Investimentos* leva a `victrixcapital.com.br`;
*Organização Patrimonial* leva a `/aeterna` (landing) → botão **Acessar** → `login.html`.

---

## Passo 1 — Supabase (área logada)

1. Em <https://supabase.com>, crie conta e **New project** (plano free).
2. **SQL Editor > New query** → cole o conteúdo de `aeterna/supabase_setup.sql` → **Run**.
   Isso cria o bucket privado `relatorios`, a RLS de isolamento por usuário e o log de acessos.
3. Em **Project Settings > API**, copie **Project URL** e **anon public key**.
4. Abra `group/aeterna/config.js` e substitua `SUPABASE_URL` e `SUPABASE_ANON_KEY`
   pelos valores copiados. **Pode commitar** — a anon key é pública por design; a
   segurança vem da RLS. Nunca coloque a `service_role` key aqui.
5. Para cada cliente: **Authentication > Users > Add user** (e-mail + senha) e copie o **User UID**.
6. Suba o relatório de cada cliente em **Storage > relatorios**, criando a pasta com o UID:
   ```
   relatorios/<UID-do-cliente>/dados_dashboard.json
   ```
   Para atualizar o mês, basta substituir o arquivo. (Detalhes e LGPD em `aeterna/SETUP.md`.)

---

## Passo 2 — Vercel (adicionar o domínio ao projeto existente)

O site já está publicado na Vercel. **Não crie um projeto novo** — use o mesmo.

1. Abra o projeto do site na Vercel → aba **Settings > Domains**.
2. **Add** → `victrixgroup.com.br` → **Add** de novo → `www.victrixgroup.com.br`.
3. A Vercel vai mostrar os registros DNS necessários (guarde-os para o Passo 3).
4. Defina o **www** como principal (Redirect apex → www, ou o contrário — sua escolha).
5. Faça `git push` na `main`. O `vercel.json` entra em vigor no deploy e o
   `victrixgroup.com.br` passa a servir o hub. O `victrixcapital.com.br` não muda.

---

## Passo 3 — DNS (no registrador do victrixgroup.com.br)

No painel onde você registrou o domínio, aponte para a Vercel usando os valores que
ela mostrou no Passo 2. O padrão costuma ser:

| Tipo  | Nome | Valor                          |
|-------|------|--------------------------------|
| A     | @    | `76.76.21.21` (confirme na Vercel) |
| CNAME | www  | `cname.vercel-dns.com` (confirme na Vercel) |

> Use **sempre os valores exatos que a Vercel exibir** — eles podem diferir dos acima.
> Propagação: de minutos até 48h. Cheque em <https://dnschecker.org>.

---

## Passo 4 — Testar

- [ ] `https://www.victrixgroup.com.br` abre o **hub** com os dois botões.
- [ ] Botão *Investimentos* → `victrixcapital.com.br`.
- [ ] Botão *Organização Patrimonial* → `/aeterna` (landing) e o botão **Acessar** → login.
- [ ] `https://www.victrixcapital.com.br` continua igual (nada mudou).
- [ ] Login com o cliente A mostra a carteira de A; logout; cliente B mostra **outra** carteira.
- [ ] "Esqueci minha senha" envia e-mail; o link abre `redefinir.html` e salva a nova senha.
- [ ] Cadeado HTTPS ativo nos dois domínios.

---

## Como funciona o roteamento (resumo técnico)

`vercel.json` reescreve, **apenas para o host victrixgroup.com.br**:

- `/` → `/group/index.html`
- `/aeterna` → `/group/aeterna/index.html`
- `/aeterna/*` → `/group/aeterna/*`

`/assets/*` não é reescrito, então fontes, logos e imagens são servidos da raiz para
os dois domínios. As páginas do grupo usam caminhos absolutos (`/assets/...`), então
funcionam igual em qualquer domínio.
