const getLeaderboard = require('./getLeaderboard');
const ipFinder = require('./peerIpFinder.js');

const findIps = async () => {
  const leaderboard = await getLeaderboard();

  const ips = [];

  for(let i = 0; i < 150; i++) {
    let ip = ipFinder(leaderboard?.nodes[i]?.node_id);
    ips.push(ip[0]);
  }

  let sortedIps = {};

  ips.forEach((node) => {

    let ip = node?.addr;

    let prefix1 = ip?.split('.')[0];
    let prefix2 = ip?.split('.')[1];
    let prefix3 = ip?.split('.')[2];

    let prefixString = prefix1 + prefix2 + prefix3;


    if(!sortedIps[prefixString]) {
      sortedIps[prefixString] = [];
    }
    sortedIps[prefixString].push(node);
  })



  let sorted = [];

  Object.keys(sortedIps).map((key) => {
    console.log(key);
    if(sortedIps[key].length > 1 && key !== 'NaN') {
      sorted.push(sortedIps[key]);
    }
  })
  return(sorted);
}

findIps().then(console.log);