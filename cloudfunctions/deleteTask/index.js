// 删除任务
const cloud = require('wx-server-sdk')

// cloud.init()
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database();
const todos = db.collection('todos');
// const _=db.command
exports.main = async (event, context) => {
  try {
    return await todos.where({
      _id: event._id
    }).remove()
  } catch (e) {
    console.error(e)
  }
}