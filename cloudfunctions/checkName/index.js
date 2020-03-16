// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database();
const todos = db.collection('todotem');
// const _=db.command
// 云函数入口函数
exports.main = async (event, context) => {
  try {
    return await todos.where({
     name:event.name
    }).get().then();
  } catch (e) {
    console.error(e)
  }
}