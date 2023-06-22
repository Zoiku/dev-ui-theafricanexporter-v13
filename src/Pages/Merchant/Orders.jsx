import OrdersTable from "../../Components/Merchant/Tables/Orders";
import MainBox from "../../Components/v2/components/MainBox";

const Orders = () => {
  return (
    <div className="main_page">
      <MainBox title="Orders" helper="Converted quotations">
        <OrdersTable />
      </MainBox>
    </div>
  );
};

export default Orders;
