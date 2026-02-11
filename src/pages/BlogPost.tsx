import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Clock, User } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { blogPosts } from "@/data/blog-posts";
import { Badge } from "@/components/ui/badge";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) return <Navigate to="/blog" replace />;

  const renderContent = (content: string) => {
    return content.split("\n\n").map((block, i) => {
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
      if (block.includes("**")) {
        const parts = block.split(/(\*\*.*?\*\*)/g);
        return (
          <p key={i} className="text-muted-foreground leading-relaxed mb-4">
            {parts.map((part, j) =>
              part.startsWith("**") && part.endsWith("**") ? (
                <strong key={j} className="text-foreground">{part.replace(/\*\*/g, "")}</strong>
              ) : (
                <span key={j}>{part}</span>
              )
            )}
          </p>
        );
      }
      return (
        <p key={i} className="text-muted-foreground leading-relaxed mb-4">
          {block}
        </p>
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
              <div className="glass-card p-8 text-center">
                <h3 className="font-display text-xl font-semibold mb-2">Need more miles?</h3>
                <p className="text-muted-foreground mb-4">
                  Top up your Avios or Flying Blue balance and book your dream flight today.
                </p>
                <Link
                  to="/"
                  className="inline-flex gold-gradient text-primary-foreground font-semibold rounded-lg glow-gold hover:opacity-90 transition-opacity px-6 py-3"
                >
                  Get a Quote
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </article>

      <Footer />
    </div>
  );
};

export default BlogPost;
