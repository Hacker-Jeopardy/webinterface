import { expect } from './test_helper';
import routes from '../src/routes';

describe('routes', () => {
  it('has one root route', () => {
    let rootRoute = [];
    routes.map(route => {
      if (route.path === '/')
        rootRoute.push(route);
    });

    expect(rootRoute.length).to.equal(1);
  });

  routes.map(route => {
    describe(`${route.path} (${route.title})`, () => {
      it('has a path', () => {
        expect(route.path).to.be.a('string');
        expect(route.path).not.to.be.empty;
      });

      it('has a title', () => {
        expect(route.title).to.be.a('string');
        expect(route.title).not.to.be.empty;
      });

      it('has a component', () => {
        expect(route.component).to.be.a('function');
      });
    });
  });
});
