FROM node:lts-iron as dev

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:lts-iron as prod

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app

COPY package*.json ./

RUN npm install --production

COPY . .

COPY --from=dev /usr/src/dist ./dist

CMD ["node", "dist/main"]