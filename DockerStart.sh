#!/bin/sh
if [ -n "$NEW_RELIC_APP_NAME" -a -n "$NEW_RELIC_LICENSE_KEY" ]
then 
  sed -i "s|env node|env node\\nrequire('newrelic');\\n|" server.js;
  echo "exports.config = {app_name:['$NEW_RELIC_APP_NAME'], license_key:'$NEW_RELIC_LICENSE_KEY', logging:{level:'info'}}" > newrelic.js;
else
  echo "skipping newrelic";
fi &&\
/home/app/node_modules/pm2/bin/pm2 start --no-daemon -s pm2.config.js
