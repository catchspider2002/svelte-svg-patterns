const { convertFile } = require("convert-svg-to-png");

(async () => {
  const inputFilePath = "static/social/test.svg";
  const outputFilePath = await convertFile(inputFilePath, { width: "1200px", height: "627px" });

  console.log(outputFilePath);
  //=> "/path/to/my-image.png"
})();
