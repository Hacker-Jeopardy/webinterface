import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default React.createClass({
    mixins: [PureRenderMixin],
    propTypes: {
        buzzerCount: React.PropTypes.number,
        onAnswerWin: React.PropTypes.func,
        onAnswerFail: React.PropTypes.func,
        onAnswerOops: React.PropTypes.func,
        onAnswerExit: React.PropTypes.func
    },

    render: function() {
        const {buzzerCount} = this.props;
        const {onAnswerWin, onAnswerFail, onAnswerOops, onAnswerExit} = this.props;

        if(buzzerCount > 0) {
            return (
                <fieldset>
                    <button value="win" onClick={onAnswerWin} className="pure-button button-xlarge">
                        Win
                    </button>

                    <button value="fail" onClick={onAnswerFail} className="pure-button button-xlarge">
                        Fail
                    </button>

                    <button value="oops" onClick={onAnswerOops} className="pure-button button-xlarge">
                        Oops
                    </button>
                </fieldset>
            );
        } else {
            return (
                <fieldset>
                    <button value="exit" onClick={onAnswerExit} className="pure-button button-xlarge">
                        Exit
                    </button>
                </fieldset>
            );
        }
    }
});