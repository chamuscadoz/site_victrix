// config.js — configuração pública do Supabase para a área logada Aeterna.
//
// A ANON KEY é PÚBLICA por design — pode ir para o front-end e ser commitada.
// Quem garante a segregação dos dados é a Row-Level Security (RLS) no Supabase.
// NUNCA coloque aqui a "service_role" key.
//
// >>> SUBSTITUA os dois valores abaixo pelos do seu projeto Supabase
//     (Project Settings > API) e faça commit deste arquivo. <<<
window.VICTRIX_CONFIG = {
  SUPABASE_URL: "https://wimaytzxaxlcfudfrmlm.supabase.co",
  SUPABASE_ANON_KEY: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndpbWF5dHp4YXhsY2Z1ZGZybWxtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODMwOTA2MzMsImV4cCI6MjA5ODY2NjYzM30.b0QhmjnIyW83XPVmf0TzGGJuw-4nHFEPnSC8n8Gq4dg",
  BUCKET: "relatorios"
};
