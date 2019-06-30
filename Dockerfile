FROM node:10-slim

WORKDIR /usr/src/app

COPY ./package*.json ./
COPY ./build ./build

RUN npm i --production

CMD [ "npm", "run", "production" ]
