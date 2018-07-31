#servo-test

Simple application to test on servo 2

- To use specific node version add it in package.json under the node engines attributes
- To override the default nginx 504 and 502 response pages, add corresponding 504.html and 502.html under nginx folder in the root of your app repo.
- use SERVO_S3_BUCKET and SERVO_S3_KEY_PREFIX environment variable to perform s3 operations

nodejs
