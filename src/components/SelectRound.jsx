import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default React.createClass({
    mixins: [PureRenderMixin],
    propTypes: {
        rounds: React.PropTypes.object,
        select: React.PropTypes.func
    },

    select: function(event) {
        let roundId = event.target.value;
        this.props.select(roundId);
    },

    render: function() {
        const {rounds} = this.props;

        return (
            <div className="box-center">
                <form id="select_round" className="pure-form">
                    <fieldset>
                        <legend>Select Jeopardy Round</legend>
                    </fieldset>

                    {rounds.map((name, round) => (
                        <fieldset>
                            <button type="submit" value={round} onClick={this.select} className="pure-button button-xlarge">
                                {name}
                            </button>
                        </fieldset>
                    ))}
                </form>
            </div>
        );
    }
});