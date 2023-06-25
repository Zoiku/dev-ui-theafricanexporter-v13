import OrdersTable from "../../Components/Buyer/Tables/Orders";
import MainBox from "../../Components/v2/components/MainBox";

const Orders = () => {
  return (
    <main>
      <MainBox title="Orders" helper="Converted Quotations">
        <OrdersTable />
      </MainBox>
    </main>
  );
};

export default Orders;
