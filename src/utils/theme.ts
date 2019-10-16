const fontSize = (fs: number): string => fs / 14 + 'rem';

const theme = {
  primary: '#13c8b5',
  primaryHover: '#12baa9',
  secondary: '#757575',
  underlineColor: '#d0f4f0',
  disabledText: '#E0E0E0',
  dir: 'rtl',
  fs16: fontSize(16),
  fs14: fontSize(14),
  fs13: fontSize(13),
  fs12: fontSize(12),
  fs11: fontSize(11),
};

export default theme;
