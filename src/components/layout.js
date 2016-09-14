import React from 'react';
import Nav from '../containers/nav';

import '../style/index.scss';

const Layout = ({ children }) => (
  <div>
    <Nav />
    <main id="content">{children}</main>
  </div>
);

Layout.displayName = 'Layout';
Layout.propTypes = {
  children: React.PropTypes.object,
};
Layout.defaultProps = {};

export default Layout;
