FROM node:lts-alpine

WORKDIR /usr/src/app
COPY package*.json ./

RUN npm install -g npm@latest
RUN npm install

EXPOSE 3000