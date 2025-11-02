import React, { useContext, useEffect, useRef, useState } from 'react';
import { useLoaderData, Link } from 'react-router';
import { AuthContext } from '../../contexts/AuthContext';
import Swal from 'sweetalert2';

const ProductDetails = () => {
    const productDetails = useLoaderData();
    const [bids, setBids] = useState([]);
    const { _id: productId, seller_contact: contact, status, seller_image, image, title, price_max } = productDetails;
    const bidModalRef = useRef(null);
    const { user } = useContext(AuthContext);

    // Determine status badge color
    const getStatusColor = (status) => {
        const lowerStatus = status?.toLowerCase();
        if (lowerStatus === 'in_sale') return 'bg-yellow-500';
        if (lowerStatus === 'sold') return 'bg-gray-400';
        if (lowerStatus === 'pending') return 'bg-orange-400';
        return 'bg-yellow-500';
    };

    const handleBidModal = () => bidModalRef.current.showModal();

    useEffect(() => {
        fetch(`http://localhost:3000/products/bids/${productId}`)
            .then(res => res.json())
            .then(data => setBids(data));
    }, [productId]);

    const handleBidSubmit = (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const bid = e.target.bid.value;
        const contactNumber = e.target.phone.value;

        const newBid = {
            product: productId,
            product_image: image,
            product_name: title,
            product_price: price_max,
            buyer_name: name,
            buyer_email: email,
            bid_price: bid,
            buyer_contact: user?.phoneNumber || contactNumber || contact || "N/A",
            buyer_image: user?.photoURL || seller_image,
            status: status || "pending",
        };

        fetch("http://localhost:3000/bids", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newBid),
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    Swal.fire({
                        position: "top-center",
                        icon: "success",
                        title: "Your Bid has been placed",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    newBid._id = data.insertedId;
                    const newBids = [...bids, newBid].sort((a, b) => b.bid_price - a.bid_price);
                    setBids(newBids);
                }
            });
    };

    return (
        <div className="min-h-screen bg-white py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">

                {/* Main Product Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">

                    {/* Left Section - Image + Description */}
                    <div className="w-full">
                        {/* Product Image */}
                        <div className="bg-gray-200 rounded-lg overflow-hidden mb-6 w-full h-64 sm:h-72 md:h-80 lg:h-96">
                            <img
                                src={image || 'https://via.placeholder.com/400'}
                                alt={title || 'Product'}
                                className="w-full h-full object-cover"
                                onError={(e) => { e.target.src = 'https://via.placeholder.com/400?text=No+Image'; }}
                            />
                        </div>

                        {/* Product Description */}
                        <div>
                            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">Product Description</h2>
                            <div className="space-y-3 mb-4">
                                <div className="flex flex-wrap gap-6 text-sm sm:text-base">
                                    <div>
                                        <span className="font-semibold text-purple-600">Condition: </span>
                                        <span className="font-semibold text-gray-900 capitalize">
                                            {productDetails?.condition || 'N/A'}
                                        </span>
                                    </div>
                                    <div>
                                        <span className="font-semibold text-purple-600">Usage Time: </span>
                                        <span className="font-semibold text-gray-900">
                                            {productDetails?.usage || 'N/A'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
                                {productDetails?.description || 'No description available'}
                            </p>
                        </div>
                    </div>

                    {/* Right Section - Product Info */}
                    <div className="w-full">
                        <Link to="/products" className="inline-flex items-center text-gray-700 hover:text-gray-900 mb-4 text-sm sm:text-base">
                            <span className="mr-2">←</span>Back To Products
                        </Link>

                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">{title || 'Product Title'}</h1>

                        <span className="inline-block bg-purple-100 text-purple-700 px-3 py-1 rounded text-xs sm:text-sm font-semibold mb-4">
                            {productDetails?.category || 'CATEGORY'}
                        </span>

                        <div className="mb-6">
                            <div className="text-2xl sm:text-3xl font-bold text-green-600">
                                ${productDetails?.price_min || 0} - {price_max || 0}
                            </div>
                            <p className="text-sm text-gray-500">Price starts from</p>
                        </div>

                        {/* Seller Info */}
                        <div className="mb-6">
                            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">Seller Information</h3>
                            <div className="flex items-center gap-3 mb-4">
                                <img
                                    src={seller_image || 'https://via.placeholder.com/50'}
                                    alt="Seller"
                                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover bg-gray-300"
                                    onError={(e) => { e.target.src = 'https://via.placeholder.com/50?text=U'; }}
                                />
                                <div>
                                    <h4 className="font-bold text-gray-900 text-sm sm:text-base">{productDetails?.seller_name || 'Unknown Seller'}</h4>
                                    <p className="text-xs sm:text-sm text-gray-500">{productDetails?.email || 'No email'}</p>
                                </div>
                            </div>

                            <div className="space-y-2 text-sm sm:text-base">
                                <p><strong>📍 Location:</strong> {productDetails?.location || 'N/A'}</p>
                                <p><strong>📧 Contact:</strong> {contact || 'N/A'}</p>
                                <p className="flex items-center gap-2">
                                    <strong>🏷️ Status:</strong>
                                    <span className={`${getStatusColor(status)} text-white px-3 py-1 rounded text-xs sm:text-sm font-semibold uppercase`}>
                                        {status || 'Unknown'}
                                    </span>
                                </p>
                            </div>
                        </div>

                        {/* Bid Button */}
                        <button
                            onClick={handleBidModal}
                            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded transition-colors text-sm sm:text-base"
                        >
                            I Want Buy This Product
                        </button>

                        {/* Modal */}
                        <dialog ref={bidModalRef} className="modal modal-bottom sm:modal-middle">
                            <div className="modal-box w-full max-w-md sm:max-w-lg bg-white rounded-lg shadow-xl">
                                <h3 className="font-bold text-xl sm:text-2xl text-gray-900 mb-6 text-center">Give Seller Your Offered Price</h3>
                                <form onSubmit={handleBidSubmit} method="dialog" className="space-y-4">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Buyer Name</label>
                                            <input readOnly defaultValue={user?.displayName || ""} name="name" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Buyer Email</label>
                                            <input readOnly defaultValue={user?.email || ""} name="email" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500" />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Buyer Image URL</label>
                                        <input readOnly defaultValue={user?.photoURL || seller_image} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500" />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Place your Bid</label>
                                        <input required placeholder="Place your bid" name="bid" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500" />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Contact Info</label>
                                        <input required placeholder="e.g. +01555-1234" name="phone" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500" />
                                    </div>

                                    <div className="flex flex-col sm:flex-row justify-end gap-3 mt-6">
                                        <button type="button" onClick={() => bidModalRef.current?.close()} className="px-5 py-2 border-2 border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50">
                                            Cancel
                                        </button>
                                        <button type="submit" className="px-5 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
                                            Submit Bid
                                        </button>
                                    </div>
                                </form>
                            </div>
                            <form method="dialog" className="modal-backdrop">
                                <button>close</button>
                            </form>
                        </dialog>
                    </div>
                </div>

                {/* Bids Table */}
                <div className="overflow-x-auto">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">
                        Bids For This Product: <span className="text-purple-600">{bids.length}</span>
                    </h2>
                    <div className="bg-white rounded-lg overflow-hidden border border-gray-200">
                        <table className="w-full text-sm sm:text-base">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="py-3 px-4">SL</th>
                                    <th className="py-3 px-4">Buyer Name</th>
                                    <th className="py-3 px-4">Buyer Email</th>
                                    <th className="py-3 px-4">Bid Price</th>
                                    <th className="py-3 px-4">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bids.length > 0 ? bids.map((bid, index) => (
                                    <tr key={bid._id} className="border-b hover:bg-gray-50">
                                        <td className="py-3 px-4">{index + 1}</td>
                                        <td className="py-3 px-4">
                                            <div className="flex items-center gap-2 sm:gap-3">
                                                <img src={bid.buyer_image || "https://via.placeholder.com/40"} alt={bid.buyer_name} className="w-8 h-8 sm:w-10 sm:h-10 rounded object-cover" />
                                                <div>
                                                    <p className="font-semibold">{bid.buyer_name}</p>
                                                    <p className="text-xs sm:text-sm text-gray-500">{bid.buyer_contact}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-3 px-4">
                                            <p className="font-semibold">{bid.buyer_email}</p>
                                            <p className="text-xs text-gray-500 capitalize">{bid.status}</p>
                                        </td>
                                        <td className="py-3 px-4 font-semibold">${bid.bid_price}</td>
                                        <td className="py-3 px-4">
                                            <div className="flex gap-2">
                                                <button className="px-2 sm:px-3 py-1 bg-green-100 text-green-700 rounded text-xs sm:text-sm font-semibold hover:bg-green-200">
                                                    Accept
                                                </button>
                                                <button className="px-2 sm:px-3 py-1 bg-red-100 text-red-700 rounded text-xs sm:text-sm font-semibold hover:bg-red-200">
                                                    Reject
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan="5" className="text-center py-6 text-gray-500">No bids yet for this product.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
