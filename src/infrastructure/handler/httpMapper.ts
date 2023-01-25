import { FastifyReply, FastifyRequest } from 'fastify'
import { Request } from '../http/Request'
import { Response } from '../http/Response'

export const mapRequest = <T extends unknown>(
  req: FastifyRequest
): Request<T> => {

  return new Request<T>(
    req.body as T,
    req.headers as Record<string, string>,
    req.params as Record<string, string>,
    req.query as Record<string, unknown>
  )
}

export const mapResponse = <T>(response: Response<T>, res: FastifyReply) => {
  for (const key in response.getHeaders()) {
    res.header(key, response.getHeaders()[key])
  }
  res.status(response.getStatusCode()).send(response.getData())
}
