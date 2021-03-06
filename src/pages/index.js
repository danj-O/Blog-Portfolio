import React from "react"
import Layout from '../components/Layout'
import { Link, useStaticQuery, graphql } from 'gatsby'
import indexStyles from '../styles/index2.module.scss'
import Head from '../components/Head'

const IndexPage = () =>{
  const data = useStaticQuery(graphql`
    query {
      allContentfulDeals {
        edges {
          node {
            name
            slug
            shortDescription
            price
            pricePer
            image {
              file {
                fileName
                url
                
              }
            }
          }
        }
      }
    }
  `)


  return(
    <div>
      <Layout>
        <Head title="home"/>
        <h1> Welcome to the Kocian Meats online market!</h1>
        <h2>To get started, check out our fresh deals!</h2>

        <div className={indexStyles.deals}>
        { //maps over the query using allMarkdownRemark to find .md files
        data.allContentfulDeals.edges.map((edge) => {
          return (
            <div key={edge.node.slug} className={indexStyles.deal}>
              <Link to={`/deals/${edge.node.slug}`}>
                <h2>
                  {/* make dynamic link to blog post */}
                    {edge.node.name}
                </h2>
                <p>{edge.node.shortDescription}</p>
                <div>
                  <div>
                    <p>${edge.node.price} - {edge.node.pricePer}</p>
                  </div>
                  <div>
                    <img src={edge.node.image.file.url} alt=""/>
                  </div>
                </div>
              </Link>
            </div>
          )
        })
        }
      </div>

      </Layout>
    </div>
  )
}
export default IndexPage