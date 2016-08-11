#!/bin/bash

#Run fc-cache in aws servo for app user
if [ "$USER" = "app" ] && [ -v "$AWS_REGION" ] && [ -v "$SERVO_COMMIT" ]; then
  /usr/bin/fc-cache
fi
