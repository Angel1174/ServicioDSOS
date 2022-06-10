import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
export const NavbarComponent = (props = {}) => {

    return (
        <div>
            <nav className="navbar navbar-dark bg-primary">
                <a className="nav-link" href="#"><span className="material-icons">
                    logout
                </span></a>

            </nav>
        </div>
    );
}


