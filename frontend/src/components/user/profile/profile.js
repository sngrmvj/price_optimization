import {Fragment, useEffect} from "react";
import {useCookies} from "react-cookie";
import {useNavigate} from "react-router-dom";


const Profile = () => {
    const navigate = useNavigate();
    const [cookie, setCookie] = useCookies(['is_user_authenticated', 'role']);

    useEffect(() => {
        if (cookie.hasOwnProperty("is_user_authenticated")) {
            if(cookie['is_user_authenticated'] === "true"){
                navigate("/login")
            }
        }
    })

    return (
        <Fragment>

            <div>
                {/*Todo - If you are non admin option to request for admin*/}
            </div>

            <div>
                <header>List of Users</header>
                {/*Todo - Table with users and their roles*/}
            </div>
        </Fragment>
    )
}

export default Profile;