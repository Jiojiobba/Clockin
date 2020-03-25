//打卡
const cloud = require('wx-server-sdk');
// 1584163395992_0.803725505966465_33573205-1584163395576_4_22668
cloud.init();
// const runtime = require("runtime.js");
const db = cloud.database();
const todos = db.collection('todotem');
const _ = db.command
// 云函数入口函数
exports.main = async (event, context) => {
  try {
   
    var result = await todos.doc(event._id).get().then();

    if (event.today_year && event.today_month && event.today_day){

      var today_year = event.today_year;
      var today_month = event.today_month;
      var today_day = event.today_day;

      //计算相差多少天
      var temdate = result.data.startdate;
      if(result.data.startdate == ""){
        return new Promise((resolve, reject) => {
          resolve("startdateNull")
        })
      }
      console.log(temdate, temdate.year, temdate.month, temdate.day)

      var year = parseInt(event.today_year) - 2016; //今天日期
      var month = parseInt(event.today_month);
      var day = parseInt(event.today_day);

      var startyear = parseInt(temdate.year) - 2016;//打卡起始日期
      var startmonth = parseInt(temdate.month);
      var startday = parseInt(temdate.day);

      var monArr = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
      var monArr2 = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
      var i, sum = 0;//今天
      var j, sum2 = 0;//start
      var diff = 0;
      console.log(i, j, sum, sum2, year, month, day, startyear, startmonth, startday);
      for (i = 1; i < year; i++) {
        if (i % 4 == 0 && i % 100 != 0 || i % 400 == 0) {
          sum += 366;
        }//闰年
        else { sum += 365; }//平年
      }
      for (j = 1; j < startyear; j++) {
        if (j % 4 == 0 && j % 100 != 0 || j % 400 == 0) {
          sum2 += 366;
        }
        else { sum2 += 365; }
      }
      if (year % 4 == 0 && year % 100 != 0 || year % 400 == 0) { monArr[2] = 29; }
      if (startyear % 4 == 0 && startyear % 100 != 0 || startyear % 400 == 0) { monArr2[2] = 29; }
      for (i = 1; i < month; i++) { sum += monArr[i]; }//整月的天数
      for (j = 1; j < startmonth; j++) { sum2 += monArr2[j]; }
      sum += day;
      sum2 += startday;
      diff = sum - sum2;
      var flag = result.data.cardArr;
      flag = flag[diff];
      var results = {
        cardArr: result.data.cardArr,
        num: diff,
        flag: flag
      }
      return new Promise((resolve, reject) => {
        resolve(results);
      });
      ;
    }else{
      console.log("today(event) is null !!!!!!",event)
      return new Promise((resolve, reject) => {
        resolve("todayNull");
      });
    }
  } catch (e) {
    console.error(e);
    return new Promise((resolve, reject) => {
      resolve("出错！！！",e);
    });;
  }

}
