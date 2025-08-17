
import React from 'react';
import BlogPostLayout from './BlogPostLayout';
import type { BlogPost } from '../../types';

interface PageProps {
  post: BlogPost;
  allPosts: BlogPost[];
}

const Page: React.FC<PageProps> = ({ post, allPosts }) => {
  if (!post) return <div>Post not found</div>;
  return <BlogPostLayout post={post} allPosts={allPosts} />;
};

export default Page;
