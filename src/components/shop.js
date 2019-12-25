import React, { Component } from 'react'
import {graphql, StaticQuery, useStaticQuery} from 'gatsby'
import ShopItem from './shop-item'
import Category from "./category";

const containerStyles = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: '1rem 0 1rem 0',
}

class Shop extends Component {
    // Initialise Stripe.js with your publishable key.
    // You can find your key in the Dashboard:
    // https://dashboard.stripe.com/account/apikeys

    state = {
        stripe: null,
    }
    componentDidMount() {
        const stripe = window.Stripe("pk_live_VJQj7RY3rBubLWBVzmHF2PXM00WQixkUZ0")
        this.setState({ stripe })
    }

    render() {
        return (
            <StaticQuery
                query={graphql`
          query SkusForProduct {
            skus: allStripeSku {
              edges {
                node {
                  id
                  currency
                  price
                  attributes {
                    name
                  }
                  image
                }
              }
            },
            categories: allCategoriesJson{
                nodes{
                    id
                    products
                }
            }
          }
        `}
                render={({ skus, categories }) => (
                    <div style={containerStyles}>
                        {skus.edges.map(({ node: sku }) => (
                            <ShopItem key={sku.id} sku={sku} stripe={this.state.stripe} />
                        ))}
                        {categories.nodes.map( node => (
                            <Category key={node.id} category={node}/>
                        ))}
                    </div>
                )}
            />
        )
    }
}

export default Shop