import { Stepper, Step, StepLabel } from "@mui/material";
import { steps, ORDER_STATUS_STEPS } from "./OrderStatus";

const MuiStepper = ({ activeStep }) => {
  return (
    <Stepper activeStep={ORDER_STATUS_STEPS[activeStep]}>
      {steps.map((step) => (
        <Step key={step.label}>
          <StepLabel>{step.label}</StepLabel>
        </Step>
      ))}
    </Stepper>
  );
};

export default MuiStepper;
