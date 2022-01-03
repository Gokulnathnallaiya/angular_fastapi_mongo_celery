FROM node:latest AS build-stage

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY ./ /app/

ARG configuration=production

RUN npm run build -- --output-path=./dist/out --configuration $configuration

#stage 2

FROM nginx:1.15.8-alpine

COPY --from=build-stage /app/dist/out/ /usr/share/nginx/html

 