// File: src/components/HomeCard.tsx
import { useEffect, useState } from "react";
import { getBlogs } from "../../util/fetch";

interface Blog {
    id: string;
    title: string;
    description: string;
    tag: string;
    image: string;
    updated_at: any;
}

const HomeCard = () => {
    const [blogs, setBlogs] = useState<Blog[]>([]);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await getBlogs();
                const blogsData = response.blogs || [];
                console.log(blogsData);
                setBlogs(blogsData);
            } catch (error) {
                console.error("Error fetching blogs:", error);
            }
        };

        fetchBlogs();
    }, []);

    const formatDate = (dateString: string) => {
        const formattedDate = new Date(dateString).toLocaleDateString(
            undefined
        );
        return formattedDate;
    };

    return (
        <div>
            {blogs.length > 0 ? (
                blogs.map((blog) => (
                    <div key={blog.id}>
                        <h1>{blog.title}</h1>
                        <span>{blog.tag}</span>
                        <p>{blog.description}</p>
                        <p>{formatDate(blog.updated_at)}</p>
                        <img
                            className="w-12"
                            src={`http://localhost:3000/${blog.image}`}
                            alt="..."
                        ></img>
                    </div>
                ))
            ) : (
                <p>No blogs available</p>
            )}
        </div>
    );
};

export default HomeCard;
