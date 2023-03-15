import bcrypt from "bcryptjs";

export const encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

export const validatePassword = async (candidatePassword, oldPassword) => {
  const result = await bcrypt.compare(candidatePassword, oldPassword);
  return result;
};
