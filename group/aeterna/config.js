// config.js — configuração pública do Supabase para a área logada Aeterna.
//
// A ANON KEY é PÚBLICA por design — pode ir para o front-end e ser commitada.
// Quem garante a segregação dos dados é a Row-Level Security (RLS) no Supabase.
// NUNCA coloque aqui a "service_role" key.
//
// >>> SUBSTITUA os dois valores abaixo pelos do seu projeto Supabase
//     (Project Settings > API) e faça commit deste arquivo. <<<
window.VICTRIX_CONFIG = {
  SUPABASE_URL: "https://SEU-PROJETO.supabase.co",
  SUPABASE_ANON_KEY: "COLE-AQUI-A-ANON-PUBLIC-KEY",
  BUCKET: "relatorios"
};
