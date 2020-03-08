import React, { Component } from 'react'
import {graphql, StaticQuery} from 'gatsby'
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
                            <ShopItem key={sku.id} sku={sku}/>
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