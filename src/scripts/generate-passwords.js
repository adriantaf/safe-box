function generatePass(length = 20, includeUppercase = true, includeNumbers = true, includeSpecialChars = true) {
  const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
  const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numberChars = "0123456789";
  const specialChars = "!@#$%^&*()-_=+[]{}|;:,.<>?/";

  let characterPool = lowercaseChars;

  if (includeUppercase) characterPool += uppercaseChars;
  if (includeNumbers) characterPool += numberChars;
  if (includeSpecialChars) characterPool += specialChars;

  if (characterPool.length === 0) {
    throw new Error("Debe incluir al menos un tipo de carácter.");
  }

  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characterPool.length);
    password += characterPool[randomIndex];
  }

  return password.trim();
}

export default generatePass;