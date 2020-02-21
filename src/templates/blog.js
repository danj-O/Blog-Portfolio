import React from 'react'
import Layout from '../components/Layout'
import { graphql } from 'gatsby'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import Head from '../components/Head'



//query the data for the blog specific page
export const query = graphql`
  query ($slug: String!){
    contentfulBlog (slug: {eq: $slug}) {
      name
      publishedDate(formatString: "MMMM Do, YYYY")
      description {
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
      <Head title={props.data.contentfulBlog.name} />
      <h1>{ props.data.contentfulBlog.name }</h1>
      <p>{ props.data.contentfulBlog.publishedDate }</p>
      {documentToReactComponents(props.data.contentfulBlog.description.json, options)}
    </Layout>
  )
}