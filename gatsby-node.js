const path = require('path')

module.exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  //get path to template where we make the dynamic template for posts
  const blogTemplate = path.resolve('./src/templates/blog.js')
  const itemTemplate = path.resolve('./src/templates/items.js')
  //get slug from contentful CMS
  const res = await graphql(`
    query {
      allContentfulBlog{
        edges{
          node{
            slug
          }
        }
      }
      allContentfulItem{
        edges{
          node{
            slug
          }
        }
      }
    }
  `)

  //create new pages
  res.data.allContentfulBlog.edges.forEach(edge => {
    createPage({
      component: blogTemplate,
      path: `/blog/${edge.node.slug}`,
      context: {
        slug: edge.node.slug
      }
    })
  })
  res.data.allContentfulItem.edges.forEach(edge => {
    createPage({
      component: itemTemplate,
      path: `/items/${edge.node.slug}`,
      context: {
        slug: edge.node.slug
      }
    })
  })
}