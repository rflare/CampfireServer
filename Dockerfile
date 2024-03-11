FROM node:21.7-bookworm-slim

WORKDIR /server

COPY . .

RUN npm i

EXPOSE ${SERVER_LOCAL_PORT}

CMD npm start
