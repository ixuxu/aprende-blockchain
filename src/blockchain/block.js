import { SHA256 } from 'crypto-js';
class Block {
  // Esta es la clase que genera el bloque 0, que es  especial porque no tiene antecesor en la cadena de bloques
  static get genesis() {
    // Ponemos un timestamp  especial
    const timestamp = new Date(2000, 0, 1).getTime();

    return new this(timestamp, undefined, 'g3n3s1s-h4sh', 'I like rame.');
  }

  static mine(previousBlock, data) {
    const timestamp = Date.now();
    const { hash: previousHash } = previousBlock;
    const hash = Block.hash(timestamp, previousHash, data);

    return new this(timestamp, previousHash, hash, data);
  }

  static hash(timestamp, previousHash, data) {
    return SHA256(`${timestamp}${previousHash}${data}`).toString();
  }

  constructor(timestamp, previousHash, hash, data) {
    this.timestamp = timestamp;
    this.previousHash = previousHash;
    this.hash = hash;
    this.data = data;
  }

  toString() {
    const { timestamp, previousHash, hash, data } = this;

    return `Block -
        timestamp   :${timestamp}
        previousHash :${previousHash}
        hash        :${hash}
        data        :${data}
        `;
  }
}

export default Block;
