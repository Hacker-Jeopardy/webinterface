import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default React.createClass({
    mixins: [PureRenderMixin],
    propTypes: {},

    render: function() {
        return (
            <div className="internet-explorer-placeholder">
                <i className="fa fa-5x fa-internet-explorer"></i>
                <p>
                    Jeopardy was optimized for Internet Explorer version 6.
                </p>
                <p>
                    Your browser version is not supported.
                </p>
            </div>
        );
    }
});
