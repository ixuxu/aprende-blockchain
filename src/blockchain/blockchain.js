import Block from './block';

class Blockchain {
  // Constructor que inicializa el array de la cada de bloques (Blocks)
  constructor() {
    //Array de bloques, que debería contener el génesis
    this.blocks = [Block.genesis];
  }

  // Añadir un bloque a la cadena.
  addBlock(data) {
    // Obtener el bloque anterior, siempre hay uno porque inicialmente esta el genésis
    const previousBlock = this.blocks[this.blocks.length - 1];

    //Generamos el bloque apartir del bloque anterior de la cadena y los datos
    const block = Block.mine(previousBlock, data);

    //Añadir el bloque a la cadena
    this.blocks.push(block);

    //se devuelve el bloque
    return block;
  }
}

export default Blockchain;
