import React from 'react';
import { LoginButtons } from 'meteor/okgrow:accounts-ui-react';
import { Link } from 'react-router';

const MainLayout = ({children}) => {
    return (
        <div className='main-layout'>
            <header>
              <h1><Link to='/'>Voting</Link></h1>
              <LoginButtons />
              <nav>
                <Link to='/comments'>Comments</Link>
              </nav>
            </header>
            {children}
        </div>
        )
}

export default MainLayout;