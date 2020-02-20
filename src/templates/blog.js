import React from 'react'
import Layout from '../components/Layout'
import { graphql } from 'gatsby'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import Head from '../components/Head'



//query the data for the blog specific page
export const query = graphql`
  query ($slug: String!){
    contentfulBlogPost (slug: {eq: $slug}) {
      title
      publishedDate(formatString: "MMMM Do, YYYY")
      body {
        json
      }
    }
  }
`


//this is the template for all blog posts
export default function Blog(props) {
  const options = {
    renderNode: {
      "embedded-asset-block": (node)=>{
        const alt = node.data.target.fields.title["en-US"]
        const url = node.data.target.fields.file["en-US"].url
        return <img alt={alt} src={url}/>
      }
    }
  }
  return (
    <Layout>
      <Head title={props.data.contentfulBlogPost.title} />
      <h1>{ props.data.contentfulBlogPost.title }</h1>
      <p>{ props.data.contentfulBlogPost.publishedDate }</p>
      {documentToReactComponents(props.data.contentfulBlogPost.body.json, options)}
    </Layout>
  )
}