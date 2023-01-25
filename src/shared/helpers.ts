export const getEnv = (envName: string): string => {
  const value = process.env[envName]
  if (value) return value
  const error = new Error('ENV_VAR_NOT_DEFINED')
  error.message = `env var ${envName} is not defined`
  throw error
}

export enum Stage {
  LOCAL = 'local',
  TEST = 'test',
  PRODUCTION = 'production'
}
export const getEnvironment = (): Stage => getEnv('NODE_ENV') as Stage
export const getStage = (): Stage => getEnv('NODE_ENV') as Stage
export const isLocal = (): boolean => getStage() === Stage.LOCAL
export const isTest = (): boolean => getStage() === Stage.TEST
export const getPostgresUsername = (): string => getEnv('POSTGRES_USERNAME')
export const getPostgresPassword = (): string => getEnv('POSTGRES_PASSWORD')
export const getPostgresPort = (): string => getEnv('POSTGRES_PORT')
export const getPostgresHost = (): string => getEnv('POSTGRES_HOST')
export const getDatabaseName = (): string => getEnv('POSTGRES_NAME')

export const constructEndpoint = (version: string, endpoint: string): string => {
  return `/${version}/${endpoint}`
}
