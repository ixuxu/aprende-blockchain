import Block from './block';

describe('Block', () => {
  let timestamp;
  let previousBlock;
  let data;
  let hash;

  beforeEach(() => {
    timestamp = new Date(2010, 0, 1);
    previousBlock = Block.genesis;
    data = 't3st d4t4';
    hash = 'h4s4';
  });

  it('crear una instancia con parametros', () => {
    const block = new Block(timestamp, previousBlock.hash, hash, data);

    console.log(previousBlock.hash);

    expect(block.timestamp).toEqual(timestamp);
    expect(block.previousHash).toEqual(previousBlock.hash);
    expect(block.data).toEqual(data);
    expect(block.hash).toEqual(hash);
  });

  it('Usar static mine()', () => {
    const block = Block.mine(previousBlock, data);

    expect(block.hash.length).toEqual(64);
    expect(block.previousHash).toEqual(previousBlock.hash);
    expect(block.data).toEqual(data);
  });

  it('Usar static hash()', () => {
    hash = Block.hash(timestamp, previousBlock.hash, data);
    const hashOutput = 'cb060044f43d08e1405128c0d2f33657859c44d8498266f2d99e2823066fd61b';

    expect(hash).toEqual(hashOutput);
  });

  it('Usar toString()', () => {
    const block = Block.mine(previousBlock.hash, data);

    expect(typeof block.toString()).toEqual('string');
  });
});
