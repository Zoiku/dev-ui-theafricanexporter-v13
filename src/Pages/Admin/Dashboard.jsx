import "../../Styles/DashboardAdmin.css";
import SalesChart from "../../Components/Charts/Sales";
import CategoriesChart from "../../Components/Charts/Categories";
import OrdersTable from "../../Components/Admin/Tables/Orders";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import Salutation from "../../Components/Salutation";
import { useEffect } from "react";
import AdminService from "../../Services/Admin";
import CircularProgress from "@mui/material/CircularProgress";
import { formReducer, INITIAL_STATE } from "../../Reducers/FormReducer";
import { useReducer } from "react";
import {
  SEND_REQUEST,
  REQUEST_FAILED,
  REQUEST_SUCCESSFUL,
} from "../../Reducers/Actions";
import {
  InactiveUser,
  PendingOrders,
  Delivered,
  Group,
} from "../../Components/Icons";

const AdminDashboard = () => {
  const [merchantBuyerRatio, dispatchMerchantBuyerRatio] = useReducer(
    formReducer,
    INITIAL_STATE
  );
  const [salesChartData, dispatchSales] = useReducer(
    formReducer,
    INITIAL_STATE
  );
  const [categoriesChartData, dispatchCategories] = useReducer(
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
    dispatchSales({ type: SEND_REQUEST });
    const abortController = new AbortController();
    const fecthData = async () => {
      const adminService = new AdminService();
      try {
        const { errors, data } = await adminService.getRequestsSalesData(
          abortController.signal
        );
        if (errors.length === 0) {
          dispatchSales({ type: REQUEST_SUCCESSFUL, payload: data });
        } else {
          dispatchSales({ type: REQUEST_FAILED, error: errors });
        }
      } catch (error) {}
    };

    fecthData();
    return () => abortController.abort();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    dispatchCategories({ type: SEND_REQUEST });
    const abortController = new AbortController();
    const fecthData = async () => {
      const adminService = new AdminService();
      try {
        const { errors, data } = await adminService.getRequestsCategories(
          abortController.signal
        );
        if (errors.length === 0) {
          dispatchCategories({ type: REQUEST_SUCCESSFUL, payload: data });
        } else {
          dispatchCategories({ type: REQUEST_FAILED });
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
    <div className="Admin-DashBoard">
      <div>
        <Salutation name={"Admin"} />
      </div>

      <div className="dashboard-body-container">
        <div>
          <div className="dash-items-title-container">
            <div>Merchant to Buyer Ratio</div>
            <div>
              A positive merchant to buyers ratio should be at least 1:5
            </div>
          </div>
          <div className="dash-item-value-container">
            <div className="admin-card-icon-container">
              <Group />
            </div>
            <div>
              {merchantBuyerRatio.requestState.loading ? (
                <CircularProgress size={20} color="inherit" />
              ) : !merchantBuyerRatio.requestState.error ? (
                merchantBuyerRatio.requestState?.data?.value
              ) : (
                <div className="dash-item-no-data-container">...</div>
              )}
            </div>
          </div>
        </div>
        <Swiper
          direction={"vertical"}
          loop={true}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
        >
          <SwiperSlide>
            <div className="dash-items-title-container">
              <div>Unactivated Users</div>
              <div>Check the users tab to activate registered accounts</div>
            </div>
            <div className="dash-item-value-container">
              <div className="admin-card-icon-container">
                <InactiveUser />
              </div>
              <div>
                {unactivatedUsers.requestState.loading ? (
                  <CircularProgress size={20} color="inherit" />
                ) : !unactivatedUsers.requestState.error ? (
                  unactivatedUsers.requestState.data?.value
                ) : (
                  <div className="dash-item-no-data-container">...</div>
                )}
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="dash-items-title-container">
              <div>Pending Orders</div>
              <div>Check the orders tab to approve orders</div>
            </div>
            <div className="dash-item-value-container">
              <div className="admin-card-icon-container">
                <PendingOrders />
              </div>
              <div>
                {pendingOrders.requestState.loading ? (
                  <CircularProgress size={20} color="inherit" />
                ) : !pendingOrders.requestState.error ? (
                  pendingOrders.requestState.data?.value
                ) : (
                  <div className="dash-item-no-data-container">...</div>
                )}
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="dash-items-title-container">
              <div>Delivered Orders</div>
              <div>Orders that have been delivered to buyers</div>
            </div>
            <div className="dash-item-value-container">
              <div className="admin-card-icon-container">
                <Delivered />
              </div>
              <div>
                {deliveredOrders.requestState.loading ? (
                  <CircularProgress size={20} color="inherit" />
                ) : !deliveredOrders.requestState.error ? (
                  deliveredOrders.requestState.data?.value
                ) : (
                  <div className="dash-item-no-data-container">...</div>
                )}
              </div>
            </div>
          </SwiperSlide>
        </Swiper>

        <div>
          <div
            className="dash-items-title-container"
            style={{ marginBottom: 20 }}
          >
            <div>Categories per Request</div>
            <div>Trends on the most requested products</div>
          </div>
          <div className="dash-item-category-chart-container">
            {categoriesChartData.requestState.loading ? (
              <div className="circular-progress-container">
                <CircularProgress size={20} color="inherit" />
              </div>
            ) : !categoriesChartData.requestState.error ? (
              <CategoriesChart
                labels={Object.keys(categoriesChartData.requestState.data)}
                values={Object.values(categoriesChartData.requestState.data)}
              />
            ) : (
              <div className="dash-item-no-data-container">No data</div>
            )}
          </div>
        </div>

        <div>
          <div className="dash-items-title-container">
            <div>This Year: Sales Activity</div>
            <div>Total Requests from sales per month</div>
          </div>
          <div>
            {salesChartData.requestState.loading ? (
              <div className="dash-item-loading-container">
                <CircularProgress size={20} color="inherit" />
              </div>
            ) : !salesChartData.requestState.error ? (
              <SalesChart
                yAxesLabel={"Quantity"}
                xAxesLabel={"Month"}
                labels={Object.keys(salesChartData.requestState.data)}
                values={Object.values(salesChartData.requestState.data)}
              />
            ) : (
              <div className="dash-item-no-data-container">No data</div>
            )}
          </div>
        </div>
        <div>
          <div className="dash-items-title-container">
            <div>Upcoming Products</div>
            <div>Products coming soon</div>
          </div>
          <div>
            <div className="dash-item-no-data-container">No data</div>
          </div>
        </div>
        <div>
          <div className="dash-items-title-container">
            <div>Recent Orders</div>
            <div>Orders made in the past 24 hours</div>
          </div>
          <div>
            <OrdersTable />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
