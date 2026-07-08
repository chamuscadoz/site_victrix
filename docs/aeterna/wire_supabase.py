#!/usr/bin/env python3
"""
wire_supabase.py — transforma um dashboard standalone (com `const DATA = {...}` embutido)
no relatorio.html publicado, que busca o JSON do Supabase em vez de embutir os dados.

Uso:
    python docs/aeterna/wire_supabase.py <entrada.html> <saida.html>
Exemplo:
    python docs/aeterna/wire_supabase.py group/aeterna/dashboard_aeterna.html group/aeterna/relatorio.html

O que faz:
  - Encontra o literal `const DATA = {...}` (casamento de chaves, respeitando strings).
  - Troca por `const DATA = window.__DATA` e guarda o código de render num
    <script type="application/x-render" id="__renderCode"> (inerte).
  - Injeta supabase-js + config.js e um boot que: faz login (sessionStorage),
    baixa `relatorios/<uid>/dados_dashboard.json`, seta window.__DATA e executa o render.
  - NÃO mantém dados embutidos (privacidade).
"""
import sys

def find_data_literal(s):
    i = s.find('const DATA')
    if i == -1:
        raise SystemExit("ERRO: 'const DATA' não encontrado no arquivo de entrada.")
    b = s.find('{', i)
    depth = 0; j = b; ins = False; esc = False; qc = ''
    while j < len(s):
        c = s[j]
        if ins:
            if esc: esc = False
            elif c == '\\': esc = True
            elif c == qc: ins = False
        else:
            if c in ('"', "'", '`'): ins = True; qc = c
            elif c == '{': depth += 1
            elif c == '}':
                depth -= 1
                if depth == 0: break
        j += 1
    return i, j  # inicio de 'const DATA', indice do '}' que fecha

BOOT = '''<script>
(async function(){
  function fail(msg){ var h=document.getElementById('errorHost'); if(h){ h.innerHTML='<div class="error-panel"><b>'+msg+'</b></div>'; } else { document.body.insertAdjacentHTML('afterbegin','<div style="padding:16px;color:#C0392B;font-family:sans-serif">'+msg+'</div>'); } }
  try{
    var CFG=window.VICTRIX_CONFIG||{};
    if(!CFG.SUPABASE_URL||!CFG.SUPABASE_ANON_KEY){ return fail('Configuracao ausente (config.js).'); }
    var BUCKET=CFG.BUCKET||'relatorios';
    var sb=window.supabase.createClient(CFG.SUPABASE_URL,CFG.SUPABASE_ANON_KEY,{auth:{storage:window.sessionStorage,persistSession:true,autoRefreshToken:true}});
    var sess=(await sb.auth.getSession()).data.session;
    if(!sess){ location.replace('./login.html'); return; }
    var uid=sess.user.id;
    var dl=await sb.storage.from(BUCKET).download(uid+'/dados_dashboard.json');
    console.log('[AEterna] UID:',uid,' arquivo:',BUCKET+'/'+uid+'/dados_dashboard.json');
    if(dl.error){ console.error('[AEterna] Supabase Storage:',dl.error); }
    if(dl.error||!dl.data){ return fail('Nenhum relatorio disponivel para esta conta. Entre em contato com a Victrix.'); }
    window.__DATA=JSON.parse(await dl.data.text());
    window.__AETERNA={sb:sb,uid:uid,bucket:BUCKET};
    try{ await sb.from('acessos_log').insert({email:sess.user.email,user_agent:navigator.userAgent}); }catch(_e){}
    var lo=document.getElementById('btnLogout');
    if(lo){ lo.addEventListener('click',async function(){ await sb.auth.signOut(); location.replace('./login.html'); }); }
    var code=document.getElementById('__renderCode').textContent;
    var sc=document.createElement('script'); sc.textContent=code; document.body.appendChild(sc);
  }catch(e){ console.error(e); fail('Erro ao carregar o relatorio.'); }
})();
</script>
'''

def main():
    if len(sys.argv) != 3:
        raise SystemExit("Uso: python wire_supabase.py <entrada.html> <saida.html>")
    inp, out = sys.argv[1], sys.argv[2]
    s = open(inp, encoding='utf-8').read()
    dataStart, dataEnd = find_data_literal(s)
    literal = s[dataStart:dataEnd+1]                      # 'const DATA = {...}'
    script2_tag = s.rfind('<script>', 0, dataStart)
    inner_start = script2_tag + len('<script>')
    script2_close = s.find('</script>', dataEnd)
    head = s[:script2_tag]
    render_inner = s[inner_start:script2_close].replace(literal, 'const DATA = window.__DATA', 1)
    tail = s[script2_close+len('</script>'):]

    libs = '<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.js"></script>\n<script src="./config.js"></script>\n'
    if 'XLSX' in render_inner:
        libs = '<script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js"></script>\n' + libs

    result = (head + libs
              + '<script type="application/x-render" id="__renderCode">' + render_inner + '</script>\n'
              + BOOT + tail)
    open(out, 'w', encoding='utf-8').write(result)
    print("OK:", out, "->", len(result), "bytes (entrada:", len(s), ")")
    print("Confira no navegador (F12) e depois: git add", out, "&& git commit && git push")

if __name__ == '__main__':
    main()
