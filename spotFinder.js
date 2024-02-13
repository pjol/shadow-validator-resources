const getSpot = require('./getSpot.js')

const logSpot = async (address) => {
  const spotTuple = await getSpot(address);

  const node = spotTuple[0];
  const spot = spotTuple[1];

  console.log(spot);
  console.log(node);
}

logSpot('7NzjLAkRtGV1nibgTMtXzTK9pmZcreB5ghpovPeMYmpM');

