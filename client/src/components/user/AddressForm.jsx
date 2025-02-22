import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosInstance";
import { useFetch } from "../../hooks/UseFetch";
import toast from "react-hot-toast";

const AddressForm = () => {
  const [addressList, setAddressList] = useState([]);
  const [address, setAddress] = useState({
    houseName: "",
    city: "",
    state: "",
    postalCode: "",
    mobile: "",
    landmark: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const [addressData] = useFetch("/address/get-address");

  useEffect(() => {
    if (addressData) {
      setAddressList(addressData);
    }
  }, [addressData]);

  const openModal = (addr = null) => {
    if (addr) {
      setAddress(addr);
      setIsEditing(true);
      setEditId(addr._id); // Ensure `_id` is stored for updates
    } else {
      setAddress({ houseName: "", city: "", state: "", postalCode: "", mobile: "", landmark: "" });
      setIsEditing(false);
      setEditId(null);
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await axiosInstance.put(`/address/update-address/${edit._Id}`, address);
        setAddressList((prev) =>
          prev.map((item) => (item._id === editId ? { ...item, ...address } : item))
        );
        toast.success("Address updated successfully!");
      } else {
        const { data } = await axiosInstance.post("/address/add-address", address);
        setAddressList((prev) => [...prev, data]);
        toast.success("Address added successfully!");
      }
      setIsModalOpen(false);
    } catch (error) {
      toast.error("Failed to save address.");
    }
  };

  const handleDelete = async (_id) => {
    try {
      await axiosInstance.delete(`/address/delete-address/${_id}`);
      setAddressList((prev) => prev.filter((item) => item._id !== _id));
      toast.success("Address deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete address.");
    }
  };

  return (
    <div className="w-full min-h-screen p-2">
      <div className="max-w-4xl bg-white p-6 rounded-lg shadow-xl border border-green-300">
        <button onClick={() => openModal()} className="bg-green-600 text-white p-2 rounded-md text-sm font-semibold mb-4 transition hover:bg-green-700">
          Add New Address
        </button>

        <div className="space-y-4">
          {addressList.map((addr) => (
            <div key={addr._id} className="bg-white rounded-lg shadow-md p-4 border border-green-300 flex flex-col md:flex-row items-start md:items-center text-sm">
              <div className="flex-1">
                <h2 className="text-md font-bold text-green-800">{addr.houseName}, {addr.city}, {addr.state}</h2>
                <p className="text-xs text-gray-500">Postal: {addr.postalCode} | Mobile: {addr.mobile}</p>
                <p className="text-xs text-gray-500">{addr.landmark && `Landmark: ${addr.landmark}`}</p>
              </div>
              <div className="flex space-x-2 mt-3 md:mt-0">
                
                <button onClick={() => handleDelete(addr._id)} className="bg-red-600 text-white p-1 rounded-md text-xs transition hover:bg-red-700">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-xl w-96 border border-green-300">
            <h2 className="text-xl font-semibold text-center text-green-800 mb-4">{isEditing ? "Edit Address" : "Add Address"}</h2>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input type="text" name="houseName" value={address.houseName} onChange={handleChange} placeholder="House Name" className="w-full p-2 border border-green-300 rounded-md" required />
              <input type="text" name="city" value={address.city} onChange={handleChange} placeholder="City" className="w-full p-2 border border-green-300 rounded-md" required />
              <input type="text" name="state" value={address.state} onChange={handleChange} placeholder="State" className="w-full p-2 border border-green-300 rounded-md" required />
              <input type="text" name="postalCode" value={address.postalCode} onChange={handleChange} placeholder="Postal Code" className="w-full p-2 border border-green-300 rounded-md" required />
              <input type="text" name="mobile" value={address.mobile} onChange={handleChange} placeholder="Mobile Number" className="w-full p-2 border border-green-300 rounded-md" required />
              <input type="text" name="landmark" value={address.landmark} onChange={handleChange} placeholder="Landmark (Optional)" className="w-full p-2 border border-green-300 rounded-md" />
              <div className="flex justify-between mt-4">
                <button type="button" onClick={closeModal} className="bg-gray-500 text-white px-3 py-1 rounded-md text-xs">Cancel</button>
                <button type="submit" className="bg-green-500 text-white px-3 py-1 rounded-md text-xs transition hover:bg-green-600">{isEditing ? "Update" : "Save"}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddressForm;
