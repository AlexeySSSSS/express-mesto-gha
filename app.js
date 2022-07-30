const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const { createUser, login } = require('./controllers/users');
const {
  checkingCreateUser,
  checkingLogin,
} = require('./middlewares/validations');
const auth = require('./middlewares/auth');
const errorHandler = require('./middlewares/errorHandler');
const routes = require('./routes');

const { PORT = 3000 } = process.env;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/signup', checkingCreateUser, createUser);
app.post('/signin', checkingLogin, login);

app.use(auth);
app.use(routes);
app.use(errors());
app.use(errorHandler);

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listen on ${PORT}`);
});
