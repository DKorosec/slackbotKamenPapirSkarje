"use strict"
class Player{
  constructor(name)
  {
    this.name = name;
    this.won = 0;
    this.lost = 0;
    this.tied = 0;
  }
  toString()
  {
      return `${this.name} ima ${this.won+this.lost+this.tied} iger, od tega #${this.won} zmag in #${this.tied} porazov.`;
  }
}

class ScoreTable{
  constructor()
  {
    this.players = {};
  }
  addPlayerIfNotExists(player)
  {
    if(!this.players[player.name])
      this.players[player.name] = player;
  }
  getPlayer(playerName)
  {
    return this.players[playerName];
  }
  getPlayers()
  {
    var list = [];
    for(let player in this.players)
      plist.push(player);
    return list;
  }
  setWin(playerName)
  {
    this.players[playerName].won++;
  }
  setLost(playerName)
  {
    this.players[playerName].lost++;
  }
  setTie(playerName)
  {
    this.players[playerName].tied++;
  }
}

module.exports = {Player,ScoreTable};