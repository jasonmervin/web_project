const http = require('http');
const url = require('url');
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const querystring = require('querystring');
const fs = require('fs');


// Create HTTP server and listen on port 8000 for requests
http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/') {
    fs.readFile('login.html', function(err, data) {
      if (err) {
        res.writeHead(404);
        res.end(JSON.stringify(err));
        return;
      }
      res.writeHead(200);
      res.end(data);
    });
  } else if (req.method === 'POST' && req.url === '/login') {
    // ... rest of your code ...
  } else {
    res.end('Invalid request');
  }
}).listen(8090);

console.log('Server running at http://127.0.0.1:8090/');


// Create HTTP server and listen on port 8000 for requests
http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/') {
    fs.readFile('signup.html', function(err, data) {
      if (err) {
        res.writeHead(404);
        res.end(JSON.stringify(err));
        return;
      }
      res.writeHead(200);
      res.end(data);
    });
  } else if (req.method === 'POST' && req.url === '/signup') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      const parsedBody = querystring.parse(body);
      const username = parsedBody.name;
      const password = parsedBody.password;

      // Use connect method to connect to the server
      MongoClient.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true }, function(err, client) {
        if(err) {
          console.log('Error occurred while connecting to MongoDB Atlas...\n',err);
        }
        console.log('Connected...');
        const db = client.db(dbName);

        // perform actions on the collection object
        const collection = db.collection('userlogin');
        collection.insertOne({ name: username, password: password }, function(err, result) {
          if (err) throw err;
          res.end('Signup successful');
          client.close();
        });
      });
    });
  } else {
    res.end('Invalid request');
  }
}).listen(8090);

console.log('Server running at http://127.0.0.1:8090/');
