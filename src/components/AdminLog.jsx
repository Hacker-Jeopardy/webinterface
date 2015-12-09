import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default React.createClass({
    mixins: [PureRenderMixin],
    propTypes: {
        logList: React.PropTypes.object
    },

    render: function() {
        const {logList} = this.props;

        return (
            <div id="admin_log">
                <p>Log</p>
                <ul>
                    {logList.reverse().map(entry =>
                        <li className={entry.get('type')}> {entry.get('msg')} </li>
                    )}
                </ul>
            </div>
        );
    }
});