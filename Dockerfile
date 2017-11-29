FROM amazonlinux:latest

MAINTAINER "bhupendra.atre@dowjones.com"

#install lts node repo
#install lts node & development tools to build native addons
#yum cleanup
#install global packages
#set npm registry to use
RUN curl --silent --location https://rpm.nodesource.com/setup_8.x | bash - &&\
    yum install nodejs gcc-c++ make -y &&\
    yum clean all &&\
    npm install -g n forever &&\
    npm config set registry http://production.npmserver.oregon.onservo.com/ &&\
    curl -o /usr/bin/jq https://github.com/stedolan/jq/releases/download/jq-1.5/jq-linux64 &&\
    chmod +x /usr/bin/jq

#switch node version using n
RUN n cat package.json | jq '.engines.node'

#copy node app code
WORKDIR /home/app
COPY . /home/app

#prep node app
RUN npm install --unsafe-perm &&\
    npm test &&\
    npm prune --production &&\
    npm cache clean

ENTRYPOINT ["forever", "server.js"]
