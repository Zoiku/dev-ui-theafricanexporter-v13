import "../../Styles/DashboardBuyer.css";
import Salutation from "../../Components/Salutation";
import Orders from "../../Components/Buyer/Tables/Orders";
import Requests from "../../Components/Buyer/Tables/Requests";

const Dashboard = ({ session }) => {
  const { user } = session;

  return (
    <div className="Buyer-Dashboard">
      <div>
        <Salutation name={user?.profile?.firstName} />
      </div>

      <div className="buyer-dashboard-body-container">
        <div>
          <div className="dash-items-title-container">
            <div>Requests</div>
            <div>Responses to buyer requests</div>
          </div>
          <div>
            <Requests />
          </div>
        </div>
        <div>
          <div className="dash-items-title-container">
            <div>Orders</div>
            <div>Converted quotations</div>
          </div>
          <div>
            <Orders />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
