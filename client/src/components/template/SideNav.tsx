import useAuth from '@/utils/hooks/useAuth';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Link } from 'react-router';

const SideNav = () => {
    const { signOut } = useAuth();
    return (
        <Sidebar>
            <Menu
                menuItemStyles={{
                    button: {
                        // the active class will be added automatically by react router
                        // so we can use it to style the active menu item
                        [`&.active`]: {
                            backgroundColor: '#13395e',
                            color: '#b6c8d9',
                        },
                    },
                }}
            >
                <MenuItem component={<Link to="/create-invoice" />}>Create Invoice</MenuItem>
                <MenuItem component={<Link to="/products-list" />}>Products</MenuItem>
                <MenuItem component={<Link to="/clients" />}>Clients</MenuItem>
                <MenuItem component={<Link to="/invoices" />}>Invoices</MenuItem>
                <MenuItem onClick={signOut}>Logout</MenuItem>
                {/* <MenuItem component={<Link to="/calendar" />}> Calendar</MenuItem>
                <MenuItem component={<Link to="/e-commerce" />}> E-commerce</MenuItem> */}
            </Menu>
        </Sidebar>
    )
}

export default SideNav