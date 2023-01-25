import { Controller } from '../../../Controller'
import { Request } from '../../../Request'
import { Response } from '../../../Response'
import { FormProps } from '../../../../../domain/models/Form'
import {
  FormRepositoryImpl,
  fromIFormToForm,
} from '../../../../providers/postgresql/repositories/forms/form.repository'
import { FormRepository } from '../../../../providers/postgresql/repositories/forms/form.repository.interface'

export type GetProfileResponseType = FormProps | string

export class GetFormController
  implements Controller<null, GetProfileResponseType> {
  constructor(private formRepository: FormRepository = new FormRepositoryImpl()) {
  }

  async handle(req: Request<null>): Promise<Response<GetProfileResponseType>> {
    const { formId } = req.getPathParameters()

    const form = await this.formRepository.findOne(formId)

    if (!form) {
      return Response.NOT_FOUND('Not Found')
    }
    return Response.OK(fromIFormToForm(form).data)
  }
}
