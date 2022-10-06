import AxiosInstance from "./AxiosInstance";

export default class MerchantService {
  async getRequests(signal) {
    let errors = [];
    let data = null;
    const url = `/buyer/quotation/merchants/requests/true`;

    try {
      data = await AxiosInstance().get(url, { signal });
    } catch (error) {
      errors.push(error);
    }

    return {
      errors,
      data
    };
  }

  async getOrders(signal) {
    let errors = [];
    let data = null;
    const url = "/orders/merchant/nonpaged";

    try {
      data = await AxiosInstance().get(url, { signal });
    } catch (error) {
      errors.push(error);
    }

    return {
      errors,
      data
    };
  }

  async getQuotes(signal) {
    let errors = [];
    let data = null;
    const url = "/merchant/quotations";

    try {
      data = await AxiosInstance().get(url, { signal });
    } catch (error) {
      errors.push(error);
    }

    return {
      errors,
      data
    };
  }

  async postOffer(payload) {
    let errors = [];
    const url = "/merchant/quotation/offer";

    try {
      await AxiosInstance().post(url, payload);
    } catch (error) {
      errors.push(error);
    }

    return {
      errors
    };
  }

  async orderConfirmation(id) {
    let errors = [];
    const url = `/order/${id}/status/confirm`;

    try {
      await AxiosInstance().put(url);
    } catch (error) {
      errors.push(error);
    }

    return {
      errors
    };
  }

  async orderRejection(id) {
    let errors = [];
    const url = `/orders/${id}`;

    try {
      await AxiosInstance().delete(url);
    } catch (error) {
      errors.push(error);
    }

    return {
      errors
    };
  }

  async postCompanyDetails(payload) {
    let errors = [];
    let data = {};
    const url = "/user/company";

    try {
      data = await AxiosInstance().post(url, payload);
    } catch (error) {
      errors.push(error);
    }

    return {
      errors,
      data
    };
  }

  async update(payload) {
    let errors = [];
    let data = {};
    const url = `/user/${payload.id}`;

    try {
      data = await AxiosInstance().put(url, payload);
    } catch (error) {
      errors.push(error);
    }

    return {
      errors,
      data
    };
  }
}
