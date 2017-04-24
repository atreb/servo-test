var AWS = require('aws-sdk'),
  s3 = new AWS.S3(),
  bucket = process.env.SERVO_S3_BUCKET, //eg. servo-dj01-virginia
  prefix = process.env.SERVO_S3_KEY_PREFIX;//eg. data/appname/stackname/

module.exports = function (action, cb) {
  if (action === 'get') return get(cb);
  if (action === 'put') return put(cb);
  if (action === 'delete') return remove(cb);
  if (action === 'list') return list(cb);
}


function get(cb) {
  var params = {
    Bucket: bucket,
    Key: prefix + 'default.txt'
  };
  console.log('s3 get:', params);
  s3.getObject(params, cb);
}

function put(cb) {
  var params = {
    ACL: 'public-read',
    Body: new Date().toString(),
    Bucket: bucket,
    Key: prefix + 'default.txt'
  };
  console.log('s3 put:', params);
  s3.upload(params, cb);
}

function remove(cb) {
  var params = {
    Bucket: bucket,
    Key: prefix + 'default.txt'
  };
  console.log('s3 delete:', params);
  s3.deleteObject(params, cb);
}

function list(cb) {
  var params = {
    Bucket: bucket,
    Delimiter: '/',
    Prefix: prefix
  };
  console.log('s3 list:', params);
  s3.listObjects(params, cb);
}
