# Imagem base
FROM node:18

# Diretório de trabalho dentro do container
WORKDIR /app

# Copiar os arquivos de dependências
COPY package*.json ./

# Instalar dependências
RUN npm install

# Copiar todo o código do frontend para o container
COPY . .

# Gerar a build do frontend (se necessário)
RUN npm run build

# Expõe a porta que o frontend irá rodar
EXPOSE 3000

# Comando para rodar o servidor do frontend
CMD ["npm", "start"]
