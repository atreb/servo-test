#servo-test

Simple application to test on servo using alpine node docker image

steps to run locally
```
docker build -t servo-test .
docker run -e "PORT=80" -p 4000:80 servo-test
```
Open browser to http://localhost:4000
