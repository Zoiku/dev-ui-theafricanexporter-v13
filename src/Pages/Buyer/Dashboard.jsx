import "../../Styles/v2/DashboardBuyer.css";
import { Stack } from "@mui/material";
import MainBox from "../../Components/v2/components/MainBox";
import OrdersTable from "../../Components/Buyer/Tables/Orders";
import RequestsTable from "../../Components/Buyer/Tables/Requests";
import Salutation from "../../Components/Salutation";

const Dashboard = ({ session }) => {
  const user = session?.user;

  return (
    <Stack className="main-page" direction="column" spacing={2}>
      <Salutation name={user?.profile?.firstName} />
      <Stack className="buyer_dashboard" direction="row" spacing={1}>
        <MainBox title="Requests" helper="Responses to buyer requests">
          <RequestsTable />
        </MainBox>
        <MainBox title="Orders" helper="Converted Quotations">
          <OrdersTable />
        </MainBox>
      </Stack>
    </Stack>
  );
};

export default Dashboard;
