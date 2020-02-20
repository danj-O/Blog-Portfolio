import React from 'react'
import Layout from '../components/Layout'
import { graphql } from 'gatsby'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import Head from '../components/Head'


export const query = graphql`
  query ($slug: String!){
    contentfulProjects (slug: {eq: $slug}) {
      name
      datePublished(formatString: "MMMM Do, YYYY")
      description {
        json
      }
    }
  }
`


//this is the template for all blog posts
export default function Projects(props) {
  const options = {
    renderNode: {
      "embedded-asset-block": (node)=>{
        const alt = node.data.target.fields.title["en-US"]
        const url = node.data.target.fields.file["en-US"].url
        console.log(alt, url)
        return <img alt={alt} src={url}/>
      }
    }
  }
  return (
    <Layout>
      <Head title={props.data.contentfulProjects.title} />
      <h1>{ props.data.contentfulProjects.title }</h1>
      <p>{ props.data.contentfulProjects.datePublished }</p>
      {documentToReactComponents(props.data.contentfulProjects.description.json, options)}
    </Layout>
  )
}