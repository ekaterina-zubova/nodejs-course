import fs from "fs";
import csv from "csvtojson";

const writeStream = fs.createWriteStream("task_1.2/files/nodejs-hw1-ex1.txt", {
  flags: "a",
});

csv()
  .fromFile("task_1.2/files/nodejs-hw1-ex1.csv")
  .preFileLine((fileLine, lineIndex) => {
    return lineIndex === 0 ? fileLine.toLowerCase() : fileLine;
  })
  .subscribe(
    (json) => {
      return new Promise((resolve, reject) => {
        try {
          writeStream.write(JSON.stringify(json) + "\r\n");
          resolve(json);
        } catch (e) {
          reject(e);
        }
      });
    },
    (error) => {
      console.log(error.message);
    },
    () => {
      console.log("Completed");
    }
  );
