import { DomainModel } from './DomainModel'

export type FormProps = {
  formId: string
  name: string,
  email: string,
  phone: string,
  address: string,
}

export class Form extends DomainModel<FormProps> {
  constructor(data: FormProps) {
    super(data)
  }

  static generateId(): string {
    const currentYear = new Date().getFullYear()
    const randomNumber = Math.floor(Math.random() * 1000000)
    return `FORM-${currentYear}-${randomNumber}`
  }

  static initialize(data: FormProps): Form {
    const initialData: FormProps = {
      ...data,
    }
    return new Form(initialData)
  }

  public update(data: Partial<FormProps>): void {
    const { formId, ...profileData } = data
    Object.assign(this.data, profileData, {})
  }
}
