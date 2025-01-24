import { useAppDispatch, useAppSelector } from '@/store'
import { getTenantUsers } from '@/store'
import { useEffect } from 'react'
import { Link } from 'react-router'

const ProductList = () => {

    const dispatch = useAppDispatch();
    const userList = useAppSelector(state => state.user.list);
    const tenant = useAppSelector(state => state.auth.user.tenant) as string;

    useEffect(() => {
        dispatch(getTenantUsers({ tenant }))
    }, [])

    return (
        <div>
            {userList.length ? JSON.stringify(userList) : null}
            <Link to={'/sign-up/user'}>Add User</Link>
        </div>
    )
}

export default ProductList