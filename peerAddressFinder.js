const peers = require("./peers.json");

const findAddress = (ip) => {
  return peers.filter((peer) => peer.addr === ip);
}

console.log(findAddress('184.154.98.116:2030'));