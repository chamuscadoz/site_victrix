# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Monorepo estático (HTML/CSS/JS puro, zero dependências, zero build) que serve **dois sites**:

- **Victrix Capital** (`victrixcapital.com.br`) — servido da **raiz**. É o foco deste guia.
- **Victrix Group** (`victrixgroup.com.br`) — servido da pasta **`group/`**, incluindo a área logada **Aeterna** (dashboard de cliente com Supabase).

Arquitetura completa dos dois sites e do deploy em `README.md`. Setup da área logada em `docs/aeterna/`.

## Convenções de shell

**Sempre iniciar todo comando com um `cd` para a pasta correta** antes de qualquer outra coisa — cada chamada de shell é independente (não há `cd` acumulado entre comandos). Nunca assumir o diretório de trabalho.

**Regra ao entregar comandos para o Zé rodar no terminal:** todo comando entregue para execução manual DEVE vir precedido do `cd` com o caminho **real e completo** da pasta do projeto, pronto para copiar e colar. Nunca entregar um comando "solto" (ex.: só `git push`) — sempre o par `cd` + comando. Isso vale para push, deploy, limpeza de lock, servidor local, etc.

Caminho real da pasta (Windows / PowerShell):

```powershell
cd "C:\Users\JoséCassiolato\OneDrive - AETERNA VICTRIX\Claude\Projects\Site Victrix\site_victrix"
```

Exemplo completo:

```powershell
cd "C:\Users\JoséCassiolato\OneDrive - AETERNA VICTRIX\Claude\Projects\Site Victrix\site_victrix"
git status
```

### OneDrive — duas consequências práticas

**1. Locks residuais.** Ocasionalmente sobra um `.git\index.lock` (ou `HEAD.lock`) travado que impede novos commits. Se aparecer `Unable to create '...index.lock'`, rode:

```powershell
cd "C:\Users\JoséCassiolato\OneDrive - AETERNA VICTRIX\Claude\Projects\Site Victrix\site_victrix"
del .git\index.lock
del .git\HEAD.lock
```

**2. Arquivos "apenas na nuvem".** Quando o OneDrive libera espaço, os arquivos viram placeholders e o `git` de ambientes que leem o disco diretamente falha com `not a git repository` ou `Invalid argument` — mesmo com o `.git` visível. Para evitar, no Explorer: botão direito na pasta `Site Victrix` → **Sempre manter neste dispositivo**.

## Rodar localmente

```bash
python -m http.server 8000   # http://localhost:8000
# ou
npx serve .
```

Sem build step. Alterações em HTML/CSS/JS são imediatas no browser (Ctrl+Shift+R para limpar cache).

## Deploy

```powershell
cd "C:\Users\JoséCassiolato\OneDrive - AETERNA VICTRIX\Claude\Projects\Site Victrix\site_victrix"
git add <arquivos>
git commit -m "descrição clara"
git push origin main
```

Push na branch `main` atualiza automaticamente via Vercel. Detalhes em `DEPLOY.md`.

## Arquitetura

### Capital (raiz) — três páginas HTML independentes, sem roteamento ou framework:

| Página | Estado | Estilo |
|--------|--------|--------|
| `index.html` | **Gateway** — nav · hero de boas-vindas · dois caminhos (Para você / Para sua empresa) · footer. Não é mais one-page. | CSS externo (`style.css` + `motion.css` + `victrix-logos.css`) |
| `para_voce.html` | Pessoa Física — Hero · Pilares · Abordagem · Filosofia · Equipe · Insights · Closing | **CSS inline** (bloco `<style>` próprio, liquid glass) |
| `empresa_pj.html` | Pessoa Jurídica — mesma linguagem liquid glass | **CSS inline** (bloco `<style>` próprio) |

> ⚠️ Ponto crítico: `para_voce.html` e `empresa_pj.html` **não usam** `assets/css/style.css`. Cada uma carrega só `zalando-sans.css` e define o seu próprio `:root` inline. Mudar `style.css` **não** afeta essas duas páginas — e vice-versa. Toda alteração de cor ou componente precisa ser aplicada nos três lugares.

### Group (`group/`) — landing do Group + área logada Aeterna

| Página | Função |
|--------|--------|
| `group/index.html` | Landing do Group (Investimentos → Capital · Organização Patrimonial → Aeterna) |
| `group/aeterna/index.html` | Landing institucional Aeterna + formulário (Web3Forms) |
| `group/aeterna/login.html` | Login do cliente (Supabase Auth) |
| `group/aeterna/relatorio.html` | Casca do dashboard — baixa o JSON do cliente e renderiza (ver `docs/aeterna/DASHBOARD.md`) |
| `group/aeterna/redefinir.html` | Redefinição de senha |

### CSS — quatro arquivos, papéis distintos

