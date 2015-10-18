var Jeopardy = function(round, num_player) {
    this.round = round;
    this.player = undefined;
    this.data = {};
    this.selected = { player: null, event: null, group: null, point: null };

    // create soundboard
    if(Jeopardy.soundboard === undefined) {
        Jeopardy.soundboard = new SoundBoard();
    }

    // load saved round
    if(round === undefined) {
        this.loadFromLocalStorage();
    }

    // create players
    if(this.player === undefined) {
        this.player = [];
        var player_count = (num_player === undefined ? 2 : num_player);

        for(var i = 0; i < player_count; i++) {
            this.addPlayer();
        }
    }

    // write scorebaord nad playerlist
    if(this.round !== undefined) {
        this.writeScoreboard();
        this.updateScoreboard();
        this.updatePlayerlist();
    } else {
        this.writeEmptyScoreboard();
    }

    // subscribe buzz events
    var that = this;
    buzzer.events.onOpen = function() { that.resetKeyboards(); };
    buzzer.events.onClose = function() { that.resetKeyboards(); };
    buzzer.events.onKeyboardDisconnected = function(k){ that.removeKeyboard(k); };
    buzzer.events.onKeyboardBuzzed = function(k){ that.onKeyboardBuzzed(k); };

    // other events
    $('#menu-mute').click(function(){ that.onMute(); });
    $('.modal-nav button').off().click(function(e){ that.onModalButtonClicked(e); });
};

Jeopardy.prototype.loadFromLocalStorage = function() {
    var data = localStorage.getItem('jeopardy');

    if(data !== undefined) {
        var savedGame = JSON.parse(data);

        this.round = savedGame.round;
        this.player = savedGame.player;
        this.data = savedGame.data;

        // reset keyboard id'on
        for(var i = 0; i < this.player.length; i++) {
            this.player[i].id = null;
        }
    }
};

Jeopardy.prototype.saveToLocalStorage = function() {
    localStorage.setItem('jeopardy', JSON.stringify(this));
};

Jeopardy.prototype.writeEmptyScoreboard = function() {
    $('#content').html('<p>Click the jeopardy logo to start a new game.</p>');
};

Jeopardy.prototype.writeScoreboard = function() {
    var scoreboard = $('<table class="scoreboard">' +
        '<thead></thead>' +
        '<tbody></tbody>' +
        '</table>');

    for (var index in this.round.points) {
        if(!this.round.points.hasOwnProperty(index)) {
            continue;
        }

        $(scoreboard).children('tbody').append('<tr></tr>');
    }

    for(var i = 0; i < this.round.groups.length; i++) {
        var group = this.round.groups[i];

        // header
        $(scoreboard).children('thead').append($('<th></th>').html(group.name));

        // answers
        for (var index in this.round.points) {
            if(!this.round.points.hasOwnProperty(index)) {
                continue;
            }

            $(scoreboard).children('tbody').children('tr').eq(index).append(
                $('<td data-group="'+group.path+'" data-point="'+this.round.points[index]+'" data-done="false">'+this.round.points[index]+'</td>')
            );
        }
    }

    $('#content').html(scoreboard);

    var that = this;
    $('#content .scoreboard td').click(function(e){ that.onScoreboardClick(e); });
};

Jeopardy.prototype.updateScoreboard = function() {
    for (var group_path in this.data) {
        if(!this.data.hasOwnProperty(group_path)) {
            continue;
        }

        var group_data = this.data[group_path];

        for (var point in group_data) {
            if(!group_data.hasOwnProperty(point)) {
                continue;
            }

            var data = group_data[point];
            var win_css = 'nobody';
            var content = '';

            for (var index in data) {
                if(!data.hasOwnProperty(index)) {
                    continue;
                }

                var line = data[index];

                if(content !== '') {
                    content += '<br>';
                }

                var icon = '';
                switch(line.type) {
                    case 'fail':
                        icon = '<i class="fa fa-thumbs-o-down"></i>';
                        break;
                    case 'ups':
                        icon = '<i class="fa fa-question"></i>';
                        break;
                    case 'win':
                        win_css = 'player' + (line.player+1);
                        icon = '<i class="fa fa-thumbs-o-up"></i>';
                        break;
                }

                content += '<span class="'+ line.type +'">'+ icon + ' ' + this.getPlayerName(line.player) + '</span>';
            }

            if(content === '') {
                content = 'nobody';
            }

            $('.scoreboard td[data-group='+group_path+'][data-point='+point+']').html(content).attr('class', win_css).data('done', true);
        }
    }
};

