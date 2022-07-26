FROM node:16

ENV HOME /home/node/backend

WORKDIR ${HOME}

COPY . .

RUN npm install
RUN npm run test
RUN npm run build