- `assets/css/style.css` — design system principal: variáveis CSS, layout, componentes (usado **só** pelo `index.html`)
- `assets/css/motion.css` — camada de animação/motion (aurora, veil, reveals, tilt) que acompanha o `main.js`
- `assets/css/zalando-sans.css` — declarações `@font-face` da Zalando Sans SemiExpanded (self-hosted) — o único carregado por **todas** as páginas da Capital
- `assets/css/victrix-logos.css` — logo injetada via CSS custom property `--vc-logo-lime-landscape` (SVG inline, sem request extra)

CSS mobile-first com breakpoints em `541px / 641px / 769px / 900px`.

As páginas do **Group** não usam nenhum destes: carregam a Zalando Sans via Google Fonts (`fonts.googleapis.com`) e têm CSS inline próprio.

### JS — arquivo único

`assets/js/main.js` é o **motion engine v5** (~11 KB), carregado apenas pelo `index.html`. Onze módulos, todos respeitando `prefers-reduced-motion` e o tipo de ponteiro:

1. NAV scrolled (fundo da nav após 60px) · 2. Aurora (gradientes animados nos heros) · 3. Page veil (transição de rota) · 4. Reveals (`IntersectionObserver` em `.reveal`) · 5. Split headlines · 6. Parallax · 7. Tilt 3D · 8. Magnetic nav · 9. Cursor v2 · 10. Count-up (`[data-count]`) · 11. Scroll-spy.

O `index.html` traz um **fail-safe** inline: se o `main.js` não carregar ou vier truncado no deploy, ele revela todo o conteúdo para a página nunca aparecer em branco. Não remover.

> ⚠️ Não existe mais array `members` nem carrossel 3D no `main.js`. A seção Equipe virou cards estáticos dentro do `para_voce.html`, com o motor liquid glass próprio no `<script>` do fim daquela página. Docs antigas que citam "array `members`, linhas 15–64" ou "`target -= 0.0032`" estão descrevendo o v4, que não existe mais.

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
| Texto do gateway (boas-vindas, dois botões) | `index.html` | `<section id="gateway">` |
| Textos e seções da Pessoa Física | `para_voce.html` | Bloco HTML da seção |
| Textos e seções da Pessoa Jurídica | `empresa_pj.html` | Bloco HTML da seção |
| Dados da equipe (nome, cargo, bio) | `para_voce.html` | `<section id="partners">` — cards `.glass.member` |
| Cores do gateway | `assets/css/style.css` | Bloco `:root` |
| Cores das páginas PF/PJ | `para_voce.html` / `empresa_pj.html` | `:root` **dentro** do `<style>` de cada uma |
| Logo no nav/hero do gateway | `assets/css/victrix-logos.css` | Variável `--vc-logo-lime-landscape` |
| Animações do gateway | `assets/css/motion.css` + `assets/js/main.js` | Módulo correspondente (ver lista acima) |
| Efeito liquid glass PF/PJ | `para_voce.html` / `empresa_pj.html` | `<script>` "MOTOR LIQUID GLASS" no fim do arquivo |
| Landing / área logada Aeterna | `group/aeterna/*.html` | Ver `docs/aeterna/` |

## Armadilhas conhecidas

**1. `group/aeterna/relatorio.html` é gerado, não escrito à mão.** A casca vem do projeto **Dash-End-to-End** (`template_aeterna.html`). Tudo que for editado direto no `relatorio.html` é apagado na próxima geração. Já aconteceu: o commit `e13e692` ("Gerar PDF e Gerar Excel") foi sobrescrito pela regeração `695e4ba`. Antes de mexer nesse arquivo, leia `docs/aeterna/EXPORT_EXCEL.md` — há divergência acumulada esperando para voltar ao template.

**2. Assets do Group precisam ser duplicados.** O projeto Vercel do Group só enxerga `group/`. Qualquer imagem ou ícone novo usado por uma página do Group tem de ser copiado para `group/assets/` — referenciar `assets/` da raiz dá 404 em produção.

**3. Dados de cliente ficam fora do Git.** `group/aeterna/dashboard_aeterna.html` e `group/aeterna/dados_dashboard.json` estão no `.gitignore` e contêm dados reais. Nunca forçar `git add` nesses caminhos.

**4. Não criar arquivos `.bak` / `_backup_old` / `_novo`.** O histórico do Git já cumpre esse papel; cópias soltas na raiz viram lixo silencioso e confundem qual é a versão publicada. Para experimentar, use uma branch.

## Identidade de marca

Referência completa na skill `victrix-brand` e no manual `assets/VictrixCapital_guidelines_v01.pdf`. Pontos críticos:
- **Tom:** preciso, calmo, institucional — sem exclamações, sem drama, sem metáforas
- **Vitrix é:** escritório de assessoria de investimentos / credenciado à XP
- **Não é:** banco, asset, gestora, wealth manager, consultoria financeira independente
- **Fonte:** Zalando Sans SemiExpanded (self-hosted em `assets/fonts/`)
- **Manual de marca:** `assets/VictrixCapital_guidelines_v01.pdf`
