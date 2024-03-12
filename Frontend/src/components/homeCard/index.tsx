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
    const [currentPage, setCurrentPage] = useState<number>(1);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await getBlogs();
                const blogsData = response.blogs || [];
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
        <div className="shadow-md card bg-base-100" key={blog.id}>
            <figure>
                <img
                    src={`http://localhost:5000/${blog.image}`}
                    alt="Blog Image"
                    className="h-80"
                />
            </figure>
            <div className="card-body">
                <h2 className="text-2xl font-bold">{blog.title}</h2>
                <p className="text-red-500">
                    @Fajrin_Nurhakim {formatDate(blog.updated_at)}
                </p>
                <p>{blog.description}</p>
                <p className="italic">Tag : {blog.tag}</p>
            </div>
        </div>
    );

    const blogsPerPage = 3;
    const indexOfLastBlog = currentPage * blogsPerPage;
    const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
    const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    return (
        <div className="w-2/3">
            <div className="flex w-full space-x-2">
                {currentBlogs.length > 0 ? (
                    currentBlogs.map(renderBlog)
                ) : (
                    <p>No blogs available</p>
                )}
            </div>
            <div>
                {Array.from(
                    { length: Math.ceil(blogs.length / blogsPerPage) },
                    (_, index) => (
                        <button
                            key={index + 1}
                            onClick={() => paginate(index + 1)}
                            className="mt-5 join-item btn"
                        >
                            {index + 1}
                        </button>
                    )
                )}
            </div>
        </div>
    );
};

export default HomeCard;
