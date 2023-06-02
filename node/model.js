function minimax(board, playerTurnId) {
  function evaluate(board) {
    // Define the evaluation function for the current player (1 or 2)
    // You can adjust the evaluation values according to your game logic
    const player = playerTurnId === 1 ? 1 : 2;
    const opponent = player === 1 ? 2 : 1;

    let score = 0;

    // Evaluate rows
    for (let row = 0; row < 6; row++) {
      for (let col = 0; col < 4; col++) {
        const slice = board[row].slice(col, col + 4);
        const playerCount = slice.filter((cell) => cell === player).length;
        const opponentCount = slice.filter((cell) => cell === opponent).length;

        if (playerCount === 4) {
          score += 100;
        } else if (opponentCount === 4) {
          score -= 100;
        } else {
          score += playerCount;
          score -= opponentCount;
        }
      }
    }

    // Evaluate columns
    for (let col = 0; col < 7; col++) {
      for (let row = 0; row < 3; row++) {
        const slice = [
          board[row][col],
          board[row + 1][col],
          board[row + 2][col],
          board[row + 3][col],
        ];
        const playerCount = slice.filter((cell) => cell === player).length;
        const opponentCount = slice.filter((cell) => cell === opponent).length;

        if (playerCount === 4) {
          score += 100;
        } else if (opponentCount === 4) {
          score -= 100;
        } else {
          score += playerCount;
          score -= opponentCount;
        }
      }
    }

    // Evaluate diagonals
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 4; col++) {
        const slice = [
          board[row][col],
          board[row + 1][col + 1],
          board[row + 2][col + 2],
          board[row + 3][col + 3],
        ];
        const playerCount = slice.filter((cell) => cell === player).length;
        const opponentCount = slice.filter((cell) => cell === opponent).length;

        if (playerCount === 4) {
          score += 100;
        } else if (opponentCount === 4) {
          score -= 100;
        } else {
          score += playerCount;
          score -= opponentCount;
        }
      }
    }

    for (let row = 0; row < 3; row++) {
      for (let col = 3; col < 7; col++) {
        const slice = [
          board[row][col],
          board[row + 1][col - 1],
          board[row + 2][col - 2],
          board[row + 3][col - 3],
        ];
        const playerCount = slice.filter((cell) => cell === player).length;
        const opponentCount = slice.filter((cell) => cell === opponent).length;

        if (playerCount === 4) {
          score += 100;
        } else if (opponentCount === 4) {
          score -= 100;
        } else {
          score += playerCount;
          score -= opponentCount;
        }
      }
    }

    return score;
  }

  function isGameOver(board) {
    // Check if the game is over (board full or a player wins)
    // Returns 1 if player 1 wins, 2 if player 2 wins, 0 if it's a draw, or -1 if the game is not over

    // Check for a draw
    let isDraw = true;
    for (let row = 0; row < 6; row++) {
      for (let col = 0; col < 7; col++) {
        if (board[row][col] === 0) {
          isDraw = false;
          break;
        }
      }
      if (!isDraw) {
        break;
      }
    }

    if (isDraw) {
      return 0; // Draw
    }

    // Check for a win
    const winningPositions = [
      // Rows
      [[0, 0], [0, 1], [0, 2], [0, 3]],
      [[1, 0], [1, 1], [1, 2], [1, 3]],
      [[2, 0], [2, 1], [2, 2], [2, 3]],
      [[3, 0], [3, 1], [3, 2], [3, 3]],
      [[4, 0], [4, 1], [4, 2], [4, 3]],
      [[5, 0], [5, 1], [5, 2], [5, 3]],

      // Columns
      [[0, 0], [1, 0], [2, 0], [3, 0]],
      [[0, 1], [1, 1], [2, 1], [3, 1]],
      [[0, 2], [1, 2], [2, 2], [3, 2]],
      [[0, 3], [1, 3], [2, 3], [3, 3]],
      [[1, 0], [2, 0], [3, 0], [4, 0]],
      [[1, 1], [2, 1], [3, 1], [4, 1]],
      [[1, 2], [2, 2], [3, 2], [4, 2]],
      [[1, 3], [2, 3], [3, 3], [4, 3]],
      [[2, 0], [3, 0], [4, 0], [5, 0]],
      [[2, 1], [3, 1], [4, 1], [5, 1]],
      [[2, 2], [3, 2], [4, 2], [5, 2]],
      [[2, 3], [3, 3], [4, 3], [5, 3]],

      // Diagonals
      [[0, 0], [1, 1], [2, 2], [3, 3]],
      [[0, 1], [1, 2], [2, 3], [3, 4]],
      [[0, 2], [1, 3], [2, 4], [3, 5]],
      [[0, 3], [1, 4], [2, 5], [3, 6]],
      [[1, 0], [2, 1], [3, 2], [4, 3]],
      [[1, 1], [2, 2], [3, 3], [4, 4]],
      [[1, 2], [2, 3], [3, 4], [4, 5]],
      [[1, 3], [2, 4], [3, 5], [4, 6]],
      [[2, 0], [3, 1], [4, 2], [5, 3]],
      [[2, 1], [3, 2], [4, 3], [5, 4]],
      [[2, 2], [3, 3], [4, 4], [5, 5]],
      [[2, 3], [3, 4], [4, 5], [5, 6]],
    ];

    for (let pos of winningPositions) {
      const [row1, col1] = pos[0];
      const [row2, col2] = pos[1];
      const [row3, col3] = pos[2];
      const [row4, col4] = pos[3];

      const cell1 = board[row1][col1];
      const cell2 = board[row2][col2];
      const cell3 = board[row3][col3];
      const cell4 = board[row4][col4];

      if (
        cell1 !== 0 &&
        cell1 === cell2 &&
        cell1 === cell3 &&
        cell1 === cell4
      ) {
        return cell1; // A player wins
      }
    }

    return -1; // Game not over
  }

  function generateMoves(board) {
    // Generate all possible moves (indices) on the board
    const moves = [];
    for (let col = 0; col < 7; col++) {
      if (board[0][col] === 0) {
        moves.push(col);
      }
    }
    return moves;
  }

  function cloneBoard(board) {
    // Create a deep clone of the board
    return JSON.parse(JSON.stringify(board));
  }

  function makeMove(board, col, player) {
    // Make a move for the given player in the specified column
    for (let row = 5; row >= 0; row--) {
      if (board[row][col] === 0) {
        board[row][col] = player;
        break;
      }
    }
  }

  function undoMove(board, col) {
    // Undo the last move in the specified column
    for (let row = 0; row < 6; row++) {
      if (board[row][col] !== 0) {
        board[row][col] = 0;
        break;
      }
    }
  }

  function minimaxRecursive(board, depth, maximizingPlayer) {
    const gameResult = isGameOver(board);

    if (gameResult !== -1) {
      // Game is over
      if (gameResult === 0) {
        return 0; // Draw
      } else if (gameResult === playerTurnId) {
        return 100 - depth; // Player 1 wins
      } else {
        return -100 + depth; // Player 2 wins
      }
    }

    if (depth === 0) {
      // Reached the maximum depth
      return evaluate(board);
    }

    const moves = generateMoves(board);
    let bestValue;

    if (maximizingPlayer) {
      bestValue = -Infinity;
      for (let move of moves) {
        makeMove(board, move, playerTurnId);
        const value = minimaxRecursive(board, depth - 1, false);
        undoMove(board, move);
        bestValue = Math.max(bestValue, value);
      }
    } else {
      bestValue = Infinity;
      for (let move of moves) {
        makeMove(board, move, 3 - playerTurnId);
        const value = minimaxRecursive(board, depth - 1, true);
        undoMove(board, move);
        bestValue = Math.min(bestValue, value);
      }
    }

    return bestValue;
  }

  let bestMove;
  let bestValue = -Infinity;

  const moves = generateMoves(board);

  for (let move of moves) {
    makeMove(board, move, playerTurnId);
    const value = minimaxRecursive(board, 4, false);
    undoMove(board, move);

    if (value > bestValue) {
      bestValue = value;
      bestMove = move;
    }
  }

  return bestMove;
}



var board = [
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [1, 2, 0, 0, 0, 0, 0],
  [1, 2, 0, 0, 0, 0, 0],
];

var playerTurnId = 1;

var bestMove = minimax(board, playerTurnId);
console.log("Best Move:", bestMove);

module.exports = minimax;