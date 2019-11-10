import Blockchain from './blockchain';
import Block from './block';
import { Exception } from 'handlebars';

describe('Blockchain', () => {
  let blockchain;
  let blockchainB;

  beforeEach(() => {
    blockchain = new Blockchain();
    blockchainB = new Blockchain();
  });

  it('Toda blockchain tiene un genesis block', () => {
    const [genesisiBlock] = blockchain.blocks;

    expect(genesisiBlock).toEqual(Block.genesis);
    expect(blockchain.blocks.length).toEqual(1);
  });

  it('Usando un addBlock()', () => {
    const data = 'd4t4';
    blockchain.addBlock(data);

    const [, lastBlock] = blockchain.blocks;
    expect(lastBlock.data).toEqual(data);
    expect(blockchain.blocks.length).toEqual(2);
  });

  it('replace the chain with a valid chain', () => {
    blockchainB.addBlock('bl4ck-1');

    blockchain.replace(blockchainB.blocks);

    expect(blockchain.blocks).toEqual(blockchainB.blocks);
  });

  it('does not repace the chain with one with less blocks', () => {
    blockchain.addBlock('block-1');
    expect(() => {
      blockchain.replace(blockchainB.blocks);
    }).toThrowError('Received chain is not longer than actual chain.');
  });

  it('not replace chain with is not valid chain', () => {
    blockchainB.addBlock('block-1');
    blockchainB.blocks[1].data = 'bloack-h4ck';

    expect(() => {
      blockchain.replace(blockchainB.blocks);
    }).toThrowError();
  });
});
