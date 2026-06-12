# Prompt para Fable 5 — Redesign de UX do site Victrix Capital

> Cole o bloco abaixo (a partir de "PROMPT") direto no Fable 5. Ele assume que o Fable tem acesso ao repositório `site_victrix` (index.html, para_voce.html, empresa_pj.html e a pasta `assets/`).

---

## PROMPT

Você é um designer de UX/motion sênior. Sua tarefa é **refazer a camada de experiência e interação** do site da **Victrix Capital** — um escritório de assessoria de investimentos credenciado à XP — elevando-o ao nível de motion design dos templates premium do **motionsites.ai** (heros animados, gradientes vivos, microinterações ricas, sensação "viva" e sofisticada), **sem jamais quebrar a identidade visual da marca**.

Trate isto como um *upgrade ousado de motion*, não como uma troca de marca. Cores, tipografia, logos, copy e estrutura institucional são sagrados; o que muda é como o site **se move, responde e respira**.

### 1. Identidade visual — obrigatória e inegociável

Paleta (use exatamente estes tokens):
- `--lime: #88E833` (verde-limão — destaques, CTAs, valores, acentos)
- `--deep-forest: #0E1C0E` (fundo primário escuro)
- `--mid-green: #2E6F3A` (fills secundários, headers)
- `--sage: #D5DAD0` (texto de corpo sobre fundo escuro)
- `--charcoal: #262626` (texto sobre fundo claro)
- `--white: #FFFFFF`
- `--red: #C0392B` (apenas valores negativos)

Regra de prioridade: o par **Lime Green + Deep Forest** é o coração da marca. Quando precisar limitar variedade, fique nesses dois.

Tipografia: **uma única família — Zalando Sans SemiExpanded** (já presente em `assets/fonts/` e declarada em `assets/css/zalando-sans.css`). Use os pesos de ExtraLight a Black para hierarquia. Não introduza nenhuma outra fonte.

Logos: use **somente** os arquivos oficiais em `assets/images/Logos/`. Nunca recolorir, distorcer ou recriar o logo. Em fundo escuro use a versão branca ou lime; em fundo claro, preta ou verde-escura.

Backgrounds com blur: as imagens em `assets/images/blur_backgrounds/` (preferida: `Slide 16_9 - 65.png`) são parte da identidade. Mantenha-as como base dos heros, sempre com overlay escuro de Deep Forest (alpha 0.70–0.85) para legibilidade.

Ícones: 24 ícones custom em `assets/images/Icons/` (Black / Green / DarkGreen). Use-os dentro de quadrados de cantos arredondados (~64px, raio ~12px), lime sobre Deep Forest ou charcoal sobre lime.

### 2. Voz e tom — limite o "espetáculo"

A marca é **precisa, calma, moderna e institucional** — nível CFA / investment banking. O motion deve ser **ousado mas elegante**: impressiona pela fluidez e refinamento, nunca pelo exagero. Proibido: brilhos neon piscantes, bounce cartunesco, confetes, sombras pesadas, transições bruscas, qualquer coisa que pareça "startup barulhenta". O blur existe justamente para remover drama. Pense em **Linear, Stripe, Vercel, Arc** com sotaque verde Victrix — não em landing page de cripto.

### 3. Estrutura existente (preserve a arquitetura, eleve a execução)

São três páginas, todas em PT-BR, navegação compartilhada (nav fixa) e footer compartilhado com disclaimer regulatório (o texto do disclaimer **não pode ser alterado**):

**index.html — Gateway:** hero de boas-vindas com logo, headline "Bem-vindo à Victrix Capital", subtítulo e duas portas de entrada: "Para você" (PF) e "Para sua empresa" (PJ).

**para_voce.html (Pessoa Física):** seções `hero` → `narrative` ("Investir não é…") → `approach` ("Uma abordagem única") → `philosophy` → `partners` ("Equipe") → `insights` ("Estudos de Mercado") → `closing`.

**empresa_pj.html (Pessoa Jurídica):** `hero interno` → `câmbio` → `gestão de riscos` → `crédito` → `investimentos` → `seguros` → `closing`.

Mantenha todas essas seções, sua copy e sua ordem. Você reconstrói a **camada de interação e animação** de cada uma.

