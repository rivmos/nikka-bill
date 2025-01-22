import { useAppDispatch, useAppSelector } from '@/store'
import { getTenantCustomers } from '@/store/slices/customer/customerSlice';
import { useEffect } from 'react'
import { Link } from 'react-router'

const CustomerList = () => {

    const dispatch = useAppDispatch();
    const customerList = useAppSelector(state => state.customer.list);
    const tenant = useAppSelector(state => state.auth.user.tenant) as string;

    useEffect(() => {
        dispatch(getTenantCustomers({ tenant }))
    }, [])

    return (
        <div>
            {customerList.length ? JSON.stringify(customerList) : null}
            <Link to={'/add-customer'}>Add</Link>
        </div>
    )
}

export default CustomerList