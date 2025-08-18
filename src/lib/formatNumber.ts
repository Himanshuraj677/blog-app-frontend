const formatNumber = (count: number, precision:number=1): string => {
  if (count >= 1000) return `${(count / 1000).toFixed(precision)}k`;
  else return count.toString();
};

export default formatNumber;