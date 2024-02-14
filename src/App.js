import React, { Component } from 'react';
import Navbar from './components/Navbar';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

export default class App extends Component {
  apiKey = process.env.REACT_APP_NEWS_API;
  state = {
    progress: 0
  }
  setProgress = (progress) => {
    this.setState({ progress });
  }

  render() {

    return (
      <Router>
        <div>
          <Navbar />
          <LoadingBar
            height={3}
            color='red'
            progress={this.state.progress}
          />
          <Routes>
            <Route exact path="/" element={<News setProgress={this.setProgress} apiKey={this.apiKey}key="general" pagesize={5} country="in" category="general" />} />
            <Route exact path="/science" element={<News setProgress={this.setProgress} apiKey={this.apiKey}key="science" pagesize={5} country="in" category="science" />} />
            <Route exact path="/entertainment" element={<News setProgress={this.setProgress} apiKey={this.apiKey}key="entertainment" pagesize={5} country="in" category="entertainment" />} />
            <Route exact path="/business" element={<News setProgress={this.setProgress} apiKey={this.apiKey}key="business" pagesize={5} country="in" category="business" />} />
            <Route exact path="/health" element={<News setProgress={this.setProgress} apiKey={this.apiKey}key="health" pagesize={5} country="in" category="health" />} />
            <Route exact path="/sports" element={<News setProgress={this.setProgress} apiKey={this.apiKey}key="sports" pagesize={5} country="in" category="sports" />} />
            <Route exact path="/technology" element={<News setProgress={this.setProgress} apiKey={this.apiKey}key="technology" pagesize={5} country="in" category="technology" />} />
          </Routes>
        </div>
      </Router>
    );
  }
}
