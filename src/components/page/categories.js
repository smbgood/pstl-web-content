import React, { Component } from 'react'
import {graphql, StaticQuery} from 'gatsby'
import Category from "../category"

const containerStyles = {
    padding: '1rem 0 1rem 0'
}

class Categories extends Component {

    render() {
        return (
            <StaticQuery
                query={graphql`
                  query AllCategories {         
                    categories: allCategoriesJson{
                        nodes{
                            id
                            name
                            products
                        }
                    },                    
                    baths: allBathsJson{
                        nodes{
                            sku
                            name
                            image
                            full_description
                            short_description
                            detail_images
                            stripeId                            
                            ingredients
                            important
                            price
                            currency
                        }
                    },
                    images: allImageSharp{
                        nodes{
                            fluid{
                                ...GatsbyImageSharpFluid
                                originalName
                            }
                        }
                    }                    
                  }
                `}
                render={({ categories, baths, images }) => (
                    <div style={containerStyles}>
                        {categories.nodes.map( node => (
                            <Category key={node.id} category={node} baths={baths} images={images}/>
                        ))}
                    </div>
                )}
            />
        )
    }
}

export default Categories