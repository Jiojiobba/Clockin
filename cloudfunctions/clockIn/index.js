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

  const number = await cloud.callFunction({
    name: 'clockInWhatday',
    data: {
      _id: event._id,
      today_year: event.today_year,
      today_month: event.today_month,
      today_day: event.today_day,
    }
    });
  try {

    console.log("!!!!!!!!!!!!!", number);
    var arr = number.cardArr;
    console.log("@@@@@@@@@@@@@@@@", arr)
    console.log("@@@@@@@@@@@@@@@@", arr[number.num])

    // if (arr[number.num] == 0){
    //   arr[number.num] = 1;
    // } else { arr[number.num] = 0;}
   
    // console.log("@@@@@@@@@@@@@@@@",arr)
    if (event.isClock == false) {
      console.log("hhhh")
      // var b = await todos.doc(event._id).update({
      //   data: {
      //     cardArr: arr
      //   }
      // });
    } else if (event.isclock == true) {

    }
  
    var c = await todos.doc(event._id).get().then();
    console.log(c)

  } catch (e) {
    console.error(e)
  }




}
