const next = require('next');
const express = require('express');
const { default: Axios } = require('axios');
const cookieParser = require('cookie-parser');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const port = process.env.PORT || 3000;
const handle = app.getRequestHandler();

const AUTH_USER_TYPE = 'authenticated';
const COOKIE_SECRET = 'kjkn43fsfnkjn23fewflk';
const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: !dev,
  signed: true,
};

const auth = async (email, password) => {
  const { data } = await Axios.get('http://jsonplaceholder.typicode.com/users');
  return data.find((user) => {
    if (user.email === email && user.website === password) {
      return user;
    }
  });
};

app.prepare().then(() => {
  const server = express();

  server.use(express.json());
  server.use(cookieParser(COOKIE_SECRET));

  server.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await auth(email, password);
    if (!user) {
      return res.status(403).send('Email or password is invalid');
    }

    const userData = {
      name: user.name,
      email: user.email,
      type: AUTH_USER_TYPE,
    };

    res.cookie('token', userData, COOKIE_OPTIONS);
    res.json(userData);
  });

  server.post('/api/logout', async (_, res) => {
    res.clearCookie('token', COOKIE_OPTIONS);
    res.sendStatus(204);
  });

  server.get('/api/profile', async (req, res) => {
    const { signedCookies = {} } = req;
    const { token } = signedCookies;
    if (token && token.email) {
      const { data } = await Axios.get('http://jsonplaceholder.typicode.com/users');
      const userData = data.find((user) => user.email === token.email);
      return res.json({ user: userData });
    }
    res.sendStatus(404);
  });

  server.get('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`Listening on port ${port}`);
  });
});
