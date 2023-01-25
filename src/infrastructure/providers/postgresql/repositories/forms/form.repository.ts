import { Repository, DataSource } from 'typeorm'
import { getDbConnection } from '../../connection'
import { FormRepository, IForm } from './form.repository.interface'
import { EntityForm } from '../../entities/form.entity'
import { Form as FormModel, FormProps } from '../../../../../domain/models/Form'


const fromFormToIForm = (form?: EntityForm | null): IForm | undefined => {
  if (!form) {
    return undefined
  }
  return {
    formId: form.formId,
    name: form.name,
    email: form.email,
    phone: form.phone,
    address: form.address,
  }
}

export const fromIFormToForm = (
  form: IForm,
): FormModel => {
  const {
    formId,
    name,
    email,
    phone,
    address,
  } = form

  return FormModel.initialize({
    formId,
    name,
    email,
    phone,
    address,
  } as FormProps)
}


export class FormRepositoryImpl implements FormRepository {
  async create(form: IForm): Promise<IForm | undefined> {
    const payload: Partial<EntityForm> = {
      formId: form.formId,
      name: form.name,
      email: form.email,
      phone: form.phone,
      address: form.address,
    }

    const { repository } = await getRepository()
    await repository.insert(
      {
        ...payload,
        formId: form.formId,
      },
    )

    return this.findOne(form.formId)
  }

  async findOne(formId: string): Promise<IForm | undefined> {
    const { repository } = await getRepository()
    return repository
      .findOne({
        where: {
          formId,
        },
      })
      .then((form) => fromFormToIForm(form))
  }
}

const getRepository = async (): Promise<{
  repository: Repository<EntityForm>
  dataSource: DataSource
}> => {
  const dataSource = await getDbConnection()
  return { dataSource, repository: dataSource.getRepository(EntityForm) }
}

