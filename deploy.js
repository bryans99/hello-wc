const fs = require("fs-extra");
const concat = require("concat");
(async function build() {
  await fs.ensureDir("./public");
  await fs.copyFile("./dist/hello-wc/main.js", "./public/hello/main.js");
})();
