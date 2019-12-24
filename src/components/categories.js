import React, { Component } from 'react'
import {graphql, StaticQuery} from 'gatsby'
import Category from "./category";

const containerStyles = {
    padding: '1rem 0 1rem 0'
}

class Categories extends Component {
    // Initialise Stripe.js with your publishable key.
    // You can find your key in the Dashboard:
    // https://dashboard.stripe.com/account/apikeys

    render() {
        return (
            <StaticQuery
                query={graphql`
                  query AllCategories {         
                    categories: allCategoriesJson{
                        nodes{
                            id
                            products
                        }
                    },
                    products: allProductsJson {
                        edges {
                          node {
                            id
                            name
                            description
                          }
                        }
                      }
                  }
                `}
                render={({ categories, products }) => (
                    <div style={containerStyles}>
                        {categories.nodes.map( node => (
                            <Category key={node.id} category={node} products={products}/>
                        ))}
                    </div>
                )}
            />
        )
    }
}

export default Categories