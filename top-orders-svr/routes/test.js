let orders = [{"_id":"61808d7918c11083c93a6d65","orderId":2096,"restaurants":"Hogwarts","itemName":"Aloo Gobi","quantity":1,"productPrice":5.95,"totalProducts":8,"orderDateTime":"2021-10-28T16:42:30"},{"_id":"61808d7918c11083c93a6d66","orderId":4487,"restaurants":"Hogwarts","itemName":"Onion Chutney","quantity":1,"productPrice":0.5,"totalProducts":10,"orderDateTime":"2021-10-30T02:10:46"},{"_id":"61808d7918c11083c93a6d67","orderId":4487,"restaurants":"Hogwarts","itemName":"Mango Chutney","quantity":1,"productPrice":0.5,"totalProducts":10,"orderDateTime":"2021-10-30T02:10:46"},{"_id":"61808d7918c11083c93a6d68","orderId":4487,"restaurants":"Hogwarts","itemName":"Mint Sauce","quantity":1,"productPrice":0.5,"totalProducts":10,"orderDateTime":"2021-10-30T02:10:46"},{"_id":"61808d7918c11083c93a6d69","orderId":4487,"restaurants":"Hogwarts","itemName":"Lime Pickle","quantity":1,"productPrice":0.5,"totalProducts":10,"orderDateTime":"2021-10-30T02:10:46"},{"_id":"61808d7918c11083c93a6d6a","orderId":4487,"restaurants":"Hogwarts","itemName":"Plain Papadum","quantity":4,"productPrice":0.8,"totalProducts":10,"orderDateTime":"2021-10-30T02:10:46"},{"_id":"61808d7918c11083c93a6d6b","orderId":2096,"restaurants":"Hogwarts","itemName":"Plain Rice","quantity":1,"productPrice":2.95,"totalProducts":8,"orderDateTime":"2021-10-28T16:42:30"},{"_id":"61808d7918c11083c93a6d6c","orderId":4487,"restaurants":"Hogwarts","itemName":"Tandoori Chicken","quantity":1,"productPrice":4.95,"totalProducts":10,"orderDateTime":"2021-10-30T02:10:46"},{"_id":"61808d7918c11083c93a6d6d","orderId":4487,"restaurants":"Hogwarts","itemName":"Bombay Aloo","quantity":1,"productPrice":5.95,"totalProducts":10,"orderDateTime":"2021-10-30T02:10:46"},{"_id":"61808d7918c11083c93a6d6e","orderId":4487,"restaurants":"Hogwarts","itemName":"Curry","quantity":1,"productPrice":8.95,"totalProducts":10,"orderDateTime":"2021-10-30T02:10:46"},{"_id":"61808d7918c11083c93a6d6f","orderId":4487,"restaurants":"Hogwarts","itemName":"Tandoori Fish Karahi","quantity":1,"productPrice":11.95,"totalProducts":10,"orderDateTime":"2021-10-30T02:10:46"},{"_id":"61808d7918c11083c93a6d70","orderId":4487,"restaurants":"Hogwarts","itemName":"Lemon Rice","quantity":1,"productPrice":3.95,"totalProducts":10,"orderDateTime":"2021-10-30T02:10:46"},{"_id":"61808d7918c11083c93a6d71","orderId":2096,"restaurants":"Hogwarts","itemName":"Bombay Aloo","quantity":1,"productPrice":5.95,"totalProducts":8,"orderDateTime":"2021-10-28T16:42:30"}]
// transform data for client app 
let clientData = {};
let now = new Date();
let cutOffTime = now.setHours(now.getHours() - 48);
orders.forEach(order => {
    let orderDateTime = new Date(order.orderDateTime);
    if (orderDateTime > cutOffTime) {
      if (!(order[itemName] in clientData)) {
        clientData[order[itemName]] = {
          recentPurchase : 1,
          lastestPurchaseTime : orderDateTime
        }
      } else {
        clientData[order[itemName]].recentPurchase += 1;
        if (clientData[order.itemName][lastestPurchaseTime] < orderDateTime) {
          clientData[order.itemName][lastestPurchaseTime] = orderDateTime;
        }
      }
    }
  });
console.log(clientData);
