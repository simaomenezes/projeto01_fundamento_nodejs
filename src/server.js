import http from 'node:http'
import { json } from './middlewares/json.js';
import { routes } from './route.js';

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


Query Parameters
Route Parameters
Request Body

*/

const server = http.createServer(async (req, res) => {
    const { method, url } = req;
    await json(req, res)
    const route = routes.find(route => {
        return route.method === method && route.path.test(url)
    }) 

    if(route) {
        const routeParams = req.url.match(route.path)

        req.params = { ...routeParams.groups }
        console.log(req.params)
       return route.handler(req, res)
    }
    return res.writeHead(404).end()
})

server.listen(3333)