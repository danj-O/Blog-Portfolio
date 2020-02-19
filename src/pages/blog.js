import React from 'react'
import Layout from '../components/Layout'
import { Link, useStaticQuery, graphql } from 'gatsby'
import blogStyles from './blog.module.scss'
import Head from '../components/Head'



const BlogPage = () => {
  const data = useStaticQuery(graphql`
    query {
      allContentfulBlogPost (sort: {fields: publishedDate,order: DESC}){
        edges {
          node {
            title
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
        data.allContentfulBlogPost.edges.map((edge) => {
          return (
            <li className={blogStyles.post}>
              <Link to={`/blog/${edge.node.slug}`}>
                <h2>
                  {/* make dynamic link to blog post */}
                    {edge.node.title}
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