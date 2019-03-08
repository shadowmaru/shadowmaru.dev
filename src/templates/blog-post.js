import React, { Fragment } from 'react';
import { graphql } from 'gatsby';
import Helmet from 'react-helmet';
import get from 'lodash/get';
import styled from 'styled-components';
import Img from 'gatsby-image';
import { Heading, Flex, Box, Text } from 'rebass';
import ReactMarkdown from 'react-markdown';
import Fade from 'react-reveal/Fade';
import Layout from '../components/Layout';
import HeaderBlog from '../components/HeaderBlog';
import Footer from '../components/Footer';
import Triangle from '../components/Triangle';
import markdownRenderer from '../components/MarkdownRenderer';

const Background = () => (
  <div>
    <Triangle
      color="backgroundDark"
      height={['35vh', '80vh']}
      width={['95vw', '60vw']}
    />

    <Triangle
      color="secondary"
      height={['38vh', '80vh']}
      width={['50vw', '35vw']}
    />

    <Triangle
      color="primaryDark"
      height={['25vh', '35vh']}
      width={['75vw', '60vw']}
      invertX
    />

    <Triangle
      color="backgroundDark"
      height={['20vh', '20vh']}
      width={['100vw', '100vw']}
      invertX
      invertY
    />
  </div>
);

const Hero = styled.div`
  position: relative;
  background: #000;
  color: #fff;
  text-align: center;
`;

const HeroImage = styled(Img)`
  /*
    Ensure golden ratio for the hero size while limiting it to some extend to
    the viewport width
  */
  height: 31.8vh;
  max-height: 400px;
`;

const BlogPostTemplate = props => {
  const post = get(props, 'data.contentfulBlogPost');

  return (
    <Layout>
      <HeaderBlog />
      <Fragment>
        <Background />
        <Helmet title={post.title} />

        <Flex justifyContent="center" alignItems="center" flexWrap="wrap">
          <Box width={[1, 1, 4 / 6]} px={[1, 2, 4]}>
            <Hero>
              <HeroImage alt={post.title} fluid={post.heroImage.fluid} />
            </Hero>
            <Heading as="h1" color="primary" fontSize={[4, 5, 7]}>
              {post.title}
            </Heading>
            <p
              style={{
                display: 'block',
              }}
            >
              {post.publishDate}
            </p>
            <Fade bottom>
              <ReactMarkdown
                source={post.body.childMarkdownRemark.rawMarkdownBody}
                renderers={markdownRenderer}
              />
            </Fade>
          </Box>
        </Flex>
      </Fragment>
      <Footer />
    </Layout>
  );
};

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    contentfulBlogPost(slug: { eq: $slug }) {
      title
      publishDate(formatString: "MMMM Do, YYYY")
      heroImage {
        fluid(maxWidth: 1180, background: "rgb:000000") {
          ...GatsbyContentfulFluid_tracedSVG
        }
      }
      body {
        childMarkdownRemark {
          rawMarkdownBody
        }
      }
    }
  }
`;
