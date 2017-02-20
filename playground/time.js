const moment = require('moment');

//Jan 1st 1970 00:00:00 am

// var date = new Date();
// var months = ['Jan', 'Feb'];
// console.log(date.getMonth());
var someTimeStamp = moment().valueOf();
console.log(someTimeStamp);

var createdAt= 1234;
var date = moment(createdAt);
console.log(date.format('h:mm a'));
