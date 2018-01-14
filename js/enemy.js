game.Enemy = me.Entity.extend({
  init: function (x, y) {
    this._super(me.Entity, 'init', [x, y, {
      image: 'ships',
      width: 32,
      height: 32
    }]);

    this._chooseShipImage();

    this.body.setVelocity(0, 0);
    this.body.collisionType = me.collision.types.ENEMY_OBJECT;
  },

  update: function (dt) {
    this._super(me.Entity, 'update', [dt]);
    this.body.update();
    return true;
  },

  _chooseShipImage: function () {
    var frame = Math.floor((Math.random() * 3));
    this.renderable.addAnimation('idle', [frame], 1)
    this.renderable.setCurrentAnimation('idle');
  }
});
