// Import necessary dependencies
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext"; // Import authentication context
import Swal from "sweetalert2"; // For beautiful alert dialogs

const MyBids = () => {
  // Get the currently logged-in user from context
  const { user } = useContext(AuthContext);

  // Local state to store fetched bids
  const [bids, setBids] = useState([]);

  // ================== Fetch User's Bids ==================
  useEffect(() => {   
    // Only fetch if user email is available
    if (user?.email) {
      fetch(`http://localhost:3000/my-bids?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => setBids(data)) // Save bids in local state
        .catch((err) => console.error("Error fetching bids:", err));
    }
  }, [user?.email]);

  // ================== Handle Delete Bid ==================
  const handleDeleteBids = (id) => {

    // Confirmation alert before deleting
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {

        // Send DELETE request to server
        fetch(`http://localhost:3000/bids/${id}`, {
          method: "DELETE"
        })
          .then(res => res.json())
          .then(data => {
            if (data.deletedCount) {
              // Success alert
              Swal.fire({
                title: "Deleted!",
                text: "Your bid has been deleted.",
                icon: "success"
              });

              // Update UI: remove deleted bid from state
              const remainingBids = bids.filter(bid => bid._id !== id);
              setBids(remainingBids);
            }
          })
        }
    });
  }

  // ================== Render UI ==================
  return (
    <div className="bg-gray-50 min-h-screen py-10 px-4">
      <div className="max-w-6xl mx-auto bg-white shadow rounded-xl p-6">

        {/* Page Title */}
        <h2 className="text-3xl font-bold text-center mb-8">
          My Bids:{" "}
          <span className="text-transparent bg-clip-text bg-linear-to-r from-[#632EE3] to-[#9F62F2]">
            {bids.length}
          </span>
        </h2>

        {/* Bids Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead className="bg-gray-100 text-gray-700 uppercase text-sm">
              <tr>
                <th className="py-3 px-4 font-semibold">SL No</th>
                <th className="py-3 px-4 font-semibold">Product</th>
                <th className="py-3 px-4 font-semibold">Buyer</th>
                <th className="py-3 px-4 font-semibold">Bid Price</th>
                <th className="py-3 px-4 font-semibold">Status</th>
                <th className="py-3 px-4 font-semibold text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {/* If bids exist, show data */}
              {bids.length > 0 ? (
                bids.map((bid, index) => (

                  <tr
                    key={bid._id}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    {/* Serial Number */}
                    <td className="py-4 px-4 text-gray-700 text-sm">
                      {index + 1}
                    </td>

                    {console.log(bid)} {/* For debugging individual bid */}

                    {/* Product Info */}
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={
                            bid.product_image ||
                            "https://via.placeholder.com/50?text=Img"
                          }
                          alt={bid.product_name}
                          className="w-10 h-10 rounded object-cover bg-gray-200"
                        />
                        <div>
                          <p className="font-semibold text-gray-900 text-sm">
                            {bid.product_name || "Unknown Product"}
                          </p>
                          <p className="text-xs text-gray-500">
                            ${bid.product_price}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Buyer Info */}
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={
                            bid?.buyer_image ||
                            "https://via.placeholder.com/40?text=User"
                          }
                          alt={bid.buyer_name}
                          className="w-9 h-9 rounded-full object-cover bg-gray-100"
                        />
                        <div>
                          <p className="font-medium text-gray-900 text-sm">
                            {bid.buyer_name || "Unknown"}
                          </p>
                          <p className="text-xs text-gray-500">
                            {bid.buyer_email}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Bid Price */}
                    <td className="py-4 px-4 text-gray-700 font-semibold text-sm">
                      ${bid.bid_price}
                    </td>

                    {/* Status */}
                    <td className="py-4 px-4">
                      <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-semibold">
                        {bid.status || "Pending"}
                      </span>
                    </td>

                    {/* Actions (Delete Button) */}
                    <td className="py-4 px-4 text-center">
                      <button
                        onClick={() => handleDeleteBids(bid._id)}
                        className="px-3 py-1 border border-red-500 text-red-500 rounded text-xs font-semibold hover:bg-red-50"
                      >
                        Remove Bid
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                // Show message if no bids found
                <tr>
                  <td
                    colSpan="6"
                    className="text-center py-8 text-gray-500 text-sm"
                  >
                    No bids found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyBids;
