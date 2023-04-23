import "../../Styles/DashboardMerchant.css";
import Salutation from "../../Components/Salutation";
import Orders from "../../Components/Merchant/Tables/Orders";
import ChartSales from "../../Components/Charts/Sales";
import ChartCategories from "../../Components/Charts/Categories";
import { Groups, Cash, ProductsSold } from "../../Components/Icons";

const Dashboard = ({ session }) => {
    const { user } = session;

    const testData = {
        salesLabel: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"],
        salesValues: [5, 10, 0, 11, 2, 20, 3, 25, 4, 30, 5, 35],
        catLabels: ["Teak Round Logs", "Teak Square Logs"],
        catValues: [30, 100],
    }

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
                                <div>Customers</div>
                                <div>0</div>
                            </div>
                            <div className="merchantCardBackgroundIcons">
                                <Groups />
                            </div>
                        </div>
                        <div className="merchantCards">
                            <div className="merchantCardTextContent">
                                <div>Sales</div>
                                <div>$0</div>
                            </div>
                            <div className="merchantCardBackgroundIcons">
                                <Cash />
                            </div>
                        </div>
                        <div className="merchantCards">
                            <div className="merchantCardTextContent">
                                <div>Delivered Products</div>
                                <div>0</div>
                            </div>
                            <div className="merchantCardBackgroundIcons">
                                <ProductsSold />
                            </div>
                        </div>
                    </div>

                    <div className="merchantDashboardGridContainer">
                        <div className="merchantDashboardGrid merchantDashboardGrid01">
                            <div className="dash-items-title-container">
                                <div>Monthly Sales</div>
                                <div>Trends on the revenue generated per month</div>
                            </div>
                            <div className="merchantGridContainer">
                                <ChartSales labels={testData.salesLabel} values={testData.salesValues} yAxesLabel={"Amount"} xAxesLabel={"Month"} />
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
                                <div>Top Catergories</div>
                                <div>Trends on the mostly requested product</div>
                            </div>
                            <div className="merchantGridContainer">
                                <ChartCategories labels={testData.catLabels} values={testData.catValues} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;