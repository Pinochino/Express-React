import axios from "axios";
import { useEffect, useState } from "react";

function ListProduct() {
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        axios.get('')
            .then(res => {
                setProducts(res.data)
                setLoading(false);
            })
            .catch(error => {
                setLoading(false)
                setError(error.message || error.response?.data?.message || 'An unknown error occurred');
            })
    }, [])

    if (loading) {
        return (
            <h3>The website have been loading</h3>
        )
    }
    if (error) {
        return (
            <div>{error && (<h1>This website have {error}</h1>)}</div>
        )
    }
    // return (
    //     {products.map((product, index) => (
    //         <h3 key={index}></h3>
    //     ))}
    //  );
}

export default ListProduct;