game.EnemyManager = me.Container.extend({
  init: function () {
    this._super(me.Container, 'init', [
      0, 32,
      this._COLS * 64 - 32,
      this._ROWS * 64 - 32
    ]);

    this._COLS = 9;
    this._ROWS = 4;
    this.vel = 16;
  },

  createEnemies: function () {
    for (var i = 0; i < this._COLS; i++) {
      for (var j = 0; j < this._ROWS; j++) {
        this.addChild(me.pool.pull('enemy', i * 64, j * 64));
      }
    }
    this.updateChildBounds();
  },

  onActivateEvent: function () {
    var self = this;
    this._timer = me.timer.setInterval(function () {
        self.pos.x += self.vel;
    }, 1000);
  },

  onDeactivateEvent: function () {
    me.timer.clearInterval(this._timer);
  }
})
