const isEven = (num) => {
  return (Math.abs(num) & 1) !== 1;
};

module.exports = isEven;