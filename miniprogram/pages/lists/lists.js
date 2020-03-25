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
   await that.getGoonTask();
   await that.getEndTask();
   await that.setData({
     displayArr:that.data.GoonArr
   })
  },
  //进行中，已经结束替换
  async changeTab(options){
    var that = this;
    if (options.currentTarget.dataset.id == "1"){//进行中
      that.setData({
        tab:true
      });
      await that.getGoonTask();
      await that.setData({
        displayArr:that.data.GoonArr
      })
    }else{//已结束
      that.setData({
        tab: false
      })
      await that.getEndTask();
      await that.setData({
        displayArr: that.data.EndArr
      })
    }
  },
  //获取已经结束的任务
  getEndTask:function(options){
    var that = this;
    wx.cloud.callFunction({
      name: 'getEndTask',
      data: {},
      complete: res => {
        console.log(res)
        var result = res.result.data;
        var temArr = [];
        for (var i = 0; i < result.length; i++) {
          var tem = {};
          tem.id = result[i]._id;
          tem.name = result[i].name;
          tem.times = result[i].times;
          tem.color = result[i].color;
          console.log(tem);
          temArr.push(tem);
        }
        that.setData({
          GoonArr: temArr
        });
        console.log(that.data.GoonArr)
      }
    });
  },
  //获取正在进行中的任务
  getGoonTask: function (options) {
    var that = this;
    wx.cloud.callFunction({
      name: 'getGoonTask',
      data: {},
      complete: res => {
        console.log(res)
        var result = res.result.data;
        var temArr = [];
        for(var i = 0; i < result.length; i++){
          var tem = {};
          tem.id = result[i]._id;
          tem.name = result[i].name;
          tem.times = result[i].times;
          tem.color = result[i].color;
          console.log(tem);
          temArr.push(tem);
        }
        that.setData({
          GoonArr : temArr
        });
        console.log(that.data.GoonArr)
      }
    });
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