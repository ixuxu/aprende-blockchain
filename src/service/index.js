import express from 'express';

// body parser es un middleware que  serializa las peticiones y obtiene el body de una forma mas "usable"
import bodyParser from 'body-parser';

import Blockchain from '../blockchain/blockchain';
import Block from '../blockchain/block';

// Si en el enviroment no esta el HTTP_PORT, usaremos el 3000 por defecto
const { HTTP_PORT = 3000 } = process.env;

const app = express();
const blockchain = new Blockchain();

blockchain.addBlock('express');

// obtener los bloques de la cadena
app.get('/blocks', (req, res) => {
  res.json(blockchain.blocks);
});

// minar un nuevo bloque
app.post('/mine', (req, res) => {
  const {
    body: { data }
  } = req;
  const block = blockchain.addBlock(data);

  res.json({
    blocks: blockchain.blocks.length,
    block
  });
});

app.use(bodyParser.json());

app.listen(HTTP_PORT, () => {
  console.log(`Service HTTP:${HTTP_PORT} listening...`);
});
