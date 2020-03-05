// miniprogram/pages/addTodo/addTodo.js
const db= wx.cloud.database();
const todos = db.collection('todos');

Page({
  data: {
    date1: null,
    date2: null,
    goalname: null,
    encourage:null,
    daytime5:null,
    time5index:null,
    bacColor:'white',
    time5: ['任意时间', '晨间', '中午', '傍晚', '晚间', '睡前'],
    color:"rgb(245, 112, 50)",
    colorArr: ["rgb(245, 112, 50)", 'rgb(242,162,197)','rgb(245, 89, 50)','rgb(112, 178, 216)', 'rgb(112, 216, 207)', ' rgb(114, 152, 233)', 'rgb(198, 252, 177)', ' rgb(231, 177, 252)', 'rgb(252, 177, 177)', 'rgb(240, 58, 58)', 'rgb(168, 236, 10)', 'rgb(250, 199, 31)', 'rgb(226, 215, 178)', 'rgb(178, 226, 226)', 'rgb(140, 192, 226)', 'rgb(91, 93, 211)', 'rgb(136, 137, 201)', 'rgb(130, 24, 218', 'rgb(163, 24, 218)', 'rgb(235, 186, 222)', 'rgb(240, 135, 212)', 'rgb(245, 28, 187)', 'rgb(245, 28, 111)', 'rgb(247, 109, 162)', 'rgb(245, 183, 50)', 'rgb(245, 154, 50)','rgb(232, 245, 50)']
  },
  pageData:{
    locationObj:{}
  },
  onLoad: function (options) {
    var that = this;
    that.getNowTime();
  },
  // 获取激励自己的话
  getEncourage:function(e){
    var that = this;
    that.setData({
      encourage:e.detail.value
    });
  },
  // 获取目标名称
  getGoalname:function(e){
    var that = this;
    that.setData({
      goalname: e.detail.value
    });
  },
  //获取颜色+颜色选择
  getColorSelect: function (e) {
    var that = this;
    var select = e.currentTarget.dataset.color;
    that.setData({
      color: select
    });
  },
  //获取一天的什么时候
  getColorSelect:function(e){
    var that = this;
    var time = e.currentTarget.dataset.time;
    var index = e.currentTarget.dataset.index;

    that.setData({
      daytime5:time,
      time5index:index
    });
  },
  // callFunctionAddtodos:function(){
  //   console.log("button is click");
  //   wx.cloud.callFunction({
  //     name:"addTodo"
  //   }).then(console.log)
  // },
  onSubmit: function (event) {
    var that = this;
    var temdata = {
      name: that.data.goalname,
      color: that.data.color,
      daytime: that.data.daytime5,
      start: that.data.date1,
      end: that.data.date2,
      encourage: that.data.encourage,
    };
    console.log(temdata)
    // wx.cloud.callFunction({
    //   name: 'addTodo',
    //   data: temdata,
    //   complete: res => {
    //     console.log('callFunction test result: ', res)
    //   }
    // })
    // let myDate = new Date;
    // let month = myDate.getMonth() + 1;
    // let day = myDate.getDate();
    // let year = myDate.getFullYear();
    // let time = `${year}-${month}-${day} ${this.data.time}`;
    // todos.add({
    //   data: {
    //     title: event.detail.value.title,
    //     image: this.data.image,
    //     location: this.pageData.locationObj,
    //     time: time,
    //     formId: event.detail.formId,
    //     status: 'in-progress'
    //   }
    // }).then(res => {
    //   wx.cloud.callFunction({
    //     name: 'msgMe',
    //     data: {
    //       formId: event.detail.formId,
    //       taskId: res._id
    //     }
    //   })
    //   wx.showToast({
    //     title: '添加成功',
    //     icon: 'sucess',
    //     success: res2 => {
    //       wx.redirectTo({
    //         url: `../todoInfo/todoInfo?id=${res._id}`,
    //       })
    //     }

    //   })
    // })
  },
 
  // 时间选择器
  bindDateChange: function (e) {
    var that = this;
    console.log('picker发送选择改变，携带值为', e.detail.value)
    let timeid = e.currentTarget.dataset.timeid;
    if (timeid === '1'){
      that.setData({
        date1: e.detail.value
      })
    } else if(timeid === '2'){
      that.setData({
        date2: e.detail.value
      })
    }
  },
  // 获取现在时间
  getNowTime:function(e){
    var that = this;
    let myDate = new Date;
    let month = myDate.getMonth() + 1;
    let day = myDate.getDate();
    let year = myDate.getFullYear();
    let date = `${year}-${month}-${day}`;
    let hour = myDate.getHours();
    let minute = myDate.getMinutes();
    let time = `${hour}:${minute}`
    that.setData({
      starttime:date,
      date1:date,
      date2: date,
    })
  },









  selectImage:function(e){
    wx.chooseImage({
      success: res=> {
        console.log(res.tempFilePaths[0])
        wx.cloud.uploadFile({
          cloudPath:`${Math.floor(Math.random()*100000000000)}.png`,
          filePath:res.tempFilePaths[0]
        }).then(res=>{
            console.log(res.fileID)
            this.setData({
              image:res.fileID
            })
        }).catch(err=>{
          console.log(err)
        })
      },
    })
  },
  bindTimeChange:function(event){
    this.setData({
      time:event.detail.value
    })
  },
  // onSubmit:function(event){
  //  let myDate = new Date;
  //  let month = myDate.getMonth()+1;
  //  let day = myDate.getDate();
  //  let year = myDate.getFullYear();
  //  let time = `${year}-${month}-${day} ${this.data.time}`;
  //   todos.add({
  //     data:{
  //       title:event.detail.value.title,
  //       image:this.data.image,
  //       location:this.pageData.locationObj,
  //       time:time,
  //       formId:event.detail.formId,
  //       status:'in-progress'
  //     }
  //   }).then(res=>{
  //     wx.cloud.callFunction({
  //       name: 'msgMe',
  //       data: {
  //         formId: event.detail.formId,
  //         taskId:res._id
  //       }
  //     })
  //     wx.showToast({
  //       title:'添加成功',
  //       icon:'sucess',
  //       success:res2=>{
  //         wx.redirectTo({
  //           url: `../todoInfo/todoInfo?id=${res._id}`,
  //         })
  //       }

  //     })
  //   })
  // },
  chooseLocation:function(e){
    wx.chooseLocation({
      success:res=>{
        console.log(res)
        let locationObj = {
          latitude:res.latitude,
          longitude: res.longitude,
          name:res.name,
          address:res.address
        }
        this.pageData.locationObj = locationObj;
        console.log(this.pageData.locationObj)
      },
    })
  }

})