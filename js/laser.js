game.Laser = me.Entity.extend({
  init: function (x, y) {
    this._super(me.Entity, 'init', [x, y, {
      width: game.Laser.WIDTH,
      height: game.Laser.HEIGHT
    }]);

    this.z = 5;

    this.body.setVelocity(0, 300); // velocity x=0,y=300 == move up
    this.body.collisionType = me.collision.types.PROJECTILE_OBJECT;

    this.renderable = new (me.Renderable.extend({
      init: function () {
        this._super(me.Renderable, 'init', [0, 0, game.Laser.WIDTH, game.Laser.HEIGHT]);
      },
      destroy: function () {},
      draw: function (renderer) {
        var previousColor = renderer.getColor(); // backup original renderer color
        renderer.setColor('#5EFF7E');
        renderer.fillRect(0, 0, this.width, this.height); // of the same size as laser entity
        renderer.setColor(previousColor); // reset to original
      },
    }));

    this.alwaysUpdate = true; // always update, even if not visible; necessary because we only remove it once not visible
  },

  update: function (time) {
    this.body.vel.y -= this.body.accel.y * time / 1000;

    if (this.pos.y + this.height <= 0) {
      me.game.world.removeChild(this);
    }

    this.body.update();
    me.collision.check(this);

    return this;
  }
});

game.Laser.WIDTH = 5;
game.Laser.HEIGHT = 28;
