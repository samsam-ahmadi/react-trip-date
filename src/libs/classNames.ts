export const classNames = (...args: any[]) => {
  let classes = [];
  for (let i = 0; i < args.length; i++) {
    let arg = args[i];
    if (!arg) continue;
    let argType = typeof arg;
    if (argType === "string" || argType === "number") {
      classes.push(arg);
    } else if (argType === "object") {
      if (arg.toString !== Object.prototype.toString) {
        classes.push(arg.toString());
      } else {
        for (let key in arg) {
          if (arg.hasOwnProperty(key) && arg[key]) {
            classes.push(key);
          }
        }
      }
    }
  }
  return classes.join(" ");
};
