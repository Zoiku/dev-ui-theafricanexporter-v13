import { Stack } from "@mui/material";
import "../Styles/v2/Salutation.css";

const Salutation = ({ name }) => {
  return (
    <Stack className="salutation">
      <div>
        {new Date().getHours() >= 0 && new Date().getHours() < 12 && (
          <div className="salutation-item">
            <span>Good morning</span>, <span>{name}!</span>
          </div>
        )}
        {new Date().getHours() >= 12 && new Date().getHours() < 17 && (
          <div className="salutation-item">
            <span>Good afternoon</span>, <span>{name}!</span>
          </div>
        )}
        {new Date().getHours() >= 17 && new Date().getHours() < 24 && (
          <div className="salutation-item">
            <span>Good evening</span>, <span>{name}!</span>
          </div>
        )}
      </div>
    </Stack>
  );
};

export default Salutation;