### 4. Direção de motion — o coração do pedido (nível motionsites.ai)

**Hero / Gateway (impacto máximo):**
- Background com blur Victrix em **parallax lento** + uma camada de **gradiente animado** que se move suavemente entre Deep Forest e Mid Green, com um *glow* sutil em Lime Green pulsando devagar (mesh/aurora gradient, ciclo de 12–20s, easing suave). Inspiração direta nos heros do motionsites.ai, mas na paleta verde Victrix.
- Headline com **entrada por reveal escalonado** (palavras/linhas subindo com clip-mask e fade, stagger ~60–90ms).
- As duas portas (PF/PJ) como **cards interativos**: ao hover, leve elevação, borda lime que se "desenha", e um shift de gradiente interno. Cursor magnético/custom (já existe `#cursor` no projeto — evolua-o, não remova).

**Transições de página e de seção:**
- Transições de rota suaves (fade + slide curto) ao navegar entre Gateway → PF/PJ.
- **Scroll reveals refinados** para cada seção (o projeto já usa a classe `reveal`/`reveal-d1` — substitua por um sistema mais rico: IntersectionObserver com translate+opacity, blur-in opcional, stagger por filhos).
- Parallax sutil de profundidade entre camada de blur e conteúdo.

**Microinterações:**
- Links da nav com underline lime que cresce do centro; estado ativo claro.
- Botões/CTAs em Lime Green com feedback tátil (scale 0.98 no press, ripple discreto, ou shimmer lento).
- Números/KPIs (quando houver) com **count-up** ao entrarem na viewport.
- Ícones nos cards com micro-animação no hover (stroke draw ou leve rotação).
- Cards de "Equipe" e de produtos (Câmbio, Crédito, etc.) com hover 3D sutil (tilt leve) e realce lime.

**Seção de closing:** encerramento com gradiente animado calmo + logo, reforçando "Experiência, Disciplina, Integridade".

### 5. Requisitos técnicos e de qualidade

- **Stack:** mantenha HTML/CSS/JS estático do projeto (não migre para framework pesado sem necessidade). Pode usar uma lib de animação leve (ex.: GSAP, Motion One ou Web Animations API). Evite bibliotecas grandes e supérfluas.
- **Performance:** anime apenas `transform` e `opacity`; use `will-change` com parcimônia; lazy-load de imagens; mantenha LCP rápido (o hero não pode demorar). Meta: 60fps, sem jank no scroll.
- **Acessibilidade:** respeite `prefers-reduced-motion` (degrade para fades simples ou estático); contraste AA; navegação por teclado e foco visível; `alt` em imagens; sem texto preso dentro de animações inacessíveis.
- **Responsivo:** mobile-first impecável. Reduza intensidade de parallax/3D no mobile; nada de motion que atrapalhe leitura ou cause enjoo em telas pequenas.
- **SEO/meta:** preserve todas as tags `<meta>`, Open Graph, `lang="pt-BR"`, favicon e o disclaimer regulatório existentes.
- **Assets:** reutilize tudo de `assets/` (fontes, logos, blur, ícones, fotos de perfil). Não baixe nem invente novos assets de marca.

### 6. Entregável

Entregue os três arquivos HTML atualizados + CSS/JS de motion organizados em `assets/`, prontos para abrir no navegador, com a nova experiência funcionando ponta a ponta. Documente brevemente (comentário no topo do CSS/JS) quais animações foram adicionadas e onde.

**Objetivo final:** quem abrir o site deve sentir que a Victrix é tão sofisticada e moderna quanto os melhores templates do motionsites.ai — mas inconfundivelmente **Victrix**: verde, calma, precisa e institucional.

---

## Notas de uso (não cole no Fable)

- Se o Fable 5 não enxergar o repositório, anexe/aponte para `index.html`, `para_voce.html`, `empresa_pj.html` e a pasta `assets/` antes de enviar o prompt.
- Para iterar: peça primeiro só o **Gateway** redesenhado como prova de conceito, aprove o nível de motion, e depois mande aplicar às páginas PF e PJ com "mesmo sistema de motion da home".
- Se quiser frear a intensidade depois, troque "ousado mas elegante" por "sóbrio institucional" na seção 2.
