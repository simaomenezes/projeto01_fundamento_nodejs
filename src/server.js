import http from 'http'

/*
GET     -> BUSCAR UM RECURSO DO BACK-END
POST    -> CRIAR UM RECURSO DO BACK-END
PUT     -> ATUALIZAR UM RECURSO DO BACK-END
PATCH   -> ATUALIZAR UMA INFORMAÇÃO ESPECÍFICA DE UM RECURSO DO BACK-END
DELETE  -> DELETAR UM RECURSO DO BACK-END

Stateful - Stateless

Json - JavaScript Object Notation

Cabeçalhos (Requisição/resposta) => Metadados

HTTP Status code
*/

const users = [];

const server = http.createServer(async (req, res) => {

    const { method, url } = req;

    const buffers = []

    for await (const chunk of req) {
        buffers.push(chunk)
    }

    try {
        req.body = JSON.parse(Buffer.concat(buffers).toString())   
    } catch {
        req.body = null        
    }    
    if(method === 'GET' && url === '/users') {

        return res
            .setHeader('Content-type', 'application/json')
            .end(JSON.stringify(users));
    }

    if(method === 'POST' && url === '/users') {
        const {name, email } = req.body
        users.push({
            id: 1,
            name,
            email,
        })
        return res.writeHead(201).end();
    }

    return res.end('hello pp')
})

server.listen(3333)
//localhost:3333