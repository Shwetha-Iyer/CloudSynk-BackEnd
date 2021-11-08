const {DB_USERNAME,DB_PASSWORD,DB_CLUSTER,DB_NAME} = require("./environment");
const mongoDB = require("mongodb");
const mongoClient = mongoDB.MongoClient;
const connectDB = async()=>{
    let client = await mongoClient.connect(`mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@${DB_CLUSTER}.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`,{
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
    let db = client.db(DB_NAME);
    return db;
};
const objectId = mongoDB.ObjectId;
module.exports = {connectDB,objectId};