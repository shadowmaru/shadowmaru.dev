import React from 'react';
import PropTypes from 'prop-types';
import { Heading, Text } from 'rebass';
import { StaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';
import styled from 'styled-components';
import Fade from 'react-reveal/Fade';
import Section from '../components/Section';
import { CardContainer, Card } from '../components/Card';
import Triangle from '../components/Triangle';
import ImageSubtitle from '../components/ImageSubtitle';

const Background = () => (
  <div>
    <Triangle
      color="backgroundDark"
      height={['15vh', '10vh']}
      width={['100vw', '100vw']}
      invertX
    />

    <Triangle
      color="secondary"
      height={['50vh', '40vh']}
      width={['70vw', '40vw']}
      invertY
    />

    <Triangle
      color="primaryDark"
      height={['40vh', '15vh']}
      width={['100vw', '100vw']}
      invertX
      invertY
    />
  </div>
);

const CoverImage = styled(Img)`
  width: 100%;
  object-fit: cover;
`;

const EllipsisHeading = styled(Heading)`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-inline-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  border-bottom: ${props => props.theme.colors.primary} 5px solid;
`;

const BlogPost = ({ title, description, publishDate, heroImage }) => (
  <Card pb={4}>
    <EllipsisHeading m={3} p={1}>
      {title}
    </EllipsisHeading>
    {heroImage && <CoverImage height="200px" alt={title} fluid={heroImage.fluid} />}
    <Text m={3}>
      <p
        dangerouslySetInnerHTML={{
        __html: description.childMarkdownRemark.html,
      }}
      />
    </Text>
    <ImageSubtitle bg="primaryLight" color="white" x="right" y="bottom" round>
      {`${publishDate}`}
    </ImageSubtitle>
  </Card>
);

const edgeToArray = data => data.edges.map(edge => edge.node);

const Blog = () => (
  <StaticQuery
    query={graphql`
      query BlogPostQuery {
        allContentfulBlogPost(sort: { fields: [publishDate], order: DESC }) {
          edges {
            node {
              id
              title
              slug
              publishDate(formatString: "DD/MM/YYYY")
              tags
              heroImage {
                fluid(maxWidth: 375, maxHeight: 200, resizingBehavior: SCALE) {
                  ...GatsbyContentfulFluid_tracedSVG
                }
              }
              description {
                childMarkdownRemark {
                  html
                }
              }
            }
          }
        }
      }
    `}
    render={({ allContentfulBlogPost }) => {
      const blogPosts = edgeToArray(allContentfulBlogPost);
      return (
        <Section.Container id="blog" Background={Background}>
          <Section.Header name="Tech Articles" icon="✍️" label="blog" />
          <CardContainer minWidth="300px">
            {blogPosts.map(p => (
              <Fade bottom>
                <BlogPost key={p.id} {...p} />
              </Fade>
            ))}
          </CardContainer>
        </Section.Container>
      );
    }}
  />
);

export default Blog;
