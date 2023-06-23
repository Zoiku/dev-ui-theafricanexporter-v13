import OrdersTable from "../../Components/Admin/Tables/Orders";
import MainBox from "../../Components/v2/components/MainBox";

const Orders = () => {
  return (
    <main>
      <MainBox title="Orders" helper="Converted quotations">
        <OrdersTable />
      </MainBox>
    </main>
  );
};

export default Orders;
