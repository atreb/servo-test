FROM amazonlinux:latest

MAINTAINER "bhupendra.atre@dowjones.com"

RUN curl -L https://git.io/n-install | bash &&\
    n 6 &&\
    npm config set loglevel error &&\
    npm config set progress false &&\
    npm install -g forever n &&\

WORKDIR /home/app
COPY . /home/app

ENTRYPOINT ["forever", "server.js"]
