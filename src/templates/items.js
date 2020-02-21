import React from 'react'
import Layout from '../components/Layout'
import { graphql } from 'gatsby'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import Head from '../components/Head'


export const query = graphql`
  query ($slug: String!){
    contentfulItem (slug: {eq: $slug}) {
      title
      meatType
      price
      pricePer
      description {
        json
      }
      itemImage {
        file {
          fileName
          url
          
        }
      }
    }
  }
`


//this is the template for all blog posts
export default function Projects(props) {
  // const options = {
  //   renderNode: {
  //     //override specific node types
  //     "embedded-asset-block": (node)=>{
  //       //PROBLEM!!!!!!------------
  //       //Where should the query go to find these two in playground??!!
  //       const alt = node.data.target.fields.title["en-US"]
  //       const url = node.data.target.fields.file["en-US"].url
  //       console.log(alt, url)
  //       return <img alt={alt} src={url}/>
  //     }
  //   }
  // }
  return (
    <Layout>
      <Head title={props.data.contentfulItem.title} />
      <h1>{ props.data.contentfulItem.title }</h1>
      {/* <p>{ props.data.contentfulProjects.datePublished }</p> */}
      {/* <a href={props.data.contentfulProjects.githubUrl} target= "_blank" rel="noopener noreferrer">
        Github Source
      </a> */}
      {/* <a href={props.data.contentfulProjects.liveUrl} target= "_blank" rel="noopener noreferrer">
        Live
      </a> */}
      <img src={props.data.contentfulItem.itemImage.file.url} alt={props.data.contentfulItem.itemImage.fileName}/>
      {/* <img src={props.data.contentfulAsset.file.url} alt=""/> */}
      {documentToReactComponents(props.data.contentfulItem.description.json)}
    </Layout>
  )
}