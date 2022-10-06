import RequestsTable from "../../Components/Buyer/Tables/Requests";
import "../../Styles/Tables.css";

const Requests = () => {
    return (
        <div className="Requests-Page">
            <div className="tables-container">
                <div className="dash-items-title-container">
                    <div>Requests</div>
                    <div>Timeline of all eligible requests from buyer</div>
                </div>
                <div>
                    <RequestsTable />
                </div>
            </div>
        </div>
    )
};

export default Requests;