
/* Game namespace */
var game = {

    // an object where to store game information
    data : {
        // score
        score : 0
    },


    // Run on page load.
    "onload" : function () {
        // Initialize the video.
        if (!me.video.init(960, 640, {wrapper : "screen", scale : "auto"})) {
            alert("Your browser does not support HTML5 canvas.");
            return;
        }

        // Initialize the audio.
        me.audio.init("mp3,ogg");

        // set and load all resources.
        // (this will also automatically switch to the loading screen)
        me.loader.preload(game.resources, this.loaded.bind(this));
    },

    // Run on game resources loaded.
    "loaded" : function () {
        this.playScreen = new game.PlayScreen();
        me.pool.register('player', game.Player);
        me.pool.register('enemy', game.Enemy);
        me.pool.register('laser', game.Laser);
        me.state.set(me.state.PLAY, this.playScreen);

        // Start the game.
        me.state.change(me.state.PLAY);
    }
};
