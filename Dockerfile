FROM node:20-slim AS builder
COPY package.json yarn.lock ./

RUN yarn install --ignore-scripts

COPY . ./

RUN yarn build

FROM node:20-slim AS installer
COPY package.json yarn.lock ./

RUN yarn install --prod --ignore-scripts

FROM node:20-slim

ARG PORT=3000

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY --from=builder dist /usr/src/app/dist
COPY --from=builder data /usr/src/app/data
COPY --from=installer node_modules /usr/src/app/node_modules

COPY package.json ./

EXPOSE $PORT

CMD [ "node", "dist/main.js" ]