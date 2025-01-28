# Usar uma imagem base do Node.js
FROM node:18

# Configurar o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copiar os arquivos de configuração
COPY package*.json ./

# Instalar as dependências
RUN npm install

# Copiar o restante do código
COPY . .

# Expor a porta do backend
EXPOSE 3000

# Comando para iniciar o servidor
CMD ["npm", "start"]
