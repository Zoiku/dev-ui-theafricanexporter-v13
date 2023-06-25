import AxiosInstance from "./AxiosInstance";
import { monthReduce, sumArray, reduce } from "../Components/Functions";

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
      data,
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
      data,
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
      data,
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
      errors,
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
      errors,
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
      errors,
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
      data,
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
      data,
    };
  }

  async getCustomersCount() {
    let errors = [];
    let data = {};
    const url = `/all/customers`;

    try {
      data = await AxiosInstance().get(url);
    } catch (error) {
      errors.push(error);
    }

    return {
      errors,
      data,
    };
  }

  async getDeliveredOrders() {
    let errors = [];
    let data = {};
    const url = `/all/orders`;

    try {
      data = await AxiosInstance().get(url);
    } catch (error) {
      errors.push(error);
    }

    return {
      errors,
      data,
    };
  }

  async getCateogriesCount() {
    let errors = [];
    let data = {};
    const url = `/all/orders`;

    try {
      data = await AxiosInstance().get(url);
      const allCategories = data.data.data.map(
        (order) => order.request.quotationProducts[0].product.name
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

  async getSales() {
    let errors = [];
    let data = {};
    const url = `/all/sales`;
    try {
      data = await AxiosInstance().get(url);

      const allMonths = data.data.data.map((order) => {
        const months = [];
        months.push(
          new Date(order.date).toLocaleDateString("default", {
            month: "long",
          })
        );

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

  async getTotalSalesAmount() {
    let errors = [];
    let data = {};
    const url = `/all/sales`;
    try {
      data = await AxiosInstance().get(url);
      const allIncoterms = data.data.data.map(
        (orderArray) => orderArray.incoterm
      );
      const allIncotermTotalAmounts = allIncoterms.map((incotermArray) =>
        incotermArray.map((incoterm) => incoterm.totalAmount)
      );
      const incotermTotal = allIncotermTotalAmounts.map((incotermArray) =>
        sumArray(incotermArray)
      );
      data = sumArray(incotermTotal);
    } catch (error) {
      errors.push(error);
    }

    return {
      errors,
      data,
    };
  }
}
