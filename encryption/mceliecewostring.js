const crypto = require('crypto');

// Define McEliece parameters
const n = 15; // code length 8192
const t = 3; // error correction capability 110
const mt = 0; // error correction capability for the permutation
const m = 12; // number of information bits

// Step 1: Generate a random binary Goppa code
const generatorMatrix = generateRandomMatrix(n, m);
const decoderMatrix = generateDecoderMatrix(generatorMatrix, t);

// Step 2: Generate a random permutation matrix
const permutationMatrix = generateRandomPermutationMatrix(n);

// Step 3: Generate a random binary matrix as the private key
const privateKey = generateRandomMatrix(n, m);

// Step 4: Perform matrix operations to obtain the public key and the syndrome decoding matrix
const publicKey = multiplyMatrix(permutationMatrix, generatorMatrix);
const syndromeDecoderMatrix = multiplyMatrix(generatorMatrix, privateKey);

// Step 5: Encode the private key using the generator matrix
const ciphertext = multiplyMatrix(privateKey, generatorMatrix);

console.log('Public key:', publicKey);
console.log('Private key:', privateKey);
console.log('Ciphertext:', ciphertext);

// Helper function to generate a random binary matrix of size m x n
function generateRandomMatrix(m, n) {
  const matrix = [];
  for (let i = 0; i < m; i++) {
    const row = [];
    for (let j = 0; j < n; j++) {
      row.push(Math.random() < 0.5 ? 0 : 1);
    }
    matrix.push(row);
  }
  return matrix;
}

// Helper function to generate a random permutation matrix of size n x n
function generateRandomPermutationMatrix(n) {
  const permutation = new Array(n).fill(0).map((_, i) => i);
  for (let i = n - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [permutation[i], permutation[j]] = [permutation[j], permutation[i]];
  }
  const permutationMatrix = new Array(n).fill(0).map(() => new Array(n).fill(0));
  for (let i = 0; i < n; i++) {
    permutationMatrix[permutation[i]][i] = 1;
  }
  return permutationMatrix;
}

// Helper function to multiply two matrices
function multiplyMatrix(matrix1, matrix2) {
  const result = new Array(matrix1.length).fill(0).map(() => new Array(matrix2[0].length).fill(0));
  for (let i = 0; i < matrix1.length; i++) {
    for (let j = 0; j < matrix2[0].length; j++) {
      for (let k = 0; k < matrix1[0].length; k++) {
        result[i][j] ^= matrix1[i][k] & matrix2[k][j];
      }
    }
  }
  return result;
}

// Helper function to generate the syndrome decoding matrix for error correction
function generateDecoderMatrix(generatorMatrix, t) {
  const decoderMatrix = [];
  for (let i = 0; i < generatorMatrix[0].length; i++) {
    const column = new Array(t).fill(0);
    column[Math.floor(Math.random() * t)] = 1;
    decoderMatrix.push(column);
  }
  return decoderMatrix;
}