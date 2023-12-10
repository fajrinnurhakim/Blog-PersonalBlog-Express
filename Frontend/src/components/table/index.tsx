import { useEffect, useState } from "react";
import { deleteBlog, getBlogs, updateBlog } from "../../util/fetch";

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

    const [showUpdateForm, setShowUpdateForm] = useState<boolean>(false);
    const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);

    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [tag, setTag] = useState<string>("");

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

    const handleDelete = async (id: string) => {
        try {
            await deleteBlog(id);
            const response = await getBlogs();
            const blogsData = response.blogs || [];
            setBlogs(blogsData);
        } catch (error) {
            console.error(`Error deleting blog with ID ${id}:`, error);
        }
    };

    const handleUpdateClick = (blog: Blog) => {
        setSelectedBlog(blog);
        setTitle(blog.title);
        setDescription(blog.description);
        setTag(blog.tag);
        setShowUpdateForm(true);
    };

    const handleUpdate = async () => {
        try {
            if (selectedBlog) {
                setBlogs((prevBlogs) => {
                    const updatedBlogs = prevBlogs.map((blog) =>
                        blog.id === selectedBlog.id
                            ? { ...blog, title, description, tag }
                            : blog
                    );
                    return updatedBlogs;
                });
                await updateBlog(selectedBlog.id, title, description, tag);
            }
        } catch (error) {
            console.error("Error updating blog:", error);
        }
    };

    const blogsPerPage = 5;
    const indexOfLastBlog = currentPage * blogsPerPage;
    const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
    const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    return (
        <div className="w-full p-5 space-y-5">
            <div className="flex justify-between">
                <a href="/create" className="btn btn-primary">
                    Create Blog
                </a>
                <div className="join">
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
                                    <button
                                        className="btn btn-error"
                                        onClick={() => handleDelete(blog.id)}
                                    >
                                        Delete
                                    </button>
                                    <button
                                        className="btn btn-primary"
                                        onClick={() => handleUpdateClick(blog)}
                                    >
                                        Update
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {showUpdateForm && (
                    <form>
                        <label htmlFor="title" className="label">
                            Title:
                        </label>
                        <input
                            className="w-full input input-bordered"
                            id="title"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <br />
                        <label htmlFor="description" className="label">
                            Description:
                        </label>
                        <textarea
                            className="w-full textarea textarea-bordered"
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <br />
                        <label htmlFor="tag" className="label">
                            Tag:
                        </label>
                        <select
                            className="w-full input input-bordered"
                            id="tag"
                            value={tag}
                            onChange={(e) => setTag(e.target.value)}
                        >
                            <option value="">Select a tag</option>
                            <option value="TECHNOLOGY">Technology</option>
                            <option value="SPORTS">Sports</option>
                            <option value="TRAVEL">Travel</option>
                            <option value="FOOD">Food</option>
                        </select>
                        <br />
                        <button
                            className="w-full mt-5 btn btn-primary"
                            onClick={handleUpdate}
                        >
                            Update Blog
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default Table;
