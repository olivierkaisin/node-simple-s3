'use strict';



var Promise = require('bluebird');
var aws = require('aws-sdk');
var _ = require('lodash');
var fs = require('fs');
var https = require('https');
var util = require('util');


Promise.promisifyAll(fs);



function promisify(client, fnName)
{
  return function () {
    var args = _.values(arguments);

    var def = Promise.defer();
    args.push(def.callback);

    client[fnName].apply(client, args);

    return def.promise;
  };
}


function getObjectUrl(bucket, objectKey)
{
  return util.format('https://%s.s3.amazonaws.com/%s', bucket, objectKey);
}




function Client (options) 
{
  var client = new aws.S3({
    apiVersion: '2006-03-01',
    
    accessKeyId: options.accessKeyId,
    secretAccessKey: options.secretAccessKey,
    region: options.region,

    httpOptions: {
      agent: new https.Agent({
        maxSockets: options.httpsMaxSockets || 16
      })
    }
  });

  this.putObject = promisify(client, 'putObject');
}



Client.prototype.upload = function (filePath, options)
{
  var bucket = options.bucket;
  var objectKey = options.objectKey;

  if (!_.isString(bucket)) {
    throw new TypeError('"options.bucket" must be a string');
  }
  if (!_.isString(objectKey)) {
    throw new TypeError('"options.bucket" must be a string');
  }

  var self = this;

  return fs.readFileAsync(filePath).then(function (data) {
    return self.putObject({
      Bucket: bucket,
      Key: objectKey,
      Body: data,
      ACL: options.acl,
      ContentType: options.contentType
    });
  }).then(function () {
    return {
      url: getObjectUrl(bucket, objectKey)
    };
  });
};



module.exports = Client;
