import Admin from './components/admin';
import Connect from './containers/connect';
import Player from './components/player';

export default [
  { path: '/', title: 'Connect to server', component: Connect },
  { path: '/admin', title: 'Admin', component: Admin },
  { path: '/player', title: 'Player', component: Player },
];
