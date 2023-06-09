import AxiosInstance from "./AxiosInstance";
import { calculateRatio, monthReduce, reduce } from "../Components/Functions/";

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
      data,
    };
  }

  async getRequestsSalesData(signal) {
    let errors = [];
    let data = null;
    const url = "/admin/buyer/quotation/requests";

    try {
      data = await AxiosInstance().get(url, { signal });
      const allMonths = data.data.data.map((request) => {
        const currentYear = new Date().getFullYear();
        const requestYear = new Date(request.createdOn).getFullYear();
        const months = [];
        if (currentYear === requestYear) {
          months.push(
            new Date(request.createdOn).toLocaleDateString("default", {
              month: "long",
            })
          );
        }

        return months;
      });

      data = monthReduce(allMonths);
      if (data.hasOwnProperty("")) {
        delete data[""];
      }
    } catch (error) {
      errors.push(error);
    }

    return {
      errors,
      data,
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
      data,
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
      data,
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
      data,
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
      data,
    };
  }

  async getUnValidatedUsers(signal) {
    let errors = [];
    let data = null;
    const url = "/merchants/unactivated/only";

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
      data,
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
      data,
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
      data,
    };
  }

  async getMerchantsToBuyerRatio(signal) {
    let errors = [];
    let data = null;
    const merchantsUrl = "/merchants";
    const buyersUrl = "/buyers";
    try {
      const merchants = await AxiosInstance().get(merchantsUrl, {
        signal,
      });
      const buyers = await AxiosInstance().get(buyersUrl, {
        signal,
      });

      let merchantCount = Number(merchants.data.totalCount);
      let buyerCount = Number(buyers.data.totalCount);
      data = calculateRatio(merchantCount, buyerCount);
    } catch (error) {
      errors.push(error);
    }

    return {
      errors,
      data,
    };
  }

  async toggleActivate(status, id) {
    let errors = [];
    const url = `/user/account/${!status}/${id}`;

    try {
      await AxiosInstance().patch(url);
    } catch (error) {
      errors.push(error);
    }

    return {
      errors,
    };
  }

  async approveMerchant(id) {
    let errors = [];
    const url = `/merchant/enable/true/${id}`;

    try {
      await AxiosInstance().patch(url);
    } catch (error) {
      errors.push(error);
    }

    return {
      errors,
    };
  }

  async approveOrder(referenceCode) {
    let errors = [];
    const url = `/order/confirm/${referenceCode}`;

    try {
      await AxiosInstance().patch(url);
    } catch (error) {
      errors.push(error);
    }

    return {
      errors,
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
      errors,
    };
  }
}
