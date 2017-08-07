FROM centos:latest

MAINTAINER "bhupendra.atre@dowjones.com"

WORKDIR /home/app
COPY . /home/app

RUN curl --silent --location https://rpm.nodesource.com/setup_6.x | bash - &&\
  yum -y -q install nodejs &&\
  npm config set loglevel error &&\
  npm config set progress false &&\
  npm install -g forever n &&\
  n latest &&\
  npm install

ENTRYPOINT ["forever", "server.js"]
