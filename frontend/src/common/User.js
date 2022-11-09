import React from 'react'
import "./styles/User.css"
function User({ name }) {
    return (
        <div className="row border justify-content-center align-items-center p-2 userListCard">
            <div className="col-3"><img src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=400&q=60" alt="user" style={{ width: "60px", borderRadius: "50px" }} /></div>
            <div className="col-9 d-flex justify-content-center flex-column">
                <div className="row"><strong>{name}</strong></div>
                <div className="row text-secondary"><strong>Last Message</strong></div>
            </div>
        </div>

    )
}

export default User;