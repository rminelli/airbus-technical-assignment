FROM node:18-alpine

ENV HOME /home/node/backend

WORKDIR ${HOME}

COPY . .

RUN npm i -g @nestjs/cli
RUN npm install
RUN npm run test
RUN npm run build

