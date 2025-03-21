import {
  HttpClientProtocol,
  HttpRequest,
  HttpResponse,
} from '@/data/protocols/http/HttpClientProtocol';
import axios, { AxiosError, AxiosResponse } from 'axios';

export class AxiosHttpClientAdapter implements HttpClientProtocol {
  async request(data: HttpRequest): Promise<HttpResponse> {
    let axiosResponse: AxiosResponse;

    try {
      axiosResponse = await axios.request({
        url: data.url,
        method: data.method,
        data: data.body,
        headers: data.headers,
      });
    } catch (error) {
      const axiosError = error as AxiosError;
      axiosResponse = axiosError.response as AxiosResponse;
    }

    return this.adaptResponse(axiosResponse);
  }

  private adaptResponse(axiosResponse: AxiosResponse): HttpResponse {
    return {
      statusCode: axiosResponse.status,
      body: axiosResponse.data,
    };
  }
}
