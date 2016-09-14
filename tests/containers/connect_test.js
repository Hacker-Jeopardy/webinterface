import { renderComponent, expect } from '../test_helper';
import Connect from '../../src/containers/connect';

describe('<Connect />', () => {
  let component;
  const host = 'host', port = 1234, ssl = true;
  const server = { host, port, ssl };
  const config = { server };

  beforeEach(() => {
    component = renderComponent(Connect, {}, { config });
  });

  it('renders something', () => {
    expect(component).to.exist;
  });

});
