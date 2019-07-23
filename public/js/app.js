// fetch('https://puzzle.mead.io/puzzle').then((response) => {     //fetch doesnot work in nodejs it only works in client side scripting
//     response.json().then((data) =>{     //response.json returns the parsed json data
//         console.log(data);
//     })
// })

const weatherForm = document.querySelector('form')
const searchedData= document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

messageOne.textContent = 'check weather of any place'
weatherForm.addEventListener('submit',(e) => {
    e.preventDefault()
    const place = searchedData.value
    messageOne.textContent ='Loading...'
    messageTwo.textContent=''
    fetch('/weather?add='+encodeURIComponent(place)).then((res) => {
    res.json().then((data) =>{
        if(data.error)
        {
            //console.log(data)
            messageOne.textContent=data.error
            messageTwo.textContent=''
        }
        else{
            // console.log(data.location)
            // console.log(data.forecast)
            messageOne.textContent=data.location
            messageTwo.textContent=data.forecast
        }
    })
})
})