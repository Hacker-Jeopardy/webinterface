var MainMenu = function() {
    this._rounds = null;
    this._num_player = 2;
    this._jeopardy = new Jeopardy();

    var that = this;
    $('header h1').click(function(){ that.open(); });
    $('#mainmenu-refresh-keyboards').click(function(){ that.refreshKeyboards(); });
    $('#mainmenu-reload-rounds').click(function(){ that.reloadRounds(); });
    $('#mainmenu-player-add').click(function(){ that.addPlayer(); });
    $('#mainmenu-player-remove').click(function(){ that.removePlayer(); });
    $('#mainmenu-close').click(function(){ that.close(); });

    this.reloadRounds();
};

MainMenu.prototype.open = function() {
    $('.modal-background').show();
    $('.modal-mainmenu').show();
};

MainMenu.prototype.close = function() {
    $('.modal-background').hide();
    $('.modal-mainmenu').hide();
};

MainMenu.prototype.addPlayer = function() {
    this._jeopardy.addPlayer();
    this._num_player = this._jeopardy.player.length;
};

MainMenu.prototype.removePlayer = function() {
    this._jeopardy.removePlayer();
    this._num_player = this._jeopardy.player.length;
};

MainMenu.prototype.refreshKeyboards = function() {
    buzzer.refresh();
};

MainMenu.prototype.reloadRounds = function() {
    var that = this;
    $('#mainmenu-roundlist').html('<i class="fa fa-refresh fa-spin"></i>');
    $.getJSON( 'data/rounds.json', function( data ) {
        that._rounds = data.rounds;
        var roundList = '';

        $.each( that._rounds, function( index, round ) {
            roundList += '<div class="mainmenu-new menu-button" data-round="'+ index +'">'+ round.name +'</div>';
        });

        $('#mainmenu-roundlist').html(roundList);
        $('#mainmenu-roundlist .mainmenu-new').click(function(e){ that.newRound(e); });
    });
};

MainMenu.prototype.newRound = function(event) {
    var round_number = $(event.currentTarget).data('round');
    this._jeopardy = new Jeopardy(this._rounds[round_number], this._num_player);
    this.close();
};
