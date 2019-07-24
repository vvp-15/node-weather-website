const request = require('request')

const forecast = (lat,long,callback) =>{
    const url = 'https://api.darksky.net/forecast/8b16153289de8c6a4de115a0eb7d433a/'+ lat+','+long+'?units=si'
    request({url,json:true},(err,{body})=>{       //shorthand property and destructuring
        if(err){
            callback('unable to connect to darksky api!',undefined)
        }else if(body.code===400){
            callback('given location is invalid',undefined)
        }else{
            callback(undefined,`${body.daily.data[0].summary} Current temp ${body.currently.temperature} and rain probability ${body.currently.precipProbability} and dewPoint is ${body.daily.data[0].dewPoint}`)
        }

    })
}
module.exports = forecast