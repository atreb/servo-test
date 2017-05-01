FROM centos:latest

MAINTAINER "bhupendra.atre@dowjones.com"

WORKDIR /home/app
COPY . /home/app

RUN curl --silent --location https://rpm.nodesource.com/setup_6.x | bash - &&\
  yum -y -q install nodejs which &&\
  npm config set loglevel error &&\
  npm config set progress false &&\
  npm install -g forever n &&\
  n latest &&\
  npm cache clean &&\
  npm install &&\
  npm cache clean

ENTRYPOINT ["forever", "server.js"]
