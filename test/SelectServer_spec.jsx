import React from 'react/addons';
import SelectServer from '../src/components/SelectServer.jsx';
import {expect} from 'chai';

const {renderIntoDocument, scryRenderedDOMComponentsWithTag, Simulate} = React.addons.TestUtils;

describe('SelectServer', () => {
    it('renders host and port input', () => {
        const host = '127.0.0.1', port = 1234;
        const component = renderIntoDocument(
            <SelectServer host={host} port={port} />
        );

        const inputs = scryRenderedDOMComponentsWithTag(component, 'input');

        expect(inputs.length).to.equal(2);
        expect(inputs[0].value).to.equal(host);
        expect(inputs[1].value).to.equal(port.toString());
    });

    it('renders scoreboard and admin button', () => {
        const component = renderIntoDocument(
            <SelectServer />
        );

        const buttons = scryRenderedDOMComponentsWithTag(component, 'button');

        expect(buttons.length).to.equal(2);
        expect(buttons[0].value).to.equal('scoreboard');
        expect(buttons[1].value).to.equal('admin');
    });

    it('invokes callback when submitted', () => {
        let type = null;
        const onConnect = (data) => type = data.type;

        const component = renderIntoDocument(
            <SelectServer onConnect={onConnect} />
        );

        const buttons = scryRenderedDOMComponentsWithTag(component, 'button');

        Simulate.click(buttons[0]);
        expect(type).to.equal('scoreboard');

        Simulate.click(buttons[1]);
        expect(type).to.equal('admin');
    });

});