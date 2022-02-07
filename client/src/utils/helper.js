export const getOpacityInStep = () => {
  const opacityArray = [];
  for (let i = 0.1; i < 1; i += 0.1) {
    opacityArray.push(i);
  }
  return opacityArray;
};

// helper method
export const selectIndex = (array, item) => {
  return array.findIndex((arrItem) => arrItem === item);
};


export const allBrushtypes = () => {
  const brushArray = [];
  for(let i = 10 ; i<= 50; i+=5){
      brushArray.push(`${i}`)
  }
  return brushArray
}
