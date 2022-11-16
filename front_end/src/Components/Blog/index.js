import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getLimitBlogs } from '../../api/BlogAPI'
import Card from './Card'
import "./style.css"
import ContentLoader from 'react-content-loader'

export function Loader() {
    return (
        <>
            <div className="blogCard-container">
                <ContentLoader viewBox="0 0 100 100">
                    {/* Only SVG shapes */}
                    <rect x="0" y="0" rx="5" ry="5" width="100" height="50" />
                    <rect x="0" y="55" rx="2" ry="2" width="80" height="10" />
                    <rect x="0" y="70" rx="3" ry="3" width="100" height="5" />
                    <rect x="0" y="78" rx="3" ry="3" width="100" height="5" />
                    <rect x="0" y="86" rx="3" ry="3" width="100" height="5" />
                    <rect x="0" y="94" rx="3" ry="3" width="70" height="5" />
                </ContentLoader>
            </div>
            <div className="blogCard-container">
                <ContentLoader viewBox="0 0 100 100">
                    {/* Only SVG shapes */}
                    <rect x="0" y="0" rx="5" ry="5" width="100" height="50" />
                    <rect x="0" y="55" rx="2" ry="2" width="80" height="10" />
                    <rect x="0" y="70" rx="3" ry="3" width="100" height="5" />
                    <rect x="0" y="78" rx="3" ry="3" width="100" height="5" />
                    <rect x="0" y="86" rx="3" ry="3" width="100" height="5" />
                    <rect x="0" y="94" rx="3" ry="3" width="70" height="5" />
                </ContentLoader>
            </div>
            <div className="blogCard-container">
                <ContentLoader viewBox="0 0 100 100">
                    {/* Only SVG shapes */}
                    <rect x="0" y="0" rx="5" ry="5" width="100" height="50" />
                    <rect x="0" y="55" rx="2" ry="2" width="80" height="10" />
                    <rect x="0" y="70" rx="3" ry="3" width="100" height="5" />
                    <rect x="0" y="78" rx="3" ry="3" width="100" height="5" />
                    <rect x="0" y="86" rx="3" ry="3" width="100" height="5" />
                    <rect x="0" y="94" rx="3" ry="3" width="70" height="5" />
                </ContentLoader>
            </div>
        </>
    );
}
const Index = () => {
    const [blogs, setBlogs] = useState(null)

    useEffect(() => {
        getLimitBlogs(setBlogs, 3)
    }, [])
    return (
        <div className="blog-container">
            <h1 className="blog-title">Blog</h1>
            <div className="blogList-container">
                {(blogs) ? blogs.map((obj) =>
                    <Card obj={obj} />
                ) :
                    <Loader />
                }
            </div>
            <Link className="loadMore" to="/blog">Xem thêm</Link>
        </div>
    )
}




export default Index
