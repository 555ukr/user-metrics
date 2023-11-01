var cron = require('node-cron');

//fetch infor from https://bank.gov.ua/NBU_Exchange/exchange_site?start=20231101&end=20231101&valcode=usd&json

cron.schedule('0 * * * *', () => {
  console.log('running a task every minute');
});