# Simple S3 Client for Node.js


A dead-simple node.js module for Amazon S3.


### How to use

```javascript
var client = createClient({
  accessKeyId: 'XXXXXXXXXXXXXXXXXXXX',
  secretAccessKey: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
  region: 'eu-west-1'
});


client.upload('./hello-world.txt', {
  bucket: 'mydocuments',
  objectKey: 'txt/hello-world.txt',
  acl: 'public-read',
  contentType: 'text/plain'
}).then(function () {
}).done();
```

### LICENCE

MIT