Jeopardy.prototype.updatePlayerlist = function() {
    var playerList = $('<tr></tr>');

    for (var i = 0; i < this.player.length; i++) {
        var player = this.player[i];
        var keyboard = !(player.id !== undefined && player.id !== null);
        var style = '';

        if(!keyboard) {
            style += 'display: none;';
        }

        if(this.selected.event === 'inputKeyboard' && this.selected.player === i) {
            style += 'color: green;';
        }

        playerList.append('<td class="player'+ (i+1) +'" data-player="'+ i +'">' +
                '<span class="player-keyboard" style="' + style + '"><i class="fa fa-plug"></i></span>' +
                '<span class="player-name">'+ this.getPlayerName(i) +'</span>' +
                '<span class="player-points">['+ this.getPlayerPoints(i) +']</span>' +
            '</td>');
    }

    $('#player-list').html(playerList);
    $('#mainmenu-player-count').text(this.player.length);

    var that = this;
    $('#player-list .player-keyboard').click(function(e){ that.inputKeyboard(e); });
    $('#player-list .player-name').click(function(e){ that.inputPlayerName(e); });
    $('#player-list .player-points').click(function(e){ that.inputPlayerPoints(e); });
};

Jeopardy.prototype.addPlayer = function() {
    this.player.push({name: null, id: null, points: null});
    this.updatePlayerlist();
};

Jeopardy.prototype.removePlayer = function() {
    var last_player = this.player[this.player.length - 1];
    var sure = true;

    if(last_player.points !== null) {
        sure = confirm('Player has already points, are you sure?');
    }

    if(sure !== undefined && sure === true) {
        this.player.pop();
    }

    this.updatePlayerlist();
};

Jeopardy.prototype.getPlayerByKeyboard = function(keyboard_id) {
    for (var i = 0; i < this.player.length; i++) {
        var player = this.player[i];

        if(player.id !== undefined && player.id === keyboard_id) {
            return player;
        }
    }

    return null;
};

Jeopardy.prototype.getPlayerName = function(player_number) {
    if(this.player[player_number] !== undefined) {
        var player = this.player[player_number];

        if(player.name !== undefined && player.name !== null) {
            return player.name;
        }
    }

    return 'Player ' + (player_number+1);
};

Jeopardy.prototype.getPlayerPoints = function(player_number) {
    if(this.player[player_number] !== undefined) {
        var player = this.player[player_number];

        if(player.points !== undefined && player.points !== null) {
            return player.points;
        } else {
            return 0;
        }
    }

    return null;
};

Jeopardy.prototype._addData = function(type) {
    var group = this.selected.group;
    var point = this.selected.point;
    var player = this.selected.player;

    if(this.data[group] === undefined) {
        this.data[group] = {};
    }

    if(this.data[group][point] === undefined) {
        this.data[group][point] = [];
    }

    if(type !== null) {
        this.data[group][point].push({type: type, player: player});
    }

    this.saveToLocalStorage();
};

Jeopardy.prototype.inputKeyboard = function(event) {
    console.log(event);
    var player_number = $(event.currentTarget).parent().data('player');

    if(player_number === undefined) {
        return alert('Player not found.');
    }

    if(this.player[player_number] !== undefined) {
        var player = this.player[player_number];

        this.selected.event = 'inputKeyboard';
        this.selected.player = player_number;
        this.updatePlayerlist();
    }
};

Jeopardy.prototype.inputPlayerName = function(event) {
    console.log(event);
    var player_number = $(event.currentTarget).parent().data('player');

    if(player_number === undefined) {
        return alert('Player not found.');
    }

    if(this.player[player_number] !== undefined) {
        var player = this.player[player_number];

        var name = prompt('Enter name:', this.getPlayerName(player_number));

        if(name !== undefined) {
            player.name = name;
            this.updatePlayerlist();
            this.saveToLocalStorage();
        }
    }
};

Jeopardy.prototype.inputPlayerPoints = function(event) {
    console.log(event);
    var player_number = $(event.currentTarget).parent().data('player');

    if(player_number === undefined) {
        return alert('Player not found.');
    }

    if(this.player[player_number] !== undefined) {
        var player = this.player[player_number];

        var points = prompt('Enter points:', player.points);

        if(points !== undefined) {
            player.points = points;
            this.updatePlayerlist();
            this.saveToLocalStorage();
        }
    }
};

Jeopardy.prototype.resetKeyboards = function() {
    for (var i = 0; i < this.player.length; i++) {
        this.player[i].id = null;
    }

    this.updatePlayerlist();
};

Jeopardy.prototype.removeKeyboard = function(keyboard_id) {
    console.log('removeKeyboard: %s', keyboard_id);
    for (var i = 0; i < this.player.length; i++) {
        var player = this.player[i];

        if(player.id !== undefined && player.id === keyboard_id) {
            this.player[i].id = null;
        }
    }

    this.updatePlayerlist();
};

Jeopardy.prototype.onScoreboardClick = function(event) {
    var data = $(event.currentTarget).data();
    console.log(data);

    if(!data.done) {
        for (var i = 0; i < this.player.length; i++) {
            var player = this.player[i];
            var keyboard = (player.id !== undefined && player.id !== null);

            if(!keyboard) {
                alert('Missing Keyboards!');
                return;
            }
        }

        this.selected.group = data.group;
        this.selected.point = data.point;
        this.openAnswer(data.group, data.point);
    }
};

