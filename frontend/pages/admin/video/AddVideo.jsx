import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { Link } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";
import { useCanister } from "@connect2ic/react";
import { CiCircleCheck } from "react-icons/ci";
import { TailSpin } from "react-loader-spinner";
import { CiCircleChevLeft, CiTrash } from "react-icons/ci";

const AddVideo = () => {
  const [backend] = useCanister("backend");
  const [loading, setLoading] = useState(false);
  const alert = useAlert();
  const [loading3, setLoading3] = useState(false);
  const [course, setCourse] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    status: "active",
    description: "",
    video_url: "",
    course: "",
    img1: "",
  });

  const validateForm = () => {
    if (!formData.title.trim()) {
      alert.error("Please enter Video title");
      return false;
    }
    return true;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true); // Set loading state to true
      if (!validateForm()) {
        return;
      }

      const requestData = {
        title: formData.title,
        status: formData.status,
        description: formData.description,
        video_url: formData.video_url,
        course: formData.course,
        img1: formData.img1,
      };

      const res = await backend.createVideo(requestData);

      if ("ok" in res) {
        alert.success("Video Added Successfully");
        setFormData({
          title: "",
          status: "active",
          description: "",
          video_url: "",
          course: "",
          img1: "",
        });
      }
    } catch (error) {
      alert.error("An error occurred while creating the video.");
      console.error("An error occurred:", error);
    } finally {
      setLoading(false); // Reset loading state to false
    }
  };
  useEffect(() => {
    listAllCourse();
  }, []);

  const listAllCourse = async () => {
    try {
      setLoading3(true);
      const courses = await backend.listCourse();
      setCourse(courses);
    } catch (error) {
      console.error("Error listing all courses:", error);
    } finally {
      setLoading3(false);
    }
  };
  return (
    <div className="w-full">
      <div className="styled-scrollbar flex flex-col bg-white dark:bg-slate-800 rounded-2xl overflow-y-auto h-[calc(100vh-100px)] p-4">
        <div className="mb-5 flex justify-between items-center gap-2">
          <h1 className="uppercase text-xl font-semibold text-gray-900 dark:text-white">
            Create Video
          </h1>
          <div>
            <Link
              to="/admin/videos"
              className="uppercase font-medium flex items-center justify-center gap-2 bg-[#330000]/20 dark:bg-[#330000]/20 hover:bg-[#330000]/20 dark:hover:bg-[#330000]/20 text-[#330000] rounded-xl px-6 py-3"
            >
              {" "}
              <CiCircleChevLeft className="w-5 h-5" /> Go back
            </Link>
          </div>
        </div>
        <div className="w-full">
          <form onSubmit={handleSubmit}>
            <div className="my-2">
              <label
                htmlFor="title"
                className="uppercase text-sm text-black font-medium mb-0 tracking-wide"
              >
                Enter Video Title
              </label>
              <input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                type="text"
                className="border-2 p-2 outline-none border-[#F4F2F2] w-full rounded-lg"
                placeholder="Enter Video Title"
                disabled={loading}
              />
            </div>
            <div className="my-2">
              <label
                htmlFor="title"
                className="uppercase text-sm text-black font-medium mb-0 tracking-wide"
              >
                Enter Video Description
              </label>
              <input
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                type="text"
                className="border-2 p-2 outline-none border-[#F4F2F2] w-full rounded-lg"
                placeholder="Enter Video Description"
                disabled={loading}
              />
            </div>
            <div className="my-2">
              <label
                htmlFor="title"
                className="uppercase text-sm text-black font-medium mb-0 tracking-wide"
              >
                Enter Video URL
              </label>
              <input
                id="video_url"
                name="video_url"
                value={formData.video_url}
                onChange={handleInputChange}
                type="text"
                className="border-2 p-2 outline-none border-[#F4F2F2] w-full rounded-lg"
                placeholder="Enter Video URL"
                disabled={loading}
              />
            </div>
            <div className="my-2">
              <label
                htmlFor="title"
                className="uppercase text-sm text-black font-medium mb-0 tracking-wide"
              >
                Enter Thumbnail Url
              </label>
              <input
                id="image"
                name="img1"
                value={formData.img1}
                onChange={handleInputChange}
                type="text"
                className="border-2 p-2 outline-none border-[#F4F2F2] w-full rounded-lg"
                placeholder="Enter Thumbnail Url"
                disabled={loading}
              />
            </div>
            <div className="my-2">
              <label
                htmlFor="title"
                className="uppercase text-sm text-black font-medium mb-0 tracking-wide"
              >
                Select Video Course
              </label>
              <select
                name="course"
                id="course"
                className="border-2 p-2 outline-none border-[#F4F2F2] w-full rounded-lg"
                value={formData.course}
                onChange={handleInputChange}
                disabled={loading}
              >
                <option value="">Select Video Course</option>
                {course.map((item, index) => (
                  <option value={item[1].title} key={index}>
                    {item[1].title}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex justify-end mt-6">
              <button
                onClick={handleSubmit}
                type="submit"
                className={`bg-[#330000] text-md tracking-wide py-2 px-4 rounded-xl text-white font-medium flex justify-center items-center gap-2 ${
                  loading && "opacity-50"
                }`}
                disabled={loading}
              >
                {loading ? (
                  <TailSpin
                    height="20"
                    width="20"
                    color="white"
                    ariaLabel="tail-spin-loading"
                    radius="1"
                    visible={true}
                  />
                ) : (
                  <CiCircleCheck className="w-5 h-5" />
                )}
                SUBMIT VIDEO
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddVideo;
