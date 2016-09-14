import React from 'react';
import { renderComponent, expect } from '../test_helper';
import { Link } from 'react-router';
import routes from '../../src/routes';
import Nav from '../../src/containers/nav';

describe('<Nav />', () => {
  let component;
  const title = 'Title';

  beforeEach(() => {
    component = renderComponent(Nav, null, { title: title });
  });

  it('contains the page title from supplied state', () => {
    expect(component.find('.navbar-brand').text()).to.equal(title);
  });

  it('renders <Link> elements for all routes', () => {
    expect(component.find(Link)).to.have.length(routes.length);
  });

});
