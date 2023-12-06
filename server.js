const express = require('express')
const app = express()
const figlet = require('figlet')
const cors = require('cors')
const PORT = 8000

app.use(cors())

const starters = {
    'charmander': {
        'type': 'fire',
        'weakness': 'water',
        'generation': 1
    },
    'squirtle':{
        'type': 'water',
        'weakness': 'grass',
        'generation': 1 
    },
    'bulbasaur':{
        'type': 'grass',
        'weakness': 'fire',
        'generation': 1 
    },
    'unknown':{
        'type': 'normal/unknown',
        'weakness': 'unknown',
        'generation': 1 
    }
}

app.get('/', (request, response)=>{
    response.sendFile(__dirname + '/index.html')
})

app.get('/about', (request, response)=>{
    response.sendFile(__dirname + '/about.html')
})

app.get('/api/:name',(request,response)=>{
    const pokemonName = request.params.name.toLowerCase()

    if( starters[pokemonName] ){
        response.json(starters[pokemonName])
    }else{
        response.json(starters['unknown'])
    }  
})

app.use(function(request, response, next) {
    response.status(404).send('404! Page not found')
})

app.listen(process.env.PORT || PORT, ()=>{
    console.log(`The server is now running on port ${PORT}!`)
})