import cookieParser from 'cookie-parser';
import express from 'express';
import { connect } from 'mongoose';
import morgan from 'morgan';
import path from 'path';

import { DB } from './config/secret';
import routes from './routes';

const app = express();
const jsonSpacesValue = 2;

app.set('json spaces', jsonSpacesValue);

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

connect(
  DB,
  { useNewUrlParser: true },
  (err): void => {
    if (err) {
      throw err;
    }
  },
);

export default app;
