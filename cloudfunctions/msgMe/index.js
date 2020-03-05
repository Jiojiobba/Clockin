const cloud = require('wx-server-sdk')
const {
  WXMINIUser,
  WXMINIMessage
} = require('wx-js-utils');

const appId = 'wxc4e907563b2db334'; // 小程序 appId
const secret = 'd3edf170baf5f2ea1974ed9057fec99a'; // 小程序 secret
const template_id = 'QV_dHZTFQ7CYm-eClaqIqnTi2ZiZFXkzMAC9l0nJhzw'; // 小程序模板消息模板 id

cloud.init()

const db = cloud.database()
const todos = db.collection('todos')

exports.main = async (event, context) => {

  const wxContext = cloud.getWXContext()

  // 获取 access_token
  let wXMINIUser = new WXMINIUser({
    appId,
    secret
  });

  let access_token = await wXMINIUser.getAccessToken();
  const touser = wxContext.OPENID; // 小程序用户 openId，从用户端传过来，指明发送消息的用户
  const form_id = event.formId; // 小程序表单的 form_id，或者是小程序微信支付的 prepay_id
let task = await todos.doc(event.taskId).get();
return task;

  // 发送模板消息
  let wXMINIMessage = new WXMINIMessage();
  let result = await wXMINIMessage.sendMessage({
    access_token,
    touser,
    form_id,
    template_id,
    data: {
      keyword1: {
        value: 'task.data.name' // keyword1 的值
      },
      keyword2: {
        value: 'task.data._id' // keyword2 的值
      },
      keyword3: {
        value: 'task.data.location.address' // keyword2 的值
      },
      keyword4: {
        value: 'task.data.name' // keyword2 的值
      }
    },
    page: 'pages/todoInfo/todoInfo?id={{task.data._id}}' // 点击模板消息后，跳转的页面
  });




 
}