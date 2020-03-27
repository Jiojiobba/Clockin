// miniprogram/pages/lists/details/details.js
Page({

  data: {
    dataArr:null,
  },

  onLoad: function (options) {
    var that = this;
    that.getdata(options.id);
  },
getdata : function(e){
  var that = this;
  wx.cloud.callFunction({
    name: 'getOneTask',
    data: {
      _id:e
    },
    complete: res => {
      var result = res.result.data;
      that.setData({
        dataArr:result
      })
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