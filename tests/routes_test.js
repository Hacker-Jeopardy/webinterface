import { expect } from './test_helper';
import routes from '../src/routes';

describe('routes', () => {
  routes.map(route => {
    describe(route.title || 'unnamed', () => {
      it('has all atributes', () => {
        // TODO checks atributes
        //expect(route.title.length).to.('something');
      });
    });
  });
});
