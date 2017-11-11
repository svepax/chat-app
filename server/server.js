const path = require('path');
var express = require('express');
var bodyParser = require('body-parser');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var app = express();

app.use(express.static(publicPath));

app.listen(port, () => {
    console.log(`Started on port ${port}`);
    console.log(publicPath);
});