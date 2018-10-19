FROM mhart/alpine-node:8

WORKDIR /home/app

COPY . .

RUN apk add --no-cache make gcc g++ python &&\
    npm config set registry https://npm.onservo.com &&\
    npm config set loglevel error &&\
    npm i -g pm2 &&\
    if [ "$(npm -v | cut -d '.' -f1)" -ge "5" -a -f package-lock.json ]; then npm ci; else npm i; fi &&\
    npm i newrelic &&\
    chmod +x ./DockerCMD

CMD ["./DockerCMD"]
