const color = require('colors');


/**
* Create middleware that reports information about the incoming http request
* Certain elements will be objects(body, etc), display the key value pairs
* Items to report iff they have value, use colors (an external module):
*                 method
*                 hostname
*                 ip
*                 body
*                 params
*                 protocol
*                 route
*                 path
*                 query
*/



module.exports = function (request, _response, next) {
  const keys = ['method', 'hostname', 'ip', 'body', 'params', 'path', 'protocol', 'route', 'query'];

  keys.forEach(key => {
    const data = request[key];

    if (data) {

      if (typeof data === 'object') {
        // do object things -- determine if obj has k/v pairs

        if (Object.keys(data).length) {
          console.log(color.magenta(`The request ${key} object has these properties: `));

          for (const [k, v] of Object.entries(data)) {
            console.log(color.red(`\t${k} => ${v}`));
          }
        }
      } else {
        console.log(color.cyan(`The request ${key} is ${data}`));
      }
    }
  });

  next();
};
