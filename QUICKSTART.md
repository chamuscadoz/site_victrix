# Quickstart — Desenvolvimento Local

## Rodar o projeto

```bash
# Opção 1 — Python (sem instalar nada)
python -m http.server 8000
# acesse http://localhost:8000

# Opção 2 — Node.js
npx serve .

# Opção 3 — VS Code
# Instale "Live Server" → botão direito em index.html → "Open with Live Server"
```

---

## Estrutura de arquivos

```
site_victrix/
│
├── index.html                     # One-page principal
├── sobre.html
├── servicos.html
├── contato.html
│
├── assets/
│   ├── css/
│   │   ├── style.css              # Design system: variáveis, layout, componentes
│   │   ├── zalando-sans.css       # @font-face — Zalando Sans SemiExpanded
│   │   └── victrix-logos.css      # Logo injetada via --vc-logo-lime-landscape (CSS var)
│   │
│   ├── js/
│   │   └── main.js                # Carrossel 3D · nav scroll · cursor · scroll reveal
│   │
│   ├── fonts/
│   │   ├── ZalandoSansSemiExpanded-VariableFont_wght.ttf
│   │   ├── ZalandoSansSemiExpanded-Italic-VariableFont_wght.ttf
│   │   └── static/                # Pesos individuais: ExtraLight → Black
│   │
│   ├── images/
│   │   ├── blur_backgrounds/      # Fundos blur usados nas seções
│   │   │   ├── Slide 16_9 - 65.png   (hero, carrossel — preferencial)
│   │   │   ├── Slide 16_9 - 66.png
│   │   │   ├── Slide 16_9 - 67.png
│   │   │   ├── Slide 16_9 - 68.png
│   │   │   └── Slide 16_9 - 699.png
│   │   ├── Icons/
│   │   │   ├── Black/             # Traço preto — 24 ícones SVG
│   │   │   ├── Green/             # Lime Green (#88E833) — 24 ícones SVG
│   │   │   └── DarkGreen/         # Verde escuro — 24 ícones SVG
│   │   ├── Logos/
│   │   │   ├── Logo_sem_XP/Vector/
│   │   │   │   ├── a. Logo w_ Capital/svg01.svg    (Victrix + CAPITAL — inline)
│   │   │   │   ├── b. Logo s_ Capital/svg01.svg    (Victrix sem CAPITAL)
│   │   │   │   └── c. Logo downCapital/svg01_1.svg (CAPITAL abaixo)
│   │   │   └── Logo_Victrix_XP/
│   │   │       ├── black/         (Vector + PNGs)
│   │   │       ├── darkgreen/     (Vector + PNG)
│   │   │       ├── green/         (vector + png)
│   │   │       └── white/         (Vector + Png)
│   │   ├── Profile/
│   │   │   ├── pngprofile01.png
│   │   │   ├── pngprofile02.png
│   │   │   └── profile_blur.png   (OG image)
│   │   ├── xp-branco.png          (nav + footer)
│   │   ├── xp-preto.png
│   │   └── og-image.html          (template 1200×630 para exportar OG image)
│   │
│   └── VictrixCapital_guidelines_v01.pdf
│
├── BrandVictrix.md                # Identidade visual completa — consultar sempre
├── README.md
├── DEPLOY.md
├── QUICKSTART.md                  # Este arquivo
├── ROADMAP.md
├── .gitignore
└── package.json
```

---

## Onde alterar o quê

| O que mudar                    | Arquivo                          | Onde                              |
|-------------------------------|----------------------------------|-----------------------------------|
| Textos das seções              | `index.html`                     | Bloco HTML da seção               |
| Dados da equipe (nomes, bios)  | `assets/js/main.js`              | Array `members` — linhas 15–65    |
| Cores e variáveis CSS          | `assets/css/style.css`           | Bloco `:root` (topo)              |
| Fontes                         | `assets/css/zalando-sans.css`    | Declarações `@font-face`          |
| Logo (nav e hero)              | `assets/css/victrix-logos.css`   | Variável `--vc-logo-lime-landscape`|
| Velocidade do carrossel        | `assets/js/main.js`              | `target -= 0.0032` (linha ~180)   |
| Nav scroll / reveal / cursor   | `assets/js/main.js`              | Funções após o carrossel          |

---

## Convenções do design system

- **Variáveis CSS:** sempre usar `var(--lime)`, `var(--forest)`, etc.
- **Easing:** `var(--ease)` = `cubic-bezier(0.4, 0, 0.2, 1)`
- **Container:** `max-width: 1120px; padding: 100px 36px`
- **Seções:** todas têm `position: relative; overflow: hidden` (necessário para blur)
- **Blur backgrounds:** sempre aplicar overlay `rgba(14,28,14, α)` por cima para legibilidade
  - Leve: `.overlay-hero` (α = 0.58)
  - Padrão: `.overlay` (α = 0.68)
  - Pesado: `.overlay-heavy` (α = 0.82)

---

## Fontes blur_backgrounds × index.html

O `index.html` referencia imagens com o caminho antigo (raiz de `images/`).  
As imagens foram movidas para `assets/images/blur_backgrounds/`.  
Ao atualizar referências, use o novo caminho:

```html
<!-- caminho atual no index.html (legado, ainda funciona via symlink) -->
assets/images/Slide_16_9__65.png

<!-- caminho novo (preferencial) -->
assets/images/blur_backgrounds/Slide 16_9 - 65.png
```

---

## Git — fluxo de trabalho

```bash
git status                        # ver o que mudou
git add index.html style.css      # adicionar arquivos específicos (evitar git add -A)
git commit -m "descrição clara"
git push
```

---

## Problemas comuns

| Problema                        | Causa provável                          | Solução                                |
|--------------------------------|-----------------------------------------|----------------------------------------|
| Fonte não carrega               | Caminho errado em `zalando-sans.css`    | Verificar `assets/fonts/`              |
| Logo não aparece no nav         | `victrix-logos.css` não carregado       | Checar `<link>` no `<head>`            |
| Carrossel não inicia            | JS com erro em `main.js`               | Abrir console (F12) e verificar        |
| CSS não atualiza no browser     | Cache do navegador                      | Ctrl+Shift+R (Win) / Cmd+Shift+R (Mac) |
| Imagem blur não aparece         | Caminho com espaço no nome do arquivo   | Usar caminho URL-encoded ou o legado   |
