// index.ts
import { Player, League } from './league';
import * as readlineSync from 'readline-sync';

const players: Player[] = [];

function mainMenu() {
  console.log('1. Register Player');
  console.log('2. Create Fixtures');
  console.log('3. Record Match Result');
  console.log('4. Display Standings');
  console.log('5. Display Top Scorers');
  console.log('6. Exit');

  const choice = readlineSync.question('Enter your choice: ');

  switch (choice) {
    case '1':
      registerPlayer();
      break;
    case '2':
      createFixtures();
      break;
    case '3':
      recordMatchResult();
      break;
    case '4':
      displayStandings();
      break;
    case '5':
      displayTopScorers();
      break;
    case '6':
      process.exit(0);
      break;
    default:
      console.log('Invalid choice. Please try again.');
      mainMenu();
  }
}

function registerPlayer() {
  const playerName = readlineSync.question('Enter player name: ');
  const psnId = readlineSync.question('Enter PSN ID: ');
  const club = readlineSync.question('Enter club: ');

  players.push(new Player(playerName, psnId, club));
  console.log(`${playerName} has been registered.`);
  mainMenu();
}

function createFixtures() {
  if (players.length < 2) {
    console.log('At least two players are required to create fixtures.');
    mainMenu();
    return;
  }

  const league = new League(players);
  league.createFixtures();
  console.log('Fixtures have been created.');
  mainMenu();
}

function recordMatchResult() {
  const league = new League(players);
  const player1Name = readlineSync.question('Enter player 1 name: ');
  const player2Name = readlineSync.question('Enter player 2 name: ');
  const player1Goals = parseInt(readlineSync.question('Enter player 1 goals: '), 10);
  const player2Goals = parseInt(readlineSync.question('Enter player 2 goals: '), 10);

  league.addMatch(player1Name, player2Name, player1Goals, player2Goals);
  console.log('Match result recorded.');
  mainMenu();
}

function displayStandings() {
  const league = new League(players);
  league.displayStandings();
  mainMenu();
}

function displayTopScorers() {
  const league = new League(players);
  league.displayTopScorers();
  mainMenu();
}

mainMenu();
