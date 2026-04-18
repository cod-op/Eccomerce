import React, { useState } from "react";
import { assets } from "../assets/assets";
import { toast } from "react-toastify";
import axios from "axios";
import { backendUrl } from "../App";

const Add = ({ token }) => {
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("Topwear");
  const [bestsellers, setBestsellers] = useState(false);
  const [sizes, setSizes] = useState([]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("bestsellers", bestsellers);

      formData.append("sizes", JSON.stringify(sizes));

      image1 && formData.append("image1", image1);
      image2 && formData.append("image2", image2);
      image3 && formData.append("image3", image3);
      image4 && formData.append("image4", image4);

      const response = await axios.post(
        backendUrl + "/api/product/add",
        formData,
        { headers: { token } },
      );

      //Reset form
      if (response.data.success) {
        toast.success(response.data.message);
        setName("");
        setDescription("");
        setPrice("");
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
        setSizes([]);
        setBestsellers(false);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col w-full items-start gap-3"
    >
      <div>
        <p className="mb-2">Upload Images</p>

        <div className="flex  gap-2">
          <label htmlFor="image1">
            <img
              src={!image1 ? assets.upload_area : URL.createObjectURL(image1)}
              alt=""
              className="w-20"
            />
            <input
              onChange={(e) => setImage1(e.target.files[0])}
              type="file"
              id="image1"
              hidden
            />
          </label>
          <label htmlFor="image2">
            <img
              src={!image2 ? assets.upload_area : URL.createObjectURL(image2)}
              alt=""
              className="w-20"
            />
            <input
              onChange={(e) => setImage2(e.target.files[0])}
              type="file"
              id="image2"
              hidden
            />
          </label>
          <label htmlFor="image3">
            <img
              src={!image3 ? assets.upload_area : URL.createObjectURL(image3)}
              alt=""
              className="w-20"
            />
            <input
              onChange={(e) => setImage3(e.target.files[0])}
              type="file"
              id="image3"
              hidden
            />
          </label>
          <label htmlFor="image4">
            <img
              src={!image4 ? assets.upload_area : URL.createObjectURL(image4)}
              alt=""
              className="w-20"
            />
            <input
              onChange={(e) => setImage4(e.target.files[0])}
              type="file"
              id="image4"
              hidden
            />
          </label>
        </div>
      </div>

      <div className="w-full">
        <p className="mb-2">Product name</p>
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          type="text"
          placeholder="Type here"
          required
          className="border-2 border-gray-500 w-full max-w-[500px] px-3 py-2  outline-none"
        />
      </div>

      <div className="w-full">
        <p className="mb-2">Product description</p>
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          type="textarea"
          placeholder="Write content here"
          required
          className="border-2 border-gray-500 w-full max-w-[500px] px-3 py-2  outline-none"
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
        <div>
          <p className="mb-2">Product Category</p>
          <select
            onChange={(e) => setCategory(e.target.value)}
            value={category}
            className="w-full border border-gray-400 px-3 py-2 outline-none"
          >
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>

        <div>
          <p className="mb-2">Sub Category</p>
          <select
            onChange={(e) => setSubCategory(e.target.value)}
            value={subCategory}
            className="w-full border border-gray-400 px-3 py-2 outline-none"
          >
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
          </select>
        </div>

        <div>
          <p className="mb-2">Product Price</p>
          <input
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            type="Number"
            placeholder="25"
            className=" w-full border border-gray-400 px-3 py-2 sm:max-w-[130px] outline-none"
          />
        </div>
      </div>

      <div>
          <p className="mb-2">Product Sizes</p>
            <div className="flex gap-3">
              {["S", "M", "L", "XL", "XXL"].map((item) => (
                <div key={item} onClick={() =>
                  setSizes((prev) => prev.includes(item)? prev.filter((i) => i !== item): [...prev, item],)}><p className={`${sizes.includes(item) ? "bg-pink-100 border border-pink-400" : "bg-slate-200"} px-3 py-1 cursor-pointer transition-all`}>{item}</p>
                </div>
                ))}
             </div>
      </div>

      <div className="flex gap-2 mt-2">
        <input
          onChange={() => setBestsellers((prev) => !prev)}
          checked={bestsellers}
          type="checkbox"
          id="bestsellers"
        />
        <label htmlFor="bestsellers" className="cursor-pointer">
          Add to bestseller
        </label>
      </div>

      <button type="submit" className="w-28 px-3 py-2 mt-4 bg-black text-white">
        ADD
      </button>
    </form>
  );
};

export default Add;
