let fs = require("fs");
let axios = require("axios");

let ipfsArray = [];
let promises = [];

for (let i = 0; i < 100; i++) {
  // Padding with 64 characters: ERC1155 Metadata standard - 64 HEX characters:
  let paddedHexString =
    "0000000000000000000000000000000000000000000000000000000000000000" +
    i.toString(16).substring("-64");
  console.log(paddedHexString);

  // Add to promise for resolving later on:
  promises.push(
    new Promise((res, rej) => {
      fs.readFile(
        `${__dirname}/export/${paddedHexString}.png`,
        (error, data) => {
          // If error reject promise:
          if (error) rej();

          ipfsArray.push({
            path: `images/${paddedHexString}.png`,
            content: data.toString("base64"),
          });
          // Resolve:
          res();
        }
      );
    })
  );
}

Promise.all(promises).then(() => {
  axios
    .post("https://deep-index.moralis.io/api/v2/ipfs/uploadFolder", ipfsArray, {
      headers: {
        "X-API-KEY": "",
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
});
