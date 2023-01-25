import * as dotenv from 'dotenv'

// @ts-ignore
// mute console logging
// console.info = jest.fn()
// console.warn = jest.fn()
// console.error = jest.fn()
// console.log = jest.fn()

dotenv.config({ path: `${__dirname}/.env.test` })
