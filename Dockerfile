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
    npm config set registry https://registry.npmjs.org/

#switch node version using n
RUN n 6

#copy node app code
WORKDIR /home/app
COPY . /home/app

#prep node app
RUN npm install --unsafe-perm &&\
    npm test &&\
    npm prune --production &&\
    npm cache clean

ENTRYPOINT ["forever", "server.js"]
