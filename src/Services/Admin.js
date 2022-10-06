import AxiosInstance from "./AxiosInstance";

const reduce = (array) => {
  const count = {};
  for (const element of array) {
    if (count[element]) {
      count[element] += 1;
    } else {
      count[element] = 1;
    }
  }
  return count;
};

const monthReduce = (array) => {
  const count = {
    January: 0,
    February: 0,
    March: 0,
    April: 0,
    May: 0,
    June: 0,
    July: 0,
    August: 0,
    September: 0,
    October: 0,
    November: 0,
    December: 0
  };
  for (const element of array) {
    if (count[element]) {
      count[element] += 1;
    } else {
      count[element] = 1;
    }
  }

  return count;
};

export default class AdminService {
  async getRequests(signal, paging) {
    let errors = [];
    let data = null;
    const { page, size } = paging;
    const url = `/buyer/quotation/requests?page=${page}&size=${size}`;

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

  async getRequestsSalesData(signal) {
    let errors = [];
    let data = null;
    const url = "/admin/buyer/quotation/requests";

    try {
      data = await AxiosInstance().get(url, { signal });
      const allMonths = data.data.data.map((request) =>
        new Date(request.createdOn).toLocaleDateString("default", {
          month: "long"
        })
      );
      data = monthReduce(allMonths);
    } catch (error) {
      errors.push(error);
    }

    return {
      errors,
      data
    };
  }

  async getRequestsCategories(signal) {
    let errors = [];
    let data = null;
    const url = "/admin/buyer/quotation/requests";

    try {
      data = await AxiosInstance().get(url, { signal });
      const allCategories = data.data.data.map(
        (request) => request.quotationProducts[0].product.name
      );
      data = reduce(allCategories);
    } catch (error) {
      errors.push(error);
    }

    return {
      errors,
      data
    };
  }

  async getPendingOrders(signal) {
    let errors = [];
    let data = null;
    const url = "/orders/AWAITING";

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

  async getDeliveredOrders(signal) {
    let errors = [];
    let data = null;
    const url = "/orders/DELIVERED";

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

  async getUnactivatedUsers(signal) {
    let errors = [];
    let data = null;
    const url = "/users/false";

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

  async getOrders(signal, paging) {
    let errors = [];
    let data = null;
    const { page, size } = paging;
    const url = `/orders?page=${page}&size=${size}`;

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

  async getBuyers(signal, paging) {
    let errors = [];
    let data = null;
    const { page, size } = paging;
    const url = `/buyers?page=${page}&size=${size}`;

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

  async getMerchants(signal, paging) {
    let errors = [];
    let data = null;
    const { page, size } = paging;
    const url = `/merchants?page=${page}&size=${size}`;

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

  async getMerchantsToBuyerRatio(signal) {
    let errors = [];
    let data = null;
    const merchantsUrl = "/merchants";
    const buyersUrl = "/buyers";
    try {
      const merchants = await AxiosInstance().get(merchantsUrl, {
        signal
      });
      const buyers = await AxiosInstance().get(buyersUrl, {
        signal
      });
      data = (merchants.data.totalCount / buyers.data.totalCount).toFixed(2);
    } catch (error) {
      errors.push(error);
    }

    return {
      errors,
      data
    };
  }

  async toggleActivate(email, status) {
    let errors = [];
    const url = `/user/${email}/${!status}`;

    try {
      await AxiosInstance().patch(url);
    } catch (error) {
      errors.push(error);
    }

    return {
      errors
    };
  }

  async approveMerchant(id) {
    let errors = [];
    const url = `/merchant/enable/${id}`;

    try {
      await AxiosInstance().patch(url);
    } catch (error) {
      errors.push(error);
    }

    return {
      errors
    };
  }

  async approveOrder(id) {
    let errors = [];
    const url = `/order/confirm/${id}`;

    try {
      await AxiosInstance().patch(url);
    } catch (error) {
      errors.push(error);
    }

    return {
      errors
    };
  }

  async updateOrder(id, status) {
    let errors = [];
    const url = `/order/${id}/${status}`;

    try {
      await AxiosInstance().patch(url);
    } catch (error) {
      errors.push(error);
    }

    return {
      errors
    };
  }
}
