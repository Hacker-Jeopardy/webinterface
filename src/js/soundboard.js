var SoundBoard = function () {
    this._bgmusic_intro = new Howl({urls: ['sound/bgmusic-intro.wav'], volume: 0.25});
    this._bgmusic_loop = new Howl({urls: ['sound/bgmusic-loop.wav'], loop: true, volume: 0.25});
    this._buzzer = new Howl({urls: ['sound/buzzer.wav'], volume: 0.1});
    this._dailydouble = new Howl({urls: ['sound/dailydouble.wav'], volume: 0.1});
    this._final = new Howl({urls: ['sound/final.wav'], volume: 0.5});
    this._think = new Howl({urls: ['sound/think.wav'], volume: 0.5, loop: true});

    var that = this;
    this._bgmusic_intro.on('end', function() {
        that._bgmusic_loop.play();
    });

    this.playScoreboard();
};

SoundBoard.prototype.playBuzzer = function() {
    this._buzzer.pos(0).play();
};

SoundBoard.prototype.playScoreboard = function() {
    this._think.stop();
    this._bgmusic_intro.pos(0).play();
};

SoundBoard.prototype.playAnswer = function() {
    this._bgmusic_intro.stop();
    this._bgmusic_loop.stop();

    // dunno why i need this -.-'
    this._think = new Howl({urls: ['sound/think.wav'], volume: 0.5, loop: true});
    this._think.pos(0).play();
};
