export const WINNING_COMBINATIONS = [];

// Generate all possible winning combinations for 5 in a row on a 10x10 board
for (let i = 0; i < 10; i++) {
  for (let j = 0; j <= 5; j++) {
    // Horizontal combinations
    WINNING_COMBINATIONS.push([
      {row: i, column: j},
      {row: i, column: j + 1},
      {row: i, column: j + 2},
      {row: i, column: j + 3},
      {row: i, column: j + 4},
    ]);

    // Vertical combinations
    WINNING_COMBINATIONS.push([
      {row: j, column: i},
      {row: j + 1, column: i},
      {row: j + 2, column: i},
      {row: j + 3, column: i},
      {row: j + 4, column: i},
    ]);
  }
}

// Diagonal combinations
for (let i = 0; i <= 5; i++) {
  for (let j = 0; j <= 5; j++) {
    // Diagonal from top-left to bottom-right
    WINNING_COMBINATIONS.push([
      {row: i, column: j},
      {row: i + 1, column: j + 1},
      {row: i + 2, column: j + 2},
      {row: i + 3, column: j + 3},
      {row: i + 4, column: j + 4},
    ]);

    // Diagonal from bottom-left to top-right
    WINNING_COMBINATIONS.push([
      {row: i + 4, column: j},
      {row: i + 3, column: j + 1},
      {row: i + 2, column: j + 2},
      {row: i + 1, column: j + 3},
      {row: i, column: j + 4},
    ]);
  }
}