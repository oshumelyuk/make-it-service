const factorial = function(n) {
  console.log(`calc factorial for ${n}`);
  if (!Number.isFinite(n)) throw new Error(`${n} is not a Number`);
  return innerFactorial(n);
}

function innerFactorial(n) {
  if (n === 0 || n === 1) return n;
  return n * innerFactorial(n - 1);
}

module.exports = factorial;