// miniprogram/pages/addTodo/addTodo.js
import regeneratorUntime from '../utils/runtime.js';
import Notify from '../../@vant/notify/notify';
const db= wx.cloud.database();
const todos = db.collection('todos');

Page({
  data: {
    date1: '',//开始时间
    date2: '',//结束时间
    startdate:"",
    enddate:"",
    starttime1:"",
    starttime2: "",
    goalname: '',//目标名字
    encourage:'',//鼓励的话
    daytime5:'任意时间',//一天的某个时间段
    time5index:0,
    today:"",//今天的日期
    todayDate:"",
    daysum:1,
    cardArr:[],
    bacColor:'white',//时间段背景颜色
    time5: ['任意时间', '晨间', '中午', '傍晚', '晚间', '睡前'],
    color:"rgb(245, 28, 111)",//主题颜色
    colorArr: ['rgb(245, 28, 111)',"rgb(245, 112, 50)", 'rgb(242,162,197)','rgb(245, 89, 50)','rgb(112, 178, 216)', 'rgb(112, 216, 207)', ' rgb(114, 152, 233)', 'rgb(198, 252, 177)', ' rgb(231, 177, 252)', 'rgb(252, 177, 177)', 'rgb(240, 58, 58)', 'rgb(168, 236, 10)', 'rgb(250, 199, 31)', 'rgb(226, 215, 178)', 'rgb(178, 226, 226)', 'rgb(140, 192, 226)', 'rgb(91, 93, 211)', 'rgb(136, 137, 201)', 'rgb(130, 24, 218', 'rgb(163, 24, 218)', 'rgb(235, 186, 222)', 'rgb(240, 135, 212)', 'rgb(245, 28, 187)',  'rgb(247, 109, 162)', 'rgb(245, 183, 50)', 'rgb(245, 154, 50)','rgb(232, 245, 50)']
  },
  onLoad: function (options) {
    var that = this;
   that.getNowTime().then(res=>{
     that.setData({
       starttime1: res.date,
       starttime2: res.date,
       date1: res.date,
       date2: res.date,
       today: res.date,
       startdate:res,
       enddate:res
     });
   });
  },
  // 获取激励自己的话
  getEncourage:function(e){
    var that = this;
    that.setData({
      encourage:e.detail.value
    });
  },
  // 获取目标名称
  getGoalName:function(e){
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
  getTimeSelect:function(e){
    var that = this;
    var time = e.currentTarget.dataset.time;
    var index = e.currentTarget.dataset.index;
    that.setData({
      daytime5:time,
      time5index:index
    });
  },

  // 时间选择器
  bindDateChange: function (e) {
    var that = this;
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    let timeid = e.currentTarget.dataset.timeid;
    if (timeid === '1') {
      var myDate =  new Date(e.detail.value)
      let month = myDate.getMonth() + 1;
      let day = myDate.getDate();
      let year = myDate.getFullYear();
      let date = {
        year: year,
        month: month,
        day: day,
        date: `${year}-${month}-${day}`
      };
     console.log(date)
      that.setData({
        date1: e.detail.value,
        starttime2:e.detail.value,
        date2:e.detail.value,
        startdate:date,
        enddate:date
      })

    } else if (timeid === '2') {
      var myDate = new Date(e.detail.value)
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
        date2: e.detail.value,
        enddate:date
      })
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
    that.setData({
      todayDate:myDate
    })
    return new Promise((resolve,reject)=>{
      resolve(date);
    });
  },
  // 检查目标名字重名
   checkName:function (e) {
    var that = this;
    var temname = that.data.goalname;
    return new Promise((resolve,reject) =>{
      if (temname == '') {
        Notify({
          background: 'rgb(0, 188, 212)',
          message: "哼，名字不能为空嗷!",
          color: "white",
          duration: 1000
        });
        resolve(-1);
      } else {
        wx.cloud.callFunction({
          name: 'checkName',
          data: {
            name: temname
          },
          complete: res => {
            if (res.result.data.length) {
              Notify({
                background: 'rgb(255,0,94)',
                message: "已有该目标啦~",
                color: "white",
                duration: 1000
              });
              resolve(0)
            } else {
              resolve(1)
            }
          }
        });
      }
     
    })
  },
  //计算打卡天数
  calculateDay:function(e){
    var that = this;
    var d1 = new Date(that.data.date1.replace(/-/g, "-"));
    var d2 = new Date(that.data.date2.replace(/-/g, "-"));
    var dd = parseInt((d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24) +1);
    var temArr = new Array(dd);
    for (var i = 0; i < dd; i++) {
      temArr[i] = 0;
    }
    that.setData({
      daysum: dd,
      cardArr: temArr
    })
  },

  //提交
  async onSubmit(event) {
    var that = this;
    var checkname = -2;//-1为空，0为重复，1可以提交
    var nowtime = await that.getNowTime();
    await that.calculateDay();
    await that.checkName().then(res=>{
      checkname = res;
    });
    if(checkname == 1){
      that.addInfo(nowtime);
      // wx.redirectTo({
      //   url: '../index/index',
      // })
    }

  },
  cancel:function(e){
    wx.redirectTo({
            url: '../index/index',
          })
  },
 
deleteAll:function(e){
   wx.cloud.callFunction({
        name: 'deleteTodo',
        data: {},
        complete: res => {
          console.log('callFunction test result: ', res); Notify({ type: 'success', message: '添加成功啦！' });
        }
      })
},
  // 添加任务入库
  addInfo: function (nowtime) {
    var that = this;
    console.log(that.data.startdate,that.data.enddate)
    wx.cloud.callFunction({
      name: 'addTodo',
      data: {
        daytime: that.data.daytime5,
        name: that.data.goalname,
        color: that.data.color,
        // start: that.data.date1,
        // end: that.data.date2,
        buildtime: nowtime,
        times: 0,
        encourage: that.data.encourage,
        daysum: that.data.daysum,
        cardArr: that.data.cardArr,
        todayDate:that.data.todayDate,
        startdate:that.data.startdate,
        enddate: that.data.enddate,
        isEnd:false
      },
      complete: res => {
        console.log('callFunction test result: ', res); Notify({ type: 'success', message: '添加成功啦！' });
        that.setData({
          goalname: '',//目标名字
          encourage: '',//鼓励的话
          daytime5: '任意时间',//一天的某个时间段
          time5index: 0,
          daysum: 1,
          color:"rgb(245, 28, 111)",
          cardArr: [],
        })
      }
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