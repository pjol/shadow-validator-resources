const peers = require("./peers.json");

const findIp = (address) => {
  return peers.filter((peer) => peer.pubkey === address);
}

console.log(findIp('9vGm6Dh5GGbLedoBSBo4zcoxfZJ6FcCsZufx2bNg6tKe'));