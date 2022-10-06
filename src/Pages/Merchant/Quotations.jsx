import QuotationsTable from "../../Components/Merchant/Tables/Quotations";
import "../../Styles/Tables.css";

const Quotations = () => {
    return (
        <div className="Quotations-Page">
            <div className="tables-container">
                <div className="dash-items-title-container">
                    <div>Quotations</div>
                    <div>Responses to buyer request</div>
                </div>
                <div>
                    <QuotationsTable />
                </div>
            </div>
        </div>
    )
}

export default Quotations;