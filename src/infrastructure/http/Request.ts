export class Request<D> {
  public constructor(
    private data: D,
    private headers: Record<string, string> = {},
    private pathParameters: Record<string, string> = {},
    private queryParameters: Record<string, unknown> = {}
  ) {}

  public getData(): D {
    if (typeof this.data === 'string') {
      return JSON.parse(this.data as string)
    }
    return this.data
  }

  public getPathParameters(): Record<string, string> {
    return this.pathParameters
  }

  public getQueryParameters(): Record<string, unknown> {
    return this.queryParameters
  }

  public getHeaders(): Record<string, string> {
    return this.headers
  }
}
