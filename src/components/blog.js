import React, { Component } from 'react'
import {graphql, StaticQuery} from 'gatsby'
import "../styles/blog.scss"

class Blog extends Component {
  // Initialise Stripe.js with your publishable key.
  // You can find your key in the Dashboard:
  // https://dashboard.stripe.com/account/apikeys

  render() {
    return (
      <StaticQuery
        query={graphql`
                query MyQuery {
                  blogs: allMdx {
                    edges {
                      node {
                        id
                        frontmatter {
                          path
                          title
                          date
                        }
                        excerpt
                      }
                    }
                  }
                }                  
                `}
        render={({ blogs }) => (
          <div className="blog-home">
            {blogs.edges.map( edge => (
              <div className="blog-root" key={edge.node.id}>
                <div className="blog-container">
                  <h1>{edge.node.frontmatter.title}</h1>
                  <p>{edge.node.excerpt}</p>
                  <a className="blog-page-link btn btn-small waves-purple" href={"/" + edge.node.frontmatter.path}>Go to Blog</a>
                </div>
              </div>
            ))}
          </div>
        )}
      />
    )
  }
}

export default Blog