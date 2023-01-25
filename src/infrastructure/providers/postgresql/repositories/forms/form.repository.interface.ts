export interface IForm {
  formId: string
  name: string,
  email: string,
  phone: string,
  address: string,
}

export interface FormRepository {
  create(form: IForm): Promise<IForm | undefined>
  findOne(formId: string): Promise<IForm | undefined>
}
