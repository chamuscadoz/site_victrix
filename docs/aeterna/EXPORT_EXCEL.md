# Botão "Baixar Excel" — Aeterna

Documenta o botão de extração da área logada: onde mora, de onde lê e o que
precisa voltar para o projeto **Dash-End-to-End**.

## Situação atual (divergência)

O botão foi implementado **direto em `group/aeterna/relatorio.html`** e nunca voltou
para o `template_aeterna.html` do Dash. A casca é gerada pelo Dash, então **a próxima
geração apaga o botão** se ele não for para o template antes.

Isso já aconteceu uma vez: o commit `e13e692` ("Gerar PDF e Gerar Excel") foi apagado
pela regeração `695e4ba`.

Divergência acumulada sobre a última casca gerada (`739d340`, 09/07/2026):

| Região | Conteúdo | Precisa ir para o template |
|---|---|---|
| CSS `/* ===== Exportar Excel ===== */` | estilos do botão e do modal | sim |
| `<!-- Modal Exportar Excel -->` | markup `#xlsModal` | sim |
| `<script>/* ===== Exportacao Excel ... */` | lógica de exportação | sim |
| bloco de logout / auto-logout no boot | botão Sair + inatividade 10 min | sim |

## Como o dado chega

O script **não** tem caminho fixo nem dado embutido. Ele reusa a sessão autenticada
publicada pelo boot da casca:

```js
window.__AETERNA = { sb, uid, bucket };   // definido no boot, após sb.auth.getSession()
sb.storage.from(bucket).download(uid + '/dados_export.json');
```

Ou seja: `relatorios/<uid>/dados_export.json` — mesma pasta, mesmo bucket e **mesma RLS**
do `dados_dashboard.json`. Requisito de LGPD atendido: o objeto não é público, não é
cacheado em CDN e só o titular autenticado lê.

## O passo que falta no Dash

Nada no pipeline sobe o `dados_export.json`. Hoje o arquivo em produção é uma cópia
manual antiga — foi por isso que a planilha baixada mostrava números velhos enquanto
o JSON local estava correto.

`gerar_export.py` precisa terminar com um upload para `relatorios/<uid>/dados_export.json`,
no mesmo ponto em que o `dados_dashboard.json` é enviado, e o `SETUP.md` precisa listar
os **dois** arquivos no procedimento de fechamento.

## Contrato com o `dados_export.json`

O script lê a estrutura do próprio arquivo — não há lista de colunas fixa no código:

| Campo | Uso |
|---|---|
| `meta.cols.<coleção>` | ordem e nomes das colunas de cada aba |
| `meta.months` / `meta.months_label` | competências (AAAAMM) de movimentos e extratos |
| `meta.fundos_meses` | meses de referência do cadastro (AAMM) |
| `meta.fundos_mes_col` | campo a filtrar em `fundos` |

Se `meta.cols` faltar, o script cai num fallback com as colunas antigas — a aba sai,
mas sem as colunas novas. Acrescentar coluna no Dash é suficiente para ela aparecer.

### Campos que são texto, não data

Só viram data real do Excel:

- `fundos`: `dtPrimeiraAplicacao`, `Vencimento_ResgateTotal`
- `movimentos`: `DATA`

**Não** são data, apesar do nome: `extratos.Data` (competência AAAAMM), `comp` (AAAAMM)
e `Mês de Ref` (AAMM). O conversor também ignora números puros de propósito — assim um
`202404` nunca vira data por engano.

## Comportamento do modal

- Competências (checkboxes): filtram `movimentos` e `extratos`.
- Mês de referência (select): filtra `fundos`; opção "Todos os meses" traz o cadastro
  inteiro. O padrão é o mês mais recente. O bloco só aparece se `meta.fundos_meses` e
  `meta.fundos_mes_col` existirem.
- Nome do arquivo: `Aeterna_Extracao_<comps>[_fundos<AAMM>].xlsx`.

## Pendência menor

Valores `null` viram célula de texto vazio, não célula realmente em branco. Não afeta
soma nem filtro por período, mas o filtro "Vazias" do Excel trata os dois de formas
diferentes. Trocar por célula ausente é um ajuste de uma linha em `cell()`.
