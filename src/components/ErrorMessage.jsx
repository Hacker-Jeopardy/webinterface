import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default React.createClass({
    mixins: [PureRenderMixin],
    propTypes: {
        errorMsg: React.PropTypes.string
    },

    render: function() {
        // TODO add optional error message

        return (
            <div className="box-center placeholder">
                <i className="fa fa-fire fa-4x"></i>
                <p>something is on fire</p>
                <p>stay tuned...</p>
            </div>
        );
    }
});
