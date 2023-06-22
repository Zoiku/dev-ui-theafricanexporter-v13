import QuotationsTable from "../../Components/Merchant/Tables/Quotations";
import MainBox from "../../Components/v2/components/MainBox";

const Quotations = () => {
  return (
    <div className="main_page">
      <MainBox title="Quotations" helper="Responses to buyer request">
        <QuotationsTable />
      </MainBox>
    </div>
  );
};

export default Quotations;
