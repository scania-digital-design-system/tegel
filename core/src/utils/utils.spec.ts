import { demoFormat } from './utils';

describe('format', () => {
  it('returns empty string for no names defined', () => {
    expect(demoFormat(undefined, undefined, undefined)).toEqual('');
  });

  it('formats just first names', () => {
    expect(demoFormat('Joseph', undefined, undefined)).toEqual('Joseph');
  });

  it('formats first and last names', () => {
    expect(demoFormat('Joseph', undefined, 'Publique')).toEqual('Joseph Publique');
  });

  it('formats first, middle and last names', () => {
    expect(demoFormat('Joseph', 'Quincy', 'Publique')).toEqual('Joseph Quincy Publique');
  });
});
