import {
  HttpClientProtocol,
  HttpStatusCode,
} from '@/data/protocols/http/HttpClientProtocol';
import { Product } from '@/domain/entities';
import {
  ProductNotFoundError,
  ProductReviewsLoadError,
  ProductSearchError,
} from '@/domain/errors/ProductError';
import { SearchProduct } from '@/domain/use-cases/product/SearchProduct';
import { GetProductReviews } from '@/domain/use-cases/review/GetProductReviews';

interface RemoteProduct {
  id: number;
  name: string;
  price: number;
  image_url: string;
  category: string;
  description: string;
  rating: number;
  created_at: string;
  reviews: [];
}

export class RemoteSearchProduct implements SearchProduct {
  constructor(
    private readonly httpClient: HttpClientProtocol,
    private readonly url: string,
    private readonly getProductReviews: GetProductReviews
  ) {}

  async execute(query: string): Promise<Product[]> {
    const httpResponse = await this.httpClient.request({
      method: 'GET',
      url: this.url,
      body: query,
    });

    let products: Product[];

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        products = this.parse(httpResponse.body as RemoteProduct[]);
        return await this.loadProductsWithReviews(products);
      case HttpStatusCode.notFound:
        throw new ProductNotFoundError();
      default:
        throw new ProductSearchError();
    }
  }

  private async loadProductsWithReviews(
    products: Product[]
  ): Promise<Product[]> {
    const productsWithReviews = await Promise.all(
      products.map(async (product) => {
        try {
          const reviews = await this.getProductReviews.execute(product.id);
          return {
            ...product,
            reviews,
          };
        } catch {
          throw new ProductReviewsLoadError(product.id);
        }
      })
    );

    return productsWithReviews;
  }

  private parse(httpResponse: RemoteProduct[]): Product[] {
    return httpResponse.map((product) => ({
      id: product.id,
      name: product.name,
      price: product.price,
      image_url: product.image_url,
      category: product.category,
      description: product.description,
      rating: product.rating,
      reviews: product.reviews,
    }));
  }
}
