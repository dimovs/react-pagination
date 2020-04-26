import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Posts from "./components/posts.js";
import Pagination from "./components/pagination.js";

function App() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(10);

    useEffect(() => {
       const fetchPosts = async () => {
            setLoading(true);
            const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
            setPosts(res.data);
            setLoading(false);
        };

        fetchPosts();
    }, []);

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = (number) => {
        setCurrentPage(number);
    };

    return (
        <div className="container mt-5">
          <h1 className="text-primary mb">My Blog</h1>
           <Posts posts={currentPosts} loading={loading} />
           <Pagination totalPosts={posts.length} postsPerPage={postsPerPage} paginate={paginate} />
        </div>
    );
}

export default App;
