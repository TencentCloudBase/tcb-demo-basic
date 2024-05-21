/* !
  Copyright (c) 2018 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/

function classNames(...args) {
  const classes = [];

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (!arg) continue;

    const argType = typeof arg;

    if (argType === 'string' || argType === 'number') {
      classes.push(arg);
    } else if (Array.isArray(arg)) {
      if (arg.length) {
        const inner = classes.push(classNames(...arg));
        if (inner) {
          classes.push(inner);
        }
      }
    } else if (argType === 'object') {
      if (arg.toString === Object.prototype.toString) {
        Object.keys(arg).forEach((key) => {
          arg[key] && classes.push(key);
        });
      } else {
        classes.push(arg.toString());
      }
    }
  }

  return classes.join(' ');
}

export default classNames;
