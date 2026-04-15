export const getLineHeight = (fontSize: number, unit = 108) => {
  const lineHeight = fontSize * (unit / 100);

  return lineHeight;
};

export const getLetterSpacing = (fontSize: number, unit = 5) => {
  const letterSpacing = fontSize * (unit / 100);

  return letterSpacing;
};
