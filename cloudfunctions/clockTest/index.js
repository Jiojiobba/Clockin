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
exports.main = async (event, context) =>{ 

    var endresult = [];//输出结果
    console.log(event)
    var result = await todos.where({
      daytime: event.daytime,
      isEnd: false
    }).get().then();

var temArr = result.data;
var today_year = event.today_year;
var today_month = event.today_month;
var today_day = event.today_day;

if(!temArr.length){
  return new Promise((resolve, reject) => {
    resolve(0)
  })
}

for (var i = 0; i < temArr.length; i++) {
  if (temArr[i].startdate == "") {
    return new Promise((resolve,reject)=>{
      var er = {
        msg:"数据库出错辣",
        code:"0"
      }
      resolve(er)
    })
  }
  var tem = temArr[i].startdate;
  if (tem.year < today_year) {
    endresult.push(temArr[i]);
  } else if (tem.year == today_year) {
    if (tem.month < today_month) {
      endresult.push(temArr[i]);
    } else if (tem.month == today_month) {
      if (tem.day < today_day || tem.day == today_day) {
        var tt = temArr[i];
        const res = await cloud.callFunction({
          name: 'clockInWhatday',
          data: {
            _id: tt._id,
            today_year: today_year,
            today_month: today_month,
            today_day: today_day,
          }
        }).then();
        if (res) {
          tt.isClockin = res.result.flag;
          console.log("!@@@@@@@@@@@@", res.result)
          endresult.push(tt);
        } else {
          return new Promise((resolve, reject) => {
            var er = {
              msg: "打卡状态查询失败！！",
              code: "2"
            }
            resolve(er)
          })
        }

      }
    }
  }
}

 return new Promise((resolve,reject)=>{
   resolve(endresult);
 })

}







//原本
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
      isEnd: false
    }).get().then();

    console.log("111111111111111", result)
    var temArr = result.data;
    var today_year = event.today_year;
    var today_month = event.today_month;
    var today_day = event.today_day;

    for (var i = 0; i < temArr.length; i++) {
      if (temArr[i].startdate == "") {
        return new Promise((resolve, reject) => {
          resolve("数据库参数出错")
        })
      }
      var tem = temArr[i].startdate;
      if (tem.year < today_year) {
        endresult.push(temArr[i]);
      } else if (tem.year == today_year) {
        if (tem.month < today_month) {
          endresult.push(temArr[i]);
        } else if (tem.month == today_month) {
          if (tem.day < today_day || tem.day == today_day) {
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
            if (res) {
              console.log(res)
              tt.isClockin = res.result.flag;
              console.log("!@@@@@@@@@@@@", res.result)
              endresult.push(tt);
            } else {
              console.log("出错辣！！！日期没有")
            }

          }
        }
      }
    }

    return endresult;
  } catch (e) {
    console.error(e)
  }
}


