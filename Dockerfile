FROM node:latest

WORKDIR /server

COPY . .

RUN npm i \
&& chmod a+x scripts/run.sh

EXPOSE 53342

CMD scripts/run.sh