// miniprogram/pages/todoinfor/todoinfor.js
const db = wx.cloud.database();
const todos = db.collection('todos');
Page({
  data: {
    task:{}
  },
  pageData:{

  },
  onLoad: function (options) {
    this.pageData.id=options.id;
    todos.doc(options.id).get().then(res=>{
      console.log(res);
      this.setData({
        task:res.data
      })
    })
  },
  onReady: function () {

  },
  viewLocation:function(){
    console.log(this.data.location)
    wx.openLocation({
      latitude: this.data.task.location.latitude,
      longitude: this.data.task.location.longitude,
      name:this.data.task.location.name,
      address: this.data.task.location.address
    })
  }
 
})