import axios from 'axios';
import { useEffect, useState } from 'react';
import XMLParser from 'react-xml-parser';

const News = () => {
    const [news, setNews] = useState(null);

    useEffect(() => {
        const getNews = async () => {
            axios.get('https://www.nrk.no/toppsaker.rss', { "Content-Type": "application/xml" })
                .then((res) => {
                    var xml = new XMLParser().parseFromString(res.data);
                    console.log(xml);
                    setNews(xml);
                })
                .catch((err) => {
                    console.log(err);
                })
        }
        getNews();
    }, []);

    return (
        <div className="news">
            <div className="news-main">
                <div className="news-main-header">News</div>
                <div className="news-main-content">
                    {news ? news.children[0].children.map((item, index) => {
                        if(index <= 5) {
                            return null;
                        }
                        const imgURL = item.children[item.children.length - 1].attributes.url;
                        return (
                            <a className="news-main-content-item" key={index} href={item.children[1].value} target='_blank'>
                                {imgURL !== undefined ? <div className="news-main-content-item-image"><img src={imgURL} alt="news" className="news-main-content-item-img" /></div> : <div className="news-main-content-item-image-missing"><ion-icon name="cloud-offline-outline"></ion-icon></div>}
                                <div className="news-main-content-item-title">{item.children[0].value}</div>
                            </a>
                        )
                    }) : <div className="news-loading"><div className="lds-ring"><div></div><div></div><div></div><div></div></div></div>}
                </div>
            </div>
        </div>
    )
}

export default News;