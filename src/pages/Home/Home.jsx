import React from 'react';
import RecentProducts from '../../components/RecentProducts/RecentProducts';

const latestProductsPromise = fetch("http://localhost:3000/latest-products")
.then(res => res.json());

const Home = () => {
    return (
        <div>
            <RecentProducts latestProductsPromise={latestProductsPromise}></RecentProducts>
        </div>
    );
};

export default Home;