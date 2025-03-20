export enum HttpStatusCode {
  ok = 200,
  created = 201,
  noContent = 204,
  badRequest = 400,
  unauthorized = 401,
  forbidden = 403,
  notFound = 404,
  serverError = 500,
}

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

export type HttpRequest = {
  url: string;
  method: HttpMethod;
  body?: unknown;
  headers?: Record<string, string>;
};

export type HttpResponse = {
  statusCode: HttpStatusCode;
  body?: unknown;
};

export interface HttpClientProtocol {
  request: (data: HttpRequest) => Promise<HttpResponse>;
}
