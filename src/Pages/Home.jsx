import "../Styles/Home.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import log from "../Assets/log.jpg";
import log1 from "../Assets/log-1.jpg";
import log2 from "../Assets/log-2.jpg";
import { PrimaryButton } from "../Material/Button";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
import Marquee from "react-fast-marquee";
import { useState, useEffect } from "react";
import ProductService from "../Services/Product";
import { useNavigate } from "react-router-dom";
import PageLoadingAnimation from "../Components/PageLoadingAnimation";

const IMAGES_TO_DISPLAY = {
    "Teak Round Logs": log,
    "Teak Square Logs": log1
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
        <div className="Home">
            {pageLoad && <PageLoadingAnimation />}

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
                                        <PrimaryButton variant="contained" disabled={session?.user?.role === "MERCHANT"} onClick={() => navigate(`/requestquote?pid=${product.id}`)}>Request Quotes</PrimaryButton>
                                    </div>
                                </div>
                            </div>
                            <div className="swiper-container">
                                <Swiper
                                    navigation={true}
                                    pagination={true}
                                    modules={[Pagination, Navigation]}
                                    className="mySwiper"
                                >
                                    <SwiperSlide>
                                        <img src={IMAGES_TO_DISPLAY[product.name]} alt="" />
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <img src={IMAGES_TO_DISPLAY[product.name]} alt="" />
                                    </SwiperSlide>
                                </Swiper>
                            </div>
                            <div className="specification-button-container-mobile">
                                <PrimaryButton variant="contained" disabled={session?.user?.role === "MERCHANT"} fullWidth onClick={() => navigate(`/requestquote?pid=${product.id}`)}>Request Quotes</PrimaryButton>
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
                            <img src={log2} alt="" />
                        </div>
                        <div className="coming-soon-card-name">Special Log</div>
                    </div>
                    <div className="coming-soon-card-container">
                        <div className="coming-soon-card-img">
                            <img src={log2} alt="" />
                        </div>
                        <div className="coming-soon-card-name">Special Log</div>
                    </div>
                    <div className="coming-soon-card-container">
                        <div className="coming-soon-card-img">
                            <img src={log2} alt="" />
                        </div>
                        <div className="coming-soon-card-name">Special Log</div>
                    </div>
                    <div className="coming-soon-card-container">
                        <div className="coming-soon-card-img">
                            <img src={log2} alt="" />
                        </div>
                        <div className="coming-soon-card-name">Special Log</div>
                    </div>
                    <div className="coming-soon-card-container">
                        <div className="coming-soon-card-img">
                            <img src={log2} alt="" />
                        </div>
                        <div className="coming-soon-card-name">Special Log</div>
                    </div>
                    <div className="coming-soon-card-container">
                        <div className="coming-soon-card-img">
                            <img src={log2} alt="" />
                        </div>
                        <div className="coming-soon-card-name">Special Log</div>
                    </div>
                    <div className="coming-soon-card-container">
                        <div className="coming-soon-card-img">
                            <img src={log2} alt="" />
                        </div>
                        <div className="coming-soon-card-name">Special Log</div>
                    </div>
                </Marquee>
            </div>
        </div>
    )
}

export default Home;