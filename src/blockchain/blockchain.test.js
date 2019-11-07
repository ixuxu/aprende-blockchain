import Blockchain from './blockchain';
import Block from './block';

describe('Blockchain', () => {
  let blockchain;

  beforeEach(() => {
    blockchain = new Blockchain();
  });

  it('Toda blockchain tiene un genesis block', () => {
    const [genesisiBlock] = blockchain.blocks;

    expect(genesisiBlock).toEqual(Block.genesis);
    expect(blockchain.blocks.length).toEqual(1);
  });
});
