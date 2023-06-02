// var getAvailableMoveIndex = require("./model.js");
// var getMove = new getAvailableMoveIndex
const minimax = require("./model.js");


var socket = require('socket.io-client')("http://192.168.1.131:4000");
var tournamentID = 142857;

console.log("started");


socket.on('connect', function(){
    socket.emit('signin', {
      user_name: "Jun Woo",
      tournament_id: tournamentID,
      user_role: 'player'
    });
  });

socket.on('ok_signin', function(){
    console.log("Successfully signed in!");
});

socket.on('ready', function(data){
    var gameID = data.game_id;
    var playerTurnID = data.player_turn_id;
    var board = data.board;
});

socket.on('finish', function(data){
    var gameID = data.game_id;
    var playerTurnID = data.player_turn_id;
    var winnerTurnID = data.winner_turn_id;
    var board = data.board;
});

socket.on('ready', function(data){
    var gameID = data.game_id;
    var playerTurnID = data.player_turn_id;
    var board = data.board;
    
    // TODO: Your logic / user input here

    console.log("==============================Turn===============================");
    console.table(board);
    console.log(playerTurnID);
    console.log(gameID);
    console.log("===========================Turn End==============================");
    const move = minimax(board, playerTurnID);

    
    socket.emit('play', {
      tournament_id: tournamentID,
      player_turn_id: playerTurnID,
      game_id: gameID,
      movement: move
    });
});

socket.on('finish', function(data){
    var gameID = data.game_id;
    var playerTurnID = data.player_turn_id;
    var winnerTurnID = data.winner_turn_id;
    var board = data.board;
    
    // TODO: Your cleaning board logic here
    console.log("\n\n\n\n\n\n")
    console.log("=============================Finished============================");
    console.table(board);


    socket.emit('player_ready', {
      tournament_id: tournamentID,
      player_turn_id: playerTurnID,
      game_id: gameID
    });
  });