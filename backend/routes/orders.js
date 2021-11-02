var express = require('express');
var router = express.Router();
var Orders = require('../models/order');

/* GET orders. */
// http://localhost:3000/orders
router.get('/', function(req, res, next) {
  // GET /orders
  let cutOffTime = new Date(new Date().setDate(new Date().getDate() - 2)).toISOString();
  Orders.find({ orderDateTime : { $gt: cutOffTime }}).exec(function (err, orders) {
    if (!err) {

      // initiate client data to send 
      let clientData = {};

      // transform data for client app 
      orders.forEach(order => {
        let orderDateTime = new Date(order.orderDateTime);
        if (!(order.itemName in clientData)) {
          clientData[order.itemName] = {
            itemName: order.itemName,
            recentPurchase: 1,
            lastestPurchaseTime: orderDateTime
          }
        } else {
          clientData[order.itemName].recentPurchase += 1;
          if (clientData[order.itemName].lastestPurchaseTime < orderDateTime) {
            clientData[order.itemName].lastestPurchaseTime = orderDateTime;
          }
        }
      });

      /* 
       * sort data on both recency and # purchases 
       * sort by hour, if date_i.gerHours() = date_j.getHours(), sort by # purchases
      */
      let clientDataSortedList = Object.values(clientData);
      clientDataSortedList.sort((a , b) => {
        let timeA = (new Date(a.lastestPurchaseTime));
        let lastestPurchaseHourA = new Date(timeA.getFullYear(), timeA.getMonth(), 
                                            timeA.getDay(), timeA.getHours());
        let timeB = (new Date(b.lastestPurchaseTime));
        let lastestPurchaseHourB = new Date(timeB.getFullYear(),timeB.getMonth(), 
                                            timeB.getDay(), timeB.getHours());
        return lastestPurchaseHourB - lastestPurchaseHourA || b.recentPurchase - a.recentPurchase;
      })

      // send sorted client data list
      res.send(clientDataSortedList);
    } else {
      res.status(400).send(err);
    }
  })
});

module.exports = router;