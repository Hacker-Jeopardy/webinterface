import { expect } from './test_helper';
import app from '../src/app';

describe('app', () => {
  it('is a function', () => {
    expect(app).to.be.a('function');
  });

});
