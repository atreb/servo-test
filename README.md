#servo-test

Simple application to test on servo 2

- To use specific node version add it in package.json under the node engines attributes
- To override the default nginx 504 and 502 response pages, add corresponding 504.html and 502.html under nginx folder in the root of your app repo.
- The node app runs as user app. Feel free to have script like font installation as part of scripts under package.json if needed instead of backing an ami
