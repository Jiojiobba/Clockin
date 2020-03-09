const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database();
const todos = db.collection('todotem');
exports.main = async (event, context) => {
  try {
    return await todos.add({
      data: {
         name: event.name,
         color: event.color,
         daytime: event.daytime,
         start: event.start,
         end: event.end,
         buildtime: event.buildtime,
         times: event.times,
         encourage: event.encourage,
         daysum: event.daysum,
         cardArr: event.cardArr
      }
    }).then()
  } catch (e) {
    console.error(e)
  }
}
  // return await db.collection('location').get();