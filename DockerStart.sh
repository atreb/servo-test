#!/bin/sh
if [ -z NEW_RELIC_APP_NAME -a -z NEW_RELIC_LICENSE_KEY ]; then echo "require('newrelic');\n"|cat -server.js > /tmp/out && mv /tmp/out server.js; fi &&\
if [ -z NEW_RELIC_APP_NAME -a -z NEW_RELIC_LICENSE_KEY ]; then echo "exports.config = {app_name:[$NEW_RELIC_APP_NAME], license_key:$NEW_RELIC_LICENSE_KEY, logging:{level:\'info\'}}" > newrelic.js; fi
/home/app/node_modules/pm2/bin/pm2 start --no-daemon -s pm2.config.js
