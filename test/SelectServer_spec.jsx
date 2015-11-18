import React from 'react';
import TestUtils from 'react-addons-test-utils';
import {SelectServerStandalone} from '../src/components/SelectServer.jsx';
import {expect} from 'chai';

const SelectServer = SelectServerStandalone;
const {renderIntoDocument, scryRenderedDOMComponentsWithTag, Simulate} = TestUtils;

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
        let formData = null;
        const onConnect = (data) => formData = data;

        const component = renderIntoDocument(
            <SelectServer connect={onConnect} />
        );

        const buttons = scryRenderedDOMComponentsWithTag(component, 'button');

        ['scoreboard', 'admin'].forEach((value, i) => {
            formData = null;
            Simulate.click(buttons[i]);
            expect(formData.type).to.equal(value);
        });
    });

    it('invokes callback with data when submitted', () => {
        let formData = null;
        const host = '127.0.0.1', port = 1234;
        const onConnect = (data) => formData = data;

        const component = renderIntoDocument(
            <SelectServer host={host} port={port} connect={onConnect} />
        );

        const buttons = scryRenderedDOMComponentsWithTag(component, 'button');

        ['scoreboard', 'admin'].forEach((value, i) => {
            formData = null;
            Simulate.click(buttons[i]);

            expect(formData).to.deep.equal({
                host: host,
                port: port,
                type: value
            });
        });
    });

});