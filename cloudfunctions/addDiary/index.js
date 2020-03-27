const cloud = require('wx-server-sdk')
//添加任务
cloud.init()
const db = cloud.database();
const diarys = db.collection('diary');

exports.main = async (event, context) => {
  try {
    return await diarys.add({
      data: {
        _id:event._id,
        taskid:event.taskid,//任务id
        taskname: event.taskname,//任务名字
        color: event.color,//任务颜色
        buildtime: event.buildtime,//日志时间
        diarycontent:event.diarycontent
      }
    }).then()
  } catch (e) {
    console.error(e)
  }
}
  // return await db.collection('location').get();