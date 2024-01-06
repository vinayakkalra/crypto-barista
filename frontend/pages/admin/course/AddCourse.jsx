import React, { useState } from "react";
import { useAlert } from "react-alert";
import { Link } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";
import { useCanister } from "@connect2ic/react";
import { HiArrowDownLeft } from "react-icons/hi2";
import { CiCircleCheck, CiCircleChevLeft } from "react-icons/ci";
import { TailSpin } from "react-loader-spinner";

const AddCourse = () => {
  const [backend] = useCanister("backend");
  const [loading, setLoading] = useState(false);

  const alert = useAlert();

  const [formData, setFormData] = useState({
    name: "",
    status: "active",
  });

  const validateForm = () => {
    if (!formData.name.trim()) {
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

      const res = await backend.createCourse(formData.name, formData.status);

      console.log(res);
      if ("ok" in res) {
        alert.success("Course Added Successfully");
        setFormData({ name: "" });
      } else if ("error" in res && res.error.includes("already exists")) {
        alert.error(
          "Course with this name already exists. Please choose a different name."
        );
      }
    } catch (error) {
      alert.error("An error occurred while creating the course.");
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
            Create Course
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
                Course Title
              </label>
              <input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                type="text"
                className="border-2 p-2 outline-none border-[#F4F2F2] w-full rounded-lg"
                placeholder="Enter Course Title"
                disabled={loading}
              />
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
                SUBMIT COURSE
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCourse;
