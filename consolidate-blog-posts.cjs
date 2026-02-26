#!/usr/bin/env node

/**
 * Blog Post Consolidation Script
 * 
 * This script:
 * 1. Removes duplicate posts:
 *    - "cheapest-way-to-buy-avios" (duplicate of "cheapest-way-to-get-avios-2026")
 *    - "flying-blue-vs-avios-comparison" (duplicate of "avios-vs-flying-blue-which-miles-should-you-get")
 * 2. Adds 2 new posts:
 *    - "flying-blue-miles-for-sale-uk-2026"
 *    - "best-price-to-purchase-avios-points-2026"
 * 3. Updates the blog-posts.ts file
 */

const fs = require('fs');
const path = require('path');

const BLOG_POSTS_PATH = path.join(__dirname, 'src/data/blog-posts.ts');
const NEW_POSTS_PATH = path.join(__dirname, 'NEW_BLOG_POSTS.js');

// Slugs to remove (duplicates)
const DUPLICATES_TO_REMOVE = [
  'cheapest-way-to-buy-avios',
  'flying-blue-vs-avios-comparison',
];

console.log('🔧 Blog Post Consolidation Script');
console.log('==================================\n');

// Read the existing blog-posts.ts file
console.log('📖 Reading blog-posts.ts...');
let blogPostsContent = fs.readFileSync(BLOG_POSTS_PATH, 'utf8');

// Count posts before
const postsBefore = (blogPostsContent.match(/slug:/g) || []).length - 1; // -1 for interface definition
console.log(`   Found ${postsBefore} existing posts\n`);

// Remove duplicates
console.log('🗑️  Removing duplicate posts:');
DUPLICATES_TO_REMOVE.forEach(slug => {
  const slugPattern = `slug: "${slug}"`;
  if (blogPostsContent.includes(slugPattern)) {
    console.log(`   ❌ Removing: ${slug}`);
    
    // Find the start of this post object
    const startIdx = blogPostsContent.indexOf(`  {\n    slug: "${slug}"`);
    if (startIdx === -1) {
      console.log(`      ⚠️  Could not find post object for ${slug}`);
      return;
    }
    
    // Find the end of this post object (next "  }," or "  }\n];")
    let endIdx = blogPostsContent.indexOf('\n  },\n  {', startIdx);
    if (endIdx === -1) {
      // This might be the last post before the closing "];", so look for that
      endIdx = blogPostsContent.indexOf('\n  },\n];', startIdx);
      if (endIdx !== -1) {
        // Include the closing brace but not the array closing
        endIdx += 5; // length of '\n  },'
      }
    } else {
      // Include up to the comma after the closing brace
      endIdx += 6; // length of '\n  },\n'
    }
    
    if (endIdx === -1) {
      console.log(`      ⚠️  Could not find end of post object for ${slug}`);
      return;
    }
    
    // Remove this post
    blogPostsContent = blogPostsContent.slice(0, startIdx) + blogPostsContent.slice(endIdx);
    console.log(`      ✅ Removed successfully`);
  } else {
    console.log(`   ⚠️  Not found: ${slug}`);
  }
});

console.log('\n✅ Duplicates removed\n');

// Read new posts
console.log('📄 Loading new posts from NEW_BLOG_POSTS.js...');
const newPostsModule = require(NEW_POSTS_PATH);
const newPosts = newPostsModule.newBlogPosts;
console.log(`   Found ${newPosts.length} new posts to add\n`);

// Add new posts before the closing "];
console.log('➕ Adding new posts:');
newPosts.forEach(post => {
  console.log(`   ✅ Adding: ${post.slug}`);
});

// Find the closing of the array
const arrayClosingIdx = blogPostsContent.lastIndexOf('];');
if (arrayClosingIdx === -1) {
  console.error('❌ Error: Could not find array closing "];');
  process.exit(1);
}

// Convert new posts to TypeScript format
const newPostsTS = newPosts.map(post => {
  return `  {
    slug: "${post.slug}",
    title: "${post.title}",
    excerpt: "${post.excerpt}",
    content: \`${post.content}\`,
    author: "${post.author}",
    date: "${post.date}",
    readTime: "${post.readTime}",
    category: "${post.category}",
    image: "${post.image}",
  },`;
}).join('\n');

// Insert new posts
blogPostsContent = blogPostsContent.slice(0, arrayClosingIdx) + newPostsTS + '\n' + blogPostsContent.slice(arrayClosingIdx);

// Write back
console.log('\n💾 Writing updated blog-posts.ts...');
fs.writeFileSync(BLOG_POSTS_PATH, blogPostsContent, 'utf8');

// Count posts after
const postsAfter = (blogPostsContent.match(/slug:/g) || []).length - 1; // -1 for interface definition
console.log(`   ✅ Updated successfully`);
console.log(`   📊 Posts before: ${postsBefore}`);
console.log(`   📊 Posts after: ${postsAfter}`);
console.log(`   📊 Net change: ${postsAfter - postsBefore > 0 ? '+' : ''}${postsAfter - postsBefore}\n`);

console.log('✨ Consolidation complete!\n');
console.log('Next steps:');
console.log('1. Review src/data/blog-posts.ts for any formatting issues');
console.log('2. Test the blog locally: npm run dev');
console.log('3. Verify all 17+ posts are loading correctly');
console.log('4. Deploy when ready: git add . && git commit -m "Add 2 new posts, remove duplicates" && git push\n');
