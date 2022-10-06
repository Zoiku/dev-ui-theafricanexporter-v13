import OrdersTable from "../../Components/Merchant/Tables/Orders";
import "../../Styles/Tables.css";

const Orders = () => {
    return (
        <div className="Orders-Page">
            <div className="tables-container">
                <div className="dash-items-title-container">
                    <div>Orders</div>
                    <div>Converted quotations</div>
                </div>
                <div>
                    <OrdersTable />
                </div>
            </div>
        </div>
    )
}

export default Orders;