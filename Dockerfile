FROM alpine:latest

MAINTAINER "bhupendra.atre@dowjones.com"

WORKDIR /home/app
COPY . /home/app

RUN apk update
RUN apk upgrade
RUN apk add nodejs
RUN rm -rf /var/cache/apk/*
RUN npm install -g n
RUN npm install -g forever
RUN npm install
RUN npm cache clean

ENTRYPOINT ["forever", "server.js"]
