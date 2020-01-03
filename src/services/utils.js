export default function findImageForSetBlogImage(blogImages, blogItem, isCoverImage){
  let fluidReturn = null
  if(isCoverImage) {
    if (blogItem && blogItem.node && blogItem.node.frontmatter && blogItem.node.frontmatter.coverimage && blogImages && blogImages.edges) {
      let coverimage = blogItem.node.frontmatter.coverimage
      const blogName = coverimage.substring(coverimage.lastIndexOf("/") + 1, coverimage.length)
      for (const item of blogImages.edges) {
        if (item && item.node && item.node.fluid) {
          const fluid = item.node.fluid
          if (fluid.originalName) {
            if (fluid.originalName === blogName) {
              fluidReturn = fluid
              break
            }
          }
        }
      }
    }
  }else{
    if (blogItem && blogItem.node && blogItem.node.frontmatter && blogItem.node.frontmatter.fullimage && blogImages && blogImages.edges) {
      let fullimage = blogItem.node.frontmatter.fullimage
      console.log(fullimage)
      const blogName = fullimage.substring(fullimage.lastIndexOf("/") + 1, fullimage.length)
      for (const item of blogImages.edges) {
        if (item && item.node && item.node.fluid) {
          const fluid = item.node.fluid
          if (fluid.originalName) {
            if (fluid.originalName === blogName) {
              fluidReturn = fluid
              break
            }
          }
        }
      }
    }
  }
  return fluidReturn
}