import { DataSource } from 'typeorm'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'
import { config } from 'dotenv'
import { getEnv } from './src/shared/helpers'

const envName = getEnv('NODE_ENV')

const envPath = `${__dirname}/.${envName}`
config({ path: envPath })
console.log(envPath)

const source = new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  username: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_NAME,
  port: parseInt(process.env.POSTGRES_PORT as string),
  namingStrategy: new SnakeNamingStrategy(),
  migrationsTableName: "migrations",
  entities: [
    'src/infrastructure/providers/postgresql/entities/index.ts',
  ],
  migrations: ['src/infrastructure/providers/postgresql/migrations/**/*.ts'],
})

export default source
