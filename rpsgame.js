var ScoreTable = require('./scoretable').ScoreTable;
var Player = require('./scoretable').Player;
class RPSGame {
  constructor(state = {}) {
    this.scoreTable = new ScoreTable();
    this.scoreTable.loadState(state);
    this.scoreTable.addPlayerIfNotExists(new Player(RPSGame.BotName));
  }

  static pickIdToEmoji(id) {
    return [':fist:', ':hand:', ':v:'][id];
  }

  static PickIdToName(id) {
    return RPSGame._pickName[id];
  }

  static get BotName() {
    return "SLACK_BOT";
  }

  static get StatusEnum() {
    return { lost: -1, won: 1, tied: 0 };
  }

  getRule(myPick, opponentPick) {
    return RPSGame._rules[myPick][opponentPick];
  }

  getStatus() {
    var output = "";
    for (let player of this.scoreTable.getPlayers()) {
      output += player.toString() + '\n';
    }
    return this._jsonResponse(output);
  }

  playWith(playerName, pick) {
    this.scoreTable.addPlayerIfNotExists(new Player(playerName));

    const playerPick = RPSGame._pickName.indexOf(pick);
    if (playerPick != -1) {
      const mypick = Math.floor(Math.random() * 3);
      const gameResultForPlayer = this.getRule(playerPick, mypick);

      var myPickEmoji = RPSGame.pickIdToEmoji(mypick);
      var playerPickemoji = RPSGame.pickIdToEmoji(playerPick);

      switch (gameResultForPlayer) {
        case RPSGame.StatusEnum.won:
          this.scoreTable.setWin(playerName);
          this.scoreTable.setLost(RPSGame.BotName);
          return this._jsonResponse(`@${playerName} je zmagal! ${playerPickemoji} > ${myPickEmoji} `);
        case RPSGame.StatusEnum.lost:
          this.scoreTable.setLost(playerName);
          this.scoreTable.setWin(RPSGame.BotName);
          return this._jsonResponse(`@${playerName} je izgubil! ${playerPickemoji} < ${myPickEmoji} `);
        case RPSGame.StatusEnum.tied:
          this.scoreTable.setTie(playerName);
          this.scoreTable.setTie(RPSGame.BotName);
          return this._jsonResponse(`@${playerName} je igral neodloceno! ${playerPickemoji} = ${myPickEmoji} `);
      }
    }
    throw "Napacna izbira! Izberi 'kamen' ali 'papir' ali 'skarje'";
  }
  _jsonResponse(responseText) {
    return { response_type: 'in_channel', text: responseText };
  }
}
//1D your pick, second dimension opponent pick
//[rock,paper,scissors]
Object.freeze(RPSGame._pickName = ["kamen", "papir", "skarje"]);
Object.freeze(RPSGame._rules = [
  [0, -1, 1], //rock
  [1, 0, -1], //paper
  [-1, 1, 0]  //scissors
]);

module.exports = RPSGame;