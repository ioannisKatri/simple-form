import { Controller } from './infrastructure/http/Controller'
import { CreateFormController } from './infrastructure/http/controllers/form/create/CreateFormController'
import { GetFormController } from './infrastructure/http/controllers/form/get/GetFormController'

export type Route = {
  method: 'post' | 'get'
  path: string
  controller: new () => Controller<unknown, unknown>
}

export const routes: Route[] = [
  {
    path: '/forms',
    method: 'post',
    controller: CreateFormController,
  },
  {
    path: '/forms/:formId',
    method: 'get',
    controller: GetFormController,
  },
]
