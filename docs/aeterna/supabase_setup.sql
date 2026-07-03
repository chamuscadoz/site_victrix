-- ============================================================================
-- Aeterna Victrix — Área logada de clientes (Supabase)
-- Rode este script no Supabase: Dashboard > SQL Editor > New query > Run.
-- Ele cria o bucket privado, as políticas de isolamento (RLS) e o log de acessos.
-- ============================================================================

-- 1) BUCKET PRIVADO DOS RELATÓRIOS ------------------------------------------
--    public = false  => nenhum arquivo é acessível sem sessão + política.
insert into storage.buckets (id, name, public)
values ('relatorios', 'relatorios', false)
on conflict (id) do nothing;

-- 2) ISOLAMENTO POR CLIENTE (o coração da segregação / LGPD) -----------------
--    Cada cliente só LÊ arquivos que estão na pasta com o próprio ID:
--        relatorios/<uid-do-usuario>/dados_dashboard.json
--    Mesmo que descubra o caminho de outro cliente, o download é negado.
drop policy if exists "cliente le apenas seu relatorio" on storage.objects;
create policy "cliente le apenas seu relatorio"
on storage.objects for select
to authenticated
using (
  bucket_id = 'relatorios'
  and (storage.foldername(name))[1] = auth.uid()::text
);

--    Observação: NÃO criamos políticas de INSERT/UPDATE/DELETE para o papel
--    "authenticated". Assim, nenhum cliente consegue enviar ou apagar arquivos.
--    Você (admin) sobe os relatórios pelo painel do Supabase ou via service key.

-- 3) LOG DE ACESSOS — AUDITORIA LGPD ----------------------------------------
create table if not exists public.acessos_log (
  id          bigint generated always as identity primary key,
  user_id     uuid        not null default auth.uid(),
  email       text,
  ocorrido_em timestamptz not null default now(),
  user_agent  text
);

alter table public.acessos_log enable row level security;

drop policy if exists "usuario registra proprio acesso" on public.acessos_log;
create policy "usuario registra proprio acesso"
on public.acessos_log for insert
to authenticated
with check (user_id = auth.uid());

drop policy if exists "usuario ve proprio acesso" on public.acessos_log;
create policy "usuario ve proprio acesso"
on public.acessos_log for select
to authenticated
using (user_id = auth.uid());

-- Você (admin) vê tudo pelo painel (Table editor) usando a service key,
-- que ignora RLS. Para relatórios de auditoria, consulte public.acessos_log.

-- ============================================================================
-- FIM. Próximo passo: criar os usuários (Authentication > Users) e subir o
-- dados_dashboard.json de cada cliente em relatorios/<uid>/dados_dashboard.json
-- ============================================================================
