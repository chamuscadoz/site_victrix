# Roadmap — Victrix Capital Website

Última atualização: Maio 2026

---

## Concluído

### Fundações
- [x] Design system completo — variáveis CSS, tipografia, cores (BrandVictrix.md)
- [x] Layout one-page responsivo (`index.html`)
- [x] Fontes Zalando Sans SemiExpanded — variável + estáticas em `assets/fonts/`
- [x] Logo via CSS custom property (`victrix-logos.css`) — sem arquivo de imagem externo
- [x] Estrutura de assets organizada (`blur_backgrounds/`, `Icons/`, `Logos/`, `Profile/`)

### index.html
- [x] Seção Hero — logo animado, tagline, scroll indicator
- [x] Seção Narrativa — grid 2 colunas, scroll reveal
- [x] Seção Abordagem — 6 cards com grid texture
- [x] Seção Filosofia — blockquote com blur background
- [x] Seção Equipe — carrossel 3D coverflow com 7 membros, física e auto-rotação
- [x] Seção Estudos de Mercado (Insights) — grid de 3 cards com imagens blur
- [x] Seção Closing — frase institucional
- [x] Footer — logos, links, aviso legal CVM completo
- [x] CSS Mobile First (v4) — base mobile, min-width progressivo (541 / 641 / 769 / 900px)
- [x] Hero logo proporcional — `aspect-ratio: 4024/1726` (downCapital SVG), 80vw mobile → 680px desktop
- [x] Caminhos de imagens corrigidos — blur_backgrounds/, Profile/, Logos/
- [x] Ícones de marca nos 6 cards de Abordagem — Icons/Green/

### UX e interatividade
- [x] Cursor customizado (círculo lime, 3px, mix-blend-mode difference)
- [x] Nav com logo aparecendo ao rolar (scroll > 60px)
- [x] Scroll reveal com IntersectionObserver
- [x] Carrossel 3D Equipe — drag + momentum, mouse hover, auto-rotação, dots, prev/next, teclado, wheel
- [x] Open Graph — og:image, og:url, og:site_name, og:image:width/height

### Mobile
- [x] Nav móvel sem sobreposição ao rolar (padding corrigido, XP logo oculta no mobile)
- [x] Hero tagline sem overflow horizontal (letter-spacing reduzido em ≤640px)
- [x] Carrossel 3D responsivo (raio e tamanho de card ajustados por breakpoint)

---

## Em andamento / Próximas entregas

### Curto prazo

- [ ] **Conteúdo `sobre.html`** — história da empresa, valores, timeline de fundação

- [ ] **Conteúdo `servicos.html`** — detalhamento das 6 abordagens, ícones SVG do catálogo

- [ ] **Formulário `contato.html`** — integrar via [FormSpree](https://formspree.io) ou EmailJS
  - Campos: nome, e-mail, telefone, mensagem
  - Envio para `z.cassiolato@gmail.com`
  - Confirmação visual ao usuário

- [ ] **Fotos reais da equipe** — substituir imagens blur genéricas por headshots profissionais
  em `assets/images/Profile/` e atualizar o carrossel 3D

### Médio prazo

- [ ] **Google Analytics 4** — tag no `<head>` de todas as páginas; acompanhar conversões

- [ ] **Botão WhatsApp flutuante** — fixo no canto inferior direito, abre conversa direta
  - Oculto em desktop, visível em mobile

- [ ] **Sitemap.xml e robots.txt** — SEO básico, indexação correta

- [ ] **Performance — imagens WebP** — converter blur_backgrounds de PNG para WebP
  (redução estimada de 60–70% no tamanho)

- [ ] **Favicon completo** — gerar todos os tamanhos a partir do logo (16, 32, 180, 192, 512px)
  + `manifest.json` básico

- [ ] **Seção Insights com conteúdo real** — conectar cards a artigos ou PDFs existentes

### Longo prazo

- [ ] **Newsletter** — cadastro de e-mail + automação (Mailchimp ou similar)

- [ ] **Blog / Estudos de Mercado** — publicação de análises mensais em formato artigo

- [ ] **Área do cliente (fase futura)** — acesso seguro, relatórios, documentos

- [ ] **Integração agenda** — botão "Agendar reunião" com Google Calendar ou Calendly

---

## Decisões de arquitetura

| Decisão                              | Escolha atual              | Motivo                                           |
|--------------------------------------|----------------------------|--------------------------------------------------|
| Stack                                | HTML/CSS/JS puro           | Zero dependências, deploy estático simples       |
| Logo                                 | CSS custom property (SVG)  | Sem request extra, controla cor via CSS          |
| Fontes                               | Self-hosted (`assets/fonts`)| Controle total, sem dependência de CDN           |
| Carrossel                            | JS vanilla com RAF         | Física real, sem biblioteca externa              |
| Imagens de fundo                     | PNG blur com overlay CSS   | Qualidade visual, controle de opacidade por seção|
| Deploy                               | Site estático (Vercel/GH Pages) | Sem backend, custo zero                     |

---

## Referências

- Manual de marca: `assets/VictrixCapital_guidelines_v01.pdf`
- Identidade visual para código: `BrandVictrix.md`
- Guia de deploy: `DEPLOY.md`
- Referência de desenvolvimento: `QUICKSTART.md`
