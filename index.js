var cron = require('node-cron');
const axios = require('axios');
const http = require('http')
const fs = require('fs')

const url = "https://bank.gov.ua/NBU_Exchange/exchange_site?start=20231101&end=20231101&valcode=usd&json"

const secretKey = "oBce26vwSl2Et36wWklnDQ";
const clientId = "710475967.1699020165";
const measurementId = "G-FT32LKB4ZZ"

const pushMetric = async (data) => {
  const result = await axios.post(`https://www.google-analytics.com/mp/collect?api_secret=${secretKey}&measurement_id=${measurementId}`,
      {
        "client_id": clientId,
        // "timestamp_micros":"1699026648907745",
        // "non_personalized_ads":true,
        "events": data.map(rate => ({
            name: "usd_uah_rate",
            params: rate
        }))
      })
    console.log({
        code: result.status,
        response: result.data
    })
}

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'content-type': 'text/html' })
  fs.createReadStream('index.html').pipe(res)
})

cron.schedule('*/10 * * * * *', async () => {
  const result = await axios.get(url);
  if (result.status == 200){
    pushMetric(result.data)
  }
});

server.listen(process.env.PORT || 3000)