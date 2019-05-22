//1. 获取所爬的目标网站
const http = require('https');
const fs = require('fs');
const cheerio = require('cheerio');
const express = require('express');
const app = express();
var city = {};
app.get('/a/b',(req,res)=>{
  res.setHeader('Content-Type','text/plain');
  res.setHeader('Access-Control-Allow-Origin',"*")
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  city = req.query;
  pa(city.city,res);
})
app.listen('5000',()=>{
  console.log('服务开启');
})
function pa(city,cse){
  var de;
  http.get('https://www.apiopen.top/weatherApi?city=' + encodeURI(city), (res) => {
    //console.log(res);
    const { statusCode } = res;
    const contentType = res.headers['content-type'];
    console.log(contentType);
    let error = null;
    if (statusCode !== 200) {
      error = new Error('请求状态错误');
     } //else if (!/^text\/html/.test(contentType)) {
  //     error = new Error('请求内容类型错误');
  //   }
    if (error) {
      console.log(error);
      // 消费响应数据来释放内存。
      res.resume();
      return;
    }
  
    res.setEncoding('utf8');
    let rawData = '';
    //data : 数据流
    res.on('data', (chunk) => { 
      console.log('-------');
      rawData += chunk; 
    });
    res.on('end', () => {
     // console.log(rawData);
    console.log('结束')
    //fs.writeFileSync('./aqy.html',rawData);
    const $ = cheerio.load(rawData);
    fs.writeFile('./tq/tq.json',rawData,(err)=>{
      if(!err){
        fs.readFile('./tq/tq.json','utf-8',(err,data)=>{
          if(err){
            console.log('err错误');
          }else{
           cse.send(data);
          }
        });
      }
    });
    
    });
  }).on('error', (e) => {
    console.error(`出现错误: ${e.message}`);
  });
}
