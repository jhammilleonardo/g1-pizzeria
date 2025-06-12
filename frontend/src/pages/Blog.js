import React from 'react';
import '../assets/css/blog.css';

const Blog = () => {
  const blogPosts = [
    { image: 'poixxx1.jpg', title: 'Blog 1', content: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Asperiores saepe natus illum iste quo ad facilis, impedit eum, inventore dicta modi temporibus soluta beatae rem numquam! Reiciendis doloribus natus veritatis!' },
    { image: 'b2.jpg', title: 'Blog 1', content: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Asperiores saepe natus illum iste quo ad facilis, impedit eum, inventore dicta modi temporibus soluta beatae rem numquam! Reiciendis doloribus natus veritatis!' },
    { image: 'b3.jpg', title: 'Blog 1', content: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Asperiores saepe natus illum iste quo ad facilis, impedit eum, inventore dicta modi temporibus soluta beatae rem numquam! Reiciendis doloribus natus veritatis!' },
  ];

  return (
    <section className="blog container">
      {blogPosts.map((post, index) => (
        <div key={index} className="blog-1">
          <img src={`/img/${post.image}`} alt={`blog-${index}`} />
          <h3>{post.title}</h3>
          <p>{post.content}</p>
        </div>
      ))}
    </section>
  );
};

export default Blog;