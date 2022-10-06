import "../../Styles/DashboardMerchant.css";
import Salutation from "../../Components/Salutation";
import Orders from "../../Components/Merchant/Tables/Orders";
import Quotations from "../../Components/Merchant/Tables/Quotations";
import Requests from "../../Components/Merchant/Tables/Requests";

const Dashboard = ({ session }) => {
    const { user } = session;

    return (
        <div className="Merchant-Dashboard">
            <div>
                <Salutation name={user?.profile?.user?.firstName} />
            </div>

            <div className="merchant-dashboard-body-container">
                <div>
                    <div className="dash-items-title-container">
                        <div>Orders</div>
                        <div>Converted quotations</div>
                    </div>
                    <div>
                        <Orders />
                    </div>
                </div>
                <div>
                    <div className="dash-items-title-container">
                        <div>Quotations</div>
                        <div>Responses to buyer requests</div>
                    </div>
                    <div>
                        <Quotations />
                    </div>
                </div>
                <div>
                    <div className="dash-items-title-container">
                        <div>Request Timeline</div>
                        <div>Timeline of all eligible requests from buyer</div>
                    </div>
                    <div className="dashboard-requests-table-container">
                        <Requests />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;