import mongoose from "mongoose";

export default (app) => {
  mongoose.Promise = global.Promise;
  // 线上环境
    mongoose.connect("mongodb://47.98.195.42:27017/bigMonkey", 
    // {
    //   user: "ministackOwner",
    //   pass: "Mini@stack&1011",
    //   // useMongoClient: true,
    //   reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
    //   reconnectInterval: 1000, // Reconnect every 500ms
    //   poolSize: 10, // Maintain up to 10 socket connections
    //   // If not connected, return errors immediately rather than waiting for reconnect
    //   bufferMaxEntries: 0
    // }
    );
  mongoose.connection
    .once("open", () => console.log(`mongoose connection success`))
    .on("error", error => console.log("mongoose connection error", error));
};
