import RequestsTable from "../../Components/Buyer/Tables/Requests";
import MainBox from "../../Components/v2/components/MainBox";

const Orders = () => {
  return (
    <div>
      <MainBox
        title="Requests"
        helper="Responses to buyer requests"
      >
        <RequestsTable />
      </MainBox>
    </div>
  );
};

export default Orders;
