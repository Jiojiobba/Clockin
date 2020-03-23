// 获取当天的目标
const cloud = require('wx-server-sdk')

// cloud.init()
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});
const db = cloud.database();
const todos = db.collection('todotem');
const _ = db.command
// 云函数入口函数
exports.main = async (event, context) => {

  var endresult = [];//输出结果
  try {
    var result = await todos.where({
      daytime: event.daytime,
    }).get().then();

    var temArr = result.data;
    var today_year = event.today_year;
    var today_month = event.today_month;
    var today_day = event.today_day;

    for(var i = 0; i < temArr.length; i++){
      var tem = temArr[i].startdate;
      if(tem.year < today_year) {
        endresult.push(temArr[i]);
      } else if (tem.year == today_year ){
        if(tem.month  < today_month) {
          endresult.push(temArr[i]);
        }else if(tem.month == today_month){
          if (tem.day < today_day || tem.day == today_day){
            var tt = temArr[i];
            const res = await cloud.callFunction({
              name: 'clockInWhatday',
              data: {
                _id: tt._id,
                today_year: today_year,
                today_month: today_month,
                today_day: today_day,
              }
            });
            tt.isClockin = res.result.flag;
            endresult.push(tt);
          }
        }
      }
    }
    
    return endresult;
  } catch (e) {
    console.error(e)
  }
}
