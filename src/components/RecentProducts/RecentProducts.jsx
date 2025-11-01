// import React, { use } from 'react';
// import { Link } from 'react-router';

// const RecentProducts = ({ latestProductsPromise }) => {
//   const recentProducts = use(latestProductsPromise);
//   console.log(recentProducts);

//   return (
//     <div className="my-10">
//       <h2 className="text-lg lg:text-xl font-bold text-center mb-6">
//         Recent <span className="bg-linear-to-r from-[#632EE3] to-[#9F62F2] bg-clip-text text-transparent">Products</span>
//       </h2>

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//         {recentProducts?.map((product) => (
//           <div
//             key={product._id}
//             className="w-full bg-white rounded-2xl shadow-md p-3 hover:shadow-lg transition"
//           >
//             <div className="rounded-xl overflow-hidden">
//               <img
//                 src={product.image}
//                 alt={product.title}
//                 className="w-full h-48 object-cover"
//               />
//             </div>

//             <div className="mt-3">
//               <h2 className="text-base font-semibold text-gray-800">
//                 {product.title} - [ {product.usage || product.condition} ]
//               </h2>

//               <p className="bg-linear-to-r from-[#632EE3] to-[#9F62F2] bg-clip-text text-transparent font-semibold mt-1">
//                 ${product.price_min} - {product.price_max}
//               </p>
//             </div>

//             <Link to={`/product-details/${product?._id}`}>
//             <button className="mt-4 w-full border border-purple-400 text-purple-500 py-2 rounded-xl hover:bg-purple-500 hover:text-white transition">
//               View Details
//             </button>
//             </Link>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default RecentProducts;


import React, { use } from 'react';
import { Link } from 'react-router';

const RecentProducts = ({ latestProductsPromise }) => {
  const recentProducts = use(latestProductsPromise);

  return (
    <div className="my-10 px-4">
      <h2 className="text-lg lg:text-2xl font-bold text-center mb-8">
        Recent{' '}
        <span className="bg-gradient-to-r from-[#632EE3] to-[#9F62F2] bg-clip-text text-transparent">
          Products
        </span>
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {recentProducts?.map((product) => (
          <div
            key={product._id}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-transform duration-700 transform hover:-translate-y-2"
          >
            <div className="relative rounded-xl overflow-hidden group">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-56 object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
              />
            </div>

            <div className="p-4">
              <h2 className="text-base font-semibold text-gray-800">
                {product.title} - [ {product.usage || product.condition} ]
              </h2>

              <p className="bg-gradient-to-r from-[#632EE3] to-[#9F62F2] bg-clip-text text-transparent font-semibold mt-2 text-lg">
                ${product.price_min} - {product.price_max}
              </p>

              <Link to={`/product-details/${product?._id}`}>
                <button className="mt-4 w-full border border-purple-400 text-purple-500 py-2 rounded-xl hover:bg-purple-500 hover:text-white transition-colors duration-500">
                  View Details
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentProducts;
