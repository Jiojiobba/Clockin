// 获取已结束任务
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database();
const todos = db.collection('todotem');
const _ = db.command
// 云函数入口函数
exports.main = async (event, context) => {
  try {
    var result = await todos.where({
      isEnd: false,
    }).get().then();
    return new Promise((resolve, reject) => {
      resolve(result);
    });
  } catch (e) {
    console.error(e)
  }
}
