const combo = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
export const generateID = (len: number): string => {
  let ID = "";
  for (let i = 0; i < len; i++) {
    ID += combo[Math.floor(Math.random() * combo.length)];
  }
  return ID;
};
