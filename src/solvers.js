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

window.findNRooksSolution = function (n) {
  var board = new Board({ n: n });
  var solution = [];
  //iterate through the rows and columns checking for conflicts
  //looks at first row, checks each column moves to second
  // //moving through rows
  for (var i = 0; i < n; i++) {
    //moving through columns
    for (var j = 0; j < n; j++) {
      // console.log(i, j);
      board.togglePiece(i, j);
      // console.log(board, "initial");
      if (board.hasAnyRooksConflicts() === true) {
        // console.log('true conflict', i, j)
        board.togglePiece(i, j);
      }
    }
  }

  for (var i = 0; i < n; i++) {
    solution.push(board.attributes[i]);
  }

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};




// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function (n) {
  var board = new Board({ n: n });
  //create solution count variable
  var solutionCount = 0;
  //create row variable = 0;
  var row = 0;
  //create a traverseRow function which takes a row
  var traverseRow = function (row) {
    if (row === n) {
      solutionCount++;
      return;
    } else {
      for (var i = 0; i < n; i++) {
        board.togglePiece(i, row)
        if (board.hasAnyRooksConflicts() === false) {
          traverseRow(row + 1);
        }
        board.togglePiece(i, row);
      }
    }
  };

  traverseRow(row);

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function (n) {

  // input = n number of rows and columns
  // output = matrix = array of arrays of solution 1 --> [[],[],[]]

  // start at first row first column
  // two for loops
  // toggle all on
  // if have a conflict
  // toggle off

  var board = new Board({ n: n });
  if (n === 2 || n === 3) {
    return board.rows();
  }
  // var solutionArray = [];
  var row = 0;
  var solution = null;
  var traverseRow = function (row) {
    if (row === n) {
      var matrix = board.rows();
      solution = matrix.map(function(array) {
        return array.slice();
      });
      // solutionArray.push(board.rows());
      // console.log(solutionArray);
    } else {
      for (var i = 0; i < n; i++) {
        board.togglePiece(i, row);
        if (!board.hasAnyQueensConflicts()) {
          traverseRow(row + 1);
        }
        board.togglePiece(i, row);
      }
    }
  };

  traverseRow(row);
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  // var solution = solutionArray[0];
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function (n) {
  // create a row variable set to 0 to start at first row
  // create the helper function --> recursive
  // base case --> when the row is equal to n (so last row)
  // add one to solutions and return/break out of that recurse
  // loop through columns
  // toggle piece on
  // if no conflict
  // recurse with row + 1;
  // else
  // toggle off
  var solutionCount = 0;
  var board = new Board({ n: n });
  var row = 0;

  var traverseRow = function (row) {

    if (row === n) {
      solutionCount++;
      return;
    } else {
      for (var i = 0; i < n; i++) {
        board.togglePiece(i, row);
        if (!board.hasAnyQueensConflicts()) {
          traverseRow(row + 1);
        }
        board.togglePiece(i, row);
      }
    }

  }

  traverseRow(row);
  // run helper function on rows

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};