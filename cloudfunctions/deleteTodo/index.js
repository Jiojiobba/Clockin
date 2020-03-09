// 云函数入口文件
const cloud = require('wx-server-sdk')

// cloud.init()
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database();
const todos = db.collection('todos');
// const _=db.command
// 云函数入口函数
exports.main = async (event, context) => {
  try {
    return await todos.where({
      select: true
    }).remove()
  } catch (e) {
    console.error(e)
  }
}