var React = require('react');

module.exports = React.createClass({
    render: function() {
        var count = this.props.entities.length;
        return (
           <p>{count} card(s) in deck</p>
        );
    }
});
