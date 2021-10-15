import util from '@/utils/helloWorldUtil';

describe('helloWorldUtil', () => {
  it('Greet you', () => {
    const msg = 'Jest';
    expect(util(msg)).toMatch(`Hello World ${msg}!`);
  });
});
