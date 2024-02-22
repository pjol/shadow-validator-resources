const peers = require("./peers.json");

module.exports = findIp = (address) => {
  return peers.filter((peer) => peer.pubkey === address);
}

console.log(findIp('EzxFgswVDu9S9sVZ1hM137AuqRvXudUdWzsa6t8tBEBj'));