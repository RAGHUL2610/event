import { Outlet, Link } from "react-router-dom";
import "./Layout.css"


const Layout = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/AdminHome">Home</Link>
          </li>
          <li>
            <Link to="/AdminHome/view-event">View</Link>
          </li>
          <li>
            <Link to="/AdminHome/add-event">Add</Link>
          </li>
          
        </ul>
      </nav>

    </>
  )
};

export default Layout;