import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default React.createClass({
    mixins: [PureRenderMixin],
    propTypes: {},

    render: function() {
        return (
            <div className="box-center placeholder">
                <i className="fa fa-rocket fa-spin fa-4x"></i>
                connecting...
            </div>
        );
    }
});
