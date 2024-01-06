import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useCanister } from "@connect2ic/react";
import { CiCircleCheck, CiCircleChevLeft, CiTrash } from "react-icons/ci";
import { TailSpin } from "react-loader-spinner";

const CourseDetail = () => {
  const [backend] = useCanister("backend");
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(true);
  const [course, setCourse] = useState([]); // Add state for email
  const navigate = useNavigate();
  const alert = useAlert();
  const param = useParams();

  const [formData, setFormData] = useState({
    title: "",
    status: "",
  });

  const getCourse = async () => {
    try {
      setLoading2(true);

      const item = await backend.getCourse(param.slug);
      if (item.ok) {
        setFormData({ title: item.ok.title, status: item.ok.status });
        setCourse(item.ok);
        console.log(item.ok);
      }
    } catch (error) {
      console.error("Error listing user:", error);
    } finally {
      setLoading2(false);
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      getCourse();
    }, 2000);

    return () => clearTimeout(timeoutId);
  }, [backend]);

  const validateForm = () => {
    if (!formData.title.trim()) {
      alert.error("Please enter Course title");
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

      const res = await backend.updateCourse(
        course.slug,
        formData.title,
        formData.status
      );

      console.log(res);
      if ("ok" in res) {
        alert.success("Course Updated Successfully");
        // getCategory()
      } else if ("error" in res && res.error.includes("already exists")) {
        alert.error(
          "Course with this title already exists. Please choose a different title."
        );
      }
    } catch (error) {
      alert.error("An error occurred while updating the course.");
      console.error("An error occurred:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (slug) => {
    try {
      setLoading(true);

      const res = await backend.deleteCourse(slug);

      console.log(res);
      if ("ok" in res) {
        alert.success("Course Permanently Deleted.");

        navigate("/admin/courses");
      }
    } catch (error) {
      alert.error("An error occurred while creating the Course.");
      console.error("An error occurred:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <div className="styled-scrollbar flex flex-col bg-white dark:bg-slate-800 rounded-2xl overflow-y-auto h-[calc(100vh-100px)] p-4">
        <div className="mb-5 flex justify-between items-center gap-2">
          <h1 className="uppercase text-xl font-semibold text-gray-900 dark:text-white">
            Course Detail : {loading2 ? "loading..." : course.title}
          </h1>
          <div>
            <Link
              to="/admin/courses"
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
                Enter Course Title
              </label>
              <input
                id="name"
                name="title"
                value={loading2 ? "loading..." : formData.title}
                onChange={handleInputChange}
                type="text"
                className="border-2 p-2 outline-none border-[#F4F2F2] w-full rounded-lg"
                placeholder="Enter Course Title"
                disabled={loading}
              />
            </div>

            <div className="my-2">
              <label
                htmlFor="title"
                className="uppercase text-sm text-black font-medium mb-0 tracking-wide"
              >
                Select Course Status
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
                  defaultValue={course.status === "active"}
                >
                  Active
                </option>
                <option
                  value="inactive"
                  defaultValue={course.status === "inactive"}
                >
                  Inactive
                </option>
              </select>
            </div>

            <div className="flex flex-col items-end justify-end gap-4 mt-6">
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
                UPDATE COURSE
              </button>
            </div>
          </form>
          <div className="flex flex-col items-end justify-end gap-4 mt-4">
            <button
              onClick={() => {
                if (
                  window.confirm("Are you sure you wish to delete this item?")
                )
                  handleDelete(course.slug);
              }}
              type="submit"
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
              DELETE COURSE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
