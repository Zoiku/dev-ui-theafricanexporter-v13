import "../Styles/Tutorial.css";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { inWebTut } from "../Styles/Modal";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Navigation, Pagination } from "swiper";

import getStarted from "../Assets/Allura - Feedback Session.svg";
import AuthService from "../Services/Auth";
import { useState, useCallback, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import completedTutorialImage from "../Assets/Allura - Exploring on Laptop.svg";

import ImageViewer from "react-simple-image-viewer";

import merchantStep1 from "../Assets/Walkthrough Images/Walkthrough (Merchant)/Step 1.png";
import merchantStep2 from "../Assets/Walkthrough Images/Walkthrough (Merchant)/Step 2.png";
import merchantStep3 from "../Assets/Walkthrough Images/Walkthrough (Merchant)/Step 3.png";
import merchantStep4 from "../Assets/Walkthrough Images/Walkthrough (Merchant)/Step 4.png";
import merchantStep5 from "../Assets/Walkthrough Images/Walkthrough (Merchant)/Step 5.png";
import merchantStep6 from "../Assets/Walkthrough Images/Walkthrough (Merchant)/Step 6.png";
import merchantStep7 from "../Assets/Walkthrough Images/Walkthrough (Merchant)/Step 7.png";

import buyerStep1 from "../Assets/Walkthrough Images/Walkthrough (Buyer)/Step 1.png";
import buyerStep2 from "../Assets/Walkthrough Images/Walkthrough (Buyer)/Step 2.png";
import buyerStep3 from "../Assets/Walkthrough Images/Walkthrough (Buyer)/Step 3.png";
import buyerStep4 from "../Assets/Walkthrough Images/Walkthrough (Buyer)/Step 4.png";
import buyerStep5 from "../Assets/Walkthrough Images/Walkthrough (Buyer)/Step 5.png";
import buyerStep6 from "../Assets/Walkthrough Images/Walkthrough (Buyer)/Step 6.png";
import buyerStep7 from "../Assets/Walkthrough Images/Walkthrough (Buyer)/Step 7.png";
import buyerStep8 from "../Assets/Walkthrough Images/Walkthrough (Buyer)/Step 8.png";
import buyerStep9 from "../Assets/Walkthrough Images/Walkthrough (Buyer)/Step 9.png";
import buyerStep10 from "../Assets/Walkthrough Images/Walkthrough (Buyer)/Step 10.png";
import buyerStep11 from "../Assets/Walkthrough Images/Walkthrough (Buyer)/Step 11.png";

import { initUser } from "../Redux/Features/Session";
import { useDispatch } from "react-redux";

const Tutorial = ({ openDrawer, role, user }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  const rootDispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [slideEnd, setSlideEnd] = useState(false);
  const capitalizeFirstLetter = (string) =>
    string.charAt(0).toUpperCase() + string.slice(1);

  const openImageViewer = useCallback((index) => {
    setCurrentImage(index);
    setIsViewerOpen(true);
  }, []);

  const closeImageViewer = () => {
    setCurrentImage(currentImage);
    setIsViewerOpen(false);
  };

  useEffect(() => {
    console.log(`Current image: ${currentImage}`);
  }, [currentImage]);

  const CompletedTutorial = () => {
    return (
      <div className="completedTutorialContainer">
        <div className="completedTutorial">
          <img src={completedTutorialImage} alt="" />
          <div>All right! You're all set and ready to go</div>
        </div>
      </div>
    );
  };

  const tutorialType = {
    MERCHANT: [
      merchantStep1,
      merchantStep2,
      merchantStep3,
      merchantStep4,
      merchantStep5,
      merchantStep6,
      merchantStep7,
    ],
    BUYER: [
      buyerStep1,
      buyerStep2,
      buyerStep3,
      buyerStep4,
      buyerStep5,
      buyerStep6,
      buyerStep7,
      buyerStep8,
      buyerStep9,
      buyerStep10,
      buyerStep11,
    ],
  };

  const handleClose = async () => {
    setLoading(true);
    const id =
      role === "BUYER"
        ? user.profile.id
        : role === "MERCHANT" && user.profile.user.id;
    const authService = new AuthService();
    try {
      const { errors } = await authService.isLoggedBefore(id);
      if (errors.length === 0) {
        setLoading(false);
        if (role === "MERCHANT") {
          rootDispatch(
            initUser({ user: { ...user.profile.user, isLoggedBefore: true } })
          );
        } else if (role === "BUYER") {
          rootDispatch(initUser({ isLoggedBefore: true }));
        }
      } else {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  return isViewerOpen ? (
    <ImageViewer
      src={tutorialType[`${role}`]}
      currentIndex={currentImage - 1}
      onClose={closeImageViewer}
      disableScroll={true}
      backgroundStyle={{
        backgroundColor: "rgba(0,0,0,0.9)",
      }}
      closeOnClickOutside={true}
    />
  ) : (
    <div className="tutorialComponentContainer">
      <Modal
        open={openDrawer}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="tutorialModal" sx={inWebTut}>
          <div className="tutorialComponent">
            <div onClick={handleClose} className="skipTutorialContainer">
              {loading ? (
                <CircularProgress
                  size={15}
                  sx={{ color: "var(--tae-orange)" }}
                />
              ) : (
                <div
                  className={
                    slideEnd
                      ? "skipTutorialContent skipTutorialContentEnlarge"
                      : "skipTutorialContent"
                  }
                >
                  {slideEnd ? "Get Started" : "Skip Tutorial"}
                </div>
              )}
            </div>

            <Swiper
              effect={"fade"}
              pagination={{
                type: "bullets",
              }}
              navigation={true}
              modules={[EffectFade, Pagination, Navigation]}
              className="mySwiper tutorialSwiper"
              onReachEnd={() => setSlideEnd(true)}
              initialSlide={currentImage}
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
                          <div className="hello-message">
                            <div>
                              Hello{" "}
                              <span className="colored">
                                {capitalizeFirstLetter(
                                  String(role).toLowerCase()
                                )}
                              </span>
                            </div>
                            <div>Welcome to TheAfricanExporter.com!</div>
                          </div>
                          <div className="extra-message-to-hello">
                            Swipe for a quick walkthough
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>

              {tutorialType[`${role}`].map((src, index) => (
                <SwiperSlide key={index}>
                  <img
                    onClick={() => openImageViewer(index + 1)}
                    className="tutorialSwiperSlideImages"
                    src={src}
                    alt="tutorial"
                  />
                </SwiperSlide>
              ))}

              <SwiperSlide>
                <CompletedTutorial />
              </SwiperSlide>
            </Swiper>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default Tutorial;
