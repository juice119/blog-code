// index.js
const fs = require("node:fs");

console.log("read 시작");
fs.readFile("./assets/TestDummyData.txt", () => {
	console.log("read 완료");
});
console.log("read 이후 (동기 코드 먼저 실행됨)");
