import "../Styles/Home.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import tr11 from "../Assets/Logs Min/t11.jpg";
import tr12 from "../Assets/Logs Min/t12.jpg";
import tr13 from "../Assets/Logs Min/t13.jpg";
import tr14 from "../Assets/Logs Min/t14.jpg";
import tr15 from "../Assets/Logs Min/t15.jpg";
import tr16 from "../Assets/Logs Min/t16.jpg";
import tr17 from "../Assets/Logs Min/t17.jpg";
import tr18 from "../Assets/Logs Min/t18.jpg";
import tr19 from "../Assets/Logs Min/t19.jpg";
import tr20 from "../Assets/Logs Min/t20.jpg";
import tre from "../Assets/Logs Min/te.jpg";
import tre1 from "../Assets/Logs Min/te1.jpg";
import tre2 from "../Assets/Logs Min/te2.jpg";
import tre5 from "../Assets/Logs Min/te3.jpg";
import tre3 from "../Assets/Logs Min/te4.jpg";
import ts1 from "../Assets/Logs Min/t1.jpg";
import ts2 from "../Assets/Logs Min/t2.jpg";
import ts3 from "../Assets/Logs Min/t3.jpg";
import ts4 from "../Assets/Logs Min/t4.jpg";
import ts5 from "../Assets/Logs Min/t5.jpg";
import ts6 from "../Assets/Logs Min/t6.jpg";
import ts7 from "../Assets/Logs Min/t7.jpg";
import ts8 from "../Assets/Logs Min/t8.jpg";
import ts9 from "../Assets/Logs Min/t9.jpg";
import ts10 from "../Assets/Logs Min/t10.jpg";

import comingsoon from "../Assets/log.jpg";
import { PrimaryButton } from "../Material/Button";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
import Marquee from "react-fast-marquee";
import { useState, useEffect } from "react";
import ProductService from "../Services/Product";
import { useNavigate } from "react-router-dom";
import PageLoadingAnimation from "../Components/PageLoadingAnimation";
import ProgressiveImage from "react-progressive-graceful-image";

const IMAGES_TO_DISPLAY = {
  "Teak Round Logs": [
    tr11,
    tr13,
    tr15,
    tr17,
    tre,
    tre1,
    tre2,
    tre5,
    tre3,
    tr12,
    tr14,
    tr16,
    tr18,
    tr19,
    tr20,
  ],
  "Teak Square Logs": [ts2, ts4, ts5, ts7, ts8, ts10, ts1, ts3, ts6, ts9],
};

const COMING_SOON = [
  "Tali",
  "Denya",
  "Senya",
  "Mahogany",
  "Wawa",
  "Koto",
  "Iroko",
  "Azobe",
];

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
                    <PrimaryButton
                      variant="contained"
                      disabled={
                        (session?.user?.role === "MERCHANT") |
                        (session?.user?.role === "ADMIN")
                          ? true
                          : false
                      }
                      onClick={() =>
                        navigate(`/requestquote?pid=${product.id}`)
                      }
                    >
                      Request Quotes
                    </PrimaryButton>
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
                <PrimaryButton
                  variant="contained"
                  disabled={
                    (session?.user?.role === "MERCHANT") |
                    (session?.user?.role === "ADMIN")
                      ? true
                      : false
                  }
                  fullWidth
                  onClick={() => navigate(`/requestquote?pid=${product.id}`)}
                >
                  Request Quotes
                </PrimaryButton>
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
