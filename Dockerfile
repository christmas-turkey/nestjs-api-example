FROM node

WORKDIR /app

COPY package*.json ./

RUN yarn install

COPY . .

EXPOSE 5201

CMD ["yarn", "start:dev"]