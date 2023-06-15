import { Slide, SlideProps } from "@mui/material/";
import { forwardRef } from "react";

export const Transition = forwardRef(function Transition(
  props: SlideProps,
  ref
) {
  return (
    <Slide mountOnEnter unmountOnExit direction="down" ref={ref} {...props} />
  );
});
