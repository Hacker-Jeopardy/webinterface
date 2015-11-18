import React from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../action_creators';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export const ScoreboardStandalone = React.createClass({
    mixins: [PureRenderMixin],

    render: function() {
        console.log(this.props.state);
        console.log(this.props.game);
        console.log(this.props.game.state);
        console.log(this.props.game['state']);
        console.log(this.props.game.get('state'));

        this.props.game.map(x => console.log(x));

        return (
            <p>// TODO</p>
        );
    }
});


export const Scoreboard = connect((state) => {
    return {
        state: state.getIn(['game', 'state']),
        game: state.get('game')
    };
}, actionCreators)(ScoreboardStandalone);