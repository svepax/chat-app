var moment = require('moment');
require('moment/locale/de');

// var date = new Date();
// var months = ['Jan', 'Feb'];
// console.log(date.getMonth());

var someTimestamp = moment().valueOf();
console.log(someTimestamp);

var createdAt = 1234;
var date = moment(createdAt);
moment.locale('de');
console.log(date.format('DD.MM.YYYY HH:mm:ss.SSS'));