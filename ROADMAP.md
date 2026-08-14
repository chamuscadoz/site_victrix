# Roadmap — Victrix (Capital · Group · Aeterna)

Última atualização: 31 de julho de 2026.
Escopo: o monorepo inteiro — os dois sites e a área logada. Arquitetura em `README.md`.

---

## Pendências abertas

### Bloqueantes — dependem do projeto Dash-End-to-End

Estas duas não vivem neste repositório: `group/aeterna/relatorio.html` é uma **casca gerada**
pelo Dash a partir de `template_aeterna.html`. Detalhe completo em `docs/aeterna/EXPORT_EXCEL.md`.

- [ ] **Levar a divergência do `relatorio.html` de volta ao `template_aeterna.html`.**
  Hoje existem no arquivo publicado, mas não no template: CSS e markup do modal
  "Exportar Excel" (`#xlsModal`), a lógica de exportação e o bloco de logout /
  auto-logout por inatividade. **A próxima geração da casca apaga tudo isso.**
  Já aconteceu uma vez — o commit `e13e692` foi sobrescrito pela regeração `695e4ba`.

- [ ] **Fazer o `gerar_export.py` subir o `dados_export.json`.**
  Nada no pipeline envia esse arquivo hoje; o que está em produção é uma cópia manual
  antiga — é a causa da planilha baixada mostrar números velhos com o JSON local correto.
  O upload deve ir para `relatorios/<uid>/dados_export.json`, no mesmo ponto em que o
  `dados_dashboard.json` é enviado, e o `SETUP.md` precisa listar os **dois** arquivos
  no procedimento de fechamento do mês.

### Aeterna — ajustes menores

- [ ] Células `null` na extração Excel viram texto vazio em vez de célula em branco.
  Não afeta soma nem filtro por período, mas o filtro "Vazias" do Excel trata os dois
  casos de forma diferente. É uma linha em `cell()`.

### Capital — dívida de arquitetura

- [ ] **Unificar os dois sistemas de estilo.** `index.html` usa `assets/css/style.css` +
  `motion.css`; `para_voce.html` e `empresa_pj.html` têm CSS inline próprio, cada uma com
  o seu `:root`. Toda mudança de paleta precisa ser feita três vezes — e é onde a
  inconsistência visual vai aparecer primeiro. Decidir: extrair o liquid glass para um
  `assets/css/glass.css` compartilhado, ou assumir a duplicação de forma explícita.

- [ ] **Fotos reais da equipe** — os cards em `para_voce.html` (`<section id="partners">`)
  hoje são texto puro, sem retrato. Headshots vão para `assets/images/Profile/`.

- [ ] **Conteúdo real nos Insights** — os quatro cards de "Estudos de Mercado" em
  `para_voce.html` são títulos sem destino. Conectar a artigos ou PDFs.

### SEO e performance

- [ ] `sitemap.xml` e `robots.txt` nos dois domínios
- [ ] Favicon completo (16/32/180/192/512) + `manifest.json` — hoje o favicon é o
  `pngprofile01.png`, uma foto de perfil
- [ ] Converter `blur_backgrounds/` de PNG para WebP (redução estimada de 60–70%)
- [ ] Google Analytics 4 no `<head>` das páginas dos dois sites

### Longo prazo

- [ ] Botão WhatsApp flutuante (visível no mobile)
- [ ] Newsletter — captura de e-mail + automação
- [ ] Blog / Estudos de Mercado em formato artigo
- [ ] "Agendar reunião" integrado ao Google Calendar ou Calendly

---

## Concluído

### Arquitetura e deploy

- [x] Monorepo com **dois projetos Vercel** — Capital na raiz, Group com Root Directory
      `group`. O roteamento por host via `vercel.json` foi abandonado e o arquivo removido.
- [x] `group/assets/` autossuficiente (o projeto do Group não enxerga a raiz)
- [x] Documentação alinhada ao código (`77b1697`) e fonte única de marca na skill (`4a6e850`)

