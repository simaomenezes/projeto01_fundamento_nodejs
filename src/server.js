import http from 'http'

const server = http.createServer((req, res) => {
    return res.end('hello pp')
})

server.listen(3333)
//localhost:3333