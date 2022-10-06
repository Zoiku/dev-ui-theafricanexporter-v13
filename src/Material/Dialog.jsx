import Slide from '@mui/material/Slide';
import { forwardRef } from "react"

export const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});