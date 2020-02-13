// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function () {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function () {
      return _(_.range(this.get('n'))).map(function (rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function (rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function (rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function (rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function () {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function (rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function () {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function (rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


    /*
             _             _     _
         ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
        / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
        \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
        |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

     */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    //input - rowIndex (row 0, 1 , 2)
    //output - boolean
    //return true if row has conflict false otherwise

    //takes in a row and returns if there are any conflicts
    hasRowConflictAt: function (rowIndex) {
      //iterate through the row and see if the total is greater than 1
      //create a row variable that holds the row array
      var row = this.get(rowIndex);
      //create a total variable that holds the total
      var total = 0;
      //iterate through the row to see if the total is greater than 1
      for (var i = 0; i < row.length; i++) {
        total = total + row[i];
        //if the row has a value greater than 1 conflict is true, otherwise false;
        if (total > 1) {
          return true;
        }
      }
      return false;
    },

    // test if any rows on this board contain conflicts
    //input
    //output boolean
    //constraints can't have an input
    //edge cases none


    hasAnyRowConflicts: function () {
      //iterates through each row and check if total value of the row > 1
      for (var i = 0; i < this.get(0).length; i++) {
        var result = this.hasRowConflictAt(i);
        if (result) {
          return true;
        }
      }
      return false;
    },





    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    //input number
    //output boolean
    //input must be a number
    hasColConflictAt: function (colIndex) {
      //create total variable
      var total = 0;
      //iterating through the rows at the colIndex in each row
      for (var i = 0; i < this.get(0).length; i++) {
        var row = this.get(i);
        total += row[colIndex];

        if (total > 1) {
          return true;
        }
      }
      return false;
      //checking if the total value of the column > 1
      //if so return true
      //return false;
    },

    // test if any columns on this board contain conflicts
    //input n/a

    hasAnyColConflicts: function () {
      //iterating through columns using the hascolconflict
      for (var i = 0; i < this.get(0).length; i++) {
        var result = this.hasColConflictAt(i);
        if (result) {
          return true;
        }
      }
      return false;
    },


    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function (majorDiagonalColumnIndexAtFirstRow) {
      //create total variable
      var total = 0;
      var col = 0;
      var row = 0;
      var x = (this.get(0).length - 1) - Math.abs(majorDiagonalColumnIndexAtFirstRow);
      if (majorDiagonalColumnIndexAtFirstRow >= 0) {
        col = majorDiagonalColumnIndexAtFirstRow;
        row = 0;
      } else {
        col = 0;
        row = majorDiagonalColumnIndexAtFirstRow * -1;
      }
      var placeHolder = 0;
      while (placeHolder <= x) {
        currentRow = this.get(row);
        total += currentRow[col];
        if (total > 1) {
          return true;
        }
        col++;
        row++;
        placeHolder++;
      }
      return false;
    },
    // check if input is positive or negative
    // if positive --> column is input and row is 0
    // if negative --> row is absolute input, column is 0
    //col counter
    //row counter
    //total variable
    //while (x < 4 - input)
    //total += this.attributes[row][col];
    //col ++
    //row ++
    //total > 1 return true
    //return false;

    // for (var i = 0; i < this.get(0).length; i++) {
    //   for (var j = 0; j < this.get(0).length; j++) {
    //     if (j - i === majorDiagonalColumnIndexAtFirstRow) {
    //       total += this.attributes[i][j];
    //     }
    //   }
    // }



    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function () {
      // use the hasmajordiagnoalconflict at function
      // takes one index parameter
      // use with loop
      // check every number --> range is from -n to n

      // itereate through rows
      // iterate through columns
      // grab given value for given position
      // run hmdca function at every position

      // use get to get negative and positive n values of board
      // insert that as parameter of the hmdca function
      // if true, return true
      // else false

      var beginning = (this.get(0).length - 1) * -1;
      var end = this.get(0).length;

      for (var i = beginning; i < end; i++) {
        // var result = this.hasMajorDiagonalConflictAt(1);
        // console.log(result);
        if (this.hasMajorDiagonalConflictAt(i)) {
          return true;
        }
      }
      return false;
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function (minorDiagonalColumnIndexAtFirstRow) {
      //check if input is greater than length
      //if input is greater than length -->
      var total = 0;
      var rows = this.rows();
      for (var i = 0; i < rows.length; i++) {
        for (var j = 0; j < rows.length; j++) {
          var result = this._getFirstRowColumnIndexForMinorDiagonalOn(i, j);
          if (result === minorDiagonalColumnIndexAtFirstRow && rows[i][j]) {
            total++;
          }
        }
        if (total > 1) {
          return true;
        }
      }
      return false;
    },

    // check if input is positive or negative
    // if positive --> column is input and row is 0
    // if negative --> row is absolute input, column is 0
    //col counter
    //row counter
    //total variable
    //while (x < 4 - input)
    //total += this.attributes[row][col];
    //col ++
    //row ++
    //total > 1 return true
    //return false;



    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function () {
      //create a beginning variable
      //create end variable

      var beginning = 0;
      var end = (this.get(0).length - 1) * 2;

      for (var i = beginning; i < end; i++) {
        // var result = this.hasMajorDiagonalConflictAt(1);
        // console.log(result);
        if (this.hasMinorDiagonalConflictAt(i)) {
          return true;
        }
      }
      return false;
    },


    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function (n) {
    return _(_.range(n)).map(function () {
      return _(_.range(n)).map(function () {
        return 0;
      });
    });
  };

}());
