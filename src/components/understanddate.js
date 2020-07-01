const moment = require("moment");

const date = new Date();
date.setFullYear(2020, 0, 12);
date.setHours(08, 0, 0);

console.log(moment(date).format("HHmm DDMMMYY").toUpperCase());
