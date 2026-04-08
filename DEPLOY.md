# Deploy no GitHub Pages

## Passo a Passo

### 1. Criar repositório no GitHub

1. Acesse [github.com](https://github.com) e faça login
2. Clique em "New repository"
3. Nome sugerido: `victrix-website`
4. Deixe como **Public**
5. **NÃO** inicialize com README (já temos um)
6. Clique em "Create repository"

### 2. Conectar repositório local ao GitHub

No terminal, dentro da pasta do projeto:

```bash
git remote add origin https://github.com/SEU-USUARIO/victrix-website.git
git push -u origin main
```

### 3. Ativar GitHub Pages

1. No GitHub, vá em **Settings** do repositório
2. No menu lateral, clique em **Pages**
3. Em "Source", selecione:
   - Branch: `main`
   - Folder: `/ (root)`
4. Clique em **Save**

### 4. Acessar o site

Após alguns minutos, seu site estará disponível em:
```
https://SEU-USUARIO.github.io/victrix-website/
```

---

## Deploy em outras plataformas

### Vercel (Recomendado)

1. Acesse [vercel.com](https://vercel.com)
2. Faça login com GitHub
3. Clique em "Import Project"
4. Selecione o repositório `victrix-website`
5. Deploy automático! 🚀

**Vantagens:**
- Deploy automático a cada push
- HTTPS grátis
- Domínio customizado fácil
- Performance otimizada

### Netlify

1. Acesse [netlify.com](https://netlify.com)
2. Conecte com GitHub
3. "New site from Git"
4. Selecione o repositório
5. Deploy! 🎉

### Hospedagem própria (cPanel)

1. Faça zip do projeto
2. Faça upload via File Manager
3. Extraia na pasta `public_html`
4. Pronto!

---

## Domínio Customizado

Para usar `victrixcapital.com.br`:

### No Vercel/Netlify:
1. Vá em "Domains" nas configurações
2. Adicione seu domínio
3. Configure os DNS conforme instruções

### Configuração DNS típica:
```
Type: CNAME
Name: www
Value: [seu-projeto].vercel.app
```

```
Type: A
Name: @
Value: [IP fornecido pela plataforma]
```

---

## Atualizações futuras

Após fazer alterações locais:

```bash
git add .
git commit -m "Descrição das mudanças"
git push
```

O site será atualizado automaticamente! ✨
