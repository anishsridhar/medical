const crypto = require('crypto');

// Define McEliece parameters
const n = 8192; // code length
const t = 110; // error correction capability

// Step 1: Generate a McEliece key pair
const keyPair = generateKeyPair(n, t);

// Extract public and private keys from the key pair
const publicKey = keyPair.publicKey;
const privateKey = keyPair.privateKey;

// Step 2: Encrypt the plaintext using the public key
const plaintext = 'Hello, world!';
const ciphertext = encrypt(plaintext, publicKey);

console.log('Plaintext:', plaintext);
console.log('Ciphertext:', ciphertext);

// Step 3: Decrypt the ciphertext using the private key
const decryptedText = decrypt(ciphertext, privateKey);
console.log('Decrypted text:', decryptedText);

// Helper function to generate a McEliece key pair
function generateKeyPair(n, t) {
  const privateKey = generatePrivateKey(n);
  const publicKey = computePublicKey(privateKey, n, t);
  return { publicKey, privateKey };
}

// Helper function to generate a random private key
function generatePrivateKey(n) {
  const privateKey = Buffer.alloc(n);
  crypto.randomFillSync(privateKey);
  return privateKey;
}

// Helper function to compute the public key from the private key
function computePublicKey(privateKey, n, t) {
  const publicKey = Buffer.alloc(n - t);
  for (let i = 0; i < n - t; i++) {
    for (let j = 0; j < n; j++) {
      if (privateKey[j] === 1) {
        publicKey[i] ^= privateKey[(j + i) % n];
      }
    }
  }
  return publicKey;
}

// Helper function to encrypt plaintext using the public key
function encrypt(plaintext, publicKey) {
  const plaintextBits = Buffer.from(plaintext, 'utf8');
  const ciphertextBits = Buffer.alloc(plaintextBits.length);
  for (let i = 0; i < plaintextBits.length; i++) {
    for (let j = 0; j < 8; j++) {
      const bit = (plaintextBits[i] >> j) & 1;
      if (bit === 1) {
        ciphertextBits[i] ^= publicKey[(i * 8) + j];
      }
    }
  }
  const ciphertext = ciphertextBits.toString('base64');
  return ciphertext;
}

// Helper function to decrypt ciphertext using the private key
function decrypt(ciphertext, privateKey) {
  const ciphertextBits = Buffer.from(ciphertext, 'base64');
  const decryptedBits = Buffer.alloc(Math.ceil(ciphertextBits.length * 8 / (n - t))); // Update buffer size
  let j = 0; // Initialize j outside the loop
  for (let i = 0; i < ciphertextBits.length; i++) {
    for (let k = 0; k < 8; k++) { // Update loop variable from j to k
      decryptedBits[(i * 8) + k] = (ciphertextBits[i] >> k) & 1; // Update from j to k
    }
  }
  for (let i = 0; i < decryptedBits.length; i++) {
    decryptedBits[i] ^= privateKey[i % privateKey.length]; // Update to use i mod privateKey.length
  }
  const decryptedText = decryptedBits.toString('utf8'); // Update to use 'utf8'
  return decryptedText;
}