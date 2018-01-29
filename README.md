#servo-test

Simple dockerized nodejs application to test on servo 2

- let app run on port 80 since docker container is run with `docker run --restart=always --env-file=/home/app/envfile  -e PORT=80 -p 53840:80 -d app`
- all other env variables are passed into continer at run time
- ideally have one process on ENTRYPOINT so that the logs will flow into docker log on host

docker/amzn-nodejs-splunk-pci
using splunk-setup-dev.sh Jan 29, 2018 4:02:52
