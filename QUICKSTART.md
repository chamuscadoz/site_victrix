# 🚀 Guia Rápido - Desenvolvimento Local

## Rodar o site localmente

### Opção 1: Python (mais simples)
```bash
cd victrix-website
python -m http.server 8000
```
Abra: http://localhost:8000

### Opção 2: Node.js
```bash
cd victrix-website
npx serve
```
Abra o URL que aparecer no terminal

### Opção 3: VS Code
1. Instale a extensão "Live Server"
2. Clique com botão direito em `index.html`
3. Selecione "Open with Live Server"

## Estrutura de arquivos

```
victrix-website/
├── index.html          # Página inicial
├── sobre.html          # Sobre nós
├── servicos.html       # Nossos serviços
├── contato.html        # Contato
│
├── assets/
│   ├── css/
│   │   └── style.css   # Todos os estilos
│   ├── js/
│   │   └── main.js     # JavaScript principal
│   ├── images/         # Logos, fotos, backgrounds
│   └── fonts/          # Fontes (quando adicionar)
│
├── .gitignore          # Arquivos ignorados pelo Git
├── README.md           # Documentação principal
├── DEPLOY.md           # Guia de deploy
├── ROADMAP.md          # Melhorias futuras
└── package.json        # Configurações do projeto
```

## Fazer alterações

### 1. Editar conteúdo
- Abra os arquivos `.html` em qualquer editor
- Altere textos, imagens, links
- Salve e recarregue o navegador

### 2. Mudar estilos (cores, fontes, layout)
- Edite `assets/css/style.css`
- As variáveis CSS estão no topo (cores, espaçamentos)

### 3. Adicionar funcionalidades JavaScript
- Edite `assets/js/main.js`

### 4. Adicionar novas páginas
1. Crie novo arquivo `.html` na raiz
2. Copie estrutura de uma página existente
3. Atualize links no menu de navegação

## Commits no Git

Após fazer alterações:

```bash
# Ver o que mudou
git status

# Adicionar mudanças
git add .

# Fazer commit
git commit -m "Descrição clara do que mudou"

# Enviar para GitHub (se já configurado)
git push
```

## Boas práticas

### ✅ Fazer
- Testar em diferentes navegadores (Chrome, Firefox, Safari)
- Testar em mobile (use DevTools F12 → mobile view)
- Commits pequenos e frequentes
- Mensagens de commit descritivas
- Manter backup antes de grandes mudanças

### ❌ Evitar
- Editar direto no servidor/produção
- Commits com mensagens genéricas ("update", "fix")
- Deletar arquivos sem certeza
- Alterar estrutura sem testar

## Dicas úteis

### Resetar para versão anterior
```bash
git log                    # Ver histórico
git checkout HASH-DO-COMMIT   # Voltar para um commit
```

### Criar branch para testar mudanças
```bash
git checkout -b nova-feature
# Faça alterações
git checkout main          # Voltar para main
```

### Ver site em outros dispositivos na mesma rede
1. Descubra seu IP local: `ipconfig` (Windows) ou `ifconfig` (Mac/Linux)
2. No celular, acesse: `http://SEU-IP:8000`

## Problemas comuns

### "Porta já em uso"
Mude a porta:
```bash
python -m http.server 3000
```

### Imagens não aparecem
- Verifique o caminho: `assets/images/nome-da-imagem.png`
- Caminhos são case-sensitive (maiúsculas/minúsculas importam)

### CSS não atualiza
- Limpe o cache do navegador: Ctrl+Shift+R (Windows) ou Cmd+Shift+R (Mac)

### Git pede usuário/senha
Configure:
```bash
git config user.name "Seu Nome"
git config user.email "seu@email.com"
```

## Próximos passos

1. [ ] Personalizar conteúdo (trocar textos placeholder)
2. [ ] Adicionar informações de contato reais
3. [ ] Configurar formulário de contato
4. [ ] Fazer deploy (ver DEPLOY.md)
5. [ ] Adicionar Google Analytics
6. [ ] Testar em dispositivos móveis

## Recursos úteis

- [MDN Web Docs](https://developer.mozilla.org/) - Documentação web
- [CSS-Tricks](https://css-tricks.com/) - Dicas de CSS
- [Can I Use](https://caniuse.com/) - Compatibilidade de browsers
- [Google PageSpeed](https://pagespeed.web.dev/) - Testar performance

---

Dúvidas? Consulte README.md, DEPLOY.md ou ROADMAP.md
