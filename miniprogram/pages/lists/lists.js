// miniprogram/pages/lists/lists.js
import regeneratorUntime from '../utils/runtime.js';
import Notify from '../../@vant/notify/notify';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    GoonArr:[],
    EndArr:[],
    displayArr:[],
    tab:true//true进行中，false已结束
  },

  async onLoad (options) {
    var that = this;
    var one = await that.getEndTask();
    var two = await that.getGoonTask();
    var three = await that.setData({
      displayArr: two
    });
     await console.log(that.data.displayArr)
    await console.log(one,two)

  },
  //进行中，已经结束Tab替换
  changeTab:function(options){
    var that = this;
    if (options.currentTarget.dataset.id == "1"){//进行中
      that.setData({
        tab:true,
        displayArr:that.data.GoonArr
      });
    }else{//已结束
      that.setData({
        tab: false,
        displayArr:that.data.EndArr
      })
    }
  },
  //获取已经结束的任务
  getEndTask:function(options){
    var that = this;
    return new Promise((resolve, reject) => {
      wx.cloud.callFunction({
        name: 'getEndTask',
        data: {},
        complete: res => {
          var result = res.result.data;
          var temArr = [];
          for (var i = 0; i < result.length; i++) {
            var tem = {};
            tem.id = result[i]._id;
            tem.name = result[i].name;
            tem.times = result[i].times;
            tem.color = result[i].color;
            temArr.push(tem);
          }
          that.setData({
            EndArr: temArr
          });
          resolve(temArr)
        }
      });
    })

  },
  //获取正在进行中的任务
  getGoonTask: function (options) {
    var that = this;
    return new Promise((resolve, reject) => {

    wx.cloud.callFunction({
      name: 'getGoonTask',
      data: {},
      complete: res => {
        var result = res.result.data;
        var temArr = [];
        for(var i = 0; i < result.length; i++){
          var tem = {};
          tem.id = result[i]._id;
          tem.name = result[i].name;
          tem.times = result[i].times;
          tem.color = result[i].color;
          temArr.push(tem);
        }
        that.setData({
          GoonArr:temArr
        });
        resolve(temArr)
      }
    });
    })
  },

  jumpTodetail: function (e) {
    wx.navigateTo({
      url: "./details/details?id=" + e.currentTarget.dataset.id
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

  }
})