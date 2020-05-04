import React from 'react'
import { Layout} from 'antd';
import './Navbar.scss'
const { Header } = Layout;


const Navbar: React.FC = () => {
    return <Header className="Navbar__header">
        <b>MUC-TodoList-App</b>
    </Header>
}

export default Navbar
