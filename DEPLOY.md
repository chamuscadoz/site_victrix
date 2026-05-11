# Deploy — Victrix Capital

Domínio: **www.victrixcapital.com.br**  
Repositório: `chamuscadoz` / `site_victrix` (branch `main`)

---

## Publicar alterações (fluxo padrão)

```bash
git add <arquivos-alterados>
git commit -m "descrição objetiva da mudança"
git push
```

O site é atualizado automaticamente após o push, dependendo da plataforma configurada.

---

## Plataformas suportadas

### Vercel (recomendado)

1. Acesse [vercel.com](https://vercel.com) e faça login com GitHub
2. "Add New Project" → selecione `site_victrix`
3. Framework Preset: **Other** (site estático, sem build)
4. Root Directory: `/` (raiz)
5. Clique em "Deploy"

Após o primeiro deploy, toda nova push na branch `main` atualiza automaticamente.

**Configurar domínio customizado:**
1. No painel do projeto, vá em "Domains"
2. Adicione `victrixcapital.com.br` e `www.victrixcapital.com.br`
3. Siga as instruções de DNS fornecidas pela Vercel

### GitHub Pages

1. No repositório, vá em **Settings → Pages**
2. Source: `main` / `/ (root)`
3. Clique em "Save"
4. Site disponível em: `https://chamuscadoz.github.io/site_victrix/`

Para usar o domínio `victrixcapital.com.br` no GitHub Pages:
1. Adicione o arquivo `CNAME` na raiz com o conteúdo `www.victrixcapital.com.br`
2. No registrador de domínio, configure:

```
Tipo: CNAME
Nome: www
Valor: chamuscadoz.github.io
```

### Netlify

1. Acesse [netlify.com](https://netlify.com) → "Add new site" → "Import an existing project"
2. Conecte ao GitHub e selecione `site_victrix`
3. Build command: (deixe em branco — site estático)
4. Publish directory: `.` (raiz)
5. Clique em "Deploy"

---

## DNS — Configuração típica para domínio próprio

| Tipo  | Nome | Valor                        |
|-------|------|------------------------------|
| A     | @    | IP fornecido pela plataforma |
| CNAME | www  | alias da plataforma          |

Propagação DNS: até 48 horas. Verifique em [dnschecker.org](https://dnschecker.org).

---

## Open Graph (preview no WhatsApp e redes sociais)

A imagem de preview já está configurada em `index.html`:

```html
<meta property="og:image" content="https://www.victrixcapital.com.br/assets/images/Profile/profile_blur.png">
<meta property="og:url"   content="https://www.victrixcapital.com.br/">
```

Imagem de referência: `assets/images/Profile/profile_blur.png`  
Template para gerar nova imagem (1200×630): `assets/images/og-image.html`

Após publicar, force o recarregamento do cache no WhatsApp/LinkedIn em:  
[developers.facebook.com/tools/debug](https://developers.facebook.com/tools/debug)

---

## Verificar após deploy

- [ ] Site carrega em `https://www.victrixcapital.com.br`
- [ ] HTTPS ativo (cadeado no navegador)
- [ ] Fontes Zalando Sans carregando (não fallback Georgia)
- [ ] Logo aparece no nav ao rolar
- [ ] Carrossel 3D da equipe funciona
- [ ] Mobile: nav sem sobreposição, hero sem overflow
- [ ] OG image aparece ao colar o link no WhatsApp
- [ ] Formulário de contato enviando (quando implementado)
