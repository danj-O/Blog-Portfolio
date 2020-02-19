const path = require('path')

////generates a slug for the diff blog posts in md.  contentful does this for us so we don't need to use this
// module.exports.onCreateNode = ({node, actions}) => {
//   const { createNodeField } = actions
//   //finds which files are .md
//   if (node.internal.type === 'MarkdownRemark'){
//     //create a slug - name of file path simplified
//     const slug = path.basename(node.fileAbsolutePath, '.md')
//     //extends the node and places it in 'fields' key 
//     createNodeField({
//       node,
//       name: 'slug',
//       value: slug
//     })
//   }
// }

module.exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  //get path to template where we make the dynamic template for posts
  const blogTemplate = path.resolve('./src/templates/blog.js')
  //get slug from contentful CMS
  const res = await graphql(`
    query {
      allContentfulBlogPost{
        edges{
          node{
            slug
          }
        }
      }
    }
  `)
    //BELOW IS THE QUERY FOR MD
  // allMarkdownRemark {
  //   edges {
  //     node {
  //       fields {
  //         slug
  //       }
  //     }
  //   }
  // }

  //create new pages
  res.data.allContentfulBlogPost.edges.forEach(edge => {
    createPage({
      component: blogTemplate,
      path: `/blog/${edge.node.slug}`,
      context: {
        slug: edge.node.slug
      }
    })
  })
  //BELOW IS TO CREATE THE PAGES FROM MD
  // res.data.allMarkdownRemark.edges.forEach(edge => {
  //   createPage({
  //     component: blogTemplate,
  //     path: `/blog/${edge.node.fields.slug}`,
  //     context: {
  //       slug: edge.node.fields.slug
  //     }
  //   })
  // })
}