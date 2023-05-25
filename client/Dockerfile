FROM node:18-alpine

WORKDIR /usr/src/app/client

COPY package*.json /

EXPOSE 3000

RUN npm install

COPY . /