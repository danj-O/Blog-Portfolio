/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 * 
 * CHECK DOCS ON ALL PLUGINS!
 */

module.exports = {
  siteMetadata : {
    //this will be used for header and footer text
    title: 'Daniel Scott Portfolio Site',
    author: 'Daniel Scott',
  },
  plugins : [
    //this places our react-helmet <head> files into the statically generated pages
    'gatsby-plugin-react-helmet',
    {
      //contentful plugin
      resolve : 'gatsby-source-contentful',
      options : {
        //these are put in the .env file
        spaceId: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN
      }
    },
    // sass plugin for scss files and modules
    'gatsby-plugin-sass',
    {
      //sources information from the filesystem (.md files for ex)
      resolve : 'gatsby-source-filesystem',
      //can see options for all in docs!
      options : {
        name : 'src',
        path : `${__dirname}/src/`
      }
    },
    'gatsby-plugin-sharp',
    {
      //tranformer remark parses markdown files with remark
      resolve : 'gatsby-transformer-remark',
      options: {
        plugins : [
          // helper plugin for remark images? convert image srcs to be relative to parent dir
          'gatsby-remark-relative-images',
          {
            //processes images in md to be used --- LOTS of good options for loading images properly and quickly from md
            resolve : 'gatsby-remark-images',
            options : {
              maxWidth: 750,
              linkImagesToOriginal: false
            }
          }
        ]
      }
    }
  ]
}
