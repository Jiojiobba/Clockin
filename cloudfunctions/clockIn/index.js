//打卡
const cloud = require('wx-server-sdk');
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});
const db = cloud.database();
const todos = db.collection('todotem');
const _ = db.command;

// 云函数入口函数
exports.main = async (event, context) => {

  const back = await cloud.callFunction({
    name: 'clockInWhatday',
    data: {
      _id: event._id,
      today_year: event.today_year,
      today_month: event.today_month,
      today_day: event.today_day,
    }
    });
    const detail = await todos.doc(event._id).get().then();
  var temtimes = detail.data.times;

  try {
    var arr = back.result.cardArr;
    var number = back.result.num;
    arr[number] == 0 ? arr[number] = 1 : arr[number] = 0;
    arr[number] == 1 ? temtimes += 1 : temtimes-= 1;
    
    var b = await todos.doc(event._id).update({
      data: {
        cardArr: arr,
        times:temtimes
      }
    });
    console.log("!!!!!", detail.data.times)

    return new Promise((resolve,reject)=>{
      var result = {
        isornot: arr[number],
        times : temtimes
      }
      resolve(result);
    });
    // var c = await todos.doc(event._id).get().then();
  } catch (e) {
    console.error(e)
    return new Promise((resolve, reject) => {
      resolve(false);
    });
  }




}
