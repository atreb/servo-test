var AWS = require('aws-sdk'),
  s3 = new AWS.S3(),
  fs = require('fs');

module.exports = function (action, cb) {
  if (action === 'get') return get(cb);
  if (action === 'put') return put(cb);
  if (action === 'delete') return remove(cb);
  if (action === 'list') return list(cb);
}


function get(cb) {
  s3.getObject({
    Bucket: process.env.SERVO_S3_BUCKET,
    Key: process.env.SERVO_S3_KEY_PREFIX + '/server.js'
  }, cb);
}

function put(cb) {
  s3.upload({
    ACL: 'public-read',
    Body: fs.createReadStream('./server.js'),
    Bucket: process.env.SERVO_S3_BUCKET,
    Key: process.env.SERVO_S3_KEY_PREFIX + '/server.js'
  }, cb);
}

function remove(cb) {
  s3.deleteObject({
    Bucket: process.env.SERVO_S3_BUCKET,
    Key: process.env.SERVO_S3_KEY_PREFIX + '/server.js'
  }, cb);
}

function list(cb) {
  s3.listObjects({
    Bucket: process.env.SERVO_S3_BUCKET,
    Delimiter: '/',
    Prefix: proces.env.SERVO_S3_KEY_PREFIX
  }, cb);
}
