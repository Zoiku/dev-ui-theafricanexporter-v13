import RequestsTable from "../../Components/Merchant/Tables/Requests";
import MainBox from "../../Components/v2/components/MainBox";

const Requests = () => {
  return (
    <div className="main_page">
      <MainBox
        title="Requests Timeline"
        helper="Timeline of all eligible requests"
      >
        <RequestsTable />
      </MainBox>
    </div>
  );
};

export default Requests;
