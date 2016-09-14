import React from 'react';
import { renderComponent, expect } from '../test_helper';
import { Link } from 'react-router';
import routes from '../../src/routes';
import Nav from '../../src/containers/nav';

describe('<Nav />', () => {

  it('contains the page title from supplied state', () => {
    const wrapper = renderComponent(Nav, { title: 'Test' }, { title: 'Test' });
    expect(wrapper.find('.navbar-brand').text()).to.equal('Test');
  });

  it('renders <Link> elements for all routes', () => {
    const wrapper = renderComponent(Nav, { title: '' }, { title: '' });
    expect(wrapper.find(Link)).to.have.length(routes.length);
  });

});
