const getLeaderboard = async (address) => {
  let leaderboard = await fetch(`https://shdw-rewards-oracle.shdwdrive.com/node-leaderboard`);

  return(leaderboard.json());
}

const logSpot = async (address) => {
  const leaderboard = await getLeaderboard(address);

  let spot;

  const node = leaderboard.nodes.filter((node, index) => {
    if(node.node_id === address) {
      spot = index;
      return true;
    }
  })

  console.log(spot);
  console.log(node[0].total_rewards / 1000000000);
  console.log(node[0]);
}

logSpot('7NzjLAkRtGV1nibgTMtXzTK9pmZcreB5ghpovPeMYmpM');

