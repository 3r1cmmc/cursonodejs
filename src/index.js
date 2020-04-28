const express = require('express');

const { info, error } = require('./modules/my-log');
const { countries, languages } = require('countries-list');

const app = express();

app.get('/', (request, response) => {
  response.status(200).send('Hello');
});

app.get('/info', (request, response) => {
  info('Hola info');
  response.send('Info nodemon');
});

app.get('/country', (request, response) => {
  console.log('Country query: ', request.query);
  response.json(countries[request.query.code]);
});

app.get('/languages/:lang', (request, response) => {
  console.log('Request params: ', request.params);
  const lang = languages[request.params.lang];
  if (lang) {
    response.json({ status: 'Ok', Data: lang });
  } else {
    response.status(404).json({
      status: 'NOT FOUND',
      message: `language ${request.params.lang} not found`
    });
  }
});

app.get('*', (request, response) => {
  error('Error');
  response.status(404).send('NOT FOUND');
});

app.listen(4000, () => {
  console.log('Runing on 4000');
});
