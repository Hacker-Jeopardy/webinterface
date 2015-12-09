import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default React.createClass({
    mixins: [PureRenderMixin],
    propTypes: {
        state: React.PropTypes.string,
        onAnswerWin: React.PropTypes.func,
        onAnswerFail: React.PropTypes.func,
        onAnswerOops: React.PropTypes.func,
        onAnswerExit: React.PropTypes.func
    },

    win: function() {
        this.props.onAnswerWin();
    },

    render: function() {
        const {onAnswerWin, onAnswerFail, onAnswerOops, onAnswerExit} = this.props;

        return (
            <fieldset>
                <button value="win" onClick={this.win} className="pure-button button-xlarge">
                    Win
                </button>

                <button value="fail" onClick={onAnswerFail} className="pure-button button-xlarge">
                    Fail
                </button>

                <button value="oops" onClick={onAnswerOops} className="pure-button button-xlarge">
                    Oops
                </button>

                <button value="exit" onClick={onAnswerExit} className="pure-button button-xlarge">
                    Exit
                </button>
            </fieldset>
        );
    }
});