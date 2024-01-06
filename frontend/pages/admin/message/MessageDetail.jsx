import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useCanister } from "@connect2ic/react";
import { CiCircleCheck, CiCircleChevLeft, CiTrash } from "react-icons/ci";
import { TailSpin } from "react-loader-spinner";

const MessageDetail = () => {
  const [backend] = useCanister("backend");
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(true);
  const [messages, setMessages] = useState([]);
  const navigate = useNavigate();
  const alert = useAlert();
  const param = useParams();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    read: "true",
  });

  const getMessage = async () => {
    try {
      setLoading2(true);

      const item = await backend.getContact(param.id);
      if (item.ok) {
        setFormData({
          name: item.ok.name,
          read: item.ok.read,
          message: item.ok.message,
          email: item.ok.email,
        });
        setMessages(item.ok);
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
      getMessage();
    }, 2000);

    return () => clearTimeout(timeoutId);
  }, [backend]);

  const validateForm = () => {
    if (!formData.name.trim()) {
      alert.error("Please enter Name");
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

      const res = await backend.updateContact(
        messages.id,
        formData.name,
        formData.read,
        formData.email,
        formData.message
      );

      console.log(res);
      if ("ok" in res) {
        alert.success("Message Updated Successfully");
        //getCategory()
      }
    } catch (error) {
      alert.error("An error occurred while creating the message.");
      console.error("An error occurred:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      setLoading(true);

      const res = await backend.deleteContact(id);

      console.log(res);
      if ("ok" in res) {
        alert.success("Message Permanently Deleted.");

        navigate("/admin/messages");
      }
    } catch (error) {
      alert.error("An error occurred while creating the message.");
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
            Message Detail : {loading2 ? "loading..." : messages.name}
          </h1>
          <div>
            <Link
              to="/admin/messages"
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
                Enter Name
              </label>
              <input
                id="name"
                name="name"
                value={loading2 ? "loading..." : formData.name}
                onChange={handleInputChange}
                type="text"
                className="border-2 p-2 outline-none border-[#F4F2F2] w-full rounded-lg"
                placeholder="Enter Name"
                disabled={loading}
                readOnly
              />
            </div>
            <div className="my-2">
              <label
                htmlFor="title"
                className="uppercase text-sm text-black font-medium mb-0 tracking-wide"
              >
                Enter Email
              </label>
              <input
                id="email"
                name="email"
                value={loading2 ? "loading..." : formData.email}
                onChange={handleInputChange}
                type="text"
                className="border-2 p-2 outline-none border-[#F4F2F2] w-full rounded-lg"
                placeholder="Enter Email"
                disabled={loading}
                readOnly
              />
            </div>
            <div className="my-2">
              <label
                htmlFor="title"
                className="uppercase text-sm text-black font-medium mb-0 tracking-wide"
              >
                Enter Message Detail
              </label>
              <textarea
                id="message"
                name="message"
                cols="30"
                rows="10"
                value={loading2 ? "loading..." : formData.message}
                onChange={handleInputChange}
                type="text"
                className="border-2 p-2 outline-none border-[#F4F2F2] w-full rounded-lg"
                placeholder="Enter Message Detail"
                disabled={loading}
                readOnly
              />
            </div>
          </form>
          <div className="flex flex-col items-end justify-end gap-4 mt-4">
            <button
              onClick={() => {
                if (
                  window.confirm("Are you sure you wish to delete this item?")
                )
                  handleDelete(messages.id);
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
              DELETE MESSAGE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageDetail;
