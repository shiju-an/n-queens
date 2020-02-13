/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

window.findNRooksSolution = function (n, startingColumnIndex) {
  var board = new Board({ n: n });
  var solution = [];
  var count = 0;
  startingColumnIndex = startingColumnIndex || 0;
  //iterate through the rows and columns checking for conflicts
  //looks at first row, checks each column moves to second
  // //moving through rows
  for (var i = 0; i < n; i++) {
    //moving through columns
    for (var j = startingColumnIndex; j < n; j++) {
      // console.log(i, j);
      board.togglePiece(i, j);
      // console.log(board, "initial");
      if (board.hasAnyRooksConflicts() === true) {
        // console.log('true conflict', i, j)
        board.togglePiece(i, j);
      } else {
        count++;
        console.log(count);
      }
    }
  }


  for (var i = 0; i < n; i++) {
    solution[i] = board.attributes[i];
  }

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};




// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function (n) {
  // magic recursive function
  // add another parameter to find n solution
  // have a starting index in row
  // every time you put it in give it a new place to start
  // recursively go through and do all possible solutions for first position
  // and have new starting position

  //input = n
  // output = number of all solutions
  var count = n;
  var matrixArray = [];

  for (var j = 0; j < n; j++) {
    matrixArray.push(findNRooksSolution(n, j));

    console.log(matrixArray);
  }




  var solutionCount = 0;

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function (n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function (n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};