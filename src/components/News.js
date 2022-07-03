import React, { useState, useEffect } from 'react'
import NewsItem from './NewsItem';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";




const News = (props) => {

    const capitalise = (string) => {
        let lower = string.toLowerCase();
        return lower.charAt(0).toUpperCase() + lower.slice(1);

    }
    const [articles, setArticles] = useState([])
    const [totalResults, setTotalResults] = useState(0)
    const [page, setPage] = useState(1)
    document.title = `${capitalise(props.category)}-NewsMonkey`







    const updateNews = async () => {

        const url = `https://newsapi.org/v2/top-headlines?country=in&category=${props.category}&apiKey=aa372fe0cc4149ef889a6abc3ccacc2a&page=${page}&pagesize=${props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json()
        console.log(parsedData);
        setArticles(parsedData.articles)
        setTotalResults(parsedData.totalResults)


    }

    useEffect(() => {
        updateNews();
    }, [])




    const fetchMoreData = async () => {
        
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=aa372fe0cc4149ef889a6abc3ccacc2a&page=${page+1}&pagesize=${props.pageSize}`;
        setPage(page + 1)
        let data = await fetch(url);
        let parsedData = await data.json()
        console.log(parsedData);
        setArticles(parsedData.articles.concat(parsedData.articles))
        setTotalResults(parsedData.totalResults)
    };




    return (

        <div className="container">
            
            <h1 className="text-center mb-5" style={{marginTop:"90px"}}>News-Top { capitalise(props.category)} Headlines </h1>
        
            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length !== totalResults}
            >
                <div className="container">
                    <div className="row">
                        {articles.map((element) => {
                            return <div className="col-md-4" key={element.url}>
                                <NewsItem title={element.title ? element.title.slice(0, 45) : ""}
                                    description={element.description ? element.description.slice(0, 88) : ""}
                                    imageUrl={element.urlToImage}
                                    newsUrl={element.url}
                                    date={element.publishedAt}
                                    author={element.author}
                                    source={element.source.name} />
                            </div>
                        })}
                    </div>
                </div>
            </InfiniteScroll>
            </div>

    )
}


News.defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'General'

}

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number

}


export default News
