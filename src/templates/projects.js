import React from 'react'
import Layout from '../components/Layout'
import { graphql } from 'gatsby'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import Head from '../components/Head'


export const query = graphql`
  query ($slug: String!){
    contentfulProjects (slug: {eq: $slug}) {
      name
      githubUrl
      liveUrl
      datePublished(formatString: "MMMM Do, YYYY")
      description {
        json
      }
      projectPhoto {
        file {
          fileName
          url
          
        }
      }
    }
    contentfulAsset {
      file {
        url
      }
    }
  }
`


//this is the template for all blog posts
export default function Projects(props) {
  const options = {
    renderNode: {
      //override specific node types
      "embedded-asset-block": (node)=>{
        //PROBLEM!!!!!!------------
        //Where should the query go to find these two in playground??!!
        const alt = node.data.target.fields.title["en-US"]
        const url = node.data.target.fields.file["en-US"].url
        console.log(alt, url)
        return <img alt={alt} src={url}/>
      }
    }
  }
  return (
    <Layout>
      <Head title={props.data.contentfulProjects.name} />
      <h1>{ props.data.contentfulProjects.name }</h1>
      {/* <p>{ props.data.contentfulProjects.datePublished }</p> */}
      <a href={props.data.contentfulProjects.githubUrl} target= "_blank" rel="noopener noreferrer">
        Github Source
      </a>
      <a href={props.data.contentfulProjects.liveUrl} target= "_blank" rel="noopener noreferrer">
        Live
      </a>
      <img src={props.data.contentfulProjects.projectPhoto.file.url} alt={props.data.contentfulProjects.projectPhoto.fileName}/>
      {/* <img src={props.data.contentfulAsset.file.url} alt=""/> */}
      {documentToReactComponents(props.data.contentfulProjects.description.json)}
    </Layout>
  )
}