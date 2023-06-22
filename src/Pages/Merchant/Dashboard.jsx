import "../../Styles/DashboardMerchant.css";
import Salutation from "../../Components/Salutation";
import Orders from "../../Components/Merchant/Tables/Orders";
import ChartSales from "../../Components/Charts/Sales";
import ChartCategories from "../../Components/Charts/Categories";
import { Groups, Cash, ProductsSold } from "../../Components/Icons";
import { useEffect } from "react";
import MerchantService from "../../Services/Merchant";
import { formReducer, INITIAL_STATE } from "../../Reducers/FormReducer";
import CircularProgress from '@mui/material/CircularProgress';
import { SEND_REQUEST, REQUEST_FAILED, REQUEST_SUCCESSFUL } from "../../Reducers/Actions";
import { useReducer } from "react";
import empty from "../../Assets/Croods - Chart.png";
import { addCommas } from "../../Components/Functions";

const Dashboard = ({ session }) => {
    const { user } = session;
    const [customerCount, dispatchCustomerCount] = useReducer(formReducer, INITIAL_STATE);
    const [deliveredOrdersCount, dispatchDeliveredOrdersCount] = useReducer(formReducer, INITIAL_STATE);
    const [categoriesData, dispatchCategoriesData] = useReducer(formReducer, INITIAL_STATE);
    const [salesAmount, dispatchSalesAmount] = useReducer(formReducer, INITIAL_STATE);
    const [salesData, dispatchSalesData] = useReducer(formReducer, INITIAL_STATE);

    useEffect(() => {
        const fetchData = async () => {
            dispatchCustomerCount({ type: SEND_REQUEST });
            const merchantService = new MerchantService();
            try {
                const { data, errors } = await merchantService.getCustomersCount();
                if (errors.length === 0) {
                    const { totalCount } = data.data;
                    dispatchCustomerCount({ type: REQUEST_SUCCESSFUL, payload: { value: totalCount } });
                } else {
                    dispatchCustomerCount({ type: REQUEST_FAILED });
                }
            } catch (error) {
                dispatchCustomerCount({ type: REQUEST_FAILED });
            }
        }

        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            dispatchDeliveredOrdersCount({ type: SEND_REQUEST });
            const merchantService = new MerchantService();
            try {
                const { data, errors } = await merchantService.getDeliveredOrders();
                if (errors.length === 0) {
                    const { totalCount } = data.data;
                    dispatchDeliveredOrdersCount({ type: REQUEST_SUCCESSFUL, payload: { value: totalCount } });
                } else {
                    dispatchDeliveredOrdersCount({ type: REQUEST_FAILED });
                }
            } catch (error) {
                dispatchDeliveredOrdersCount({ type: REQUEST_FAILED });
            }
        }

        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            dispatchCategoriesData({ type: SEND_REQUEST });
            const merchantService = new MerchantService();
            try {
                const { data, errors } = await merchantService.getCateogriesCount();
                if (errors.length === 0) {
                    dispatchCategoriesData({ type: REQUEST_SUCCESSFUL, payload: data })
                } else {
                    dispatchCategoriesData({ type: REQUEST_FAILED });
                }
            } catch (error) {
                dispatchCategoriesData({ type: REQUEST_FAILED });
            }
        }

        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            dispatchSalesAmount({ type: SEND_REQUEST });
            const merchantService = new MerchantService();
            try {
                const { data, errors } = await merchantService.getTotalSalesAmount();
                if (errors.length === 0) {
                    dispatchSalesAmount({ type: REQUEST_SUCCESSFUL, payload: { value: addCommas(data) } })
                } else {
                    dispatchSalesAmount({ type: REQUEST_FAILED });
                }
            } catch (error) {
                dispatchSalesAmount({ type: REQUEST_FAILED });
            }
        }

        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            dispatchSalesData({ type: SEND_REQUEST });
            const merchantService = new MerchantService();
            try {
                const { data, errors } = await merchantService.getSales();
                if (errors.length === 0) {
                    dispatchSalesData({ type: REQUEST_SUCCESSFUL, payload: data })
                } else {
                    dispatchSalesData({ type: REQUEST_FAILED });
                }
            } catch (error) {
                dispatchSalesData({ type: REQUEST_FAILED });
            }
        }

        fetchData();
    }, []);

    return (
        <div className="Merchant-Dashboard">
            <div>
                <Salutation name={user?.profile?.user?.firstName} />
            </div>

            <div className="merchantDashboardBodyContainer">
                <div className="merchantDashboardBody">
                    <div className="merchantCardsContainer">
                        <div className="merchantCards">
                            <div className="merchantCardTextContent">
                                <div>Sales</div>
                                <div>{
                                    salesAmount.requestState.loading ?
                                        <div className="circular-progress-container circular-progress-container-left-align"><CircularProgress size={20} color="inherit" /></div>
                                        :
                                        !salesAmount.requestState.error ?
                                            "$" + salesAmount.requestState.data?.value
                                            :
                                            <div className="dash-item-no-data-container">...</div>
                                }</div>
                            </div>
                            <div className="merchantCardBackgroundIcons">
                                <Cash />
                            </div>
                        </div>
                        <div className="merchantCards">
                            <div className="merchantCardTextContent">
                                <div>Customers</div>
                                <div>
                                    {
                                        customerCount.requestState.loading ?
                                            <div className="circular-progress-container circular-progress-container-left-align"><CircularProgress size={20} color="inherit" /></div>
                                            :
                                            !customerCount.requestState.error ?
                                                customerCount.requestState.data?.value
                                                :
                                                <div className="dash-item-no-data-container">...</div>
                                    }
                                </div>
                            </div>
                            <div className="merchantCardBackgroundIcons">
                                <Groups />
                            </div>
                        </div>
                        <div className="merchantCards">
                            <div className="merchantCardTextContent">
                                <div>Delivered Orders</div>
                                <div>
                                    {
                                        deliveredOrdersCount.requestState.loading ?
                                            <div className="circular-progress-container circular-progress-container-left-align"><CircularProgress size={20} color="inherit" /></div>
                                            :
                                            !deliveredOrdersCount.requestState.error ?
                                                deliveredOrdersCount.requestState.data?.value
                                                :
                                                <div className="dash-item-no-data-container">...</div>
                                    }
                                </div>
                            </div>
                            <div className="merchantCardBackgroundIcons">
                                <ProductsSold />
                            </div>
                        </div>
                    </div>

                    <div className="merchantDashboardGridContainer">
                        <div className="merchantDashboardGrid merchantDashboardGrid01">
                            <div className="dash-items-title-container">
                                <div>Your Monthly Sales</div>
                                <div>Trends on the orders delivered per month</div>
                            </div>
                            <div className="merchantGridContainer">
                                {
                                    salesData.requestState.loading ?
                                        <div className="circular-progress-container"><CircularProgress size={20} color="inherit" /></div>
                                        :
                                        !salesData.requestState.error ?
                                            Object.keys(salesData.requestState.data).length > 0 ?
                                                <ChartSales xAxesLabel={"Months"} yAxesLabel={"Quantity"} labels={Object.keys(salesData.requestState.data)} values={Object.values(salesData.requestState.data)} />
                                                :
                                                <div className="dash-item-no-chart-data-container">
                                                    <div className="dash-item-no-chart-data">
                                                        <img src={empty} alt="" />
                                                        <div>Complete an order to update this chart</div>
                                                    </div>
                                                </div>
                                            :
                                            <div className="dash-item-no-data-container">...</div>
                                }

                            </div>
                        </div>

                        <div className="merchantDashboardGrid merchantDashboardGrid02">
                            <div className="merchantDashboardGridTitleContainer">
                                <div className="dash-items-title-container">
                                    <div>Recent Orders</div>
                                    <div>Latest Updated Orders</div>
                                </div>
                                <div className="dashboard-requests-table-container">
                                    <Orders />
                                </div>
                            </div>
                        </div>

                        <div className="merchantDashboardGrid merchantDashboardGrid03">
                            <div className="dash-items-title-container">
                                <div>Categories per Delivery</div>
                                <div>Trends on your most delivered products</div>
                            </div>
                            <div className="merchantGridContainer">
                                {
                                    categoriesData.requestState.loading ?
                                        <div className="circular-progress-container"><CircularProgress size={20} color="inherit" /></div>
                                        :
                                        !categoriesData.requestState.error ?
                                            Object.keys(categoriesData.requestState.data).length > 0 ?
                                                <ChartCategories labels={Object.keys(categoriesData.requestState.data)} values={Object.values(categoriesData.requestState.data)} />
                                                :
                                                <div className="dash-item-no-chart-data-container">
                                                    <div className="dash-item-no-chart-data">
                                                        <img src={empty} alt="" />
                                                        <div>Complete an order to update this chart</div>
                                                    </div>
                                                </div>
                                            :
                                            <div className="dash-item-no-data-container">...</div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;