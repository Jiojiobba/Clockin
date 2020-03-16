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
  async onLoad (options) {
    var that = this;
    var time = await that.getNowTime().then();
     await that.setData({
      today:time
    })
    // console.log(that.data.today)
    for(var i = 0; i < 6; i++){
      var tem = that.data.timeArr[i]
      that.getTodayGoal(tem);
    }
  },
  // 获取现在时间
  getNowTime: function (e) {
    var that = this;
    let myDate = new Date;
    let month = myDate.getMonth() + 1;
    let day = myDate.getDate();
    let year = myDate.getFullYear();
    let date = {
      year:year,
      month:month,
      day:day,
      date: `${year}-${month}-${day}`
    };

    return new Promise((resolve, reject) => {
      resolve(date);
    });
  },
  //计算今天是打卡的第几天,检查是否打卡,打卡切换
  calculateDay: function (e) {
    var that = this;
    console.log(that.data.totalArr)
    wx.cloud.callFunction({
      name: 'clockInWhatday',
      data: {
        _id: e,
        today_year: that.data.today.year,
        today_month: that.data.today.month,
        today_day: that.data.today.day,
      },
      complete: res => {
       
      }
    });
   
  },
  getTodayGoal: function (e){
    var that = this;
    wx.cloud.callFunction({
      name: 'getTodayGoal',
      data: {
        daytime:e,
        today_year:that.data.today.year,
        today_month: that.data.today.month,
        today_day: that.data.today.day,
      },
      complete: res => {
        if(res.result.length){
            var temArr = that.data.totalArr;
            var result = res.result
            var tem = {
              time: e,
              select: true,
              number:1,
              task: result
            };
            temArr.push(tem)
            that.setData({
              totalArr: temArr
            });
          that.calculateDay();
        }
      }
    });
  },

  Clockin:function(event){
    console.log(event.currentTarget.dataset.id)
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
  pageData: {
    totalArr: [{
      time: '任意时间',
      select: true,
      task: [
        {
          id: 45454545,
          title: '睡前刷牙',
          times: 1,
          isClockin: true
        },
        {
          id: 52368,
          title: '睡前刷牙',
          times: 61,
          isClockin: false

        },
        {
          id: 562,
          title: '睡前ddsfdsfdf刷牙',
          times: 101,
          isClockin: false

        },
        {
          id: 9234,
          title: '睡前刷牙',
          times: 2,
          isClockin: true

        },
        {
          id: 987126,
          title: '睡前刷牙',
          times: 15,
          isClockin: false

        },
      ]
    }, {
      time: '晨间',
      select: true,
      task: [
        {
          id: 556898,
          title: '几张是',
          times: 1,
          isClockin: true

        }
      ]
    }, {
      time: '中午',
      select: true,
      task: [
        {
          id: 987321,
          title: '红红火火恍恍惚惚',
          times: 1,
          isClockin: false

        }
      ]
    }, {
      time: '傍晚',
      select: true,
      task: [
        {
          id: 316584,
          title: '的地方大师傅',
          times: 1,
          isClockin: true

        }
      ]
    }, {
      time: '晚间',
      select: true,
      task: [
        {
          id: 3015685,
          title: '无非都是固定',
          times: 1,
          isClockin: true

        }
      ]
    }, {
      time: '睡前',
      select: true,
      task: [
        {
          id: 931642,
          title: '嗡嗡嗡',
          times: 1,
          isClockin: true

        }
      ]
    }]
  },
})
