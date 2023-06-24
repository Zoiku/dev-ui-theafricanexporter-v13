import { useEffect, useReducer } from "react";
import "../../Styles/v2/MerchantDash.css";
import { Stack, LinearProgress } from "@mui/material";
import Salutation from "../../Components/Salutation";
import RecentOrdersTable from "../../Components/Merchant/Tables/Orders";
import ChartSales from "../../Components/Charts/Sales";
import ChartCategories from "../../Components/Charts/Categories";
import {
  SEND_REQUEST,
  REQUEST_FAILED,
  REQUEST_SUCCESSFUL,
} from "../../Reducers/Actions";
import { formReducer, INITIAL_STATE } from "../../Reducers/FormReducer";
import MerchantService from "../../Services/Merchant";
import MainBox from "../../Components/v2/components/MainBox";
import { addCommas } from "../../Components/Functions";
import NoRowsOverlay from "../../Material/Overlay";
import { checkAllZero } from "../../Components/Functions";

const MerchantInfoCard = ({
  title,
  value,
  loading,
  error,
  currency = null,
}) => {
  return (
    <Stack className="merchant-info-card" spacing={1}>
      <div className="merchant-info-title">{title}</div>
      <div className="merchant-info-value">
        {loading ? (
          <div className="merchant-info-value-loading">Loading...</div>
        ) : error ? (
          <>oops</>
        ) : currency && value ? (
          <>
            {currency} {addCommas(value)}
          </>
        ) : (
          <>{value}</>
        )}
      </div>
    </Stack>
  );
};

const MerchantInfoCards = () => {
  const [customers, dispatchCustomers] = useReducer(formReducer, INITIAL_STATE);
  const [orders, dispatchOrders] = useReducer(formReducer, INITIAL_STATE);
  const [sales, dispatchSales] = useReducer(formReducer, INITIAL_STATE);

  useEffect(() => {
    const abortController = new AbortController();
    const fetchData = async () => {
      dispatchCustomers({ type: SEND_REQUEST });
      const merchantService = new MerchantService();
      try {
        const { data, errors } = await merchantService.getCustomersCount();
        if (errors.length === 0) {
          dispatchCustomers({
            type: REQUEST_SUCCESSFUL,
            payload: { value: data.data.totalCount },
          });
        } else {
          dispatchCustomers({ type: REQUEST_FAILED });
        }
      } catch (error) {
        dispatchCustomers({ type: REQUEST_FAILED });
      }
    };
    fetchData();
    return () => abortController.abort();
  }, []);

  useEffect(() => {
    const abortController = new AbortController();
    const fetchData = async () => {
      dispatchOrders({ type: SEND_REQUEST });
      const merchantService = new MerchantService();
      try {
        const { data, errors } = await merchantService.getDeliveredOrders();
        if (errors.length === 0) {
          dispatchOrders({
            type: REQUEST_SUCCESSFUL,
            payload: { value: data.data.totalCount },
          });
        } else {
          dispatchOrders({ type: REQUEST_FAILED });
        }
      } catch (error) {
        dispatchOrders({ type: REQUEST_FAILED });
      }
    };
    fetchData();
    return () => abortController.abort();
  }, []);

  useEffect(() => {
    const abortController = new AbortController();
    const fetchData = async () => {
      dispatchSales({ type: SEND_REQUEST });
      const merchantService = new MerchantService();
      try {
        const { data, errors } = await merchantService.getTotalSalesAmount();
        if (errors.length === 0) {
          dispatchSales({
            type: REQUEST_SUCCESSFUL,
            payload: { value: data },
          });
        } else {
          dispatchSales({ type: REQUEST_FAILED });
        }
      } catch (error) {
        dispatchSales({ type: REQUEST_FAILED });
      }
    };
    fetchData();
    return () => abortController.abort();
  }, []);

  return (
    <Stack
      className="merchant-info-cards"
      direction="row"
      justifyItems="space-between"
      spacing={1}
    >
      <MerchantInfoCard
        title="Sales"
        currency="$"
        loading={sales.requestState.loading}
        error={sales.requestState?.error}
        value={sales.requestState.data?.value}
      />
      <MerchantInfoCard
        title="Customers"
        loading={customers.requestState.loading}
        error={customers.requestState?.error}
        value={customers.requestState.data?.value}
      />
      <MerchantInfoCard
        title="Delivered Orders"
        loading={orders.requestState.loading}
        error={orders.requestState?.error}
        value={orders.requestState.data?.value}
      />
    </Stack>
  );
};

const MerchantCharts = () => {
  const [sales, dispatchSales] = useReducer(formReducer, INITIAL_STATE);
  const [categories, dispatchCategories] = useReducer(
    formReducer,
    INITIAL_STATE
  );

  useEffect(() => {
    const fetchData = async () => {
      dispatchSales({ type: SEND_REQUEST });
      const merchantService = new MerchantService();
      try {
        const { data, errors } = await merchantService.getSales();
        if (errors.length === 0) {
          dispatchSales({ type: REQUEST_SUCCESSFUL, payload: data });
        } else {
          dispatchSales({ type: REQUEST_FAILED });
        }
      } catch (error) {
        dispatchSales({ type: REQUEST_FAILED });
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      dispatchCategories({ type: SEND_REQUEST });
      const merchantService = new MerchantService();
      try {
        const { data, errors } = await merchantService.getCateogriesCount();
        if (errors.length === 0) {
          dispatchCategories({ type: REQUEST_SUCCESSFUL, payload: data });
        } else {
          dispatchCategories({ type: REQUEST_FAILED });
        }
      } catch (error) {
        dispatchCategories({ type: REQUEST_FAILED });
      }
    };
    fetchData();
  }, []);

  return (
    <Stack
      className="merchant-charts"
      direction="row"
      justifyItems="space-between"
      spacing={1}
    >
      <MainBox
        title={`Monthly Sales, ${new Date().getFullYear()}`}
        helper="Trends on the orders delivered per month"
      >
        {sales?.requestState?.loading ? (
          <LinearProgress />
        ) : !sales.requestState.error ? (
          Object.keys(sales.requestState.data).length > 0 ? (
            checkAllZero(Object.values(sales.requestState.data)) ? (
              <NoRowsOverlay label="Sales" />
            ) : (
              <ChartSales
                xAxesLabel={"Months"}
                yAxesLabel={"Quantity"}
                labels={Object.keys(sales.requestState.data)}
                values={Object.values(sales.requestState.data)}
              />
            )
          ) : (
            <NoRowsOverlay label="Sales" />
          )
        ) : (
          <>oops</>
        )}
      </MainBox>
      <MainBox
        title="Categories per Delivery"
        helper="Trends on your most delivered products"
      >
        {categories?.requestState?.loading ? (
          <LinearProgress />
        ) : !categories.requestState.error ? (
          Object.keys(categories.requestState.data).length > 0 ? (
            <ChartCategories
              labels={Object.keys(categories.requestState.data)}
              values={Object.values(categories.requestState.data)}
            />
          ) : (
            <NoRowsOverlay label="Sales" />
          )
        ) : (
          <>oops</>
        )}
      </MainBox>
    </Stack>
  );
};

const Dashboard = ({ session }) => {
  const user = session?.user;
  return (
    <Stack className="main-page" direction="column" spacing={2}>
      <Salutation name={user?.profile?.user?.firstName} />
      <MerchantInfoCards />
      <MerchantCharts />
      <MainBox title="Recent Orders" helper="Latest Updated Orders">
        <RecentOrdersTable recentOrdersFilter={true} />
      </MainBox>
    </Stack>
  );
};

export default Dashboard;
