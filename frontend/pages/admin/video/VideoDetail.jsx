import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useCanister } from "@connect2ic/react";
import { CiCircleCheck, CiCircleChevLeft, CiTrash } from "react-icons/ci";
import { TailSpin } from "react-loader-spinner";

const VideoDetail = () => {
  const [backend] = useCanister("backend");
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(true);
  const [loading3, setLoading3] = useState(false);
  const [course, setCourse] = useState([]);
  const alert = useAlert();
  const navigate = useNavigate();
  const param = useParams();
  const [video, setVideo] = useState([]); // Add state for email

  const [formData, setFormData] = useState({
    title: "",
    status: "active",
    description: "",
    video_url: "",
    course: "",
    img1: "",
  });

  const getVideo = async () => {
    try {
      setLoading2(true);
      const item = await backend.getVideo(param.slug);
      if (item.ok) {
        setFormData({
          title: item.ok.title,
          status: item.ok.status,
          description: item.ok.description,
          video_url: item.ok.video_url,
          course: item.ok.course,
          img1: item.ok.img1,
        });
        setLoading2(false);
        console.log(item.ok);
        setVideo(item.ok)
      }
    } catch (error) {
      console.error("Error fetching video:", error);
      setLoading2(false);
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      getVideo();
    }, 2000);

    return () => clearTimeout(timeoutId);
  }, [backend]);

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
      if (!validateForm()) {
        return;
      }
      setLoading(true);

      const requestData = {
        title: formData.title,
        status: formData.status,
        description: formData.description,
        course: formData.course,
        video_url: formData.video_url,
        img1: formData.img1,
      };
      const res = await backend.updateVideo(
        video.slug,
        requestData,
      );

      console.log(res);
      if ("ok" in res) {
        alert.success("Video Updated Successfully");
      }
    } catch (error) {
      alert.error("An error occurred while updating the Video.");
      console.error("An error occurred:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (slug) => {
    try {
      setLoading(true);

      const res = await backend.deleteVideo(slug);

      console.log(res);
      if ("ok" in res) {
        alert.success("Video Permanently Deleted.");
        navigate("/admin/videos");
      }
    } catch (error) {
      alert.error("An error occurred while deleting the Video.");
      console.error("An error occurred:", error);
    } finally {
      setLoading(false);
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
            Video Detail: {loading2 ? "loading..." : video.title}
          </h1>
          <div>
            <Link
              to="/admin/videos"
              className="uppercase font-medium flex items-center justify-center gap-2 bg-[#330000]/20 dark:bg-[#330000]/20 hover:bg-[#330000]/20 dark:hover:bg-[#330000]/20 text-[#330000] rounded-xl px-6 py-3"
            >
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
                value={loading2 ? "loading..." : formData.title}
                onChange={handleInputChange}
                type="text"
                className="border-2 p-2 outline-none border-[#F4F2F2] w-full rounded-lg"
                placeholder="Enter Video Title"
                disabled={loading}
              />
            </div>
            <div className="my-2">
              <label
                htmlFor="description"
                className="uppercase text-sm text-black font-medium mb-0 tracking-wide"
              >
                Enter Video Description
              </label>
              <input
                id="description"
                name="description"
                value={loading2 ? "loading..." : formData.description}
                onChange={handleInputChange}
                type="text"
                className="border-2 p-2 outline-none border-[#F4F2F2] w-full rounded-lg"
                placeholder="Enter Video Description"
                disabled={loading}
              />
            </div>
            <div className="my-2">
              <label
                htmlFor="video_url"
                className="uppercase text-sm text-black font-medium mb-0 tracking-wide"
              >
                Enter Video URL
              </label>
              <input
                id="video_url"
                name="video_url"
                value={loading2 ? "loading..." : formData.video_url}
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
                value={loading2 ? "loading..." : formData.img1}
                onChange={handleInputChange}
                type="text"
                className="border-2 p-2 outline-none border-[#F4F2F2] w-full rounded-lg"
                placeholder="Enter Thumbnail Url"
                disabled={loading}
              />
            </div>
            <div className="my-2">
              <label
                htmlFor="course"
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
                <option value="">Select Product Course</option>
                {course.map((item, index) => (
                  <option value={item[1].course} key={index} selected={formData.course === item[1].title}
                  >
                    {item[1].title}
                  </option>
                ))}
              </select>
            </div>

            <div className="my-2">
              <label
                htmlFor="status"
                className="uppercase text-sm text-black font-medium mb-0 tracking-wide"
              >
                Select Video Status
              </label>
              <select
                className="border-2 p-2 outline-none border-[#F4F2F2] w-full rounded-lg"
                disabled={loading}
                value={formData.status}
                onChange={handleInputChange}
                name="status" // Ensure you have a name attribute
              >
                <option
                  value="active"
                  defaultValue={video.status === "active"}
                >
                  Active
                </option>
                <option
                  value="inactive"
                  defaultValue={video.status === "inactive"}
                >
                  Inactive
                </option>
              </select>
            </div>

            <div className="flex flex-col items-end justify-end gap-4 mt-6">
              <button
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
                UPDATE VIDEO
              </button>

              <button
                onClick={() => {
                  if (
                    window.confirm("Are you sure you wish to delete this item?")
                  )
                    handleDelete(video.slug);
                }}
                type="button" // Change to type="button" to prevent form submission
                className={`bg-red-500 text-md tracking-wide py-2 px-4 rounded-xl text-white font-medium flex justify-center items-center gap-2 ${
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
                  <CiTrash className="w-5 h-5" />
                )}
                DELETE VIDEO
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VideoDetail;
