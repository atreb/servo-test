FROM amazonlinux:latest

MAINTAINER "bhupendra.atre@dowjones.com"

#install splunk
#install lts node repo
#install lts node & development tools to build native addons
#yum cleanup
#install global packages
#set npm registry to use
RUN yum install bash
RUN curl -s -l https://s3.amazonaws.com/servo-utils/splunk-setup-dev.sh | bash -s pci &&\
    curl -s -l https://rpm.nodesource.com/setup_8.x | bash - &&\
    yum install nodejs gcc-c++ make -y &&\
    yum clean all &&\
    npm install -g forever &&\
    npm config set registry https://registry.npmjs.org/


#copy node app code
WORKDIR /home/app
COPY . /home/app

#prep node app
RUN npm install --unsafe-perm &&\
    npm test &&\
    npm prune --production &&\
    chmod +x ./entrypoint.sh

ENTRYPOINT ["./entrypoint.sh"]
