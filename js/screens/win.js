game.WinScreen = me.ScreenObject.extend({
  onResetEvent: function() {
    var GameEndLayer = me.ColorLayer.extend({
      update: function() {
        if (me.input.isKeyPressed('play')) {
          me.state.change(me.state.PLAY);
        }
      }
    });
    me.game.world.addChild(new GameEndLayer('background', '#00FF00'), 1);
    me.input.bindKey(me.input.KEY.SPACE, 'play');
  },

  onDestroyEvent: function() {
    me.input.unbindKey(me.input.KEY.SPACE);
  }
});
