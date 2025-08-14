#!/bin/bash

# CONFIGS
USER=root
HOST=82.25.70.142
DEST=/var/www/admin-psi/frontend

# 1. Build do projeto
echo "🔧 Buildando o projeto..."
npm run build || { echo "❌ Build falhou"; exit 1; }

# 2. Acesso SSH e limpeza antiga (opcional)
echo "🧹 Limpando destino remoto..."
ssh $USER@$HOST "rm -rf $DEST/*"

# 3. Copiar novos arquivos
echo "📦 Enviando arquivos para produção..."
scp -r dist/* $USER@$HOST:$DEST/

# 4. Reiniciar nginx (caso queira forçar reload)
echo "🔁 Reiniciando NGINX..."
ssh $USER@$HOST "sudo systemctl restart nginx"

echo "✅ Deploy concluído com sucesso."
