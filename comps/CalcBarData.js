
const calculateBarData = (data) => {
    if (data && data.length > 0) {
      const minimumWallThicknessData = data.map((item) => parseFloat(item.minimum_wall_thickness));
  
      // Define the range of lower and upper end values
      const lowerEnd = 0.85;
      const upperEnd = 1.25;
  
      // Calculate lower end and upper end values based on mean and range
      const lowerEndValue = minimumWallThicknessData.filter((value) => value < lowerEnd).length;
      const upperEndValue = minimumWallThicknessData.filter((value) => value > upperEnd).length;
      const meanValue = minimumWallThicknessData.filter((value) => value >= lowerEnd && value <= upperEnd).length;
  
      return [lowerEndValue, meanValue, upperEndValue];
    }
  };

  const limitsArray = [
    { lowerLimit: 180, upperLimit: 240 },
    { lowerLimit: 245, upperLimit: 270 },
    { lowerLimit: 255, upperLimit: 290 },
  ];

  const hLimitsArray = [
    {lowerLimit: 240, upperLimit: 255},
    {lowerLimit: 258, upperLimit: 272},
    {lowerLimit: 260, upperLimit: 280},
  ];
  
  const testfunc = (productSize, limitType) => {
    if (productSize === '10LT') {
      return limitType === 'lowerLimit' ? limitsArray[0].lowerLimit : limitsArray[0].upperLimit;
    } else if (productSize === '15LT') {
      return limitType === 'lowerLimit' ? limitsArray[1].lowerLimit : limitsArray[1].upperLimit;
    } else {
      return limitType === 'lowerLimit' ? limitsArray[2].lowerLimit : limitsArray[2].upperLimit;
    }
  };

  const testfuncTwo = (productSize, limitType) => {
    if (productSize === '10LT') {
      return limitType === 'lowerLimit' ? hLimitsArray[0].lowerLimit : hLimitsArray[0].upperLimit;
    } else if (productSize === '15LT') {
      return limitType === 'lowerLimit' ? hLimitsArray[1].lowerLimit : hLimitsArray[1].upperLimit;
    } else {
      return limitType === 'lowerLimit' ? hLimitsArray[2].lowerLimit : hLimitsArray[2].upperLimit;
    }
  };

  export { calculateBarData, testfunc, testfuncTwo };