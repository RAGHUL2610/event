import React from 'react'
import { Outlet ,Link} from 'react-router-dom';

export default function StaffLayout() {
  return (
    <div>
        <div>
            <nav>
                <ul>
                    <li>
                     <  Link to="/StaffHome">Home</Link>
                    </li>
                    <li> 
                        <Link to="/StaffHome/StaffAdd-Event">ADD </Link>
                    </li>
                    <li>
                        <Link to="/StaffHome/StaffView-Event">View</Link>
                    </li>

                </ul>
            </nav>
        </div>
    </div>
  )
}
