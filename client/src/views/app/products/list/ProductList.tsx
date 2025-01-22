import { useAppDispatch, useAppSelector } from '@/store'
import { getTenantProducts } from '@/store/slices/product/productSlice';
import { useEffect } from 'react'
import { Link } from 'react-router'

const ProductList = () => {

    const dispatch = useAppDispatch();
    const productList = useAppSelector(state => state.product.list);
    const tenant = useAppSelector(state => state.auth.user.tenant) as string;

    useEffect(() => {
        dispatch(getTenantProducts({ tenant }))
    }, [])

    return (
        <div>
            {productList.length ? JSON.stringify(productList) : null}
            <Link to={'/add-product'}>Add</Link>
        </div>
    )
}

export default ProductList