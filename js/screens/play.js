game.PlayScreen = me.ScreenObject.extend({
    /**
     *  action to perform on state change
     */
    onResetEvent: function() {
        me.game.world.addChild(new me.ColorLayer('background', '#000000'), 0);

        this.player = me.pool.pull('player');
        me.game.world.addChild(this.player, 1);

        this.enemyManager = new game.EnemyManager();
        this.enemyManager.createEnemies();
        me.game.world.addChild(this.enemyManager, 2);

        me.input.bindKey(me.input.KEY.LEFT, 'left');
        me.input.bindKey(me.input.KEY.RIGHT, 'right');
        me.input.bindKey(me.input.KEY.SPACE, 'shoot', true); // true to only shoot once per press
    },

    /**
     *  action to perform when leaving this screen (state change)
     */
    onDestroyEvent: function() {
        me.input.unbindKey(me.input.KEY.LEFT);
        me.input.unbindKey(me.input.KEY.RIGHT);
        me.input.unbindKey(me.input.KEY.SPACE);
    },

    resetIfEnemyTouchesPlayer: function (enemyY) { // in tutorial this method is named "checkIfLoss"
        if (enemyY >= this.player.pos.y) {
            me.state.change(me.state.GAMEOVER);
        }
    },

    enemiesWereDestroyed: function() {
        me.state.change(me.state.GAME_END);
    }
});
