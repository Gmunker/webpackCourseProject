const express = require('express');
const path = require('path');
const app = express();

// Server Routess....
app.get('/hello', (req, res) => res.send({hi:'there'}));

if (process.env.NODE_ENV !== 'production') {
  const webpackMiddleWare = require('webpack-dev-middleware');
  const webpack = require('webpack');
  const webpackConfig = require('./webpack.config.js');

  app.use(webpackMiddleWare(webpack(webpackConfig)));  
} else {
  app.use(express.static('dist'));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
  });
}

app.listen(process.env.PORT || 3050, () => {
  let port = "";
  if (process.env.PORT) {
    port = JSON.stringify(process.env.PORT);
  } else {
    port = "3050"
  }
  console.log(`Express Server running on port:${port}`)
});



