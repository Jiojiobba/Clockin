const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database();
const todos = db.collection('todos');
exports.main = async (event, context) => {
   console.log(event)
   try{
     return await todos.add({
       data:{
         name: event.name,
         color: event.color,
         daytime: event.daytime,
         startend: event.startend,
         buildtime: event.buildtime,
         times: event.times,
         encourage: event.encourage,
       }
     })} catch(e){
       console.error(e)
     }
   }
  // return await db.collection('location').get();