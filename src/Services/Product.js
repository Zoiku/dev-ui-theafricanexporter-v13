import AxiosInstance from "./AxiosInstance";

export default class ProductService {
  async getProducts(signal) {
    let data = null;
    let errors = [];
    const url = "/products/enabled/true";

    try {
      data = await AxiosInstance().get(url, { signal });
    } catch (error) {
      errors.push(error);
    }

    return {
      errors,
      data,
    };
  }

  async getProduct(signal, id) {
    let data = null;
    let errors = [];
    const url = `/product/${id}`;

    try {
      data = await AxiosInstance().get(url, { signal });
    } catch (error) {
      errors.push(error);
    }

    return {
      errors,
      data,
    };
  }
}
