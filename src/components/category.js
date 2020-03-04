import React from "react"

const Category = class extends React.Component {

    render() {
        const category = this.props.category

        function getProductById(id, products) {
            if (products && products.nodes) {
                for (const node of products.nodes) {
                    if (node.id === id) {
                        return node
                    }
                }
            }
            return null
        }

        function getName(result) {
            if (result && result.product.name) {
                return result.product.name
            }
            return ""
        }

        function getDescription(result) {
            if (result && result.product.description) {
                return result.product.description
            }
            return ""
        }
        return (
          <div className="category-root" id={category.id + "-key"}>
              <h4 className="category-title" id={category.id + "-title"}>{category.name}</h4>
              <ul className="category-holder">
                  {category.products.map((product) => (
                    <React.Fragment key={category.id + "-" + product}>
                        <li>
                            <div className="category-header">
                                <a href={"/" + product}
                                   id={category.id + "-" + product + "-link"}>{getName(getProductById(product, this.props.products))}</a>
                            </div>
                            {/*<div className="category-body">
                                <div id={"dropdown" + category.id + "-" + product}>
                                    <p
                                      id={category.id + "-" + product + "-desc"}>{getDescription(getProductById(product, this.props.product))}</p>
                                </div>
                            </div>*/}
                        </li>
                    </React.Fragment>
                  ))}
              </ul>
          </div>
        )
    }
}

export default Category