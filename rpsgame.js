var ScoreTable = require('./scoreTable').ScoreTable;
var Player = require('./scoreTable').Player;

class RPSGame
{
  static get BotName()
  {
    return "SLACK_BOT";
  }
  static get StatusEnum()
  {
    return {lost:-1,won:1,tied:0};
  }
  static PickIdToName(id)
  {
    return RPSGame._pickName[id];
  }
  static GameStatusToName(status)
  {
    return RPSGame._nameGameStatus[id+1];
  }
  constructor()
  {
    this.scoreTable = new ScoreTable();
    this.scoreTable.addPlayerIfNotExists(new Player(RPSGame.BotName));
  }
  getRule(myPick,opponentPick)
  {
    return RPSGame._rules[myPick][opponentPick];
  }
  _jsonResponse(text)
  {
    return {text};
  }
  static pickIdToEmoji(id)
  {
    return [':fist:',':hand:', ':v:'][id];  
  }
  playWith(playerName,pick)
  {
    this.scoreTable.addPlayerIfNotExists(new Player(playerName));

    const playerPick = RPSGame._pickName.indexOf(pick);
    if(playerPick != -1)
    {
      const mypick = Math.floor(Math.random()*3);
      const gameResultForPlayer = this.getRule(playerPick,mypick);

      var myPickEmoji = RPSGame.pickIdToEmoji(mypick);
      var playerPickemoji = RPSGame.pickIdToEmoji(playerPick);

      switch(gameResultForPlayer)
      {
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
          return this._jsonResponse(`@${playername} je igral neodloceno! ${playerPickemoji} = ${myPickEmoji} `);
      }
    }
    return this._jsonResponse("Napacna izbira! Izberi 'kamen' ali 'papir' ali 'skarje'");
  }
}
//1D your pick, second dimension opponent pick
//[rock,paper,scissors]
Object.freeze(RPSGame._nameGameStatus = ["izgubil","zmagal","neodloceno"]);
Object.freeze(RPSGame._pickName = ["kamen","papir","skarje"]);
Object.freeze(RPSGame._rules = [
  [ 0, -1,  1], //rock
  [ 1,  0, -1], //paper
  [-1,  1,  0]  //scissors
]);

module.exports = RPSGame;