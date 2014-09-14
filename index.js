'use strict';


var Client = require('./client');



function createClient(options)
{
  return new Client(options);
}


module.exports.createClient = createClient;
