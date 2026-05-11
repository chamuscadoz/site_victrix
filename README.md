# Victrix Capital — Site Institucional

Site institucional da Victrix Capital, Escritório credenciado à XP Investimentos.  
CNPJ: 61.215.470/0001-67 | www.victrixcapital.com.br

---

## Identidade Visual

Fonte, cores e logotipos seguem o documento `assets/VictrixCapital_guidelines_v01.pdf`.  
Referência rápida em `BrandVictrix.md`.

| Token       | Hex       | Uso                                        |
|-------------|-----------|---------------------------------------------|
| Deep Forest | `#0E1C0E` | Fundo principal (`--forest`)               |
| Lime Green  | `#88E833` | Destaque, logo, CTA (`--lime`)             |
| Mid Green   | `#2E6F3A` | Elementos secundários (`--mid`)            |
| Sage        | `#D5DAD0` | Corpo de texto no escuro (`--sage`)        |
| Alt         | `#152615` | Linhas alternadas, seções (`--alt`)        |

**Tipografia:** Zalando Sans SemiExpanded — variável e estáticas em `assets/fonts/`.

---

## Estrutura de Arquivos

```
site_victrix/
│
├── index.html                     # Página principal (one-page)
├── sobre.html                     # Sobre a Victrix
├── servicos.html                  # Serviços e abordagem
├── contato.html                   # Contato e agendamento
│
├── assets/
│   ├── css/
│   │   ├── style.css              # Design system principal (v3)
│   │   ├── zalando-sans.css       # Declarações @font-face
│   │   └── victrix-logos.css      # Logo via CSS custom property (SVG inline)
│   │
│   ├── js/
│   │   └── main.js                # Carrossel 3D, nav, cursor, scroll reveal
│   │
│   ├── fonts/
│   │   ├── ZalandoSansSemiExpanded-VariableFont_wght.ttf
│   │   ├── ZalandoSansSemiExpanded-Italic-VariableFont_wght.ttf
│   │   └── static/                # Todas as variações de peso (.ttf)
│   │
│   ├── images/
│   │   ├── blur_backgrounds/      # 5 fundos blur (Slide 16_9 - 65/66/67/68/699.png)
│   │   ├── Icons/
│   │   │   ├── Black/             # 24 ícones — traço preto (fundos claros)
│   │   │   ├── Green/             # 24 ícones — Lime Green (fundos escuros)
│   │   │   └── DarkGreen/         # 24 ícones — verde escuro (fundos claros)
│   │   ├── Logos/
│   │   │   ├── Logo_sem_XP/       # Victrix solo (SVG, 3 variantes)
│   │   │   └── Logo_Victrix_XP/   # Victrix + XP (black/darkgreen/green/white)
│   │   ├── Profile/               # Fotos da equipe + profile_blur.png (OG)
│   │   ├── xp-branco.png          # Logo XP — versão branca (nav e footer)
│   │   ├── xp-preto.png           # Logo XP — versão preta
│   │   └── og-image.html          # Template HTML para geração do OG image
│   │
│   └── VictrixCapital_guidelines_v01.pdf  # Manual de marca oficial
│
├── BrandVictrix.md                # Skill de identidade visual (referência completa)
├── README.md                      # Este arquivo
├── DEPLOY.md                      # Guia de publicação
├── QUICKSTART.md                  # Referência rápida para desenvolvimento
├── ROADMAP.md                     # Estado atual e próximas entregas
├── .gitignore
└── package.json
```

---

## Páginas

| Arquivo        | Seções                                                               |
|----------------|----------------------------------------------------------------------|
| `index.html`   | Hero · Narrativa · Abordagem · Filosofia · Equipe · Insights · Closing |
| `sobre.html`   | Em desenvolvimento                                                   |
| `servicos.html`| Em desenvolvimento                                                   |
| `contato.html` | Em desenvolvimento                                                   |

---

## Executar Localmente

```bash
# Python (sem dependências)
python -m http.server 8000
# acesse http://localhost:8000

# Node.js
npx serve .
```

---

## Variáveis CSS (design system)

Definidas em `assets/css/style.css` — bloco `:root`:

```css
:root {
  --forest: #0E1C0E;
  --lime:   #88E833;
  --mid:    #2E6F3A;
  --sage:   #D5DAD0;
  --white:  #FFFFFF;
  --alt:    #152615;
  --font:   'Zalando Sans SemiExpanded', Georgia, serif;
  --ease:   cubic-bezier(0.4, 0, 0.2, 1);
}
```

---

## Aviso Legal

A VICTRIX ASSESSOR DE INVESTIMENTOS LTDA (CNPJ 61.215.470/0001-67) é uma empresa de Assessoria de Investimento registrada na CVM (Resolução CVM 178/23), credenciada à XP Investimentos Corretora de Câmbio, Títulos e Valores Mobiliários S.A.

© 2026 Victrix Capital. Todos os direitos reservados.
