import React, { useState } from "react";
import { useAlert } from "react-alert";
const Setting = () => {
  const alert = useAlert();
  const [formData, setFormData] = useState({
    title: "",
  });

  // Placeholder for handleChange function
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Placeholder for handleSubmit function
  const handleSubmit = (e) => {
    e.preventDefault();
    // Placeholder for form submission logic
    console.log("Form submitted:", formData);
    alert.success("Setting Updated Successfully");
  };

  return (
    <div className="styled-scrollbar flex flex-col bg-white dark:bg-slate-800 rounded-2xl overflow-y-auto h-[calc(100vh-100px)] p-4">
      <div className="">
        <div className="mb-5 flex justify-between items-center">
          <h1 className="uppercase text-xl font-semibold text-gray-900 dark:text-white">
            Setting
          </h1>
        </div>
        <div className="w-full">
          <form onSubmit={handleSubmit}>
            <div className="my-2">
              <label htmlFor="">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde
                quisquam quidem nihil suscipit recusandae. Voluptates est
                consectetur, deserunt atque velit quidem ipsam facere facilis
                asperiores dolorem. Vel repellendus at repellat, ipsam, ad
                nesciunt ab, recusandae dolores eveniet aliquid magni earum.
                Dolorem dolores, cum quos quas autem culpa aliquid velit
                assumenda.
              </label>
              <input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                type="text"
                className="border-2 mt-6 my-1 p-2 outline-none border-gray-400 w-full rounded-md"
                placeholder="Title"
              />
            </div>

            <div className="flex justify-end mt-10">
              <button
                type="submit"
                className="bg-gray-800 p-2 rounded-sm text-white"
              >
                SUBMIT PUBLIC KEY
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Setting;
