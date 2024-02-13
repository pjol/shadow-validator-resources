const getLeaderboard = require('./getLeaderboard');

module.exports = getSpot = async (address) => {
  const leaderboard = await getLeaderboard();

  let spot;

  const node = leaderboard.nodes.filter((node, index) => {
    if(node.node_id === address) {
      spot = index;
      return true;
    }
  })

  return [node[0], spot];
}