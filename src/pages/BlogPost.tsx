import { useParams, Link, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Clock, User } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BlogCTA from "@/components/BlogCTA";
import { blogPosts } from "@/data/blog-posts";
import { Badge } from "@/components/ui/badge";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find((p) => p.slug === slug);

  useEffect(() => {
    if (!post) return;
    
    // Add canonical link
    const canonical = document.createElement("link");
    canonical.rel = "canonical";
    canonical.href = `https://milestopup.com/blog/${post.slug}`;
    canonical.id = "canonical-link";
    document.head.appendChild(canonical);
    
    // Add Article Schema
    const schema = {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: post.title,
      description: post.excerpt,
      image: post.image,
      url: `https://milestopup.com/blog/${post.slug}`,
      author: { 
        "@type": "Organization", 
        name: post.author,
        url: "https://milestopup.com"
      },
      publisher: { 
        "@type": "Organization", 
        name: "MilesTopUp", 
        url: "https://milestopup.com",
        logo: {
          "@type": "ImageObject",
          url: "https://milestopup.com/favicon.svg"
        }
      },
      datePublished: post.date,
      dateModified: post.date,
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": `https://milestopup.com/blog/${post.slug}`,
      },
      articleSection: post.category,
      wordCount: Math.round(post.content.split(/\s+/).length),
      keywords: post.category === "Avios" ? "Avios, British Airways, points and miles" : "Flying Blue, Air France, KLM, miles",
    };
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(schema);
    script.id = "article-schema";
    document.head.appendChild(script);
    
    return () => {
      const canonicalEl = document.getElementById("canonical-link");
      if (canonicalEl) canonicalEl.remove();
      const schemaEl = document.getElementById("article-schema");
      if (schemaEl) schemaEl.remove();
    };
  }, [post]);

  if (!post) return <Navigate to="/blog" replace />;

  const renderInline = (text: string) => {
    // Handle both **bold** and [links](url)
    const parts = text.split(/(\*\*.*?\*\*|\[[^\]]+\]\([^)]+\))/g);
    return parts.map((part, j) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return <strong key={j} className="text-foreground">{part.replace(/\*\*/g, "")}</strong>;
      }
      const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      if (linkMatch) {
        const isInternal = linkMatch[2].startsWith("/");
        if (isInternal) {
          return <Link key={j} to={linkMatch[2]} className="text-primary hover:underline">{linkMatch[1]}</Link>;
        }
        return <a key={j} href={linkMatch[2]} className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">{linkMatch[1]}</a>;
      }
      return <span key={j}>{part}</span>;
    });
  };

  // Determine CTA type based on post category
  const ctaType: "avios" | "flyingblue" | "both" = 
    post.category === "Flying Blue" ? "flyingblue" 
    : post.category === "Avios" ? "avios" 
    : "both";

  const renderContent = (content: string) => {
    const blocks = content.split("\n\n");
    let paragraphCount = 0;
    
    return blocks.map((block, i) => {
      const imgMatch = block.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
      if (imgMatch) {
        return (
          <figure key={i} className="my-8">
            <img src={imgMatch[2]} alt={imgMatch[1]} className="w-full rounded-xl" loading="lazy" />
            {imgMatch[1] && (
              <figcaption className="text-sm text-muted-foreground text-center mt-2">{imgMatch[1]}</figcaption>
            )}
          </figure>
        );
      }
      if (block.startsWith("## ")) {
        return (
          <h2 key={i} className="font-display text-xl font-semibold mt-8 mb-3 text-foreground">
            {block.replace("## ", "")}
          </h2>
        );
      }
      if (block.startsWith("**") && block.endsWith("**")) {
        return (
          <p key={i} className="font-semibold text-foreground mb-3">
            {block.replace(/\*\*/g, "")}
          </p>
        );
      }
      paragraphCount++;
      const showCTA = paragraphCount === 3;
      return (
        <div key={i}>
          <p className="text-muted-foreground leading-relaxed mb-4">
            {renderInline(block)}
          </p>
          {showCTA && <BlogCTA milesType={ctaType} />}
        </div>
      );
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <article className="pt-28 pb-20 px-4">
        <div className="container max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Link>

            <Badge variant="secondary" className="mb-4">
              {post.category}
            </Badge>

            <h1 className="font-display text-3xl md:text-4xl font-bold mb-6">{post.title}</h1>

            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-8">
              <span className="flex items-center gap-1.5">
                <User className="w-4 h-4" />
                {post.author}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                {new Date(post.date).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                {post.readTime}
              </span>
            </div>

            <div className="rounded-2xl overflow-hidden mb-10">
              <img src={post.image} alt={post.title} className="w-full aspect-video object-cover" />
            </div>

            <div className="prose-custom">{renderContent(post.content)}</div>

            <div className="mt-12 pt-8 border-t border-border">
              <BlogCTA milesType={ctaType} />
            </div>
          </motion.div>
        </div>
      </article>

      <Footer />
    </div>
  );
};

export default BlogPost;
