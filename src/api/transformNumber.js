const transformNumber = item => {
  const buy = parseFloat(item.buy).toFixed(2);
  const sale = parseFloat(item.sale).toFixed(2);
  return { buy, sale };
};

export default transformNumber;
