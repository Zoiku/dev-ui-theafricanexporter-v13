import { useEffect, useReducer } from "react";
import "../../Styles/v2/AdminDash.css";
import { Stack } from "@mui/material";
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

const AdminInfoCard = ({ title, value, loading, error, currency = "" }) => {
  return (
    <Stack className="admin-info-card" spacing={1}>
      <div className="admin-info-title">{title}</div>
      <div className="admin-info-value">
        {loading ? <>Loading</> : error ? <>No data</> : `${currency} ${value}`}
      </div>
    </Stack>
  );
};

const AdminInfoCards = () => {
  const [customers, dispatchCustomers] = useReducer(formReducer, INITIAL_STATE);
  const [orders, dispatchOrders] = useReducer(formReducer, INITIAL_STATE);
  const [sales, dispatchSales] = useReducer(formReducer, INITIAL_STATE);

  useEffect(() => {
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
  }, []);

  useEffect(() => {
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
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      dispatchSales({ type: SEND_REQUEST });
      const merchantService = new MerchantService();
      try {
        const { data, errors } = await merchantService.getTotalSalesAmount();

        console.log(data);

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
  }, []);

  return (
    <Stack
      className="admin-info-cards"
      direction="row"
      justifyItems="space-between"
      spacing={1}
    >
      <AdminInfoCard
        title="Sales"
        currency="$"
        loading={sales.requestState.loading}
        error={sales.requestState?.error}
        value={sales.requestState.data?.value}
      />
      <AdminInfoCard
        title="Customers"
        loading={customers.requestState.loading}
        error={customers.requestState?.error}
        value={customers.requestState.data?.value}
      />
      <AdminInfoCard
        title="Delivered Orders"
        loading={orders.requestState.loading}
        error={orders.requestState?.error}
        value={orders.requestState.data?.value}
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
          <>Loading</>
        ) : !sales.requestState.error ? (
          Object.keys(sales.requestState.data).length > 0 ? (
            <ChartSales
              xAxesLabel={"Months"}
              yAxesLabel={"Quantity"}
              labels={Object.keys(sales.requestState.data)}
              values={Object.values(sales.requestState.data)}
            />
          ) : (
            <>Error data</>
          )
        ) : (
          <>No Items</>
        )}
      </MainBox>

      <MainBox
        title="Categories per Delivery"
        helper="Trends on your most delivered products"
      >
        {categories?.requestState?.loading ? (
          <>Loading</>
        ) : !categories.requestState.error ? (
          Object.keys(categories.requestState.data).length > 0 ? (
            <ChartCategories
              labels={Object.keys(categories.requestState.data)}
              values={Object.values(categories.requestState.data)}
            />
          ) : (
            <>Error data</>
          )
        ) : (
          <>No Items</>
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
      <AdminInfoCards />
      <AdminCharts />
      <MainBox title="Recent Orders" helper="Latest Updated Orders">
        <RecentOrdersTable />
      </MainBox>
    </Stack>
  );
};

export default Dashboard;
// import "../../Styles/DashboardMerchant.css";
// import Salutation from "../../Components/Salutation";
// import Orders from "../../Components/Merchant/Tables/Orders";
// import ChartSales from "../../Components/Charts/Sales";
// import ChartCategories from "../../Components/Charts/Categories";
// import { Groups, Cash, ProductsSold } from "../../Components/Icons";
// import { useEffect } from "react";
// import MerchantService from "../../Services/Merchant";
// import { formReducer, INITIAL_STATE } from "../../Reducers/FormReducer";
// import CircularProgress from '@mui/material/CircularProgress';
// import { SEND_REQUEST, REQUEST_FAILED, REQUEST_SUCCESSFUL } from "../../Reducers/Actions";
// import { useReducer } from "react";
// import empty from "../../Assets/Croods - Chart.png";
// import { addCommas } from "../../Components/Functions";

// const Dashboard = ({ session }) => {
// const { user } = session;
// const [customerCount, dispatchCustomerCount] = useReducer(formReducer, INITIAL_STATE);
// const [deliveredOrdersCount, dispatchDeliveredOrdersCount] = useReducer(formReducer, INITIAL_STATE);
// const [categoriesData, dispatchCategoriesData] = useReducer(formReducer, INITIAL_STATE);
// const [salesAmount, dispatchSalesAmount] = useReducer(formReducer, INITIAL_STATE);
// const [salesData, dispatchSalesData] = useReducer(formReducer, INITIAL_STATE);

// useEffect(() => {
//     const fetchData = async () => {
//         dispatchCustomerCount({ type: SEND_REQUEST });
//         const merchantService = new MerchantService();
//         try {
//             const { data, errors } = await merchantService.getCustomersCount();
//             if (errors.length === 0) {
//                 const { totalCount } = data.data;
//                 dispatchCustomerCount({ type: REQUEST_SUCCESSFUL, payload: { value: totalCount } });
//             } else {
//                 dispatchCustomerCount({ type: REQUEST_FAILED });
//             }
//         } catch (error) {
//             dispatchCustomerCount({ type: REQUEST_FAILED });
//         }
//     }

//     fetchData();
// }, []);

//     useEffect(() => {
//         const fetchData = async () => {
//             dispatchDeliveredOrdersCount({ type: SEND_REQUEST });
//             const merchantService = new MerchantService();
//             try {
//                 const { data, errors } = await merchantService.getDeliveredOrders();
//                 if (errors.length === 0) {
//                     const { totalCount } = data.data;
//                     dispatchDeliveredOrdersCount({ type: REQUEST_SUCCESSFUL, payload: { value: totalCount } });
//                 } else {
//                     dispatchDeliveredOrdersCount({ type: REQUEST_FAILED });
//                 }
//             } catch (error) {
//                 dispatchDeliveredOrdersCount({ type: REQUEST_FAILED });
//             }
//         }

//         fetchData();
//     }, []);

// useEffect(() => {
//     const fetchData = async () => {
//         dispatchCategoriesData({ type: SEND_REQUEST });
//         const merchantService = new MerchantService();
//         try {
//             const { data, errors } = await merchantService.getCateogriesCount();
//             if (errors.length === 0) {
//                 dispatchCategoriesData({ type: REQUEST_SUCCESSFUL, payload: data })
//             } else {
//                 dispatchCategoriesData({ type: REQUEST_FAILED });
//             }
//         } catch (error) {
//             dispatchCategoriesData({ type: REQUEST_FAILED });
//         }
//     }

//     fetchData();
// }, []);

//     useEffect(() => {
//         const fetchData = async () => {
//             dispatchSalesAmount({ type: SEND_REQUEST });
//             const merchantService = new MerchantService();
//             try {
//                 const { data, errors } = await merchantService.getTotalSalesAmount();
//                 if (errors.length === 0) {
//                     dispatchSalesAmount({ type: REQUEST_SUCCESSFUL, payload: { value: addCommas(data) } })
//                 } else {
//                     dispatchSalesAmount({ type: REQUEST_FAILED });
//                 }
//             } catch (error) {
//                 dispatchSalesAmount({ type: REQUEST_FAILED });
//             }
//         }

//         fetchData();
//     }, []);

// useEffect(() => {
//     const fetchData = async () => {
//         dispatchSalesData({ type: SEND_REQUEST });
//         const merchantService = new MerchantService();
//         try {
//             const { data, errors } = await merchantService.getSales();
//             if (errors.length === 0) {
//                 dispatchSalesData({ type: REQUEST_SUCCESSFUL, payload: data })
//             } else {
//                 dispatchSalesData({ type: REQUEST_FAILED });
//             }
//         } catch (error) {
//             dispatchSalesData({ type: REQUEST_FAILED });
//         }
//     }

//     fetchData();
// }, []);

//     return (
//         <div className="Merchant-Dashboard">
//             <div>
//                 <Salutation name={user?.profile?.user?.firstName} />
//             </div>

//             <div className="merchantDashboardBodyContainer">
//                 <div className="merchantDashboardBody">
//                     <div className="merchantCardsContainer">
//                         <div className="merchantCards">
//                             <div className="merchantCardTextContent">
//                                 <div>Sales</div>
//                                 <div>{
//                                     salesAmount.requestState.loading ?
//                                         <div className="circular-progress-container circular-progress-container-left-align"><CircularProgress size={20} color="inherit" /></div>
//                                         :
//                                         !salesAmount.requestState.error ?
//                                             "$" + salesAmount.requestState.data?.value
//                                             :
//                                             <div className="dash-item-no-data-container">...</div>
//                                 }</div>
//                             </div>
//                             <div className="merchantCardBackgroundIcons">
//                                 <Cash />
//                             </div>
//                         </div>
//                         <div className="merchantCards">
//                             <div className="merchantCardTextContent">
//                                 <div>Customers</div>
//                                 <div>
//                                     {
//                                         customerCount.requestState.loading ?
//                                             <div className="circular-progress-container circular-progress-container-left-align"><CircularProgress size={20} color="inherit" /></div>
//                                             :
//                                             !customerCount.requestState.error ?
//                                                 customerCount.requestState.data?.value
//                                                 :
//                                                 <div className="dash-item-no-data-container">...</div>
//                                     }
//                                 </div>
//                             </div>
//                             <div className="merchantCardBackgroundIcons">
//                                 <Groups />
//                             </div>
//                         </div>
//                         <div className="merchantCards">
//                             <div className="merchantCardTextContent">
//                                 <div>Delivered Orders</div>
//                                 <div>
//                                     {
//                                         deliveredOrdersCount.requestState.loading ?
//                                             <div className="circular-progress-container circular-progress-container-left-align"><CircularProgress size={20} color="inherit" /></div>
//                                             :
//                                             !deliveredOrdersCount.requestState.error ?
//                                                 deliveredOrdersCount.requestState.data?.value
//                                                 :
//                                                 <div className="dash-item-no-data-container">...</div>
//                                     }
//                                 </div>
//                             </div>
//                             <div className="merchantCardBackgroundIcons">
//                                 <ProductsSold />
//                             </div>
//                         </div>
//                     </div>

//                     <div className="merchantDashboardGridContainer">
//                         <div className="merchantDashboardGrid merchantDashboardGrid01">
//                             <div className="dash-items-title-container">
//                                 <div>Your Monthly Sales</div>
//                                 <div>Trends on the orders delivered per month</div>
//                             </div>
//                             <div className="merchantGridContainer">
//                                 {
//                                     salesData.requestState.loading ?
//                                         <div className="circular-progress-container"><CircularProgress size={20} color="inherit" /></div>
//                                         :
//                                         !salesData.requestState.error ?
//                                             Object.keys(salesData.requestState.data).length > 0 ?
//                                                 <ChartSales xAxesLabel={"Months"} yAxesLabel={"Quantity"} labels={Object.keys(salesData.requestState.data)} values={Object.values(salesData.requestState.data)} />
//                                                 :
//                                                 <div className="dash-item-no-chart-data-container">
//                                                     <div className="dash-item-no-chart-data">
//                                                         <img src={empty} alt="" />
//                                                         <div>Complete an order to update this chart</div>
//                                                     </div>
//                                                 </div>
//                                             :
//                                             <div className="dash-item-no-data-container">...</div>
//                                 }

//                             </div>
//                         </div>

//                         <div className="merchantDashboardGrid merchantDashboardGrid02">
//                             <div className="merchantDashboardGridTitleContainer">
//                                 <div className="dash-items-title-container">
//                                     <div>Recent Orders</div>
//                                     <div>Latest Updated Orders</div>
//                                 </div>
//                                 <div className="dashboard-requests-table-container">
//                                     <Orders />
//                                 </div>
//                             </div>
//                         </div>

//                         <div className="merchantDashboardGrid merchantDashboardGrid03">
//                             <div className="dash-items-title-container">
//                                 <div>Categories per Delivery</div>
//                                 <div>Trends on your most delivered products</div>
//                             </div>
//                             <div className="merchantGridContainer">
//                                 {
//                                     categoriesData.requestState.loading ?
//                                         <div className="circular-progress-container"><CircularProgress size={20} color="inherit" /></div>
//                                         :
//                                         !categoriesData.requestState.error ?
//                                             Object.keys(categoriesData.requestState.data).length > 0 ?
// <ChartCategories labels={Object.keys(categoriesData.requestState.data)} values={Object.values(categoriesData.requestState.data)} />
//                                                 :
//                                                 <div className="dash-item-no-chart-data-container">
//                                                     <div className="dash-item-no-chart-data">
//                                                         <img src={empty} alt="" />
//                                                         <div>Complete an order to update this chart</div>
//                                                     </div>
//                                                 </div>
//                                             :
//                                             <div className="dash-item-no-data-container">...</div>
//                                 }
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default Dashboard;
