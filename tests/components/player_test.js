import { renderComponent, expect } from '../test_helper';
import Player from '../../src/components/player';

describe('<Player />', () => {
    let component;

    beforeEach(() => {
        component = renderComponent(Player);
    });

    it('renders something', () => {
        expect(component).to.exist;
    });

});
