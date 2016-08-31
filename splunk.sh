#!/bin/sh

if [ -z "$NEW_RELIC_APP_NAME" ] && [ -z "$AWS_REGION" ] && [ -z "$SERVO_COMMIT" ]; then
  echo "Environment does not seems to be servo. Skipping splunk setup!"
  exit 0
fi

SPLUNK_SERVER=splunk.services.dowjones.net:9000
SPLUNK_HOME=/home/app/splunk
SPLUNK_INPUTS=(
"/var/log/app/"     # Example directory [Use this for servo2 docker]
"/var/log/app.log" # Example file [This is for servo2 node log]
)

if [ ! -d "$SPLUNK_HOME" ]; then
	mkdir -p "$SPLUNK_HOME"
fi
wget -O splunkforwarder.tgz https://download.splunk.com/products/universalforwarder/releases/6.3.1/linux/splunkforwarder-6.3.1-f3e41e4b37b2-Linux-x86_64.tgz
tar -xf splunkforwarder.tgz --strip-components=1 -C $SPLUNK_HOME
rm -rf splunkforwarder.tgz
$SPLUNK_HOME/bin/splunk enable boot-start --accept-license --answer-yes --no-prompt

echo "[monitor://$SPLUNK_LOG_DIR]\ndisabled=false\nignoreOlderThan=1d\nrecursive=false" >> $SPLUNK_HOME/etc/system/local/inputs.conf
for MONITOR in ${SPLUNK_INPUTS[@]}; do
	printf "\n[monitor://$MONITOR]\ndisabled=false\nignoreOlderThan=1d\nrecursive=false\n" >> $SPLUNK_HOME/etc/system/local/inputs.conf
done
echo "[tcpout]\ndisabled=false\ndefaultGroup=main_group\n" >> $SPLUNK_HOME/etc/system/local/outputs.conf
echo "[tcpout:main_group]\nserver=$SPLUNK_SERVER\n">> $SPLUNK_HOME/etc/system/local/outputs.conf
echo "[tcpout-server://$SPLUNK_SERVER]\n" >> $SPLUNK_HOME/etc/system/local/outputs.conf

$SPLUNK_HOME/bin/splunk set servername "$NEW_RELIC_APP_NAME" -auth admin:changeme
$SPLUNK_HOME/bin/splunk set default-hostname "$HOSTNAME" -auth admin:changeme
$SPLUNK_HOME/bin/splunk start
