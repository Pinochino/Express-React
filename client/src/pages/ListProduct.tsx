import axios from "axios";
import { useEffect, useState } from "react";

function ListProduct() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get()
        .then(res => {
            setProducts(res)
            setLoading(false);
        })
        .catch(err => {
            setLoading(false)
            setError(err);
        })
    }, [])

    if (loading) {
        return (
            <h3>The website have been loading</h3>
        )
    }
    if (error) {
        return (
            <h3>The website have {error}</h3>
        )
    }
    // return (
    //     {products.map((product, index) => (
    //         <h3 key={index}></h3>
    //     ))}
    //  );
}

export default ListProduct;