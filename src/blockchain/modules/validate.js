import Block from '../block';

// funcion que valida que la blockchain sea correcta

export default blockchain => {
  // Separamos el bloque genesis del resto
  const [genesisBlock, ...blocks] = blockchain;

  // El block genesis tiene que ser igua que el inicial que hemos diseñado para nuestra blockchain
  if (JSON.stringify(genesisBlock) !== JSON.stringify(Block.genesis))
    throw Error('Invalid Genesis block.');

  // iteramos el resto de blocks, quitado el genesis
  for (let i = 0; i < blocks.length; i += 1) {
    // obtenemos los atributos del bloque de la cadena que estamos iterando
    const { previousHash, timestamp, hash, data } = blocks[i];

    // Obtenemos de la cadena incial el bloque anterior
    const previousBlock = blockchain[i]; // como hemos quitado el genesis, en la otra el "i" marca el bloque anterior en la cadena original

    if (previousHash !== previousBlock.hash) throw Error('Invalid previous hash.');
    if (hash !== Block.hash(timestamp, previousHash, data)) throw Error('Invalid hash.');
  }

  return true;
};
