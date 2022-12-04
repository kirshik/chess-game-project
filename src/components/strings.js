//  globals
const squares_letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
const squares_numbers = ["", 1, 2, 3, 4, 5, 6, 7, 8, ""];

//  signIn page
const signInlabel = "Chess game";
const signInLoginHelp = "Your username will only be used on the homepage";
const signInButton = "Sign In";

//  Home page

const homeH1 = "Chess with Friends";
const homeBtn1 = "Play with a friend";
const homeBtn2 = "Play with the computer";
const homeBtn3 = "Play with a friend online";

//  TypeMenu page
const bullet = "Bullet";
const blitz3 = "Blitz";
const blitz5 = "Blitz";
const rapid = "Rapid";
const classical = "Classical";
const noLimit = "No time limit";

const bulletSpan = "1 minute";
const blitz3Span = "3 minutes";
const blitz5Span = "5 minutes";
const rapidSpan = "10 minutes";
const classicalSpan = "30 minutes";



// Choose Piece

const piecesToPromote = ["Q", "N", "B", "R"];

// // Game
// const endGame = new Map([[1, "win"], [2, "draw"], [3, "stalemate"], [4, "threefold repetition"], [5, "insufficient material"]])


export { squares_letters, squares_numbers };
export { signInlabel, signInLoginHelp, signInButton };
export { homeH1, homeBtn1, homeBtn2, homeBtn3 };
export { bullet, blitz3, blitz5, rapid, classical, noLimit, bulletSpan, blitz3Span, blitz5Span, rapidSpan, classicalSpan };
export { piecesToPromote };