#!/bin/bash

#start splunk
splunk

#start node app
forever -l /var/log/app/forever.log \
        -o /var/log/app/forever-out.log \
        -e /var/log/app/forever-err.log \
        -c node '--max-old-space-size=1000' \
        server.js
