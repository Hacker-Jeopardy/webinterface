import { renderComponent, setValue, expect } from '../test_helper';
import Connect from '../../src/containers/connect';

describe('<Connect />', () => {
  let component;
  const host = 'host', port = 1234, ssl = true;
  const server = { host, port, ssl };
  const config = { server };

  beforeEach(() => {
    component = renderComponent(Connect);
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
        expect(input.prop('value')).to.equal(server[key]);
      });

      it(`accepts input`, () => {
        setValue(input, server[key]);
        expect(input.prop('value')).to.equal(server[key]);
      });
    });
  });

  describe('submit', () => {
    let submit;
    let submitted = false, data = null;
    const connect = (host, port, ssl) => {
      submitted = true;
      data = { host, port, ssl };
    };

    beforeEach(() => {
      component = renderComponent(Connect, { connect }, { config });
      submit = component.find('button[type="submit"]');
      submitted = false;
      data = null;
    });

    it('has a submit button', () => {
      expect(submit).to.exist;
    });

    it('fires connect on form submit', () => {
      submit.simulate('click');
      expect(submitted).to.equal(true);
    });

    it('fires connect with correct values', () => {
      submit.simulate('click');
      expect(data).to.eql(server);
    });

    describe('validation', () => {
      ['host', 'port'].map(key => {
        it(`doesn't submit when ${key} is empty`, () => {
          setValue(component.find(`input[name="${key}"]`), '');
          submit.simulate('click');
          expect(submitted).to.equals(false);
        });
      });
    });
  });
});
