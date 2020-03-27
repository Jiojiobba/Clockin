// 根据id查询单条任务
const cloud = require('wx-server-sdk');
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});
const db = cloud.database();
const todos = db.collection('todotem');
const _ = db.command;
exports.main = async (event, context) => {
  try {
    const result = await todos.doc(event._id).get().then();
    return new Promise((resolve,reject)=>{
      resolve(result)
    });
  } catch (e) {
    return new Promise((resolve, reject) => {
      resolve(null)
    });
    console.error(e)
  }
}