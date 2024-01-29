FROM node:latest

WORKDIR /server

COPY . .

RUN npm i

EXPOSE 53342

CMD npm run start
