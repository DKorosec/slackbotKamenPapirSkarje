class Player {
  constructor(name = "") {
    this.name = name;
    this.won = 0;
    this.lost = 0;
    this.tied = 0;
    this.currentWinStreak = 0;
    this.maxWinStreak = 0;
  }
  copy(obj) {
    for (let prop in this) {
      this[prop] = obj[prop];
    }
  }
  toString() {
    return `*${this.name}* \r\n > preigranih ${this.won + this.lost + this.tied} iger (zmag: ${this.won}, porazov: ${this.lost}) najvec zaporednih zmag: ${this.maxWinStreak}, trenutnih zaporednih zmag: ${this.currentWinStreak}`;
  }
}

class ScoreTable {
  constructor() {
    this.players = {};
  }
  loadState(state) {
    for (let id in state) {
      let player = new Player();
      player.copy(state[id]);
      this.players[player.name] = player;
    }
  }
  addPlayerIfNotExists(player) {
    if (!this.players[player.name])
      this.players[player.name] = player;
  }
  getPlayer(playerName) {
    return this.players[playerName];
  }
  getPlayers() {
    var list = [];
    for (let player in this.players)
      list.push(this.players[player]);
    return list;
  }
  setWin(playerName) {
    var player = this.players[playerName];
    player.won++;
    player.currentWinStreak++;
    if (player.currentWinStreak > player.maxWinStreak)
      player.maxWinStreak = player.currentWinStreak;
  }
  setLost(playerName) {
    this.players[playerName].lost++;
    this.players[playerName].currentWinStreak = 0;
  }
  setTie(playerName) {
    this.players[playerName].tied++;
  }
}

module.exports = { Player, ScoreTable };