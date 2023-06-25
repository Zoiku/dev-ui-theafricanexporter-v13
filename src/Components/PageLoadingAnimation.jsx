import "../Styles/PageLoadingAnimation.css";
import CustomProgress from "./v2/components/CustomProgress";

const PageLoadingAnimation = () => {
  return (
    <div className="PageLoadingAnimation">
      <CustomProgress pageLoading={true} size={50} />
    </div>
  );
};

export default PageLoadingAnimation;
