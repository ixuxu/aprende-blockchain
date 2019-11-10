import Block from './block';
import validate from './modules/validate';

class Blockchain {
  // Constructor que inicializa el array de la cada de bloques (Blocks)
  constructor() {
    //Array de bloques, que debería contener el génesis
    this.blocks = [Block.genesis];
  }

  // Añadir un bloque a la cadena, se "mina"
  addBlock(data) {
    // Obtener el bloque anterior, siempre hay uno porque inicialmente esta el genésis
    const previousBlock = this.blocks[this.blocks.length - 1];

    //Generamos el bloque apartir del bloque anterior de la cadena y los datos
    const block = Block.mine(previousBlock, data);

    //Añadir el bloque a la cadena (array)
    this.blocks.push(block);

    //se devuelve el bloque
    return block;
  }

  // Blockchain correcta la que mas numeros de bloques tenga y sean todos correcto
  replace(newBlocks = []) {
    // Si la cadena de bloques para replazar es menor que la actual, no sirve, ya que la que tenemos es correcta y mas larga
    if (newBlocks.length < this.blocks.length)
      throw Error('Received chain is not longer than actual chain.');

    //Validamos la cadena recibida para reemplazar
    try {
      validate(newBlocks); //método validate construido
    } catch (error) {
      throw Error('Received chain is not valid.'); //si hay error no es válida
    }

    //Si llegamos aqui es correcta reemplazamos la cadena
    this.blocks = newBlocks;

    return this.blocks;
  }
}

// Validadores de la cadena
// * lengthValidador: hay que quedarse con la cadena mas larga siempre
// * hasValidador: confirmar que la integridad es correcta, la hash se contruye a partir de los datos del bloque.
//   calculando de nuevo el hash se puede establecer que la integridad de la cadena es correcta
// las creamos en una función.

export default Blockchain;
