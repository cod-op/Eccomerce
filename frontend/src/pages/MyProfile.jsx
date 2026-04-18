import React, { useContext, useState, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const MyProfile = () => {
  const { token, backendUrl } = useContext(ShopContext);
  const [userData, setUserData] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  const loadUserProfileData = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/user/get-profile", {
        headers: { token },
      });
      if (response.data.success) {
        setUserData(response.data.user);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const updateUserProfileData = async () => {
    try {
      const response = await axios.post(
        backendUrl + "/api/user/update-profile",
        userData,
        { headers: { token } },
      );
      if (response.data.success) {
        toast.success(response.data.message);
        setIsEdit(false);
        await loadUserProfileData();
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) loadUserProfileData();
  }, [token]);

  if (!userData)
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        {" "}
        <div className="animate-pulse text-gray-500 font-medium">
          Loading Profile...
        </div>{" "}
      </div>
    );

  return (
    <div className="w-full min-h-[80vh] flex flex-col items-center py-5 px-4">
      {/* Main Card Container */}
      <div className="w-full max-w-2xl bg-white border border-gray-100 shadow-[0px_4px_20px_rgba(0,0,0,0.05)] rounded-2xl p-6 sm:p-12 transition-all duration-300">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row items-center gap-6 mb-8">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-tr from-gray-800 to-gray-600 text-white flex items-center justify-center text-4xl font-bold shadow-inner uppercase border-4 border-white">
            {userData.name ? userData.name.charAt(0) : "U"}
          </div>
          <div className="text-center sm:text-left">
            {isEdit ? (
              <input
                className="bg-gray-50 text-2xl font-semibold border-b-2 border-black outline-none px-2 py-1"
                type="text"
                value={userData.name}
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, name: e.target.value }))
                }
              />
            ) : (
              <h1 className="text-2xl  sm:text-3xl font-bold text-gray-800 uppercase tracking-tight">
                {userData.name}
              </h1>
            )}
            <p className="text-gray-400 text-sm mt-1">
              Customer ID: {userData._id.slice(-6)}
            </p>
          </div>
        </div>

        <hr className="border-gray-800 mb-8 w-[90%] sm:w-full mx-auto" />

        <div className="gap-y-8">
          <section>
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-[2px] mb-4">
              Contact Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-[140px_1fr] gap-4 text-gray-700">
              <p className="font-medium text-gray-500">Email Address</p>
              <p className="text-gray-900 break-all">{userData.email}</p>

              <p className="font-medium text-gray-500">Phone Number</p>
              {isEdit ? (
                <input
                  className="bg-gray-50 border border-gray-200 px-3 py-2 rounded-lg outline-none focus:border-black transition-colors"
                  type="text"
                  value={userData.phone || ""}
                  onChange={(e) =>
                    setUserData((prev) => ({ ...prev, phone: e.target.value }))
                  }
                />
              ) : (
                <p className="text-gray-900">
                  {userData.phone || "Not provided"}
                </p>
              )}
            </div>
          </section>

          {/* Address Section */}
          <section>
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-[2px] mb-4 mt-5">
              Shipping Address
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-[140px_1fr] gap-4">
              <p className="font-medium text-gray-500">Address</p>
              {isEdit ? (
                <div className="flex flex-col gap-3">
                  <input
                    className="bg-gray-50 border border-gray-200 px-3 py-2 rounded-lg outline-none focus:border-black transition-colors"
                    value={userData.address?.line1 || ""}
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        address: { ...prev.address, line1: e.target.value },
                      }))
                    }
                    type="text"
                    placeholder="Street / Landmark"
                  />
                  <input
                    className="bg-gray-50 border border-gray-200 px-3 py-2 rounded-lg outline-none focus:border-black transition-colors"
                    value={userData.address?.line2 || ""}
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        address: { ...prev.address, line2: e.target.value },
                      }))
                    }
                    type="text"
                    placeholder="City, State, Zip"
                  />
                </div>
              ) : (
                <div className="text-gray-900 leading-relaxed bg-gray-50 p-4 rounded-xl border border-gray-100">
                  {userData.address?.line1 || "No street address saved"} <br />
                  {userData.address?.line2 || "No city/state details"}
                </div>
              )}
            </div>
          </section>
        </div>

        {/* Footer Actions */}
        <div className="mt-12 pt-6 border-t border-gray-50 flex justify-center">
          {isEdit ? (
            <div className="flex  md:flex-row flex-col gap-y-10 w-full justify-between sm:w-auto   md:gap-15">
              <button
                className="flex-1 sm:flex-none border border-gray-200 px-5 py-2 rounded-full hover:bg-gray-50 transition-all text-gray-600 font-medium"
                onClick={() => setIsEdit(false)}
              >
                Cancel
              </button>
              <button
                className="flex-1 sm:flex-none bg-black text-white px-5 py-2 rounded-full active:scale-95 transition-all shadow-lg shadow-gray-200 font-medium"
                onClick={updateUserProfileData}
              >
                Save Changes
              </button>
            </div>
          ) : (
            <button
              className="w-full sm:w-auto border-2 border-black px-10 py-3 rounded-full hover:bg-black hover:text-white transition-all duration-300 font-bold uppercase tracking-widest text-xs"
              onClick={() => setIsEdit(true)}
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
