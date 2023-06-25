import { Stepper, Step, StepLabel } from "@mui/material";
import { steps, ORDER_STATUS_STEPS } from "./OrderStatus";
import "../../../Styles/v2/Stepper.css";

const MuiStepper = ({ activeStep }) => {
  return (
    <>
      <div className="web_stepper">
        <Stepper activeStep={ORDER_STATUS_STEPS[activeStep]}>
          {steps.map((step) => (
            <Step key={step.label}>
              <StepLabel>{step.label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </div>

      <div className="mobile_stepper">
        <Stepper
          orientation="vertical"
          activeStep={ORDER_STATUS_STEPS[activeStep]}
        >
          {steps.map((step) => (
            <Step key={step.label}>
              <StepLabel>{step.label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </div>
    </>
  );
};

export default MuiStepper;
