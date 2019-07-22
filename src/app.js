const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode =require('./utils/geocode')
const forecast = require('./utils/forecast')
const app = express()
//console.log(path.join(__dirname+'/../public'))
const viewPath = path.join(__dirname + '/../templates/views')
const partialsPath = path.join(__dirname ,'/../templates/partials')

app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partialsPath)

app.use(express.static(path.join(__dirname+'/../public')))

app.get('/',(req,res) => {
    res.render('index',{
        title: 'Weather',
        name: 'vvp'
    })
})
app.get('/about',(req,res) => {
    res.render("about",{
        title: 'About Me',
        name: 'vvp'
    })
})
app.get('/weather',(req,res)=>{
    if(!req.query.add){
        return res.send({
            error : "address is not provided"
        })
    }
    // console.log(req.query.add)
    
        geocode(req.query.add,(error,{latitude,longitude,location}={}) => {
            if(error)
                return res.send({error})
                forecast(latitude,longitude,(err,data) => {
                    if(err)
                  return res.send({err})
                     
                       res.send({
                        location,
                        latitude,
                        longitude,
                        forecast: data
                    })
                 
                })
    })
})
app.get('/products',(req,res) =>{
    if(!req.query.search){
        return res.send({
            error : "no seacrh term provided"
        })
    }
    res.send('here we go')
    console.log(req.query.search)
})
app.get('/help',(req,res) => {
    res.render("help",{
        title: 'Help',
        name: 'vvp'
    })
})

app.get('/help/*',(req,res) => {
    res.render('404',{
        error: "Help article not found",
        title: "error"
    })
})
app.get('*',(req,res) => {                  // '*' is a wild card character -it will match all that is not matched before
res.render('404',{
    error: "Page not found",
    title: "Error"
})
})

app.listen(3000,() =>{
    console.log('server is listening at port 3000')
})