import { useEffect, useState } from "react";
import { getBlogs } from "../../util/fetch";

interface Blog {
    id: string;
    title: string;
    updated_at: any;
}

const SideCard = () => {
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

    const renderBlog = (blog: Blog) => (
        <a
            href=""
            className="p-10 shadow-md btn card bg-base-100"
            key={blog.id}
        >
            <div className="card-body">
                <h2 className="text-2xl font-bold">{blog.title}</h2>
                <p className="text-red-500">{formatDate(blog.updated_at)}</p>
            </div>
        </a>
    );

    return (
        <div className="w-full p-5 m-2 space-y-5 shadow-md h-72 card">
            <h1 className="font-bold text-center">Postingan Terbaru</h1>
            {blogs.length > 0 ? (
                blogs.slice(0, 2).map(renderBlog)
            ) : (
                <p>No blogs available</p>
            )}
        </div>
    );
};

export default SideCard;
