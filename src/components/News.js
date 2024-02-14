import React, { Component } from "react";
import NewsElement from "./NewsElement";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

class News extends Component {
  // Declare articles using 'this' and add semicolon
  articles = [
    {
      source: {
        id: "espn-cric-info",
        name: "ESPN Cric Info",
      },
      author: null,
      title:
        "PCB hands Umar Akmal three-year ban from all cricket | ESPNcricinfo.com",
      description:
        "Penalty after the batsman pleaded guilty to not reporting corrupt approaches | ESPNcricinfo.com",
      url: "http://www.espncricinfo.com/story/_/id/29103103/pcb-hands-umar-akmal-three-year-ban-all-cricket",
      urlToImage:
        "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1099495_800x450.jpg",
      publishedAt: "2020-04-27T11:41:47Z",
      content:
        "Umar Akmal's troubled cricket career has hit its biggest roadblock yet, with the PCB handing him a ban from all representative cricket for three years after he pleaded guilty of failing to report det… [+1506 chars]",
    },
    {
      source: {
        id: "espn-cric-info",
        name: "ESPN Cric Info",
      },
      author: "sonam",
      title:
        "What we learned from watching the 1992 World Cup final in full again | ESPNcricinfo.com",
      description:
        "Wides, lbw calls, swing - plenty of things were different in white-ball cricket back then | ESPNcricinfo.com",
      url: "http://www.espncricinfo.com/story/_/id/28970907/learned-watching-1992-world-cup-final-full-again",
      urlToImage:
        "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1219926_1296x729.jpg",
      publishedAt: "2020-03-30T15:26:05Z",
      content:
        "Last week, we at ESPNcricinfo did something we have been thinking of doing for eight years now: pretend-live ball-by-ball commentary for a classic cricket match. We knew the result, yes, but we tried… [+6823 chars]",
    },
  ];

  capatilizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  constructor(props) {
    super(props);
    console.log("Hello, I am a constructor from News Component");
    this.state = {
      articles: this.articles,
      loading: true,
      page: 1,
      totalResults:0
    };
    document.title = `${this.capatilizeFirstLetter(
      this.props.category
    )}- "km priyanka"`;
  }

  static defaultProps = {
    country: "in",
    pagesize: 3,
    category: "general",
  };

  static propTypes = {
    country: PropTypes.string,
    pagesize: PropTypes.number,
    category: PropTypes.string,
  };

  async updateNews() {
    this.props.setProgress(30); // Use setProgress as a function
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pagesize}`;
    this.setState({ loading: true });
      let data = await fetch(url);
      let parseData = await data.json();
      this.props.setProgress(30); // Use setProgress as a function
      this.setState({
        page: this.state.page - 1,
        articles: parseData.articles,
        totalResults: parseData.totalResults,
        loading: false,
      });
      this.props.setProgress(100); // Use setProgress as a function
   
  }
  async componentDidMount() {
    this.updateNews();
  }

  fetchMoreData =async () => {
   this.setState({page: this.state.page +1});
   let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pagesize}`;
   this.setState({ loading: true });
   let data = await fetch(url);
   let parseData = await data.json();
   this.setState({
     page: this.state.page - 1,
     articles:this.state.articles.concat(parseData.articles),
     totalResults: parseData.totalResults,
     loading: false,
   });  };

  // prehandleclick = async () => {
  //   this.setState({
  //     page: this.state.page - 1,
  //   });
  //   this.updateNews();
  // };

  // nexhandleclick = async () => {
  //   this.setState({
  //     page: this.state.page + 1,
  //   });
  //   this.updateNews();
  // };

  // 'render' method should be inside the class
  render() {
    return (
      <div className="text-center">
        <h1 className="mb-5">
          News Api from {this.capatilizeFirstLetter(this.props.category)}
          {this.state.loading && <Spinner />}
         
        </h1>
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !==this.state.totalResults}
          loader={<Spinner />}
        >    
            <div className="container">
          <div className="row">
            {
              this.state.articles.map((element) => {
                return (
                  <div className="col-md-4" key={element.url}>
                    <NewsElement
                      title={element.title ? element.title : ""}
                      urlImage={
                        element.urlToImage
                          ? element.urlToImage
                          : "https://images.moneycontrol.com/static-mcnews/2021/06/shutterstock_707850085-770x433.jpg"
                      }
                      description={
                        element.description ? element.description : ""
                      }
                      newsUrl={element.url}
                      author={element.author}
                      publishedAt={element.publishedAt}
                      source={element.source}
                    />
                  </div>
                );
              })}
          </div>
          </div>
          </InfiniteScroll>
        

        {/* <div className="container">
          <div className="row">
            <div className="col-md-12 d-flex justify-content-between">
              <button
                type="button"
                disabled={this.state.page <= 1}
                className="btn btn-dark"
                onClick={this.prehandleclick}
              >
                Privious
              </button>
              <button
                type="button"
                className="btn btn-dark"
                onClick={this.nexhandleclick}
              >
                Next
              </button>
            </div>
          </div>
        </div> */}
      </div>
    );
  }
}

export default News;
