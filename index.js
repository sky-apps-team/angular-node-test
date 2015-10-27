import express from 'express';

let app = express();

app.set('port', (process.env.PORT || 3000));

app.get('/echo/:name', (req, res, next) => {
  res.send(req.params);
  return next();
});

let port = app.get('port');
app.listen(port, (err) => {
  if (err) {
    console.log('ERROR on startup', err);
    process.exit(0);
  }
  console.log('Listening on port ' + port);
});
