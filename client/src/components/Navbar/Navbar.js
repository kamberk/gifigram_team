import React, { useState, useEffect } from 'react';
import { AppBar, Typography, Toolbar, Avatar, Button } from '@material-ui/core';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';
import Hidden from '@material-ui/core/Hidden';
import memories from '../../images/gif.png';
import * as actionType from '../../constants/actionTypes';
import useStyles from './styles';
import IconButton from '@material-ui/core/IconButton';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SearchIcon from '@material-ui/icons/Search';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import Collapsible from 'react-collapsible';
import MenuIcon from '@material-ui/icons/Menu';


const Navbar = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch();
    const location = useLocation();
    const history = useHistory();
    const classes = useStyles();

    const logout = () => {
        dispatch({ type: actionType.LOGOUT });

        history.push('/auth');

        setUser(null);
    };

    useEffect(() => {
        const token = user?.token;

        if (token) {
            const decodedToken = decode(token);

            if (decodedToken.exp * 1000 < new Date().getTime()) logout();
        }

        setUser(JSON.parse(localStorage.getItem('profile')));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location]);

    const url = "/";

    return (
        <div>
            <AppBar className={classes.appBar} position="static" color="inherit">
                <div className={classes.brandContainer}>
                    <Hidden only={['xs']}>
                        <Typography component={Link} to="/" className={classes.heading} variant="h2" align="center">Gifigram</Typography>
                    </Hidden>
                    <a href={url}>
                        <img className={classes.image} src={memories} alt="icon" height="60" />
                    </a>
                    <Hidden only={['lg', 'md']} >
                    {user?.result ? (
                            <Collapsible className={classes.pravac} trigger={<MenuIcon className={classes.ikonica} />}>
                                <p style={{ marginLeft: '20px' }}>
                                    <IconButton size="small" component={Link} to="/profile" aria-label="profile" className={classes.deleteIcon2} color="primary" >
                                        <AccountCircleIcon /> Profile
                                </IconButton>
                                </p>
                                <p style={{ marginLeft: '20px' }}>
                                    <IconButton size="small" component={Link} to="/search" color="primary" >
                                        <SearchIcon /> Search...
                                </IconButton>
                                </p>
                                <p style={{ marginLeft: '20px' }}>
                                    <IconButton size="small" component={Link} to="/upload" color="primary" >
                                        <AddAPhotoIcon /> Post a Gif
                                </IconButton>
                                </p>
                                <p style={{ marginLeft: '20px' }}>
                                    <Button variant="contained" color="secondary" onClick={logout}>Logout</Button>
                                </p>
                            </Collapsible>
                    ) : (
                            <Button style={{ marginLeft: '50px' }} component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
                            )}
                            </Hidden>

                </div>
                <Hidden only={['xs', 'sm']}>
                    <Toolbar className={classes.toolbar}>
                        {user?.result ? (
                            <div className={classes.profile}>
                                <Hidden only={['xs', 'sm']}>
                                    <IconButton size="small" component={Link} to="/profile" aria-label="profile" className={classes.deleteIcon2} color="primary" >
                                        <AccountCircleIcon />
                                    </IconButton>
                                    <IconButton size="small" component={Link} to="/search" color="primary" >
                                        <SearchIcon />
                                    </IconButton>
                                    <IconButton size="small" component={Link} to="/upload" color="primary" >
                                        <AddAPhotoIcon />
                                    </IconButton>
                                    <Avatar className={classes.purple} alt={user?.result.name} src={user?.result.imageUrl}>{user?.result.name.charAt(0)}</Avatar>
                                </Hidden>


                                {/* <Hidden only={['lg', 'md']} >
                                <Collapsible className={classes.pravac} trigger={<MenuIcon />}>
                                    <p>
                                    <IconButton size="small" component={Link} to="/profile" aria-label="profile" className={classes.deleteIcon2} color="primary" >
                                        <AccountCircleIcon /> Profile
                                </IconButton>
                                    </p>
                                    <p>
                                    <IconButton size="small" component={Link} to="/search" color="primary" >
                                        <SearchIcon /> Search...
                                </IconButton>
                                    </p>
                                    <p>
                                    <IconButton size="small" component={Link} to="/upload" color="primary" >
                                        <AddAPhotoIcon /> Post a Gif
                                </IconButton>
                                    </p>
                                    <p>
                                    <Button variant="contained" color="secondary" onClick={logout}>Logout</Button>
                                    </p>
                                </Collapsible>
                            </Hidden> */}


                                {/* <Typography className={classes.userName} variant="h6">{user?.result.name}</Typography> */}
                                <Hidden only={['xs', 'sm']}>
                                    <Button variant="contained" color="secondary" onClick={logout}>Logout</Button>
                                </Hidden>
                            </div>
                        ) : (
                                <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
                            )}
                    </Toolbar>
                </Hidden>
            </AppBar>
            {/* <Hidden only={['lg', 'md']}>
                <Toolbar className={classes.toolbar1}>
                    {user?.result ? (
                        <div className={classes.profile1}>
                            <Avatar component={Link} to='/profile' className={classes.purple} alt={user?.result.name} src={user?.result.imageUrl}>{user?.result.name.charAt(0)}</Avatar>
                            <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
                        </div>
                    ) : (
                            <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
                        )}
                </Toolbar>
            </Hidden> */}
        </div>
    );
};

export default Navbar;