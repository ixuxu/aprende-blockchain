import { SHA256 } from 'crypto-js';
class Block {
  // Esta es la clase que genera el bloque 0, que es  especial porque no tiene antecesor en la cadena de bloques
  static get genesis() {
    // Ponemos un timestamp  especial
    const timestamp = new Date(2000, 0, 1).getTime();

    return new this(timestamp, undefined, 'g3n3s1s-h4sh', 'I like rame.');
  }

  static mine(previusBlock, data) {
    const timestamp = Date.now();
    const { hash: previusHash } = previusBlock;
    const hash = Block.hash(timestamp, previusHash, data);

    return new this(timestamp, previusHash, hash, data);
  }

  static hash(timestamp, previusHash, data) {
    return SHA256(`${timestamp}${previusHash}${data}`).toString();
  }

  constructor(timestamp, previusHash, hash, data) {
    this.timestamp = timestamp;
    this.previusHash = previusHash;
    this.hash = hash;
    this.data = data;
  }

  toString() {
    const { timestamp, previusHash, hash, data } = this;

    return `Block -
        timestamp   :${timestamp}
        previusHash :${previusHash}
        hash        :${hash}
        data        :${data}
        `;
  }
}

export default Block;
