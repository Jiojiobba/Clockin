// miniprogram/pages/schedule/schedule.js
const db = wx.cloud.database();//初始化数据库
const todos = db.collection('todos')//创建实例
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tasks: []
  },
  onLoad: function (options) {
    this.getData(res => { });
  },
  onSubmit: function (event) {
    todos.add({
      data: {
        title: event.detail.value.title
      }
    }).then(res => {
      wx.showToast({
        title: 'Sucess',
        icon: 'sucess'
      })
    })
  },

  getData: function (callback) {
    if (!callback) {
      callback = res => { }
    }
    wx.showLoading({
      title: '数据加载中……',
      duration: 1000
    })
    todos.skip(this.pageData.skip).get().then(res => {
      let oldData = this.data.tasks;
      this.setData({
        tasks: oldData.concat(res.data)
      }), res => {
        this.pageData.skip = this.pageData.skip + 20;
        wx.hideLoading()
        callback();
      }

    })
  },
  pageData: {
    skip: 0
  },
  onReachBottom: function () {
    this.getData();
    wx.showLoading({
      title: '刷新中！',
      duration: 1000
    })
  },

  onPullDownRefresh: function () {//下拉刷新
    this.pageData.skip = 0;
    this.getData(res => {
      wx.stopPullDownRefresh();//停止刷新
    });
  },
})