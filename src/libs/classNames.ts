type ClassValue =
  | string
  | number
  | false
  | null
  | undefined
  | Record<string, unknown>;

export const classNames = (...args: ClassValue[]) => {
  const classes: Array<string | number> = [];
  for (const arg of args) {
    if (!arg) continue;
    const argType = typeof arg;
    if (argType === "string" || argType === "number") {
      classes.push(arg as string | number);
    } else if (argType === "object") {
      const obj = arg as Record<string, unknown> & { toString?: () => string };
      if (obj.toString && obj.toString !== Object.prototype.toString) {
        classes.push(obj.toString());
      } else {
        for (const key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key) && obj[key]) {
            classes.push(key);
          }
        }
      }
    }
  }
  return classes.join(" ");
};
