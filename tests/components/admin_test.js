import { renderComponent, expect } from '../test_helper';
import Admin from '../../src/components/admin';

describe('<Admin />', () => {
    let component;

    beforeEach(() => {
        component = renderComponent(Admin);
    });

    it('renders something', () => {
        expect(component).to.exist;
    });

});
