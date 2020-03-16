// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database();
const todos = db.collection('todotem');
const _ = db.command
// 云函数入口函数
exports.main = async (event, context) => {
  // {
  //   "today": "{'year':'2020','month':'3','day':'14'}",
  //     "daytime": "任意时间"
  // }
  var endresult = [];//输出结果
  try {
    var result = await todos.where({
      daytime: event.daytime,
    }).get().then();

    var temArr = result.data;
    var today_year = event.today_year;
    var today_month = event.today_month;
    var today_day = event.today_day;

    console.log("！！！！！！！today", today_year, today_month, today_day)
    console.log("搜索返回的长度",temArr.length)
    for(var i = 0; i < temArr.length; i++){
      console.log("iiiiiiiiiiiiiiii",i)
      var tem = temArr[i].startdate;
      
      if(tem.year < today_year) {
        console.log("year<<<<<<<<<year")
        endresult.push(temArr[i]);
      } else if (tem.year == today_year ){
        console.log("year=======year")
        if(tem.month  < today_month) {
          console.log("month < month")
          endresult.push(temArr[i]);
        }else if(tem.month == today_month){
          console.log("month======month !!!!!!!!!:",tem)
          if (tem.day < today_day || tem.day == today_day){
            console.log("<<<<<======", tem)
            endresult.push(temArr[i]);
          }
        }
      }
    }
    console.log("!!!!!endResult", endresult.length)
    
    return endresult;
  } catch (e) {
    console.error(e)
  }
}
