import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default React.createClass({
    mixins: [PureRenderMixin],
    propTypes: {
        log: React.PropTypes.object
    },

    render: function() {
        const {log} = this.props;

        return (
            <div>
                <p>--add log here--</p>
            </div>
        );
    }
});