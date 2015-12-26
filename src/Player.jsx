var React = require('react');
var Zone = require('./enums/Zone');

var CardType = require('./enums/CardType');
var GameTag = require('./enums/GameTag');

var CardList = require('./CardList');

var Deck = require('./Deck');
var Hero = require('./Hero');
var HeroPower = require('./HeroPower');


module.exports = React.createClass({
    getEntitiesByZone: function(zone) {
        return this.props.entities.filter(function(entity) {
           return entity.getZone() == zone;
        });
    },
    render: function() {
        var hero = null;
        var heropower = null;
        var deck = [];
        var hand = [];
        var field = [];
        this.props.entities.forEach(function(entity) {
            switch(entity.getCardType()) {
                case CardType.HERO:
                    hero = entity;
                    break;
                case CardType.HERO_POWER:
                    heropower = entity;
                    break;
                default:
                    switch(entity.getZone()) {
                        case Zone.DECK:
                            deck.push(entity);
                            break;
                        case Zone.HAND:
                            hand.push(entity);
                            break;
                        case Zone.PLAY:
                            field.push(entity);
                            break;
                    }
            }
        });
        var currentmana = this.props.entity ? this.props.entity.getTag(GameTag.RESOURCES) - this.props.entity.getTag(GameTag.RESOURCES_USED) : 0;
        var mana = this.props.entity ? this.props.entity.getTag(GameTag.RESOURCES) : 0;
        return (
            <div>
                <h2>Player</h2>
                <Hero entity={hero} />
                <p>{currentmana}/{mana} mana</p>
                <Deck entities={deck} />
                <h3>Hand</h3>
                <CardList entities={hand} options={this.props.options} />
                <h3>Field</h3>
                <CardList entities={field} options={this.props.options} />
            </div>
        );
    }
});
