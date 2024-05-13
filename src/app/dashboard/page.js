'use client'

import '../style/dashboard.css'

import InstagramPostcard from '../component/page'
import Header from '../header/page'
import SideBar from '../sideBar/page'
import FriendReq from '../friendRequest/page'

import { useRouter } from 'next/navigation'

function Dashboard() {

    const router = useRouter()

    return (
        <div className="main_dashboard_div">
            <div className='dashboard_left_div'>
                <SideBar />
            </div>
            <div className='dashboard_center_div'>
                <Header />
                <InstagramPostcard />
            </div>
            <div className='dashboard_right_div'>
                <FriendReq/>


            </div>
        </div>
    )
}

export default Dashboard