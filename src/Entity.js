var GameTag = require('./enums/GameTag');

module.exports = function(FullEntity) {
	this.EntityID = FullEntity.EntityID;
	this.Tags = FullEntity.Tags;
	this.CardID = FullEntity.CardID;

	this.getHealth = function() {
		return this.getTag(GameTag.HEALTH) - this.getTag(GameTag.DAMAGE);
	}
	this.getAtk = function() {
		return this.getTag(GameTag.ATK);
	}
	this.getCost = function() {
		return this.getTag(GameTag.COST);
	}
	this.getZone = function() {
		return this.getTag(GameTag.ZONE);
	}
	this.getCardType = function() {
		return this.getTag(GameTag.CARDTYPE);
	}
	this.getController = function() {
		return this.getTag(GameTag.CONTROLLER);
	}
	this.getZonePosition = function() {
		return this.getTag(GameTag.ZONE_POSITION)
	}

	this.getTag = function(tag) {
		if(typeof this.Tags[tag] === 'undefined') {
			return 0;
		}
		return this.Tags[tag];
	}
	this.setTag = function(tag, value) {
		this.Tags[tag] = parseInt(value);
	}
}
