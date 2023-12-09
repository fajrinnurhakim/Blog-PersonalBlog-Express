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

const Table = () => {
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

    const blogsPerPage = 10;
    const indexOfLastBlog = currentPage * blogsPerPage;
    const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
    const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    return (
        <div className="w-2/3">
            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr className="text-center">
                            <th>No</th>
                            <th>Title</th>
                            <th>Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentBlogs.map((blog, index) => (
                            <tr key={blog.id} className="text-center">
                                <th>{index + 1}</th>
                                <td>{blog.title}</td>
                                <td>{formatDate(blog.updated_at)}</td>
                                <td className="mx-auto space-x-2">
                                    <button className="btn btn-primary">
                                        Delete
                                    </button>
                                    <button className="btn btn-secondary">
                                        Update
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="mt-5 join">
                {Array.from(
                    { length: Math.ceil(blogs.length / blogsPerPage) },
                    (_, index) => (
                        <button
                            key={index + 1}
                            onClick={() => paginate(index + 1)}
                            className="join-item btn"
                        >
                            {index + 1}
                        </button>
                    )
                )}
            </div>
        </div>
    );
};

export default Table;
