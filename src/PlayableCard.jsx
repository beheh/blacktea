var React = require('react');

var OptionType = require('./enums/OptionType');
var TargetOptionButton = require('./TargetOptionButton');

module.exports = React.createClass({
    onClick: function(e) {
        this.props.selectOption(this.option, 0);
    },
    render: function() {
        var entity = this.props.entity;
        var stats = (entity.getAtk() + entity.getHealth() > 0) ? ((entity.getAtk()) + '-' + (entity.getHealth() + 0)) : '';
        var options = null;
        for (var i = 0; i < this.props.options.length; i++) {
            var option = this.props.options[i];
            if (option.Type != OptionType.POWER) {
                continue;
            }
            option = option.MainOption;
            if (option.ID != entity.EntityID) {
                continue;
            }
            if (option.Targets.length == 0) {
                options = <button onClick={this.onClick}>Play</button>;
            }
            else {
                var that = this;
                options = option.Targets.map(function(target) {
                    var key = 'option:' + i + ':' + target;
                    return <TargetOptionButton index={i} target={target} key={key} selectOption={that.props.selectOption} />;
                });
            }
            this.option = i;
        }
        return (
            <span>
                {entity.CardID}: {stats} for {entity.getCost()} (#{entity.EntityID})
                {options}
            </span>
        );
    }
});
