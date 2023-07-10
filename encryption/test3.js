//const crypto = require('crypto');
const kyb = require('./kyber.js');
//const matrix = require('math');

// Generate a random binary matrix of size m x n
function generateRandomBinaryMatrix(m, n) {
  //console.log(kyb.c101);
  /*let matrix = [];
  for (let i = 0; i < m; i++) {
    let row = [];
    for (let j = 0; j < n; j++) {
      row.push(Math.round(Math.random()));
    }
    matrix.push(row);
  }
  kyb.keyGeneration;
  kyb.encrypt;*/
  const matrix1 = kyb.testkyber();
  console.log('kkk',matrix1);
  const matrixreduce  = (matrix1, m, n) => {
    const matrix = [];
    for (let i = 0; i < m && i < matrix1.length; i++) {
      const row = [];
      for (let j = 0; j < n && j < matrix1[0].length; j++) {
        row.push(matrix1[i][j]);
      }
      matrix.push(row);
    }
    return matrix;
  }
  return matrixreduce(matrix1,m,n);
}

// Generate a random permutation of the integers 0 to n-1
function generateRandomPermutation(n) {
  let permutation = [];
  for (let i = 0; i < n; i++) {
    permutation.push(i);
  }
  for (let i = n - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = permutation[i];
    permutation[i] = permutation[j];
    permutation[j] = temp;
  }
  return permutation;
}

// Key generation
function generateKeyPair(n, t) {
  let k = Math.floor((n - 1) / 2) - t;
  let G = generateRandomBinaryMatrix(n - k, n); //pub
  let P = generateRandomBinaryMatrix(k, k);  //pvt
  var Q = generateRandomBinaryMatrix(n - k, n - k); //pub
  let H1 = []; //pvt
  let H2 = []; //pvt
  console.log(Q);
  for (let i = 0; i < k; i++) {
    H1.push(G[i]);
    H2.push([]);
    //console.log(Q);
    for (let j = 0; j < n - k; j++) {
      H2[i].push(Q[i][j]);
    }
    for (let j = 0; j < k; j++) {
      H2[i].push(P[j][i]);
    }
  }
  let H = [];
  for (let i = 0; i < n - k; i++) {
    H.push(H1[i].concat(H2[i]));
  }
  let publicKey = { G: G, Q: Q };
  let privateKey = { P: P, H1: H1, H2: H2 };

  return { publicKey: publicKey, privateKey: privateKey };
}

// Encryption
function encodeMessage(message, publicKey) {
  let n = publicKey.G[0].length;
  let k = publicKey.G.length;
  let m = Math.ceil(message.length * 8 / k);
  let paddingLength = m * k * 8 - message.length * 8;
  let padding = Buffer.alloc(paddingLength, 0);
  let plaintext = Buffer.concat([message, padding]);
  let plaintextBlocks = [];
  for (let i = 0; i < m; i++) {
    let block = [];
    for (let j = 0; j < k; j++) {
      let byteIndex = i * k + j;
      let bitIndex = byteIndex * 8;
      let byte = (byteIndex < message.length) ? message[byteIndex] : padding[byteIndex - message.length];
      let bit = (byte >> (7 - bitIndex % 8)) & 1;
      block.push(bit);
    }
    plaintextBlocks.push(block);
  }
  let error = generateRandomBinaryMatrix(n - k, m);
  let codewordBlocks = [];
  for (let i = 0; i < n; i++) {
    let block = [];
    for (let j = 0; j < m; j++) {
      let sum = 0;
      for (let l = 0; l < k; l++) {
        sum += publicKey.G[l][i] * plaintextBlocks[j][l];
      }
      //console.log(sum)
      //console.log(error)
      block.push((sum + error[i]) % 2);
    }
    codewordBlocks.push(block);
  }
  let codeword = Buffer.alloc(n * m / 8, 0);
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      let byteIndex = Math.floor(i * m / 8) + j / 8;
      let bitIndex = 7 - j % 8;
      let bit = codewordBlocks[i][j];
      codeword[byteIndex] |= (bit << bitIndex);
    }
  }
  return codeword;
}

// Decryption
function decodeCodeword(codeword, privateKey) {
  let n = privateKey.H1[0].length;
  let k = privateKey.H2[0].length;
  let m = codeword.length * 8 / n;
  let codewordBlocks = [];
  for (let i = 0; i < n; i++) {
    let block = [];
    for (let j = 0; j < m; j++) {
      let byteIndex = Math.floor(i * m / 8) + j / 8;
      let bitIndex = 7 - j % 8;
      let bit = (codeword[byteIndex] >> bitIndex) & 1;
      block.push(bit);
    }
    codewordBlocks.push(block);
  }
  let syndrome = [];
  for (let i = 0; i < n - k; i++) {
    let sum = 0;
    for (let j = 0; j < n; j++) {
      sum += privateKey.H1[i][j] * codewordBlocks[j][0];
    }
    syndrome.push(sum % 2);
  }
  let error = [];
  for (let i = 0; i < n - k; i++) {
    error.push(syndrome[i]);
  }
  for (let i = 0; i < k; i++) {
    let sum = 0;
    for (let j = 0; j < n - k; j++) {
      sum += privateKey.H2[j][i] * syndrome[j];
    }
    error.push(sum % 2);
  }
  let plaintextBlocks = [];
  for (let i = 0; i < m; i++) {
    let block = [];
    for (let j = 0; j < k; j++) {
      let sum = 0;
      for (let l = 0; l < n; l++) {
        sum += privateKey.P[j][l] * codewordBlocks[l][i];
      }
      block.push((sum + error[i * (n - k) + j]) % 2);
    }
    plaintextBlocks.push(block);
  }
  let plaintext = Buffer.alloc(m * k / 8, 0);
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < k; j++) {
      let byteIndex = i * k / 8 + j / 8;
      let bitIndex = 7 - j % 8;
      let bit = plaintextBlocks[i][j];
      plaintext[byteIndex] |= (bit << bitIndex);
    }
  }
  return plaintext;
}

// main func
let keyPair = generateKeyPair(8192, 128);
let message = Buffer.from('Hello');
console.log('Original message:', message.toString());
let codeword = encodeMessage(message, keyPair.publicKey);
console.log('Codeword:', codeword);
let decodedMessage = decodeCodeword(codeword, keyPair.privateKey);
console.log('Decoded message:', decodedMessage.toString());