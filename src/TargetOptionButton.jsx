var React = require('react');

module.exports = React.createClass({
    onClick: function(e) {
        this.props.selectOption(this.props.index, this.props.target);
    },
    render: function() {
        return (
            <button onClick={this.onClick}>Play on target #{this.props.target}</button>
        );
    }
});
