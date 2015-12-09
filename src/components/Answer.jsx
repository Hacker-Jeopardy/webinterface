import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default React.createClass({
    mixins: [PureRenderMixin],
    propTypes: {
        answer: React.PropTypes.object
    },

    render: function() {
        const {answer} = this.props;

        switch(answer.get('type')) {
            case 'text':
                return (
                    <div className="answer">
                        <p> {answer.get('data')} </p>
                    </div>
                );

            case 'img':
                return (
                    <div className="answer">
                        <img src={'data:image;base64,' + answer.get('data')} />
                    </div>
                );

            case 'audio':
                // TODO
                return '';

            case 'video':
                // TODO
                return '';

            case 'code':
                return (
                    <div className="answer">
                        <code>
                            <pre> {answer.get('data')} </pre>
                        </code>
                    </div>
                );
        }
    }
});
