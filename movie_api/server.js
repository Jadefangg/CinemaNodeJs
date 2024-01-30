const http = require('http');
const url = require('url');
//const fs = require('fs');

http.createServer((request, response) => {
  const path = url.parse(request.url).pathname;
  response.writeHead(200, {'Content-Type': 'text/plain'});
  response.end('Hello Node!\n');
}).listen(8080);

console.log('My first Node test server is running on Port 8080.');

/*fs.readFile('input.txt', (err, data) => {
  if (err) {
    throw err;
  }
  console.log('File content: ' + data.toString());
});*/

const fs = require('fs');


const fileName = `log_${timestamp}.txt`; //the timestamp data providing code - has to be in backticks!

//1. The file to which data has to be appended 
//2. the data -'timestamp'
//3. New-line and error callback to detect any errors.
fs.appendFile(fileName, timestamp + '\n', function (err) { 
if (err) throw err;
console.log('Saved!');
});