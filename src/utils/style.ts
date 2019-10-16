export const align = props => {
  if (props.dir === undefined) {
    return props.theme.dir === 'rtl' ? 'right' : 'left';
  }
  return props.dir === 'rtl' ? 'right' : 'left';
};

export const isDirection = props => {
  if (props.dir === undefined) {
    return props.theme.dir === 'rtl' ? 'rtl' : 'ltr';
  }
  return props.dir;
};

export const getSize = (props, param1, param2) => {
  if (props.dir === undefined) {
    return props.theme.dir === 'rtl' ? param1 : param2;
  }
  return props.dir === 'rtl' ? param2 : param2;
};

export const reverseAlign = props => {
  if (props.dir === undefined) {
    return props.theme.dir === 'rtl' ? 'left' : 'right';
  }
  return props.dir === 'rtl' ? 'left' : 'right';
};
