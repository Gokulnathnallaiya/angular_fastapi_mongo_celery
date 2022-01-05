FROM node:latest AS build-stage

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY ./ /app/

ARG configuration=production

RUN npm run build --prod --output-path=./dist/ang-frontend

#stage 2

FROM nginx:1.15.8-alpine

COPY --from=build-stage /app/dist/ang-frontend/ /usr/share/nginx/html

 