### Capital

- [x] Design system — variáveis CSS, tipografia, paleta (skill `victrix-brand`)
- [x] Zalando Sans SemiExpanded self-hosted (variável + 16 pesos estáticos)
- [x] Logo via CSS custom property, sem request de imagem
- [x] `index.html` convertido em **gateway** — hero de boas-vindas e dois caminhos PF/PJ
- [x] `para_voce.html` e `empresa_pj.html` com layout **liquid glass** (`1a1aab4`)
- [x] Motion engine v5 (`main.js`) — aurora, page veil, split headlines, parallax, tilt 3D,
      magnetic nav, cursor v2, count-up, scroll-spy; tudo respeitando `prefers-reduced-motion`
- [x] Fail-safe de conteúdo no `index.html` — se o `main.js` vier truncado no deploy,
      a página revela o conteúdo em vez de aparecer em branco (`ee8b350`)
- [x] Cards de Câmbio fundidos na página PJ
- [x] CSS mobile-first — breakpoints 541 / 641 / 769 / 900px
- [x] Open Graph completo (`og:image`, `og:url`, dimensões)

### Group

- [x] Landing do Group com os dois caminhos (Investimentos → Capital · Organização
      Patrimonial → Aeterna)
- [x] Landing institucional Aeterna + formulário via Web3Forms (sem backend)
- [x] Grafia **Æterna** com ligadura latina; hero próprio

### Aeterna — área logada

- [x] Supabase Auth + Row-Level Security — cada cliente lê só o próprio relatório
- [x] Bucket privado `relatorios`, schema e log de acessos (`docs/aeterna/supabase_setup.sql`)
- [x] Fluxo de redefinição de senha (`redefinir.html`), com o `redirectTo` corrigido
      para o site sem `cleanUrls`
- [x] Logout manual + auto-logout por inatividade (10 min)
- [x] Página "Mercado & Benchmarks" no relatório
- [x] Botões "Gerar PDF" e "Baixar Excel" com seleção de competências e mês de referência
- [x] Export Excel lê as colunas de `meta.cols` — coluna nova no Dash aparece sozinha
- [x] Datas exportadas como data real do Excel; `202404` e afins não são convertidos por engano
- [x] Dados de cliente (`dados_dashboard.json`, `dashboard_aeterna.html`) fora do Git

---

## Decisões de arquitetura

| Decisão                   | Escolha atual                     | Motivo                                              |
|---------------------------|-----------------------------------|-----------------------------------------------------|
| Stack                     | HTML/CSS/JS puro                  | Zero dependências, zero build, deploy estático      |
| Deploy                    | 2 projetos Vercel, 1 repo         | Roteamento por host mostrou-se frágil               |
| Logo                      | CSS custom property (SVG inline)  | Sem request extra, cor controlada por CSS           |
| Fontes (Capital)          | Self-hosted em `assets/fonts/`    | Controle total, sem dependência de CDN              |
| Fontes (Group)            | Google Fonts                      | `group/` é autossuficiente e não carrega a raiz     |
| Estilo PF/PJ              | CSS inline por página             | Isolamento durante o redesign — ver dívida acima    |
| Auth e dados do cliente   | Supabase (Auth + RLS)             | Sem backend próprio; isolamento garantido no banco  |
| Casca do relatório        | Gerada pelo Dash-End-to-End       | Dados e layout num pipeline só — mas ver bloqueantes|
| Imagens de fundo          | PNG blur + overlay CSS            | Controle de opacidade por seção                     |

---

## Referências

- Arquitetura e deploy: `README.md` · `DEPLOY.md`
- Desenvolvimento e "onde alterar o quê": `QUICKSTART.md`
- Guia para agentes + armadilhas conhecidas: `CLAUDE.md`
- Área logada: `docs/aeterna/SETUP.md` · `DASHBOARD.md` · `EXPORT_EXCEL.md`
- Manual de marca: `assets/VictrixCapital_guidelines_v01.pdf` · skill `victrix-brand`
