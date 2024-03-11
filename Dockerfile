FROM node:alpine

WORKDIR /server

COPY . .

RUN npm i

EXPOSE ${SERVER_LOCAL_PORT}

CMD npm start
