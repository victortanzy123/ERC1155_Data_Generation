let fs = require("fs");
let axios = require("axios");

let ipfsArray = [];
let promises = [];

for (let i = 0; i < 100; i++) {
  let paddedHexString =
    "0000000000000000000000000000000000000000000000000000000000000000" +
    i.toString(16).substring("-64");
  ipfsArray.push({
    path: `metadata/${paddedHexString}.json`,
    content: {
      image: `ipfs://Qm...FUzz/images/${paddedHexString}.png`,
      name: `My NFT Collection #${i}`,
      description: "My first NFT collection",
    },
  });
}

// Uploading to IPFS:
axios
  .post("https://deep-index.moralis.io/api/v2/ipfs/uploadFolder", ipfsArray, {
    headers: {
      "X-API-KEY": "INSERT KEY",
      "Content-Type": "application/json",
      accept: "application/json",
    },
  })
  .then((res) => {
    console.log(res.data);
  })
  .catch((error) => {
    console.log(error);
  });
