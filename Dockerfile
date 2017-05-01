FROM alpine:latest

MAINTAINER "bhupendra.atre@dowjones.com"

WORKDIR /home/app
COPY . /home/app

RUN apk update &&\
  apk upgrade &&\
  apk add nodejs &&\
  rm -rf /var/cache/apk/* &&\
  npm config set loglevel error &&\
  npm install -g forever &&\
  npm install &&\
  npm cache clean

ENTRYPOINT ["forever", "server.js"]
