import express from 'express';
import { MongoConnection } from './Database/MongoConnection';
import { URLController } from './controller/URLController';

const api = express();
api.use(express.json());

const database = new MongoConnection();
database.connect();

const urlController = new URLController();

api.post('/shorten', urlController.shorten);
api.get('/:hash', urlController.redirect);

api.listen(3000, () => {
  console.log('servidor rodando....');
});
