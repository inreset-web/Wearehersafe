import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  ogType?: string;
  keywords?: string;
  image?: string;
  imageAlt?: string;
}

export function SEO({ title, description, canonical, ogType = 'website', keywords, image, imageAlt }: SEOProps) {
  useEffect(() => {
    // Actualizar título
    document.title = title;
    
    // Actualizar meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    }
    
    // Actualizar keywords si se proporcionan
    if (keywords) {
      const metaKeywords = document.querySelector('meta[name="keywords"]');
      if (metaKeywords) {
        metaKeywords.setAttribute('content', keywords);
      }
    }
    
    // Actualizar Open Graph title
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', title);
    }
    
    // Actualizar Open Graph description
    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute('content', description);
    }
    
    // Actualizar Open Graph image si se proporciona
    if (image) {
      let ogImage = document.querySelector('meta[property="og:image"]');
      if (!ogImage) {
        ogImage = document.createElement('meta');
        ogImage.setAttribute('property', 'og:image');
        document.head.appendChild(ogImage);
      }
      ogImage.setAttribute('content', image);
      
      // Actualizar alt de la imagen
      if (imageAlt) {
        let ogImageAlt = document.querySelector('meta[property="og:image:alt"]');
        if (!ogImageAlt) {
          ogImageAlt = document.createElement('meta');
          ogImageAlt.setAttribute('property', 'og:image:alt');
          document.head.appendChild(ogImageAlt);
        }
        ogImageAlt.setAttribute('content', imageAlt);
      }
    }
    
    // Actualizar Twitter title
    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitle) {
      twitterTitle.setAttribute('content', title);
    }
    
    // Actualizar Twitter description
    const twitterDescription = document.querySelector('meta[name="twitter:description"]');
    if (twitterDescription) {
      twitterDescription.setAttribute('content', description);
    }
    
    // Actualizar Twitter image si se proporciona
    if (image) {
      let twitterImage = document.querySelector('meta[name="twitter:image"]');
      if (!twitterImage) {
        twitterImage = document.createElement('meta');
        twitterImage.setAttribute('name', 'twitter:image');
        document.head.appendChild(twitterImage);
      }
      twitterImage.setAttribute('content', image);
      
      // Actualizar alt de la imagen en Twitter
      if (imageAlt) {
        let twitterImageAlt = document.querySelector('meta[name="twitter:image:alt"]');
        if (!twitterImageAlt) {
          twitterImageAlt = document.createElement('meta');
          twitterImageAlt.setAttribute('name', 'twitter:image:alt');
          document.head.appendChild(twitterImageAlt);
        }
        twitterImageAlt.setAttribute('content', imageAlt);
      }
    }
    
    // Actualizar canonical URL si se proporciona
    if (canonical) {
      let linkCanonical = document.querySelector('link[rel="canonical"]');
      if (!linkCanonical) {
        linkCanonical = document.createElement('link');
        linkCanonical.setAttribute('rel', 'canonical');
        document.head.appendChild(linkCanonical);
      }
      linkCanonical.setAttribute('href', canonical);
      
      // Actualizar og:url
      const ogUrl = document.querySelector('meta[property="og:url"]');
      if (ogUrl) {
        ogUrl.setAttribute('content', canonical);
      }
      
      // Actualizar twitter:url
      const twitterUrl = document.querySelector('meta[name="twitter:url"]');
      if (twitterUrl) {
        twitterUrl.setAttribute('content', canonical);
      }
    }
    
    // Actualizar og:type
    const ogTypeElement = document.querySelector('meta[property="og:type"]');
    if (ogTypeElement) {
      ogTypeElement.setAttribute('content', ogType);
    }
  }, [title, description, canonical, ogType, keywords, image, imageAlt]);
  
  return null;
}