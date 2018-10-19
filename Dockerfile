FROM mhart/alpine-node:8
WORKDIR /home/app
COPY package.json package-lock.json ./
RUN apk add --no-cache make gcc g++ python &&\
    npm config set registry https://npm.onservo.com &&\
    npm config set loglevel error &&\
    if [ "$(npm -v | cut -d '.' -f1)" -ge "5" -a -f package-lock.json ]; then npm ci; else npm i; fi &&\
    npm test &&\
    npm prune --production &&\
    npm i newrelic pm2

FROM alpine:latest
COPY --from=0 /usr/bin/node /usr/bin/
COPY --from=0 /usr/lib/libgcc* /usr/lib/libstdc* /usr/lib/
WORKDIR /home/app
COPY --from=0 /home/app .
COPY . .
RUN chmod +x ./DockerStart.sh

CMD ["./DockerStart.sh"]
