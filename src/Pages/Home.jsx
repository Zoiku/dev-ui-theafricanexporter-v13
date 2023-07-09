import "../Styles/Home.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
import Marquee from "react-fast-marquee";
import { useState, useEffect } from "react";
import ProductService from "../Services/Product";
import { useNavigate } from "react-router-dom";
import PageLoadingAnimation from "../Components/PageLoadingAnimation";
import ProgressiveImage from "react-progressive-graceful-image";
import { IMAGES_TO_DISPLAY } from "../Components/ProductImages";
import { COMING_SOON } from "../Components/ProductImages";
import comingsoon from "../Assets/log.jpg";
import MuiButton from "../Components/v2/components/MuiButtons";

const Home = ({ session }) => {
  const [products, setProducts] = useState(null);
  const navigate = useNavigate();
  const [pageLoad, setPageLoad] = useState(false);

  useEffect(() => {
    setPageLoad(true);
    const abortController = new AbortController();
    const fetchData = async () => {
      const productService = new ProductService();
      try {
        const { errors, data } = await productService.getProducts(
          abortController.signal
        );
        if (errors.length === 0) {
          const filteredData = data.data.data;
          filteredData.map((product) => {
            product.productInformation = {
              id: product.id,
              name: product.name,
              description: product.description,
              speciesType: product.species.type.label,
              species: product.species.label,
              volume: product.volume.value,
              volumeUnit: product.volume.unit,
              origin: product.origin.country,
              containerSize: "20ft Container",
            };
            return 1;
          });
          const products = filteredData.map(
            (filter) => filter.productInformation
          );
          setProducts(products);
        }
      } catch (error) {}
      setPageLoad(false);
    };
    fetchData();
    return () => abortController.abort();
  }, []);

  return pageLoad ? (
    <PageLoadingAnimation />
  ) : (
    <div className="Home">
      <div className="tae-home-banner-container">
        <div className="tae-home-banner">
          <ul>
            <li>1 Request = Multiple Quotes</li>
            <li>Unlimited Supply</li>
            <li>Verified Merchants</li>
          </ul>
          <ul>
            <li>Direct Sourcing</li>
            <li>Buyer Protection</li>
            <li>Seamless Procurement</li>
          </ul>
        </div>
      </div>

      <div className="product-section-containers">
        {products &&
          products.length > 0 &&
          products.map((product) => (
            <section key={product.id} className="product-section-container">
              <div className="specification-container">
                <div>
                  <div className="specification-title">{product.name}</div>
                  <div className="specification-description-short">
                    {product.description}
                  </div>
                  <div className="specification-button-container">
                    <MuiButton
                      width={200}
                      buttonType="122"
                      label="Request Quotes"
                      onClick={() =>
                        navigate(`/requestquote?pid=${product.id}`)
                      }
                      disabled={
                        (session?.user?.role === "MERCHANT") |
                        (session?.user?.role === "ADMIN")
                          ? true
                          : false
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="swiper-container home-swiper-container">
                <Swiper
                  navigation={true}
                  pagination={true}
                  modules={[Pagination, Navigation]}
                  className="mySwiper"
                >
                  {IMAGES_TO_DISPLAY[product.name].map((src, index) => (
                    <SwiperSlide key={index}>
                      <ProgressiveImage src={src}>
                        {(src, loading) => (
                          <img
                            className={`image${
                              loading ? " loading" : " loaded"
                            }`}
                            src={src}
                            alt=""
                          />
                        )}
                      </ProgressiveImage>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
              <div className="specification-button-container-mobile">
                <MuiButton
                  width={200}
                  buttonType="122"
                  label="Request Quotes"
                  onClick={() => navigate(`/requestquote?pid=${product.id}`)}
                  disabled={
                    (session?.user?.role === "MERCHANT") |
                    (session?.user?.role === "ADMIN")
                      ? true
                      : false
                  }
                />
              </div>
            </section>
          ))}
      </div>

      <div className="home-coming-soon-container">
        <div className="home-coming-soon-title">Coming Soon</div>
        <Marquee
          className="coming-soon-marquee"
          gradient={false}
          pauseOnClick={true}
          speed={10}
          style={{ marginTop: 20 }}
        >
          {COMING_SOON.map((product, index) => (
            <div key={index} className="coming-soon-card-container">
              <div className="coming-soon-card-img">
                <ProgressiveImage>
                  {(_src, loading) => (
                    <img
                      className={`image${loading ? " loading" : " loaded"}`}
                      src={comingsoon}
                      alt={product}
                    />
                  )}
                </ProgressiveImage>
              </div>
              <div className="coming-soon-card-name">{product}</div>
            </div>
          ))}
        </Marquee>
      </div>
    </div>
  );
};

export default Home;
