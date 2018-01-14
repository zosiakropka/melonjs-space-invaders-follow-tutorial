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
    this.enemiesWereCreated = true;
  },

  onActivateEvent: function () {
    var self = this;
    this._timer = me.timer.setInterval(function () {
        var bounds = self.childBounds;

        if (
          (self.vel > 0 && (bounds.right + self.vel) >= me.game.viewport.width) || // going right and would exceed right boundary if moved any more
          (self.vel < 0 && (bounds.left + self.vel) <= 0) // going left and would exceed left boundary if moved any more
        ) {
          self.vel *= -1; // change direction to opposite
          self.pos.y += 16; // go lower by 16 points

          if (self.vel > 0) {
            self.vel += 5; // speed up to the right at the upcoming row
          } else {
            self.vel -= 5; // speed up to the left at upcoming row
          }
        } else {
          self.pos.x += self.vel; // move by `vel` points - either left or right
        }

        game.playScreen.resetIfEnemyTouchesPlayer(bounds.bottom);
    }, 1000); // each second
  },

  onDeactivateEvent: function () {
    me.timer.clearInterval(this._timer);
  },

  update: function (time) {
    if (this.children.length === 0 && this.enemiesWereCreated) {
      if (game.playScreen.enemiesWereDestroyed) {
        game.playScreen.enemiesWereDestroyed();
      }
    }
    this._super(me.Container, 'update', [time]);
    this.updateChildBounds();
  }
})
