const cloud = require('wx-server-sdk');
// 1584163395992_0.803725505966465_33573205-1584163395576_4_22668
cloud.init();
const runtime = require("runtime.js");
const db = cloud.database();
const todos = db.collection('todotem');
const _ = db.command
// 云函数入口函数
exports.main = async (event, context) => {
  try {
   
    var result = await todos.doc(event._id).get().then();

    var today_year = event.today_year;
    var today_month = event.today_month;
    var today_day = event.today_day;
    // var today = event.today;
    console.log("搜索返回的长度", today_year,today_month,today_day);

   return result;

    // for (var i = 0; i < temArr.length; i++) {
    //   console.log("iiiiiiiiiiiiiiii", i)
    //   var tem = temArr[i].startdate;
    //   var d1 = new Date(that.data.date1.replace(/-/g, "-"));
    //   var d2 = new Date(that.data.date2.replace(/-/g, "-"));
    //   var dd = parseInt((d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24) + 1);
    // }
    // console.log("!!!!!endResult", endresult.length)
   

    // return endresult;
  } catch (e) {
    console.error(e)
  }
}
