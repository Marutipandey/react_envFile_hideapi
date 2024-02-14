import React, { Component } from "react";

export class newsElement extends Component {
  render() {
    let { title, description , urlImage ,newsUrl,author,publishedAt,source} = this.props;

    return (
      <div>
        <h2>newselement</h2>
          <div className="card" >
            <div style={{display:'flex',justifyContent:'flex-end',position:'absolute',right:'0'}}>
            <span class="  badge rounded-pill bg-danger" >
    {source.name}
  </span>    
            </div>
                  <img src={urlImage} className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">{title.slice(0,20)}</h5>
              <p className="card-text">{description.slice(0,88)}...</p>
              <a href={newsUrl} target="blank" className="btn btn-primary">
                Go somewhere
              </a>
              <small class="text-muted">by {!author?"unknoun":author} at {new Date(publishedAt).toGMTString()} ago</small>

            </div>
          </div>
        
      </div>
    );
  }
}

export default newsElement;
