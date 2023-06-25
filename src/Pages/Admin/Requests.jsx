import RequestsTable from "../../Components/Admin/Tables/Requests";
import MainBox from "../../Components/v2/components/MainBox";

const Requests = () => {
  return (
    <main>
      <MainBox title="Requests" helper="All eligible requests from buyer">
        <RequestsTable />
      </MainBox>
    </main>
  );
};

export default Requests;
