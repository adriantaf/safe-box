const crypto = require('crypto');

const { SECRET_KEY } = require('./secret_key.cjs');

const secretKey = crypto.createHash('sha256').update(SECRET_KEY).digest();

// Función para encriptar la contraseña
function encryptPassword(password) {
  const iv = crypto.randomBytes(16);  // Generar un IV (vector de inicialización) aleatorio
  const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(secretKey), iv);  // Crear el cifrador AES

  let encrypted = cipher.update(password, 'utf-8', 'hex');  // Encriptar la contraseña
  encrypted += cipher.final('hex');  // Finalizar el proceso de encriptación
  return { iv: iv.toString('hex'), encryptedPassword: encrypted };  // Devuelve IV y contraseña encriptada
}

// Función para desencriptar la contraseña
function decryptPassword(encryptedData) {
  const iv = Buffer.from(encryptedData.iv, 'hex');  // Convertir el IV de hex a buffer
  const encryptedPassword = encryptedData.encryptedPassword;
  const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(secretKey), iv);  // Crear el descifrador AES
  let decrypted = decipher.update(encryptedPassword, 'hex', 'utf-8');  // Desencriptar la contraseña
  decrypted += decipher.final('utf-8');  // Finalizar el proceso de desencriptación
  return decrypted;  // Devuelve la contraseña desencriptada
}

module.exports = {
  encryptPassword,
  decryptPassword
}
