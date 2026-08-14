# Quickstart — Desenvolvimento Local

## Rodar o projeto

Sempre a partir da pasta do repositório:

```powershell
cd "C:\Users\JoséCassiolato\OneDrive - AETERNA VICTRIX\Claude\Projects\Site Victrix\site_victrix"
python -m http.server 8000
# Capital: http://localhost:8000
# Group:   http://localhost:8000/group/
```

Alternativas: `npx serve .` ou a extensão "Live Server" do VS Code (botão direito em `index.html`).

> O Group em produção é servido com `group/` como raiz. Localmente ele roda em `/group/`, então links absolutos (`/assets/...`) quebram no local e funcionam no ar — e vice-versa. Use caminhos relativos.

---

## Estrutura de arquivos

```
site_victrix/
│
├── index.html                     # Capital — gateway (hero + dois caminhos PF/PJ)
├── para_voce.html                 # Capital — Pessoa Física (CSS inline, liquid glass)
├── empresa_pj.html                # Capital — Pessoa Jurídica (CSS inline, liquid glass)
│
├── group/                         # Victrix Group (victrixgroup.com.br)
│   ├── index.html                 # Landing do Group
│   ├── assets/                    # Cópia autossuficiente (o Vercel do Group só vê group/)
│   └── aeterna/                   # Área logada (login, relatorio, redefinir, config.js)
│
├── docs/                          # Documentação (não publicada) — inclui docs/aeterna/
│
├── assets/
│   ├── css/
│   │   ├── style.css              # Design system do gateway: variáveis, layout, componentes
│   │   ├── motion.css             # Camada de animação (aurora, veil, reveals, tilt)
│   │   ├── zalando-sans.css       # @font-face — Zalando Sans SemiExpanded
│   │   └── victrix-logos.css      # Logo injetada via --vc-logo-lime-landscape (CSS var)
│   │
│   ├── js/
│   │   └── main.js                # Motion engine v5 — 11 módulos (só o index.html carrega)
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
├── README.md                      # Fonte da verdade: arquitetura dos 2 sites e deploy
├── CLAUDE.md                      # Guia para agentes de código + armadilhas conhecidas
├── DEPLOY.md
├── QUICKSTART.md                  # Este arquivo
├── ROADMAP.md
├── .gitignore
└── package.json
```

---

## Onde alterar o quê

> ⚠️ **Leia isto antes de mexer em cor ou componente.** O site da Capital tem **dois sistemas de estilo paralelos**:
>
> - `index.html` (gateway) → CSS externo: `style.css` + `motion.css` + `victrix-logos.css`
> - `para_voce.html` e `empresa_pj.html` → **CSS inline**, cada uma com o seu próprio `:root` no `<style>`
>
> Elas não compartilham nada além do `zalando-sans.css`. Mudar `style.css` **não** muda as páginas PF/PJ. Toda alteração de paleta precisa ser replicada nos três lugares.

| O que mudar                    | Arquivo                          | Onde                                    |
|-------------------------------|----------------------------------|-----------------------------------------|
| Texto do gateway               | `index.html`                     | `<section id="gateway">`                |
| Seções e textos PF             | `para_voce.html`                 | Bloco HTML da seção                     |
| Seções e textos PJ             | `empresa_pj.html`                | Bloco HTML da seção                     |
| Dados da equipe (nomes, bios)  | `para_voce.html`                 | `<section id="partners">` — `.glass.member` |
| Cores do gateway               | `assets/css/style.css`           | Bloco `:root` (topo)                    |
| Cores das páginas PF/PJ        | `para_voce.html` / `empresa_pj.html` | `:root` dentro do `<style>`         |
| Fontes                         | `assets/css/zalando-sans.css`    | Declarações `@font-face`                |
| Logo (nav e hero do gateway)   | `assets/css/victrix-logos.css`   | Variável `--vc-logo-lime-landscape`     |
| Animações do gateway           | `assets/css/motion.css` + `assets/js/main.js` | Módulo 1–11 (lista no topo do main.js) |
| Efeito liquid glass PF/PJ      | `para_voce.html` / `empresa_pj.html` | `<script>` "MOTOR LIQUID GLASS" no fim |
| Landing / área logada Aeterna  | `group/aeterna/*.html`           | Ver `docs/aeterna/`                     |

