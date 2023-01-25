import { Request } from './Request'
import { Response } from './Response'

export interface Controller<T, U> {
  handle(req: Request<T>): Promise<Response<U>>
}
