import express from 'express';

const app = express();

// Index page
app.get('/', function(req, res){
   res.sendFile(__dirname + '/public/index.html');
});

// Public files
app.use(express.static('public'));

// Start server
const server = app.listen(80, () => {
   console.log('Listening on port 80');
});