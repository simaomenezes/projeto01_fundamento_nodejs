import http from 'http'
import { json } from './middlewares/json.js';

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

    await json(req, res)

    if(method === 'GET' && url === '/users') {

        return res.end(JSON.stringify(users));
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