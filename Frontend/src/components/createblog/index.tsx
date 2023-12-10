import { useState, ChangeEvent } from "react";
import { createBlog } from "../../util/fetch";
import Swal from "sweetalert2";

const CreateBlog = () => {
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [tag, setTag] = useState<string>("");
    const [image, setImage] = useState<File | null>(null);

    const handleCreate = async () => {
        try {
            await createBlog(title, description, tag, image);
            console.log("success");
            window.location.href = "/dashboard";
        } catch (error) {
            console.error("Error while creating blog:", error);
            Swal.fire({
                icon: "error",
                title: "Error...",
                text: "Error while creating blog. Please try again.",
            });
        }
    };

    const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
        const selectedImage = event.target.files?.[0];
        setImage(selectedImage || null);
    };

    return (
        <div className="max-w-2xl p-4 mx-auto mt-8 bg-white rounded-md shadow-md">
            <h2 className="mb-4 text-2xl font-semibold">Create Blog</h2>
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
                <label htmlFor="image" className="label">
                    Image:
                </label>
                <input
                    id="image"
                    type="file"
                    className="w-full file-input"
                    onChange={handleImageChange}
                />
                <br />
                <button
                    className="w-full mt-5 btn btn-primary"
                    onClick={handleCreate}
                >
                    Create Blog
                </button>
            </form>
        </div>
    );
};

export default CreateBlog;
