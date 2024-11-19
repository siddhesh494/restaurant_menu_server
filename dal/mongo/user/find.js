
const MongoHelper = require("./../mongo-helper")

const mongoHelper = new MongoHelper()
// console.log("mongoHelper", mongoHelper.collection())
// const collection = mongoHelper.collection("users")


async function getAllUser () {
  const collection = await mongoHelper.getInstance();
  const findResult = await collection.collection("users").find({}, { projection: { password: 0 } }).toArray();
  return findResult
}


module.exports = {
  getAllUser
}