import AxiosInstance from "./AxiosInstance";

export default class BuyerService {
  async getRequests(signal) {
    let errors = [];
    let data = null;
    const url = "/buyer/requests/quotation";

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
    const url = "/orders/user/nonpaged";

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

  async getOrder(id) {
    let errors = [];
    let data = null;
    const url = `/order/${id}`;

    try {
      data = await AxiosInstance().get(url);
    } catch (error) {
      errors.push(error);
    }

    return {
      errors,
      data
    };
  }

  async getQuote(id, signal) {
    let errors = [];
    let data = null;
    const url = `/buyer/quotation/requests/pending/${id}`;

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

  async postPendingQuote(payload) {
    let errors = [];
    let data = null;
    const url = "/buyer/quotation/requests/pending/";

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

  async postQuote(payload) {
    let errors = [];
    let data = null;
    const url = "/buyer/quotation/request/";

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

  async getOffers(id) {
    let errors = [];
    let data = null;
    const url = `/buyer/quotation/offers/request/${id}`;

    try {
      data = await AxiosInstance().get(url);
    } catch (error) {
      errors.push(error);
    }

    return {
      errors,
      data
    };
  }

  async acceptOffer(payload) {
    let errors = [];
    const url = "/order";

    try {
      await AxiosInstance().post(url, payload);
    } catch (error) {
      errors.push(error);
    }

    return {
      errors
    };
  }

  async deleteQuote(id) {
    let errors = [];
    const url = `/buyer/quotation/requests/pending/${id}`;

    try {
      await AxiosInstance().delete(url);
    } catch (error) {
      errors.push(error);
    }

    return {
      errors
    };
  }

  async getCompany(id) {
    let errors = [];
    let data = null;
    const url = `/user/company/${id}`;

    try {
      data = await AxiosInstance().get(url);
    } catch (error) {
      errors.push(error);
    }

    return {
      errors,
      data
    };
  }

  async confirmOrder(id, payload) {
    let errors = [];
    const url = `/order/${id}/payment/details`;

    try {
      await AxiosInstance().put(url, payload);
    } catch (error) {
      errors.push(error);
    }

    return {
      errors
    };
  }

  async repostRequest(id) {
    let errors = [];
    const url = `/buyer/requests/repost/${id}`;

    try {
      await AxiosInstance().put(url);
    } catch (error) {
      errors.push(error);
    }

    return {
      errors
    };
  }
}
