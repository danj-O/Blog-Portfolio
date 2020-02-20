import React from 'react'
import Layout from '../components/Layout'
import { Link, useStaticQuery, graphql } from 'gatsby'
import blogStyles from './blog.module.scss'
import Head from '../components/Head'



const ProductsPage = () => {
  const data = useStaticQuery(graphql`
    query {
      allContentfulProjects {
        edges {
          node {
            name
            slug
            datePublished(formatString:"MMMM Do, YYYY")
            description {
              json
            }
          }
        }
      }
    }
  `)

  return (
    <Layout>
      <Head title='Projects'/>
      <h1> Projects</h1>
      <p>Here's a list of projects I have worked on.</p>
      <ol className={blogStyles.posts}>
        { //maps over the query using allMarkdownRemark to find .md files
        data.allContentfulProjects.edges.map((edge) => {
          return (
            <li key={edge.node.slug} className={blogStyles.post}>
              <Link to={`/projects/${edge.node.slug}`}>
                <h2>
                  {/* make dynamic link to blog post */}
                    {edge.node.name}
                </h2>
                <p>
                  {edge.node.datePublished}
                </p>
              </Link>
            </li>
          )
        })
        }
      </ol>
    </Layout>
  )
}
export default ProductsPage