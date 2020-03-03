import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'
import styled from 'styled-components'
import christopherImage from 'assets/christopher3-overlay-213768.png'
import PostCard from 'components/PostCard'
import {
  Row,
  Column,
  SectionTitle,
  MainContent,
  ContentInner,
} from 'styles/styles'
import theme from 'theme'

import { Layout } from 'components'

const PortfolioPage = ({
  location,
  data: {
    allMdx: { edges: postEdges },
  },
}) => (
  <Layout location={location}>
    <MainContent>
      <ContentInner>
        <SectionTitle>My Work</SectionTitle>
        {postEdges.map(post => (
          <PostCard
            title={post.node.frontmatter.title}
            date={post.node.frontmatter.date}
            excerpt={post.node.excerpt}
            timeToRead={post.node.timeToRead}
            slug={post.node.fields.slug}
            categories={post.node.frontmatter.categories}
            key={post.node.fields.slug}
            cover={post.node.frontmatter.cover}
          />
        ))}
      </ContentInner>
    </MainContent>
  </Layout>
)

export default PortfolioPage

export const PortfolioQuery = graphql`
  query PortfolioQuery {
    allMdx(sort: { fields: [frontmatter___order], order: ASC }) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            date(formatString: "MM/DD/YYYY")
            categories
            cover {
              publicURL
              childImageSharp {
                sizes(maxWidth: 2000) {
                  ...GatsbyImageSharpSizes
                }
              }
            }
          }
          excerpt(pruneLength: 200)
          timeToRead
        }
      }
    }
  }
`