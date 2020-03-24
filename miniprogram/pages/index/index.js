import regeneratorUntime from '../utils/runtime.js';
import Notify from '../../@vant/notify/notify';
const db = wx.cloud.database();
const todos = db.collection('todos');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    year: null,
    month: null,
    day: null,
    hour: null,
    minute: null,
    select:true,
    today:"",
    timeArr: ['任意时间', '晨间', '中午', '傍晚', '晚间', '睡前'],
    totalArr: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async getAlldata (options) {
    var that = this;
    for(var i = 0; i < 6; i++){
      var tem = that.data.timeArr[i];
      var gget = await that.getTodayGoal(tem).then();
       var temArr = that.data.totalArr;
        temArr.push(gget)
          that.setData({
          totalArr: temArr
        });
    }
  },
   async onLoad(options) {
    var that = this;
     var time = await that.getNowTime().then();
      await that.getAlldata();
  },
  // 获取现在时间
  getNowTime: function (e) {
    var that = this;
    return new Promise((resolve, reject) => {
      let myDate = new Date;
      let month = myDate.getMonth() + 1;
      let day = myDate.getDate();
      let year = myDate.getFullYear();
      let date = {
        year: year,
        month: month,
        day: day,
        date: `${year}-${month}-${day}`
      };
     that.setData({
        today: date
      })
      resolve(date);
    });
  },
  //计算今天是打卡的第几天,检查是否打卡,打卡切换
  calculateDay: function (e) {
    var that = this;
    var total = that.data.totalArr;
    console.log(total)
    for(var i = 0; i < total.length; i++){
      for(var j = 0; j < total[i].task.length; j++){
        var temid = total[i].task[j]._id;
        wx.cloud.callFunction({
          name: 'clockInWhatday',
          data: {
            _id: temid,
            today_year: that.data.today.year,
            today_month: that.data.today.month,
            today_day: that.data.today.day,
          },
          complete: res => {
            // console.log(res)
          }
        });
      }
    }
    
  },
  getTodayGoal: function (e){
    var that = this;
    return new Promise((resolve)=>{
      wx.cloud.callFunction({
        name: 'getTodayGoal',
        data: {
          daytime: e,
          today_year: that.data.today.year,
          today_month: that.data.today.month,
          today_day: that.data.today.day,
        },
        complete: res => {
          console.log(res)
          if (res.result.length) {
            var result = res.result;
            var tem = {
              time: e,
              select: true,
              number: 1,
              task: result
            };
            resolve(tem);
            // console.log(e,that.data.totalArr)
            // that.calculateDay();
          };
        }
      });

    })
   
  },

  Clockin:function(event){
    console.log(event.currentTarget.dataset.id, event.currentTarget.dataset.clock)
    var that = this;
    wx.cloud.callFunction({
      name: 'clockIn',
      data: {
        _id: event.currentTarget.dataset.id,
        isClock: event.currentTarget.dataset.clock,
        today_year: that.data.today.year,
        today_month: that.data.today.month,
        today_day: that.data.today.day,
      },
      complete: res => {
        console.log(res)
        if(res.result) {
          Notify({ type: 'success', message: '打卡成功啦！' });
        }else{
          console.log("hhhhh")
          Notify({ type: 'success', message: '出错啦！' });
        }
        that.getTodayGoal();
      }
    });
  },
  changeslect:function(event){
    var name = event.currentTarget.dataset.time;
    switch(name){
      case '任意时间':{
        var tem = this.data.totalArr[0].select;
        this.setData({
          'totalArr[0].select':!tem
        }); break;
      }
      case '晨间': {
        var tem = this.data.totalArr[1].select
        this.setData({
          'totalArr[1].select': !tem
        }); break;
      }
      case '中午': {
        var tem = this.data.totalArr[2].select
        this.setData({
          'totalArr[2].select': !tem
        }); break;
      }
      case '傍晚': {
        var tem = this.data.totalArr[3].select
        this.setData({
          'totalArr[3].select': !tem
        }); break;
      }
      case '晚间': {
        var tem = this.data.totalArr[4].select
        this.setData({
          'totalArr[4].select': !tem
        }); break;
      }
      case '睡前': {
        var tem = this.data.totalArr[5].select
        this.setData({
          'totalArr[5].select': !tem
        }); break;
      }
    }
    this.setData({
      select:!this.data.select
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

})
