import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEOMeta = ({ title, description, keywords, url, image }) => {
  const defaultTitle = "Iredox | Full Stack Developer";
  const defaultDesc = "Portfolio of Iredox, a passionate Full Stack Developer specializing in React, Node.js, and modern web technologies.";
  const defaultKeywords = "Iredox, Full Stack Developer, React, Node.js, Web Development, Portfolio";
  const defaultUrl = "https://iredox.dev";
  const defaultImage = "https://placehold.co/1200x630/111827/FFFFFF?text=Iredox+Portfolio";

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title || defaultTitle}</title>
      <meta name="title" content={title || defaultTitle} />
      <meta name="description" content={description || defaultDesc} />
      <meta name="keywords" content={keywords || defaultKeywords} />
      <meta name="author" content="Iredox" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url || defaultUrl} />
      <meta property="og:title" content={title || defaultTitle} />
      <meta property="og:description" content={description || defaultDesc} />
      <meta property="og:image" content={image || defaultImage} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url || defaultUrl} />
      <meta property="twitter:title" content={title || defaultTitle} />
      <meta property="twitter:description" content={description || defaultDesc} />
      <meta property="twitter:image" content={image || defaultImage} />

      {/* Theme Color */}
      <meta name="theme-color" content="#9333ea" />
    </Helmet>
  );
};

export default SEOMeta;
