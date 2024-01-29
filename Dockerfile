FROM node:latest

WORKDIR /server

COPY . .

RUN npm i

EXPOSE ${SERVER_LOCAL_PORT}

CMD npm run start
