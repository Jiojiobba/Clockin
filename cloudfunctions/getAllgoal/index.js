// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database();
const todos = db.collection('todotem');
const _=db.command
// 云函数入口函数
exports.main = async (event, context) => {
  // try {
  //   return await todos.get().then();
  // } catch (e) {
  //   console.error(e)
  // }
  try {
    var result = await todos.where({
      daytime: event.daytime,
    }).get().then();
    return result;
  } catch (e) {
    console.error(e)
  }
}
