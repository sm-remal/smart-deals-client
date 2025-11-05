import React from "react";
import { ArrowLeft } from "lucide-react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
// import useAxios from "../../hooks/useAxios";

const CreateProduct = () => {

    // const axiosInstance = useAxios();
    const axiosSecure = useAxiosSecure()

    const handleCreateProduct = (event) => {
        event.preventDefault();

        const form = event.target;

        // collect all form values
        const title = form.title.value;
        const category = form.category.value;
        const price_min = form.price_min.value;
        const price_max = form.price_max.value;
        const condition = form.condition.value;
        const usage = form.usage_time.value;
        const image = form.product_img.value;
        const seller_name = form.seller_name.value;
        const seller_email = form.seller_email.value;
        const seller_contact = form.seller_contact.value;
        const seller_image = form.seller_img.value;
        const location = form.location.value;
        const description = form.description.value;

        // print to console
        const newProduct = {
            title,
            category,
            price_min,
            price_max,
            condition,
            usage,
            image,
            seller_name,
            seller_email,
            seller_contact,
            seller_image,
            location,
            description,
        };

        // axios.post(`http://localhost:3000/products`, newProduct)
        //     .then(data => {
        //         console.log(data.data)
        //         if (data.data.insertedId) {
        //             Swal.fire({
        //                 title: "Product Create Successful!",
        //                 icon: "success",
        //                 draggable: true
        //             });
        //         }
        //     })

        // ---------- use Custom hooks--------------
        
        axiosSecure.post("/products", newProduct)
        .then(data => {
            if(data.data.insertedId){
                Swal.fire({
                    title: "Product Create Successful !!",
                    icon: 'success',
                    draggable: true
                });
            }
        })
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4">
            {/* Back Link */}
            <div className="w-full max-w-2xl mb-6">
                <button className="flex items-center text-gray-600 hover:text-gray-900 transition">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    <span>Back To Products</span>
                </button>
            </div>

            {/* Form Container */}
            <div className="bg-white w-full max-w-2xl rounded-2xl shadow-md p-8">
                <h1 className="text-3xl font-semibold text-center mb-8">
                    Create <span className="text-purple-600">A Product</span>
                </h1>

                <form onSubmit={handleCreateProduct} className="space-y-6">
                    {/* Title & Category */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-gray-700 mb-1">Title</label>
                            <input
                                type="text"
                                name="title"
                                placeholder="e.g. Yamaha Fz Guitar for Sale"
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-1">Category</label>
                            <select
                                name="category"
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 outline-none"
                            >
                                <option value="">Select a Category</option>
                                <option value="Electronics">Electronics</option>
                                <option value="Vehicles">Vehicles</option>
                                <option value="Musical Instruments">Musical Instruments</option>
                                <option value="Furniture">Furniture</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                    </div>

                    {/* Price Range */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-gray-700 mb-1">
                                Min Price You want to Sale ($)
                            </label>
                            <input
                                type="number"
                                name="price_min"
                                placeholder="e.g. 18.5"
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-1">
                                Max Price You want to Sale ($)
                            </label>
                            <input
                                type="number"
                                name="price_max"
                                placeholder="Optional (default = Min Price)"
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 outline-none"
                            />
                        </div>
                    </div>

                    {/* Condition & Usage */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-gray-700 mb-1">Product Condition</label>
                            <div className="flex items-center gap-4">
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        name="condition"
                                        value="Brand New"
                                        className="text-purple-600"
                                        defaultChecked
                                    />
                                    <span className="ml-2">Brand New</span>
                                </label>
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        name="condition"
                                        value="Used"
                                        className="text-purple-600"
                                    />
                                    <span className="ml-2">Used</span>
                                </label>
                            </div>
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-1">Product Usage time</label>
                            <input
                                type="text"
                                name="usage_time"
                                placeholder="e.g. 1 year 3 month"
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 outline-none"
                            />
                        </div>
                    </div>

                    {/* Image URL */}
                    <div>
                        <label className="block text-gray-700 mb-1">Your Product Image URL</label>
                        <input
                            type="text"
                            name="product_img"
                            placeholder="https://..."
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 outline-none"
                        />
                    </div>

                    {/* Seller Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-gray-700 mb-1">Seller Name</label>
                            <input
                                type="text"
                                name="seller_name"
                                placeholder="e.g. Artisan Roasters"
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-1">Seller Email</label>
                            <input
                                type="email"
                                name="seller_email"
                                placeholder="e.g. leil31955@nrlord.com"
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 outline-none"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-gray-700 mb-1">Seller Contact</label>
                            <input
                                type="text"
                                name="seller_contact"
                                placeholder="e.g. +1-555-1234"
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-1">Seller Image URL</label>
                            <input
                                type="text"
                                name="seller_img"
                                placeholder="https://..."
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 outline-none"
                            />
                        </div>
                    </div>

                    {/* Location */}
                    <div>
                        <label className="block text-gray-700 mb-1">Location</label>
                        <input
                            type="text"
                            name="location"
                            placeholder="City, Country"
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 outline-none"
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-gray-700 mb-1">
                            Simple Description about your Product
                        </label>
                        <textarea
                            rows="3"
                            name="description"
                            placeholder="e.g. I bought this product 3 months ago..."
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 outline-none"
                        ></textarea>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white py-3 rounded-xl font-medium hover:opacity-90 transition"
                    >
                        Create A Product
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateProduct;
