export class HttpError extends Error {
  constructor(
    public readonly status: number,
    public readonly erros: string[],
  ) {
    super();

    this.name = 'HttpError';
  }
}
