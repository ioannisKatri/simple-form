import request from 'supertest'
import app from '../app'
import { closeConnection } from '../infrastructure/providers/postgresql/connection'
import { FormRepositoryImpl } from '../infrastructure/providers/postgresql/repositories/forms/form.repository'

const formRepositoryImpl = new FormRepositoryImpl()

describe('FormRepository', () => {
  beforeAll(async () => {
    await app.ready();
  })

  afterAll(async () => {
    await closeConnection()
    await app.close();
  })

  it('It should create a form and return the unique form ID', async () => {
    const form = {
      formId: `FORM-${Math.random() * 99999999}-${Math.random() * 99999999}`,
      name: 'test',
      email: 'test@test.com',
      phone: '21321321312',
      address: 'my address test',
    }
    const res = await formRepositoryImpl.create(form)

    expect(res?.formId).toEqual(form.formId)
  })

  it('Sending a post request for corm creation we expect to receive status 201 and the form data with the unique id', async () => {
    await app.ready();
    const obj = {
      name: 'test random',
      email: 'test1@test.com',
      phone: '1232-312-312-31',
      address: 'my address random test',
    }

    const result = await request(app.server)
      .post('/forms')
      .send(obj)
    await app.close();
    expect(result.status).toEqual(200)
  })
})
