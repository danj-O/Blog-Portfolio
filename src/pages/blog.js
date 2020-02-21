import React from 'react'
import Layout from '../components/Layout'
import { Link, useStaticQuery, graphql } from 'gatsby'
import blogStyles from './blog.module.scss'
import Head from '../components/Head'



const BlogPage = () => {
  const data = useStaticQuery(graphql`
    query {
      allContentfulBlog (sort: {fields: publishedDate,order: DESC}){
        edges {
          node {
            name
            slug
            publishedDate(formatString:"MMMM Do, YYYY")
          }
        }
      }
    }
  `)

  return (
    <Layout>
      <Head title='Blog'/>
      <h1> Blog</h1>
      <p>Check here for cool stuff weekly!</p>
      <ol className={blogStyles.posts}>
        { //maps over the query using allMarkdownRemark to find .md files
        data.allContentfulBlog.edges.map((edge) => {
          return (
            <li key={edge.node.slug} className={blogStyles.post}>
              <Link to={`/blog/${edge.node.slug}`}>
                <h2>
                  {/* make dynamic link to blog post */}
                    {edge.node.name}
                </h2>
                <p>
                  {edge.node.publishedDate}
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
export default BlogPage