import http from 'node:http'
import { json } from './middlewares/json.js';
import { routes } from './route.js';
import { extractQueryParams } from './utils/extract-query-params.js';

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
        const { query, ...params } = routeParams.groups
        req.params = params
        req.query = query ? extractQueryParams(query): {}
       return route.handler(req, res)
    }
    return res.writeHead(404).end()
})

server.listen(3333)