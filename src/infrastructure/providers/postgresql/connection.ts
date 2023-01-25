import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions'
import { DataSource } from 'typeorm'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'
import 'reflect-metadata'

import Entities from './entities'
import {
  getDatabaseName,
  getPostgresHost,
  getPostgresPassword, getPostgresPort,
  getPostgresUsername,
  isTest,
} from '../../../shared/helpers'

let dataSource: DataSource

const getConnectionOptions = (url: string): PostgresConnectionOptions => ({
  name: 'default',
  type: 'postgres',
  url,
  entities: Entities,
  synchronize: isTest(),
  logging: false,
  namingStrategy: new SnakeNamingStrategy(),
  connectTimeoutMS: 1000 * 30,
})

export const getDbConnection = async (): Promise<DataSource> => {
  // Returns cached version
  if (dataSource) {
    return dataSource
  }

  const url = `postgres://${getPostgresUsername()}:${getPostgresPassword()}@${getPostgresHost()}:${getPostgresPort()
  }/${getDatabaseName()}`

  dataSource = await new DataSource(getConnectionOptions(url)).initialize()
  return dataSource
}


export const closeConnection = async ():Promise<void> => {
  await dataSource.destroy()
}
