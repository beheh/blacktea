var React = require('react');
var net = require('net');

var GameTag = require('./enums/GameTag');
var CardType = require('./enums/CardType');
var OptionType = require('./enums/OptionType');

var Player = require('./Player');

module.exports = React.createClass({
    getInitialState: function() {
        return {entities: [], options: []};
    },
    addEntity: function(entity) {
        var entities = this.state.entities;
        entities[entity.EntityID] = entity;
        this.setState({entities: entities});
    },
    tagChange: function(entity, tag, value) {
        var entities = this.state.entities;
        console.log('TagChange: #', entity.EntityID, ' (', tag, ' => ', value,')');
        entities[entity.EntityID].setTag(tag, value);
        this.setState({entities: entities});
    },
    handle_packet: function(packet) {
        console.log('Received packet ', packet);
        var type = packet.Type
        packet = packet[type]
        switch(type) {
            case 'GameEntity':
            case 'Player':
            case 'FullEntity':
                this.addEntity(new Entity(packet));
                break;
            case 'TagChange':
                this.tagChange(new Entity(packet), packet.Tag, packet.Value);
                break;
            case 'Options':
                this.setState({options: packet});
                break;
            default:
                console.log('Unknown packet type '+packet.Type);
                break;
        }
    },
    send_packet: function(socket, packet) {
        var message = JSON.stringify(packet);
        return this.socket.write(this.pad(message.length, 4) + message);
    },
    pad: function(number, length) {
        return Array(length - (number+'').length + 1).join('0') + number;
    },
    componentDidMount: function() {
        console.log('Hello, world!');
        this.socket = new net.Socket();
        socket = this.socket;
        socket.setEncoding('utf-8');
        socket.connect(9111, 'localhost');
        var that = this;
        socket.on('connect', function() {
            that.send_packet(socket, [{
                Type: 'CreateGame',
                CreateGame: {
                    Players: [
                        {
                            Name: 'BlackTea1',
                            Cards: Array(30).fill('GVG_003'),
                            Hero: 'HERO_08'
                        },
                        {
                            Name: 'BlackTea2',
                            Cards: Array(30).fill('FP1_011'),
                            Hero: 'HERO_05'
                        }
                    ]
                }
            }]);
            socket.on('data', function(data) {
                header = data.substr(0, 4);
                data = data.substr(4);
                packets = JSON.parse(data);
                packets.forEach(that.handle_packet);
            });
            socket.on('close', function() {
                console.log('Socket closed');
            });
        });
    },
    canEndTurn: function() {
        var options = this.state.options;
        return options.filter(function(option) {
           return option.Type == OptionType.END_TURN;
        }).length == 1;
    },
    endTurn: function() {
        var options = this.state.options;
        var index = -1;
        for(var i = 0; i < options.length; i++) {
            if(options[i].Type == OptionType.END_TURN) {
                index = i;
                break;
            }
        }
        if(index != -1) {
            this.setState({options: []});
            this.send_packet(this.socket, {Type: 'SendOption', SendOption: {Index: index}});
        }
        else {
            alert('wat?');
        }
    },
    render: function() {
        var playerEntities = this.state.entities.filter(function(entity) {
            return entity.getCardType() == CardType.PLAYER;
        });
        var that = this;
        var playerComponents = playerEntities.map(function(player) {
            var controlled = that.state.entities.filter(function(entity) {
                return entity.getController() == player.EntityID;
            });
            return (
                <Player entity={player} entities={controlled} options={that.state.options} />
            );
        });
        return (
            <div>
                <button onClick={this.endTurn} disabled={!this.canEndTurn()}>End Turn</button>
                {playerComponents}
            </div>
        );
    }
});