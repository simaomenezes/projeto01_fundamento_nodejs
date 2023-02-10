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

const server = http.createServer((req, res) => {

    const { method, url } = req;
    
    if(method === 'GET' && url === '/users') {

        return res
            .setHeader('Content-type', 'application/json')
            .end(JSON.stringify(users));
    }

    if(method === 'POST' && url === '/users') {
        users.push({
            id: 1,
            name: 'Fulano Doe',
            email: 'fulanodoe@test.com'
        })
        return res.writeHead(201).end();
    }

    return res.end('hello pp')
})

server.listen(3333)
//localhost:3333