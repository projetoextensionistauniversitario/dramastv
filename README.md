DRAMATV — STARTER PARA COLOCAR ONLINE

1) Requisitos: Node.js 18+.
2) Entre nesta pasta no terminal.
3) Rode: npm install
4) Rode: npm start
5) Abra: http://localhost:3000

O frontend já está pronto para receber catálogo, busca, planos e login.
O arquivo supabase/schema.sql cria a base inicial para:
- usuários/perfis
- títulos
- episódios
- favoritos
- assinaturas

IMPORTANTE:
Este pacote NÃO contém credenciais, banco real, gateway de pagamento ou vídeos protegidos.
Para produção, conecte Supabase (Auth + Database + Storage) e um gateway de pagamento
compatível com Pix. Não coloque chaves secretas no JavaScript do navegador.

Também é necessário usar somente vídeos/capas para os quais você tenha autorização de distribuição.
