import "./Test.css";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { inWebWider } from "./Styles/Modal";
import { useState } from "react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, EffectFade } from "swiper";

import getStarted from "./Assets/Pebble People - Meditating.png";


const Tutorial = () => {
    const [openDrawer, setOpenDrawer] = useState(true);
    const toggleDrawer = (open) => (_event) => {
        setOpenDrawer(open);
    };

    return (
        <div className="tutorialComponentContainer">
            <Modal
                open={openDrawer}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className="tutorialModal" sx={inWebWider}>
                    <div className="tutorialComponent">
                        <Swiper
                            effect={"fade"}
                            navigation={true}
                            pagination={true}
                            modules={[Pagination, Navigation, EffectFade]}
                            className="mySwiper"
                        >
                            <SwiperSlide>
                                <div className="tutorialSwipeContainer">
                                    <div className="tutorialSwipe">
                                        <div className="tutorialContent tutorial-page-01">
                                            <div className="get-started-img-container">
                                                <div className="get-started-img">
                                                    <img src={getStarted} alt="" />
                                                </div>
                                            </div>

                                            <div className="tutorialContentBodyContainer">
                                                <div className="tutorialContentBody">
                                                    <div className="hello-message">Hello <span className="colored">buyers</span>, welcome to TheAfricanExporter!</div>
                                                    <div className="extra-message-to-hello">Explore the biggest B2B marketplace in Africa</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>

                            <SwiperSlide>
                                <div className="tutorialSwipeContainer">
                                    <div className="tutorialSwipe">
                                        <div className="tutorialContent tutorial-page-02">
                                            <div className="tutorialImageAndScriptContainer">
                                                <div className="tutorialIHeadingContainer"></div>
                                                <div className="tutorialImageContainer"></div>
                                                <div className="tutorialScriptContainer"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        </Swiper>
                    </div>
                </Box>
            </Modal>
        </div>
    );
};

const Test = () => {
    return (
        <div className="testPageContainer">
            <div className="testPage">
                <Tutorial />
            </div>
        </div>
    );
};

export default Test;
