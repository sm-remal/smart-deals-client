import React, { useContext, useEffect, useRef, useState } from 'react';
import { useLoaderData, Link } from 'react-router';
import { AuthContext } from '../../contexts/AuthContext';
import Swal from 'sweetalert2';

const ProductDetails = () => {
    const productDetails = useLoaderData();
    console.log(productDetails)
    const [bids, setBids] = useState([])
    const { _id: productId, seller_contact: contact, status, seller_image } = productDetails
    const bidModalRef = useRef(null)
    const { user } = useContext(AuthContext)

    // Format date
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        });
    };

    // Get status badge color
    const getStatusColor = (status) => {
        const lowerStatus = status?.toLowerCase();
        if (lowerStatus === 'in_sale') {
            return 'bg-yellow-500';
        } else if (lowerStatus === 'sold') {
            return 'bg-gray-400';
        } else if (lowerStatus === 'pending') {
            return 'bg-orange-400';
        } else {
            return 'bg-yellow-500';
        }
    };

    const handleBidModal = () => {
        bidModalRef.current.showModal()
    }

    useEffect(() => {
        fetch(`http://localhost:3000/products/bids/${productId}`)
            .then(res => res.json())
            .then(data => {
                setBids(data)
            })
    }, [productId])

    const handleBidSubmit = (e) => {
        const name = e.target.name.value;
        const email = e.target.email.value;
        const bid = e.target.bid.value;
        const contactNumber = e.target.phone.value;

        console.log(productId, name, email, bid)
        const newBid = {
            product: productId,
            buyer_name: name,
            buyer_email: email,
            bid_price: bid,
            buyer_contact: user?.phoneNumber || contactNumber || contact,
            buyer_image: user?.photoURL || seller_image,
            status: status,
        }

        fetch("http://localhost:3000/bids", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
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
                    const newBids = [...bids, newBid ]
                    newBids.sort((a, b) => b.bid_price - a.bid_price)
                    setBids(newBids)
                }
            })
    }
    console.log(user)
    return (
        <div className="min-h-screen bg-white py-8">
            <div className="max-w-7xl mx-auto px-4">
                {/* Main Product Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                    {/* Left Side - Image and Description */}
                    <div className="w-full">
                        {/* Product Image */}
                        <div className="bg-gray-200 rounded-lg overflow-hidden mb-8 w-full h-80">
                            <img
                                src={productDetails?.image || 'https://via.placeholder.com/400'}
                                alt={productDetails?.title || 'Product'}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    e.target.src = 'https://via.placeholder.com/400?text=No+Image';
                                }}
                            />
                        </div>

                        {/* Product Description */}
                        <div>
                            <h2 className="text-xl font-bold text-gray-900 mb-4">
                                Product Description
                            </h2>
                            <div className="space-y-3 mb-4">
                                <div className="flex gap-8">
                                    <div>
                                        <span className="font-semibold text-purple-600">Condition: </span>
                                        <span className="text-gray-900 capitalize font-semibold">
                                            {productDetails?.condition || 'N/A'}
                                        </span>
                                    </div>
                                    <div>
                                        <span className="font-semibold text-purple-600">Usage Time: </span>
                                        <span className="text-gray-900 font-semibold">
                                            {productDetails?.usage || 'N/A'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <p className="text-gray-500 text-sm leading-relaxed">
                                {productDetails?.description || 'No description available'}
                            </p>
                        </div>
                    </div>

                    {/* Right Side - Product Info */}
                    <div className="w-full">
                        {/* Back Button */}
                        <Link
                            to="/products"
                            className="inline-flex items-center text-gray-700 hover:text-gray-900 mb-4 text-sm"
                        >
                            <span className="mr-2">←</span>
                            <span>Back To Products</span>
                        </Link>

                        {/* Product Title */}
                        <h1 className="text-3xl font-bold text-gray-900 mb-3">
                            {productDetails?.title || 'Product Title'}
                        </h1>

                        {/* Category Badge */}
                        <span className="inline-block bg-purple-100 text-purple-700 px-3 py-1 rounded text-xs font-semibold mb-4">
                            {productDetails?.category || 'CATEGORY'}
                        </span>

                        {/* Price */}
                        <div className="mb-6">
                            <div className="text-3xl font-bold text-green-600">
                                ${productDetails?.price_min || 0} - {productDetails?.price_max || 0}
                            </div>
                            <div className="text-sm text-gray-500">
                                Price starts from
                            </div>
                        </div>

                        {/* Product Details */}
                        <div className="mb-6">
                            <h3 className="text-lg font-bold text-gray-900 mb-3">
                                Product Details
                            </h3>
                            <div className="space-y-2 text-sm">
                                <div>
                                    <span className="font-semibold text-gray-700">Product ID: </span>
                                    <span className="text-gray-600">{productDetails?._id || 'N/A'}</span>
                                </div>
                                <div>
                                    <span className="font-semibold text-gray-700">Posted: </span>
                                    <span className="text-gray-600">
                                        {productDetails?.created_at ? formatDate(productDetails.created_at) : 'N/A'}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Seller Information */}
                        <div className="mb-6">
                            <h3 className="text-lg font-bold text-gray-900 mb-3">
                                Seller Information
                            </h3>

                            {/* Seller Profile */}
                            <div className="flex items-center gap-3 mb-4">
                                <img
                                    src={productDetails?.seller_image || 'https://via.placeholder.com/50'}
                                    alt={productDetails?.seller_name || 'Seller'}
                                    className="w-12 h-12 rounded-full object-cover bg-gray-300"
                                    onError={(e) => {
                                        e.target.src = 'https://via.placeholder.com/50?text=U';
                                    }}
                                />
                                <div>
                                    <h4 className="font-bold text-gray-900">
                                        {productDetails?.seller_name || 'Unknown Seller'}
                                    </h4>
                                    <p className="text-xs text-gray-500">
                                        {productDetails?.email || 'No email'}
                                    </p>
                                </div>
                            </div>

                            {/* Seller Details */}
                            <div className="space-y-2 text-sm">
                                <div className="flex items-center">
                                    <span className="mr-2">📍</span>
                                    <span className="font-semibold text-gray-700">Location: </span>
                                    <span className="text-gray-600 ml-1">{productDetails?.location || 'N/A'}</span>
                                </div>
                                <div className="flex items-center">
                                    <span className="mr-2">📧</span>
                                    <span className="font-semibold text-gray-700">Contact: </span>
                                    <span className="text-gray-600 ml-1">{productDetails?.seller_contact || 'N/A'}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="mr-2">🏷️</span>
                                    <span className="font-semibold text-gray-700">Status: </span>
                                    <span className={`${getStatusColor(productDetails?.status)} text-white px-3 py-1 rounded text-xs font-semibold uppercase ml-1`}>
                                        {productDetails?.status || 'unknown'}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Buy Button */}
                        <button onClick={handleBidModal} className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded transition-colors">
                            I Want Buy This Product
                        </button>

                        {/* Open the modal using .showModal() */}

                        <dialog ref={bidModalRef} className="modal modal-bottom sm:modal-middle">
                            <div className="modal-box max-w-lg bg-white rounded-lg shadow-xl">
                                {/* Modal Header */}
                                <h3 className="font-bold text-2xl text-gray-900 mb-6 text-center">
                                    Give Seller Your Offered Price
                                </h3>

                                {/* Form */}
                                <form onSubmit={handleBidSubmit} method="dialog" className="space-y-4">
                                    {/* Buyer Name and Email - Side by Side */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Buyer Name
                                            </label>
                                            <input
                                                type="text"
                                                // placeholder="Your name"
                                                defaultValue={user?.displayName || ""}
                                                readOnly name='name'
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Buyer Email
                                            </label>
                                            <input
                                                type="email"
                                                // placeholder="Your Email"
                                                defaultValue={user?.email || ""}
                                                readOnly name='email'
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                            />
                                        </div>
                                    </div>

                                    {/* Buyer Image URL */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Buyer Image URL
                                        </label>
                                        <input
                                            readOnly
                                            type="url"
                                            defaultValue={user?.photoURL || seller_image} 
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                        />
                                    </div>

                                    {/* Place your Price */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Place your Bid
                                        </label>
                                        <input
                                            required
                                            type="text"
                                            placeholder="Place your bid" name='bid'
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                        />
                                    </div>

                                    {/* Contact Info */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Contact Info
                                        </label>
                                        <input
                                            required
                                            type="tel"
                                            placeholder="e.g. +01555-1234" name='phone'
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                        />
                                    </div>

                                    {/* Modal Actions */}
                                    <div className="flex justify-end gap-3 mt-6 pt-4">
                                        <button
                                            type="button"
                                            onClick={() => bidModalRef.current?.close()}
                                            className="px-6 py-2 border-2 border-purple-600 text-purple-600 font-semibold rounded-lg hover:bg-purple-50 transition-colors"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="px-6 py-2 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors"
                                        >
                                            Submit Bid
                                        </button>
                                    </div>
                                </form>
                            </div>

                            {/* Backdrop */}
                            <form method="dialog" className="modal-backdrop">
                                <button>close</button>
                            </form>
                        </dialog>

                    </div>
                </div>

                {/* Bids Section */}
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">
                        Bids For This Products: <span className="text-purple-600">{bids.length}</span>
                    </h2>

                    {/* Bids Table */}
                    <div className="bg-white rounded-lg overflow-hidden border border-gray-200">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="text-left py-3 px-4 font-semibold text-gray-700 text-sm">SL No</th>
                                    <th className="text-left py-3 px-4 font-semibold text-gray-700 text-sm">Product</th>
                                    <th className="text-left py-3 px-4 font-semibold text-gray-700 text-sm">Buyer Email</th>
                                    <th className="text-left py-3 px-4 font-semibold text-gray-700 text-sm">Bid Price</th>
                                    <th className="text-left py-3 px-4 font-semibold text-gray-700 text-sm">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bids.length > 0 ? (
                                    bids.map((bid, index) => (
                                        <tr key={bid._id} className="border-b border-gray-100 hover:bg-gray-50">
                                            <td className="py-4 px-4 text-sm text-gray-700">{index + 1}</td>
                                            <td className="py-4 px-4">
                                                <div className="flex items-center gap-3">
                                                    <img
                                                        src={bid.buyer_image || "https://via.placeholder.com/50"}
                                                        alt={bid.buyer_name}
                                                        className="w-12 h-12 rounded object-cover bg-gray-200"
                                                    />
                                                    <div>
                                                        <div className="font-semibold text-gray-900 text-sm">{bid.buyer_name}</div>
                                                        <div className="text-xs text-gray-500">{bid.buyer_contact}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-4 px-4">
                                                <div className="flex items-center gap-2">
                                                    <div>
                                                        <div className="font-semibold text-gray-900 text-sm">{bid.buyer_email}</div>
                                                        <div className="text-xs text-gray-500 capitalize">{bid.status}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-4 px-4 font-semibold text-gray-900 text-sm">
                                                ${bid.bid_price}
                                            </td>
                                            <td className="py-4 px-4">
                                                <div className="flex gap-2">
                                                    <button className="px-3 py-1 bg-green-100 text-green-700 rounded text-xs font-semibold hover:bg-green-200">
                                                        Accept
                                                    </button>
                                                    <button className="px-3 py-1 bg-red-100 text-red-700 rounded text-xs font-semibold hover:bg-red-200">
                                                        Reject
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="text-center py-6 text-gray-500">
                                            No bids yet for this product.
                                        </td>
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