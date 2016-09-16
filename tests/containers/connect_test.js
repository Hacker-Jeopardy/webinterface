import { renderComponent, setValue, expect } from '../test_helper';
import Connect from '../../src/containers/connect';
import { CONNECT } from '../../src/actions/types';

describe('<Connect />', () => {
  let component;
  const host = 'host', port = 1234, ssl = true;
  const server = { host, port, ssl };
  const config = { server };

  beforeEach(() => {
    component = renderComponent(Connect, {}, { config: { server: {} } });
  });

  it(`has a form`, () => {
    expect(component.find('form')).to.exist;
  });

  ['host', 'port', 'ssl'].map(key => {
    describe(key, () => {
      let input;

      beforeEach(() => {
        input = component.find(`input[name="${key}"]`);
      });

      it(`has an input`, () => {
        expect(input).to.exist;
      });

      it(`has an empty value`, () => {
        expect(input.prop('value')).to.be.empty;
      });

      it(`has the value set in config`, () => {
        component = renderComponent(Connect, {}, { config });
        input = component.find(`input[name="${key}"]`);
        expect(input.prop('value')).to.equal(server[key]);
      });

      it(`accepts input`, () => {
        setValue(input, server[key]);
        expect(input.prop('value')).to.equal(server[key]);
      });
    });
  });

  describe('submit', () => {
    let form;
    let submitted, data;
    const logger = (action, getState) => {
      if(action.type == CONNECT) {
        submitted = true;
        data = action.payload;
      }
    };

    beforeEach(() => {
      component = renderComponent(Connect, { }, { config }, logger);
      form = component.find('form');
      submitted = false;
      data = null;
    });

    it('has a submit button', () => {
      expect(component.find('button[type="submit"]')).to.exist;
    });

    it('fires CONNECT on form submit', () => {
      form.simulate('submit');
      expect(submitted).to.equal(true);
    });

    it('fires CONNECT with correct values', () => {
      form.simulate('submit');
      expect(data).to.eql(server);
    });

    describe('validation', () => {
      ['host', 'port'].map(key => {
        it(`doesn't submit when ${key} is empty`, () => {
          setValue(component.find(`input[name="${key}"]`), '');
          form.simulate('submit');
          expect(submitted).to.equals(false);
        });
      });
    });
  });
});
