# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Site institucional da **Victrix Capital** — escritório credenciado à XP Investimentos. Stack: HTML/CSS/JS puro, zero dependências, deploy estático.

## Rodar localmente

```bash
python -m http.server 8000   # http://localhost:8000
# ou
npx serve .
```

Sem build step. Alterações em HTML/CSS/JS são imediatas no browser (Ctrl+Shift+R para limpar cache).

## Deploy

```bash
git add <arquivos>
git commit -m "descrição clara"
git push
```

Push na branch `main` atualiza automaticamente via Vercel. Detalhes em `DEPLOY.md`.

## Arquitetura

Quatro páginas HTML independentes, sem roteamento ou framework:

| Página | Estado |
|--------|--------|
| `index.html` | Completa — Hero · Narrativa · Abordagem · Filosofia · Equipe · Insights · Closing · Footer |
| `sobre.html` | Em desenvolvimento |
| `servicos.html` | Em desenvolvimento |
| `contato.html` | Em desenvolvimento (integrar FormSpree ou EmailJS) |

### CSS — três arquivos, papéis distintos

- `assets/css/style.css` — design system principal: variáveis CSS, layout, todos os componentes
- `assets/css/zalando-sans.css` — declarações `@font-face` da Zalando Sans SemiExpanded (self-hosted)
- `assets/css/victrix-logos.css` — logo injetada via CSS custom property `--vc-logo-lime-landscape` (SVG inline, sem request extra)

CSS mobile-first com breakpoints em `541px / 641px / 769px / 900px`.

### JS — arquivo único

`assets/js/main.js` contém tudo:
- Array `members` (linhas 15–64) — dados da equipe (nome, cargo, bio, imagem, gradiente)
- Carrossel 3D coverflow com física e auto-rotação via `requestAnimationFrame`
- Velocidade do carrossel: `target -= 0.0032` (aprox. linha 180)
- Nav scroll (logo aparece após 60px), cursor customizado, scroll reveal com `IntersectionObserver`

## Design system

### Variáveis CSS (`:root` em `style.css`)

```css
--forest: #0E1C0E;   /* fundo principal */
--lime:   #88E833;   /* destaque, logo, CTA */
--mid:    #2E6F3A;   /* elementos secundários */
--sage:   #D5DAD0;   /* corpo de texto no escuro */
--alt:    #152615;   /* linhas alternadas */
--ease:   cubic-bezier(0.4, 0, 0.2, 1);
```

Sempre usar `var(--lime)`, nunca hardcodar hex.

### Overlays sobre blur backgrounds

Toda seção com blur precisa de overlay `rgba(14,28,14, α)`:
- `.overlay-hero` → α = 0.58
- `.overlay` → α = 0.68
- `.overlay-heavy` → α = 0.82

### Imagens blur

Caminho atual (preferencial):
```
assets/images/blur_backgrounds/Slide 16_9 - 65.png   ← preferida (hero/carrossel)
assets/images/blur_backgrounds/Slide 16_9 - 66.png
assets/images/blur_backgrounds/Slide 16_9 - 67.png
assets/images/blur_backgrounds/Slide 16_9 - 68.png
assets/images/blur_backgrounds/Slide 16_9 - 699.png
```

Atenção: nomes de arquivo têm espaços. Em HTML, usar URL-encoded (`%20`) ou aspas no CSS.

### Ícones

24 ícones SVG em 3 variantes: `assets/images/Icons/Green/` (fundos escuros), `Black/` (fundos claros), `DarkGreen/` (fundos claros). Naming: Green/DarkGreen usam zero-pad (`01_nome.svg`), Black não (`1_nome.svg`).

### Logo

Não referenciar arquivos de imagem de logo diretamente — usar a CSS custom property de `victrix-logos.css`. Para contextos institucionais com XP, usar variantes em `assets/images/Logos/Logo_Victrix_XP/`.

## Onde alterar o quê

| O que mudar | Arquivo | Local |
|-------------|---------|-------|
| Textos das seções | `index.html` | Bloco HTML da seção |
| Dados da equipe | `assets/js/main.js` | Array `members` — linhas 15–64 |
| Cores / variáveis | `assets/css/style.css` | Bloco `:root` |
| Logo no nav/hero | `assets/css/victrix-logos.css` | Variável `--vc-logo-lime-landscape` |
| Velocidade carrossel | `assets/js/main.js` | `target -= 0.0032` (~linha 180) |

## Identidade de marca

Referência completa em `BrandVictrix.md`. Pontos críticos:
- **Tom:** preciso, calmo, institucional — sem exclamações, sem drama, sem metáforas
- **Vitrix é:** escritório de assessoria de investimentos / credenciado à XP
- **Não é:** banco, asset, gestora, wealth manager, consultoria financeira independente
- **Fonte:** Zalando Sans SemiExpanded (self-hosted em `assets/fonts/`)
- **Manual de marca:** `assets/VictrixCapital_guidelines_v01.pdf`