Jeopardy.prototype.openAnswer = function(group_path, point) {
    console.log('open answer: %s - %s', group_path, point);

    for(var i = 0; i < this.round.groups.length; i++) {
        var group = this.round.groups[i];

        if(group.path === group_path) {
            var data = group.answer[point];
            var path = 'data/' + this.round.path + '/' + group.path + '/';
            var content = '';
            console.log(data);

            if(data.html !== undefined) {
                content = data.html;
            } else if(data.code !== undefined) {
                $.get(path + data.code, function( data ) {
                    $('.modal-content').children('code.load').html($('<pre></pre>').text(data));
                });
                content = '<code class="load"><pre>loading...</pre></code>';
            } else if(data.img !== undefined) {
                var width = '', height = '';

                if(data.width !== undefined) {
                    width = 'width="' + data.width + '"';
                }

                if(data.height !== undefined) {
                    height = 'height="' + data.height + '"';
                }

                content = '<img '+ width +' '+ height +' src="'+ path + data.img +'" />';
            } else if(data.text !== undefined) {
                content = '<code>'+ data.text +'</code>';
            }

            this.selected.event = 'answer';
            this.hideBuzzButtons();
            $('#answer .modal-content').html(content);
            $('#modal-background').show();
            $('#answer').show();
            Jeopardy.soundboard.playAnswer();
        }
    }
};

Jeopardy.prototype.closeAnswer = function() {
    this._addData(null);
    this.updatePlayerlist();
    this.updateScoreboard();
    $('#answer').hide();
    $('#modal-background').hide();
    $('.modal-playerlist').html('');
    this.selected.event = null;
    this.selected.player = null;
    Jeopardy.soundboard.playScoreboard();
    this.saveToLocalStorage();
};

Jeopardy.prototype.onKeyboardBuzzed = function(keyboard_id) {
    console.log('keyboard buzzed: %s', keyboard_id);
    Jeopardy.soundboard.playBuzzer();

    if(this.selected.event === 'answer' && this.selected.player === null) {
        var player = this.getPlayerByKeyboard(keyboard_id);

        if(player !== null) {
            this.selected.player = this.player.indexOf(player);
            this.showBuzzButtons();
        } else {
            alert('well... something went wrong.');
        }
    } else if(this.selected.event === 'inputKeyboard') {
        var player = this.getPlayerByKeyboard(keyboard_id);

        if(player !== null) {
            alert('nice try.');
        } else {
            this.player[this.selected.player].id = keyboard_id;
            this.selected.event = null;
            this.selected.player = null;
            this.updatePlayerlist();
        }
    }
};

Jeopardy.prototype.onModalButtonClicked = function(event) {
    var value = $(event.currentTarget).val();
    $(event.currentTarget).blur();

    switch(value) {
        case 'win':
            this._addData('win');
            this.player[this.selected.player].points += this.selected.point;
            this.hideBuzzButtons();
            this.closeAnswer();
            break;

        case 'ups':
            this._addData('ups');
            this.hideBuzzButtons();
            break;

        case 'fail':
            this._addData('fail');
            this.player[this.selected.player].points -= this.selected.point;
            this.hideBuzzButtons();
            break;

        case 'nobody':
            this.closeAnswer();
            break;
    }
};

Jeopardy.prototype.showBuzzButtons = function() {
    $('.modal-playerlist').html('<div class="player-name player'+ (this.selected.player+1) +'">'+ this.getPlayerName(this.selected.player) +'</div>');
    $('.modal-nav button').blur();
    $('.modal-nav button.buzzed').show();
};

Jeopardy.prototype.hideBuzzButtons = function() {
    this.selected.player = null;
    $('.modal-playerlist').html('');
    $('.modal-nav button.buzzed').hide();
};

Jeopardy.prototype.onMute = function() {
    var mute = $('#menu-mute').data('mute');

    if(mute) {
        Howler.unmute();
        $('#menu-mute').html('<i class="fa fa-volume-up fa-lg"></i>');
    } else {
        Howler.mute();
        $('#menu-mute').html('<i class="fa fa-volume-off fa-lg"></i>');
    }

    $('#menu-mute').data('mute', !mute);
};

var mainmenu = null;

$(function(){
    // disable sound
    /*
    Howler.mute();
    $('#menu-mute').html('<i class="fa fa-volume-off fa-lg"></i>');
    $('#menu-mute').data('mute', true);
    */

    mainmenu = new MainMenu();
    
    $(document).ajaxError(function( event, jqxhr, settings, thrownError ) {
        console.log({event: event, jqxhr: jqxhr, settings: settings, thrownError: thrownError});
        alert('something went wrong...');
    });
});
