import { Box } from 'lucide-react'
import React, { use } from 'react'
import { Button } from './ui/Button';
import { useOutletContext } from 'react-router';

const Navbar = () => {
    const { isSignedIn, username, signIn, signOut } = useOutletContext<AuthContext>();

    const handleAuthClick = async () => {
        if (isSignedIn) {
            try {
                await signOut();
            } catch (error) {
                console.error("Error signing out:", error);
            }
            return;
        } else {
            try {
                await signIn();
            } catch (error) {
                console.error("Error signing in:", error);
            }
            return;
        }
    };

  return (
    <header className='navbar'>
        <nav className='inner'>
            <div className='left'>
                <div className='brand'>
                    <Box className='logo' />
                    <span className='text'>3DRenderR</span>
                </div>
                <ul className='links'>
                    <a href='#' className=''>Product</a>
                    <a href='#' className=''>Pricing</a>
                    <a href='#' className=''>Community</a>
                    <a href='#' className=''>Enterprise</a>
                </ul>
            </div>

            <div className='actions'>
                {isSignedIn ? (
                    <>
                        <span className='greeting'>
                            {username ? `Hi, ${username}!` : "Sign in"}
                        </span>

                        <Button size='sm' onClick={handleAuthClick} className='btn'>
                            Log out
                        </Button>
                    </>
                ) : (
                    <>
                        <Button onClick={handleAuthClick} size='sm' variant='ghost'>Log In</Button>
                        <a href='#upload' className='cta'>Get Started</a>
                    </>
                )}
            </div>
        </nav>    
    </header>
  )
}

export default Navbar