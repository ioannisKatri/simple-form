import { Request } from '../../../Request'
import { Response } from '../../../Response'
import { Controller } from '../../../Controller'
import { Form, FormProps } from '../../../../../domain/models/Form'
import * as yup from 'yup'
import {
  FormRepositoryImpl,
  fromIFormToForm,
} from '../../../../providers/postgresql/repositories/forms/form.repository'
import { FormRepository, IForm } from '../../../../providers/postgresql/repositories/forms/form.repository.interface'
import { ErrorBag } from '../../../../../shared/ErrorBag'
import { ValidationError } from 'yup'
import { ServerError } from '../../../../../shared/CustomErrors'

export type CreateFormRequest = {
  name: string,
  email: string,
  phone: string,
  address: string,
}

const validationSchema = yup.object().shape({
  name: yup.string().required('Please provide a name'),
  email: yup.string().required('Please provide an email'),
  phone: yup.string().required('Please provide a phone'),
  address: yup.string().required('Please provide an address'),
})

export class CreateFormController implements Controller<CreateFormRequest, FormProps | ErrorBag> {
  constructor(private formRepository: FormRepository = new FormRepositoryImpl()) {
  }

  async handle(req: Request<CreateFormRequest>): Promise<Response<FormProps | ErrorBag>> {
    try {
      await validationSchema.validate(req.getData())
    } catch (error) {
      if (error instanceof ValidationError) {
        return Response.VALIDATION_FAILED(ErrorBag.fromYupValidationError(error as ValidationError))
      }
      throw error
    }

    try {
      const { name, email, phone, address } = req.getData()
      const profile = Form.initialize({
        formId: Form.generateId(),
        name,
        email,
        phone,
        address,
      })

      const response = await this.formRepository.create(profile.data)
      return Response.OK(fromIFormToForm(response as IForm).data)
    } catch (e) {
      console.error(e)
      return Response.SERVER_ERROR(ErrorBag.fromError(new ServerError()))
    }
  }
}
