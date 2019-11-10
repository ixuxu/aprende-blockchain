import Blockchain from '../blockchain';
import Block from '../block';
import validate from './validate';

describe('validate()', () => {
  let blockchain;

  beforeEach(() => {
    blockchain = new Blockchain();
  });

  it('validar una cadena correcta', () => {
    blockchain.addBlock('bl4ck-1');
    blockchain.addBlock('bl4ck-2');

    expect(validate(blockchain.blocks)).toBe(true);
  });

  it('Invalidates a chain with a corrupt genesis block', () => {
    blockchain.blocks[0].data = 'b4d d4t4';

    expect(() => {
      validate(blockchain.blocks);
    }).toThrowError('Invalid Genesis block.');
  });

  it('invalidate a chain with a corrupt previuoushast within a block', () => {
    blockchain.addBlock('bl4ck-1');
    blockchain.blocks[1].previousHash = 'h4ck';
    expect(() => {
      validate(blockchain.blocks);
    }).toThrowError('Invalid previous hash.');
  });

  it('invalidate a chain with a corrupt previuoushast within a block', () => {
    blockchain.addBlock('bl4ck-1');
    blockchain.blocks[1].hash = 'h4ck';
    expect(() => {
      validate(blockchain.blocks);
    }).toThrowError('Invalid hash.');
  });
});
