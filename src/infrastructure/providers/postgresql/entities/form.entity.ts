import "reflect-metadata"
import { Entity, Column, PrimaryGeneratedColumn, Unique } from 'typeorm'
import { ExtraColumns } from './extra-columns.entity'

@Entity('forms')
@Unique(['formId'])
export class EntityForm extends ExtraColumns {
  static columnsName = {
    formId: 'external_form_id',
  }

  @PrimaryGeneratedColumn()
  id: string

  @Column({ name: EntityForm.columnsName.formId, nullable: false })
  formId: string

  @Column({ nullable: false })
  name: string

  @Column({ nullable: false })
  email: string

  @Column({ nullable: false })
  phone: string

  @Column({ nullable: false })
  address: string
}
