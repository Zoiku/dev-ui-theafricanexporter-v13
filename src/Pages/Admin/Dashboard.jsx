import "../../Styles/v2/AdminDash.css";
import { Stack, LinearProgress } from "@mui/material";
import Salutation from "../../Components/Salutation";
import RecentOrdersTable from "../../Components/Admin/Tables/Orders";
import MainBox from "../../Components/v2/components/MainBox";
import AdminService from "../../Services/Admin";
import {
  SEND_REQUEST,
  REQUEST_FAILED,
  REQUEST_SUCCESSFUL,
} from "../../Reducers/Actions";
import { formReducer, INITIAL_STATE } from "../../Reducers/FormReducer";
import { useReducer, useEffect } from "react";
import ChartSales from "../../Components/Charts/Sales";
import ChartCategories from "../../Components/Charts/Categories";
import NoRowsOverlay from "../../Material/Overlay";
import { checkAllZero } from "../../Components/Functions";

const AdminInfoCard = ({ title, value, loading, error }) => {
  return (
    <Stack className="admin-info-card" spacing={1}>
      <div className="admin-info-title">{title}</div>
      <div className="admin-info-value">
        {loading ? (
          <div className="admin-info-value-loading">Loading...</div>
        ) : error ? (
          <>oops</>
        ) : (
          <>{value}</>
        )}
      </div>
    </Stack>
  );
};

const AdminInfoCards = () => {
  const [merchantBuyerRatio, dispatchMerchantBuyerRatio] = useReducer(
    formReducer,
    INITIAL_STATE
  );
  const [unactivatedUsers, dispatchUnactivatedUsers] = useReducer(
    formReducer,
    INITIAL_STATE
  );
  const [pendingOrders, dispatchPendingOrders] = useReducer(
    formReducer,
    INITIAL_STATE
  );
  const [deliveredOrders, dispatchDeliveredOrders] = useReducer(
    formReducer,
    INITIAL_STATE
  );

  useEffect(() => {
    dispatchMerchantBuyerRatio({ type: SEND_REQUEST });
    const abortController = new AbortController();
    const fecthData = async () => {
      const adminService = new AdminService();
      try {
        const { errors, data } = await adminService.getMerchantsToBuyerRatio(
          abortController.signal
        );
        if (errors.length === 0) {
          dispatchMerchantBuyerRatio({
            type: REQUEST_SUCCESSFUL,
            payload: { value: data },
          });
        } else {
          dispatchMerchantBuyerRatio({ type: REQUEST_FAILED, error: errors });
        }
      } catch (error) {}
    };
    fecthData();
    return () => abortController.abort();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    dispatchUnactivatedUsers({ type: SEND_REQUEST });
    const abortController = new AbortController();
    const fecthData = async () => {
      const adminService = new AdminService();
      try {
        const { errors, data } = await adminService.getUnactivatedUsers(
          abortController.signal
        );
        if (errors.length === 0) {
          dispatchUnactivatedUsers({
            type: REQUEST_SUCCESSFUL,
            payload: { value: data.data.totalCount },
          });
        } else {
          dispatchUnactivatedUsers({ type: REQUEST_FAILED, error: errors[0] });
        }
      } catch (error) {}
    };
    fecthData();
    return () => abortController.abort();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    dispatchDeliveredOrders({ type: SEND_REQUEST });
    const abortController = new AbortController();
    const fecthData = async () => {
      const adminService = new AdminService();
      try {
        const { errors, data } = await adminService.getDeliveredOrders(
          abortController.signal
        );
        if (errors.length === 0) {
          dispatchDeliveredOrders({
            type: REQUEST_SUCCESSFUL,
            payload: { value: data.data.totalCount },
          });
        } else {
          dispatchDeliveredOrders({ type: REQUEST_FAILED, error: errors[0] });
        }
      } catch (error) {}
    };
    fecthData();
    return () => abortController.abort();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    dispatchPendingOrders({ type: SEND_REQUEST });
    const abortController = new AbortController();
    const fecthData = async () => {
      const adminService = new AdminService();
      try {
        const { errors, data } = await adminService.getPendingOrders(
          abortController.signal
        );
        if (errors.length === 0) {
          dispatchPendingOrders({
            type: REQUEST_SUCCESSFUL,
            payload: { value: data.data.totalCount },
          });
        } else {
          dispatchPendingOrders({ type: REQUEST_FAILED, error: errors[0] });
        }
      } catch (error) {}
    };
    fecthData();
    return () => abortController.abort();
    // eslint-disable-next-line
  }, []);

  return (
    <Stack
      className="admin-info-cards"
      direction="row"
      justifyItems="space-between"
      spacing={1}
    >
      <AdminInfoCard
        title="Pending Orders"
        loading={pendingOrders?.requestState?.loading}
        error={pendingOrders?.requestState?.error}
        value={pendingOrders?.requestState?.data?.value}
      />
      <AdminInfoCard
        title="Delivered Orders"
        loading={deliveredOrders?.requestState?.loading}
        error={deliveredOrders?.requestState?.error}
        value={deliveredOrders?.requestState?.data?.value}
      />
      <AdminInfoCard
        title="Unactivated Users"
        loading={unactivatedUsers?.requestState?.loading}
        error={unactivatedUsers?.requestState?.error}
        value={unactivatedUsers?.requestState?.data?.value}
      />
      <AdminInfoCard
        title="Merchant to Buyer Ratio"
        loading={merchantBuyerRatio?.requestState?.loading}
        error={merchantBuyerRatio?.requestState?.error}
        value={merchantBuyerRatio?.requestState?.data?.value}
      />
    </Stack>
  );
};

