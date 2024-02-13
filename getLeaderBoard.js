module.exports = getLeaderboard = async () => {
  let leaderboard = await fetch(`https://shdw-rewards-oracle.shdwdrive.com/node-leaderboard`);

  return(leaderboard.json());
}