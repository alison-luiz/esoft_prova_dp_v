FROM node:20-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --legacy-peer-deps

COPY . .

RUN cp .env.example .env

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start:prod"]
