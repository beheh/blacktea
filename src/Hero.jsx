var React = require('react');

module.exports = React.createClass({
    render: function() {
        var health = this.props.entity ? this.props.entity.getHealth() : '???';
        return (
           <p>Hero: {health} health</p>
        );
    }
});
