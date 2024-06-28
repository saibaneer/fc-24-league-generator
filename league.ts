// league.ts
export enum MatchResult {
    Win = "Win",
    Loss = "Loss",
    Draw = "Draw",
  }
  
  export class Player {
    player_name: string;
    club: string;
    psn_id: string;
    games_played: number;
    wins: number;
    losses: number;
    draws: number;
    goalsFor: number;
    goalsAgainst: number;
    goalDifference: number;
    points: number;
    lastFiveGames: MatchResult[];
  
    constructor(player_name: string, psn_id: string, club: string) {
      this.player_name = player_name;
      this.psn_id = psn_id;
      this.club = club;
      this.wins = 0;
      this.losses = 0;
      this.games_played = 0;
      this.draws = 0;
      this.goalsFor = 0;
      this.goalsAgainst = 0;
      this.goalDifference = 0;
      this.points = 0;
      this.lastFiveGames = [];
    }
  
    public addMatchResult(result: MatchResult, goalsFor: number, goalsAgainst: number) {
      if (result === MatchResult.Win) {
        this.wins++;
        this.points += 3;
      } else if (result === MatchResult.Loss) {
        this.losses++;
      } else if (result === MatchResult.Draw) {
        this.draws++;
        this.points++;
      }
  
      this.goalsFor += goalsFor;
      this.goalsAgainst += goalsAgainst;
      this.goalDifference = this.goalsFor - this.goalsAgainst;
      this.games_played++;
  
      this.lastFiveGames.unshift(result);
      if (this.lastFiveGames.length > 5) {
        this.lastFiveGames.pop();
      }
    }
  
    public getLastFiveGames() {
      return this.lastFiveGames;
    }
  }
  
  export class Match {
    player1: Player;
    player2: Player;
    player1Goals: number;
    player2Goals: number;
    result: MatchResult;
  
    constructor(player1: Player, player2: Player, player1Goals: number, player2Goals: number) {
      this.player1 = player1;
      this.player2 = player2;
      this.player1Goals = player1Goals;
      this.player2Goals = player2Goals;
      this.result = this.determineResult();
    }
  
    private determineResult() {
      if (this.player1Goals > this.player2Goals) {
        return MatchResult.Win;
      } else if (this.player1Goals < this.player2Goals) {
        return MatchResult.Loss;
      } else {
        return MatchResult.Draw;
      }
    }
  
    public applyResults() {
      this.player1.addMatchResult(this.result, this.player1Goals, this.player2Goals);
      this.player2.addMatchResult(this.invertResult(this.result), this.player2Goals, this.player1Goals);
    }
  
    private invertResult(result: MatchResult): MatchResult {
      if (result === MatchResult.Win) return MatchResult.Loss;
      if (result === MatchResult.Loss) return MatchResult.Win;
      return MatchResult.Draw;
    }
  }
  
  export class League {
    players: Player[];
    matches: Match[];
  
    constructor(players: Player[]) {
      this.players = players;
      this.matches = [];
    }
  
    public addMatch(player1Name: string, player2Name: string, player1Goals: number, player2Goals: number) {
      const player1 = this.players.find((p) => p.player_name === player1Name);
      const player2 = this.players.find((p) => p.player_name === player2Name);
  
      if (player1 && player2) {
        const match = new Match(player1, player2, player1Goals, player2Goals);
        match.applyResults();
        this.matches.push(match);
      }
    }
  
    public getStandings() {
      return this.players.sort((a, b) => b.points - a.points || b.goalDifference - a.goalDifference);
    }
  
    public displayStandings() {
      console.table(
        this.getStandings().map((player) => ({
          name: player.player_name,
          club: player.club,
          wins: player.wins,
          gamesPlayed: player.games_played,
          losses: player.losses,
          draws: player.draws,
          goalsFor: player.goalsFor,
          goalsAgainst: player.goalsAgainst,
          goalDifference: player.goalDifference,
          points: player.points,
        }))
      );
    }
  
    public getTopScorer() {
      return this.players.reduce((prev, current) => (prev.goalsFor > current.goalsFor ? prev : current));
    }
  
    public displayTopScorers() {
      console.table(
        this.players
          .sort((a, b) => b.goalsFor - a.goalsFor)
          .slice(0, 5)
          .map((player) => ({
            name: player.player_name,
            goalsFor: player.goalsFor,
          }))
      );
    }
  
    public createFixtures() {
      this.matches = [];
      for (let i = 0; i < this.players.length; i++) {
        for (let j = i + 1; j < this.players.length; j++) {
          this.matches.push(new Match(this.players[i], this.players[j], 0, 0)); // Placeholder for goals
          this.matches.push(new Match(this.players[j], this.players[i], 0, 0)); // Placeholder for goals
        }
      }
    }
  }
  