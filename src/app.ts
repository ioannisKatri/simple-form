import Fastify, { FastifyReply, FastifyRequest } from 'fastify'
import dotenv from 'dotenv'
import fastifyCors from '@fastify/cors'
import { mapRequest, mapResponse } from './infrastructure/handler/httpMapper'
import { Response } from './infrastructure/http/Response'
import { getEnv } from './shared/helpers'
import { ErrorBag } from './shared/ErrorBag'
import { ServerError } from './shared/CustomErrors'
import {routes} from "./routes/v1/routes";


dotenv.config()
const app = Fastify()


app.register(fastifyCors, {
  credentials: true,
  origin: getEnv('CORS_ORIGIN')
    .split(','),
})

app.register((fastifyRouteInstance, _, done) => {
  for (const route of routes) {
    const { method, path, controller } = route

    fastifyRouteInstance[method](path, async (req: FastifyRequest, res: FastifyReply) => {
      try {
        const request = mapRequest(req)
        const response = await new controller().handle(request)
        return mapResponse(response, res)
      } catch (e) {
        console.log(e)
        return mapResponse(Response.SERVER_ERROR(ErrorBag.fromError(new ServerError())), res)
      }
    })
  }

  done()
})

export default app
