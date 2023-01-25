import {Controller} from "../../infrastructure/http/Controller";
import {CreateFormController} from "../../infrastructure/http/controllers/form/create/CreateFormController";
import {GetFormController} from "../../infrastructure/http/controllers/form/get/GetFormController";
import {constructEndpoint} from "../../shared/helpers";

const version = 'v1'
const forms = 'forms'

export type Route = {
  method: 'post' | 'get'
  path: string
  controller: new () => Controller<unknown, unknown>
}



export const routes: Route[] = [
  {
    path: constructEndpoint(version, forms),
    method: 'post',
    controller: CreateFormController,
  },
  {
    path: constructEndpoint(version, `${forms}/:formId`),
    method: 'get',
    controller: GetFormController,
  },
]
