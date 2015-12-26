var React = require('react');

var OptionType = require('./enums/OptionType')

module.exports = React.createClass({
    render: function() {
        var entities = this.props.entities.map(function(entity) {
            var stats = (entity.getAtk() + entity.getHealth() > 0) ? ((entity.getAtk()) + '-' + (entity.getHealth() + 0)) : '';
            return (
                <li key={entity.EntityID}>
                    {entity.CardID}: {stats} for {entity.getCost()} (#{entity.EntityID})
                </li>
            );
        })
        return (
            <ul>
                {entities}
            </ul>
        );
    }
});