const AdminCharts = () => {
  const [sales, dispatchSales] = useReducer(formReducer, INITIAL_STATE);
  const [categories, dispatchCategories] = useReducer(
    formReducer,
    INITIAL_STATE
  );

  useEffect(() => {
    const abortController = new AbortController();
    const fetchData = async () => {
      dispatchSales({ type: SEND_REQUEST });
      const merchantService = new AdminService();
      try {
        const { data, errors } = await merchantService.getRequestsSalesData(
          abortController.signal
        );
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
    return () => abortController.abort();
  }, []);

  useEffect(() => {
    const abortController = new AbortController();
    const fetchData = async () => {
      dispatchCategories({ type: SEND_REQUEST });
      const merchantService = new AdminService();
      try {
        const { data, errors } = await merchantService.getRequestsCategories(
          abortController.signal
        );
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
    return () => abortController.abort();
  }, []);

  return (
    <Stack
      className="admin-charts"
      direction="row"
      justifyItems="space-between"
      spacing={1}
    >
      <MainBox
        title="Monthly Sales"
        helper="Trends on the orders delivered per month"
      >
        {sales?.requestState?.loading ? (
          <LinearProgress />
        ) : !sales.requestState.error ? (
          Object.keys(sales.requestState.data).length > 0 ? (
            checkAllZero(Object.values(sales.requestState.data)) ? (
              <NoRowsOverlay label="Data" />
            ) : (
              <ChartSales
                xAxesLabel={"Months"}
                yAxesLabel={"Quantity"}
                labels={Object.keys(sales.requestState.data)}
                values={Object.values(sales.requestState.data)}
              />
            )
          ) : (
            <NoRowsOverlay label="Data" />
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
            <NoRowsOverlay label="Data" />
          )
        ) : (
          <>oops</>
        )}
      </MainBox>
    </Stack>
  );
};

const Dashboard = () => {
  return (
    <Stack className="main-page" direction="column" spacing={2}>
      <Salutation name="Admin" />
      <AdminInfoCards />
      <AdminCharts />
      <MainBox title="Recent Orders" helper="Latest Updated Orders">
        <RecentOrdersTable recentOrdersFilter={true} />
      </MainBox>
    </Stack>
  );
};

export default Dashboard;
