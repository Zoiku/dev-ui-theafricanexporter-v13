import "../Styles/Home.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import log from "../Assets/log.jpg";

import tr11 from "../Assets/Logs/t11.jpg";
import tr12 from "../Assets/Logs/t12.jpg";
import tr13 from "../Assets/Logs/t13.jpg";
import tr14 from "../Assets/Logs/t14.jpg";
import tr15 from "../Assets/Logs/t15.jpg";
import tr16 from "../Assets/Logs/t16.jpg";
import tr17 from "../Assets/Logs/t17.jpg";
import tr18 from "../Assets/Logs/t18.jpg";
import tr19 from "../Assets/Logs/t19.jpg";
import tr20 from "../Assets/Logs/t20.jpg";
import tre from "../Assets/Logs/te.jpg";
import tre1 from "../Assets/Logs/te1.jpg";
import tre2 from "../Assets/Logs/te2.jpg";
import tre3 from "../Assets/Logs/te4.jpg";

import ts1 from "../Assets/Logs/t1.jpg";
import ts2 from "../Assets/Logs/t2.jpg";
import ts3 from "../Assets/Logs/t3.jpg";
import ts4 from "../Assets/Logs/t4.jpg";
import ts5 from "../Assets/Logs/t5.jpg";
import ts6 from "../Assets/Logs/t6.jpg";
import ts7 from "../Assets/Logs/t7.jpg";
import ts8 from "../Assets/Logs/t8.jpg";
import ts9 from "../Assets/Logs/t9.jpg";
import ts10 from "../Assets/Logs/t10.jpg";

import comingsoon from "../Assets/log.jpg";
import { PrimaryButton } from "../Material/Button";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
import Marquee from "react-fast-marquee";
import { useState, useEffect } from "react";
import ProductService from "../Services/Product";
import { useNavigate } from "react-router-dom";
import PageLoadingAnimation from "../Components/PageLoadingAnimation";

const IMAGES_TO_DISPLAY = {
    "Teak Round Logs": [tr11, tr13, tr15, tr17, tre, tre1, tre2, tre3],
    "Teak Square Logs": [ts2, ts4, ts5, ts7, ts8, ts10]
}

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
                const { errors, data } = await productService.getProducts(abortController.signal);
                if (errors.length === 0) {
                    const filteredData = data.data.data;
                    filteredData.map(product => {
                        product.productInformation = {
                            id: product.id,
                            name: product.name,
                            description: product.description,
                            speciesType: product.species.type.label,
                            species: product.species.label,
                            volume: product.volume.value,
                            volumeUnit: product.volume.unit,
                            origin: product.origin.country,
                            containerSize: "20ft Container"
                        }
                        return 1;
                    });
                    const products = filteredData.map(filter => filter.productInformation)
                    setProducts(products);
                }
            } catch (error) { }
            setPageLoad(false);
        }
        fetchData();

        return () => abortController.abort();
    }, []);

    return (
        pageLoad ? <PageLoadingAnimation />
            :
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
                    {
                        products &&
                        products.length > 0 &&
                        products.map(product =>
                            <section key={product.id} className="product-section-container">
                                <div className="specification-container">
                                    <div>
                                        <div className="specification-title">{product.name}</div>
                                        <div className="specification-description-short">{product.description}</div>
                                        <div className="specification-button-container">
                                            <PrimaryButton variant="contained" disabled={session?.user?.role === "MERCHANT" | session?.user?.role === "ADMIN" ? true : false} onClick={() => navigate(`/requestquote?pid=${product.id}`)}>Request Quotes</PrimaryButton>
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
                                        {
                                            IMAGES_TO_DISPLAY[product.name].map((src, index) =>
                                                <SwiperSlide key={index}>
                                                    <img src={src} alt="" />
                                                </SwiperSlide>
                                            )
                                        }
                                    </Swiper>
                                </div>
                                <div className="specification-button-container-mobile">
                                    <PrimaryButton variant="contained" disabled={session?.user?.role === "MERCHANT" | session?.user?.role === "ADMIN" ? true : false} fullWidth onClick={() => navigate(`/requestquote?pid=${product.id}`)}>Request Quotes</PrimaryButton>
                                </div>
                            </section>
                        )
                    }
                </div>

                <div className="home-coming-soon-container">
                    <div className="home-coming-soon-title">Coming Soon</div>
                    <Marquee className="coming-soon-marquee" gradient={false} pauseOnClick={true} speed={10} style={{ marginTop: 20 }}>
                        <div className="coming-soon-card-container">
                            <div className="coming-soon-card-img">
                                <img src={comingsoon} alt="" />
                            </div>
                            <div className="coming-soon-card-name">Tali</div>
                        </div>
                        <div className="coming-soon-card-container">
                            <div className="coming-soon-card-img">
                                <img src={comingsoon} alt="" />
                            </div>
                            <div className="coming-soon-card-name">Denya</div>
                        </div>
                        <div className="coming-soon-card-container">
                            <div className="coming-soon-card-img">
                                <img src={comingsoon} alt="" />
                            </div>
                            <div className="coming-soon-card-name">Senya</div>
                        </div>
                        <div className="coming-soon-card-container">
                            <div className="coming-soon-card-img">
                                <img src={comingsoon} alt="" />
                            </div>
                            <div className="coming-soon-card-name">Mahogany</div>
                        </div>
                        <div className="coming-soon-card-container">
                            <div className="coming-soon-card-img">
                                <img src={comingsoon} alt="" />
                            </div>
                            <div className="coming-soon-card-name">Wawa</div>
                        </div>
                        <div className="coming-soon-card-container">
                            <div className="coming-soon-card-img">
                                <img src={comingsoon} alt="" />
                            </div>
                            <div className="coming-soon-card-name">Koto</div>
                        </div>
                        <div className="coming-soon-card-container">
                            <div className="coming-soon-card-img">
                                <img src={comingsoon} alt="" />
                            </div>
                            <div className="coming-soon-card-name">Iroko</div>
                        </div>
                        <div className="coming-soon-card-container">
                            <div className="coming-soon-card-img">
                                <img src={comingsoon} alt="" />
                            </div>
                            <div className="coming-soon-card-name">Azobe</div>
                        </div>
                    </Marquee>
                </div>
            </div>
    )
}

export default Home;