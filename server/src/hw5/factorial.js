function factorial(n) {
  if (!(n instanceof Number)) throw new Error(`${n} is not a Number`);
  return innerFactorial(n);
}

function innerFactorial(n) {
  if (n === 0 || n === 1) return n;
  return n * innerFactorial(n - 1);
}

export default factorial;
