import axios from "axios";
import Swal from "sweetalert2";

export const getBlogs = async () => {
    try {
        const response = await axios.get("http://localhost:5000/blogs");

        return response.data;
    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "Error...",
            text: `Error while fetching blogs: ${error}`,
        });
    }
};

export const getBlogById = async (id: string) => {
    try {
        const response = await axios.get(`http://localhost:5000/blogs/${id}`);

        return response.data;
    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "Error...",
            text: `Error while fetching blog with ID ${id}: ${error}`,
        });
    }
};

export const createBlog = async (
    title: string,
    description: string,
    tag: string,
    image: File | null
) => {
    try {
        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("tag", tag);
        if (image) {
            formData.append("image", image);
        }

        const response = await axios.post(
            `http://localhost:5000/blogs`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );

        Swal.fire({
            icon: "success",
            title: "Success...",
            text: "Create Blog Successfully!",
        });
        return response.data;
    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "Error...",
            text: `Error while creating blog: ${error}`,
        });
    }
};

export const updateBlog = async (
    id: string,
    title: string,
    description: string,
    tag: string
) => {
    try {
        const response = await axios.put(`http://localhost:5000/blogs/${id}`, {
            title,
            description,
            tag,
        });

        Swal.fire({
            icon: "success",
            title: "Success...",
            text: "Update Blog Successfully!",
        });

        return response.data;
    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "Error...",
            text: `Error while updating blog: ${error}`,
        });
    }
};

export const deleteBlog = async (id: string) => {
    try {
        const response = await axios.delete(
            `http://localhost:5000/blogs/${id}`
        );
        Swal.fire({
            icon: "success",
            title: "Success...",
            text: "Delete Blog Successfully!",
        });
        return response.data;
    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "Error...",
            text: `Error while Deleting blog: ${error}`,
        });
    }
};