---

## Convenções do design system

- **Variáveis CSS:** sempre usar `var(--lime)`, `var(--forest)`, etc.
- **Easing:** `var(--ease)` = `cubic-bezier(0.4, 0, 0.2, 1)`
- **Container:** `max-width: 1120px; padding: 100px 36px` (gateway); nas páginas PF/PJ, `max-width: 1240px`
- **Seções:** todas têm `position: relative; overflow: hidden` (necessário para blur)
- **Blur backgrounds:** sempre aplicar overlay `rgba(14,28,14, α)` por cima para legibilidade
  - Leve: `.overlay-hero` (α = 0.58)
  - Padrão: `.overlay` (α = 0.68)
  - Pesado: `.overlay-heavy` (α = 0.82)
- **Reduced motion:** todo efeito novo precisa de um bloco `@media (prefers-reduced-motion: reduce)` que o desligue — o padrão do projeto.

---

## Imagens blur

Todas em `assets/images/blur_backgrounds/` (e uma cópia em `group/assets/images/blur_backgrounds/` para o Group):

```
Slide 16_9 - 65.png   ← preferida (hero / gateway)
Slide 16_9 - 66.png · 67.png · 68.png · 699.png
```

Os nomes têm **espaços**. Em HTML use `%20` ou aspas; em CSS, sempre entre aspas. O `index.html` já usa o caminho correto e faz `<link rel="preload">` da 65.

---

## Git — fluxo de trabalho

Todo comando começa com o `cd` completo (a pasta tem espaços e acento):

```powershell
cd "C:\Users\JoséCassiolato\OneDrive - AETERNA VICTRIX\Claude\Projects\Site Victrix\site_victrix"
git status                             # ver o que mudou
git add index.html para_voce.html      # arquivos específicos (evitar git add -A)
git commit -m "descrição clara"
git push origin main
```

Se travar com `Unable to create '...index.lock'` (resíduo do OneDrive):

```powershell
cd "C:\Users\JoséCassiolato\OneDrive - AETERNA VICTRIX\Claude\Projects\Site Victrix\site_victrix"
del .git\index.lock
del .git\HEAD.lock
```

Regra de higiene: **não criar `.bak`, `_backup_old` ou `_novo`.** Use branch ou confie no histórico. Deixar a árvore limpa antes de virar o dia é o que evita perder a noção do que está publicado.

---

## Problemas comuns

| Problema                        | Causa provável                          | Solução                                |
|--------------------------------|-----------------------------------------|----------------------------------------|
| Fonte não carrega               | Caminho errado em `zalando-sans.css`    | Verificar `assets/fonts/`              |
| Logo não aparece no nav         | `victrix-logos.css` não carregado       | Checar `<link>` no `<head>`            |
| Animações não rodam no gateway  | Erro no `main.js` (o fail-safe revela o conteúdo, mas sem motion) | Abrir console (F12) |
| Mudei `style.css` e a PF/PJ não mudou | Essas páginas têm CSS inline próprio | Editar o `<style>` de `para_voce.html` / `empresa_pj.html` |
| CSS não atualiza no browser     | Cache do navegador                      | Ctrl+Shift+R (Win) / Cmd+Shift+R (Mac) |
| Imagem blur não aparece         | Espaço no nome do arquivo               | `%20` no HTML, aspas no CSS            |
| Imagem 404 só no victrixgroup   | Asset existe só na raiz                 | Copiar para `group/assets/`            |
| `git` diz "not a git repository"| Arquivos virtualizados pelo OneDrive    | Botão direito na pasta → "Sempre manter neste dispositivo" |
| Edição no `relatorio.html` desapareceu | Casca regerada pelo Dash-End-to-End | Levar a mudança ao `template_aeterna.html` — ver `docs/aeterna/EXPORT_EXCEL.md` |
