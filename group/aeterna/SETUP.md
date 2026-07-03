# Área logada de clientes — Aeterna Victrix

Solução **sem custo** para dar a cada cliente acesso ao próprio relatório, com
**segregação de dados garantida pelo servidor** (Row-Level Security do Supabase).
Hospedagem no **Vercel**, autenticação e armazenamento no **Supabase** (plano free).

## Como funciona (visão geral)

1. O cliente entra em `login.html` e autentica com e-mail e senha (Supabase Auth).
2. `relatorio.html` é a *casca* do dashboard — o mesmo painel Aeterna, porém **sem
   dados embutidos**.
3. Depois do login, a casca baixa **apenas** o arquivo `dados_dashboard.json` da
   pasta do próprio usuário no bucket privado e renderiza o painel.
4. Se um cliente tentar baixar o relatório de outro, o Supabase **nega** — a regra
   roda no banco, não depende de esconder URLs.

> Um relatório pode consolidar contas descaracterizadas de titularidades diferentes:
> basta gerar o `dados_dashboard.json` daquele cliente já com as contas combinadas.
> O mapeamento cliente → relatório é você quem controla.

## Arquivos desta pasta

| Arquivo | Para quê |
|---|---|
| `login.html` | Tela de login (identidade Victrix) |
| `relatorio.html` | Casca do dashboard, protegida por sessão |
| `config.example.js` | Modelo de configuração — copie para `config.js` |
| `supabase_setup.sql` | Cria bucket privado, RLS e log de acessos |
| `EXEMPLO_dados_dashboard.json` | Exemplo do arquivo de dados por cliente |

---

## Passo a passo

### 1. Criar o projeto Supabase (grátis)
1. Em https://supabase.com crie uma conta e um **New project**.
2. Anote, em *Project Settings > API*: a **Project URL** e a **anon public key**.

### 2. Rodar a configuração
No Supabase: **SQL Editor > New query**, cole o conteúdo de `supabase_setup.sql`
e clique **Run**. Isso cria o bucket privado `relatorios`, a política de isolamento
por usuário e a tabela de auditoria `acessos_log`.

### 3. Configurar o front-end
Copie `config.example.js` para **`config.js`** e preencha `SUPABASE_URL` e
`SUPABASE_ANON_KEY`. A anon key é pública por design; a segurança vem da RLS.
Nunca coloque a `service_role` key no front-end.

### 4. Criar os clientes
Para cada cliente: **Authentication > Users > Add user** (e-mail + senha).
Copie o **User UID** gerado (ex.: `a1b2c3d4-…`).

### 5. Subir o relatório de cada cliente
Gere o `dados_dashboard.json` do cliente pelo seu pipeline e envie para:
**Storage > relatorios >** crie a pasta com o **UID** do cliente e faça upload do
arquivo com o nome exato `dados_dashboard.json`:

```
relatorios/<UID-do-cliente>/dados_dashboard.json
```

Para atualizar o mês, basta substituir esse arquivo.

### 6. Publicar no Vercel
Coloque `login.html`, `relatorio.html`, `config.js` (e opcionalmente
`redefinir.html`) no projeto do site. Sugestão de URL:
`app.victrixgroup.com.br` ou `victrixgroup.com.br/aeterna/login.html`.

No `victrixgroup.com.br`, o botão **Organização Patrimonial** aponta para o
`login.html` do Aeterna; o botão **Investimentos** para `www.victrixcapital.com.br`.

### 7. Testar a segregação
Entre com o cliente A e confirme que vê a carteira dele. Faça logout, entre com o
cliente B e confirme que vê **outra** carteira. Opcional: no navegador do A, tente
baixar o arquivo do B pela API — deve retornar erro de permissão.

---

## Checklist LGPD

- **Base legal e finalidade**: registre a finalidade (prestação de contas ao
  investidor) e a base legal do tratamento.
- **Minimização**: os relatórios já usam contas mascaradas/descaracterizadas —
  mantenha assim; não exponha CPF, número de conta real ou dados sensíveis.
- **Segregação**: garantida pela RLS (cada `uid` só lê a própria pasta).
- **Transporte seguro**: o Vercel serve por HTTPS por padrão.
- **Autenticação**: senhas ficam com hash no Supabase (você não as armazena).
  Considere ativar confirmação de e-mail e limitar tentativas.
- **Auditoria**: acessos ficam em `public.acessos_log` (quem, quando, agente).
- **Direitos do titular**: tenha canal para acesso, correção e eliminação. Excluir
  um cliente = remover o usuário em *Authentication* e apagar a pasta dele no
  *Storage*.
- **Retenção**: defina por quanto tempo mantém os `dados_dashboard.json` e faça
  o expurgo periódico.
- **Política de Privacidade**: publique e vincule na tela de login.

---

## Perguntas frequentes

**Isso realmente é grátis?** Sim, dentro do plano free do Supabase (suficiente para
~20 clientes e relatórios desse tamanho) e do Vercel Hobby.

**A anon key exposta é um risco?** Não. Ela só permite operações que a RLS autoriza.
Sem sessão válida e sem ser o dono da pasta, não há acesso a nenhum relatório.

**E se eu não quiser Supabase depois?** A casca (`relatorio.html`) só espera um
`DATA` válido antes de chamar `window.__bootApp()`. Dá para trocar a fonte de dados
sem reescrever o dashboard.
