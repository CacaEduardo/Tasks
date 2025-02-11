# Usando uma imagem oficial do Node.js
FROM node:18

# Criar e acessar o diretório da aplicação
WORKDIR /app

# Copiar o package.json e yarn.lock para dentro do contêiner
COPY package.json yarn.lock ./

# Instalar as dependências com Yarn
RUN yarn install

# Copiar o código restante da aplicação para dentro do contêiner
COPY . .

# Rodar o build de produção do React (ou outro framework)
RUN yarn build

# Expor a porta que o front-end vai usar
EXPOSE 3000

# Comando para iniciar o servidor de desenvolvimento do front-end
CMD ["yarn", "start"]
