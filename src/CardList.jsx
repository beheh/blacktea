var React = require('react');

var OptionType = require('./enums/OptionType');
var PlayableCard = require('./PlayableCard')

module.exports = React.createClass({
    render: function() {
        console.log();
        var that = this;
        var entities = this.props.entities.sort(function(a, b) {
            return a.getZonePosition() > b.getZonePosition();
        }).map(function(entity) {
            return (
                <li key={entity.EntityID}>
                    <PlayableCard entity={entity} options={that.props.options} key={entity.EntityID} selectOption={that.props.selectOption} />
                </li>
            );
        });
        return (
            <ul>
                {entities}
            </ul>
        );
    }
});
