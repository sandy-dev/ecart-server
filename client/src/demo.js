import React, { Fragment } from 'react'
import clsx from 'clsx'
// import { Drawer, AppBar, Toolbar, List, CssBaseline, Typography, Divider, IconButton, ListItem, ListItemIcon, ListItemText } from '@material-ui/core/Drawer'
// import { MenuIcon, ChevronLeftIcon, ChevronRightIcon, InboxIcon, MailIcon } from '@material-ui/icons/Menu'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import CssBaseline from '@material-ui/core/CssBaseline'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import Icon from '@material-ui/core/Icon'
import MenuIcon from '@material-ui/icons/Menu'
import IconButton from '@material-ui/core/IconButton'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import SideBar from './layout/sidebar'
import ReactRouter from './routes'
import Footer from '_src/layout/footer'
import Header from '_src/layout/header'

//srollbar
import Fab from '@material-ui/core/Fab'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'
import Zoom from '@material-ui/core/Zoom'
import useScrollTrigger from '@material-ui/core/useScrollTrigger'

const drawerWidth = 240

export default function MiniDrawer(props) {
    const classes = useStyles()
    const theme = useTheme()
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState('recents')

    const handleDrawerOpen = () => {
        setOpen(true)
    }
    const handleDrawerClose = () => {
        setOpen(false)
    }
    const handleChange = panel => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    }
    const expansionClicked = () => {
        if (!open) setOpen(true)
    }
    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar id="back-to-top-anchor">
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"

                        className={clsx(classes.menuButton, {
                            [classes.hide]: open,
                        })}
                    >
                        <MenuIcon />
                    </IconButton>
                </Toolbar>
                <Header isSignedIn={props.isSignedIn} />
            </AppBar>
            <Drawer
                variant="permanent"
                className={clsx(classes.drawer, {
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open,
                })}
                classes={{
                    paper: clsx({
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open,
                    }),
                }}
            >
                <div className={classes.toolbar}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </div>
                <Divider />
                <SideBar isSignedIn={props.isSignedIn} isOpen={open} expansionClicked={expansionClicked} />
            </Drawer>
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <ReactRouter isSignedIn={props.isSignedIn} />
                <Footer />
                {/* scrollbar */}
                <ScrollTop {...props}>
                    <Fab color="primary" size="small" aria-label="scroll back to top">
                        <KeyboardArrowUpIcon />
                    </Fab>
                </ScrollTop>
            </main>
        </div>
    )
}

//scrollbar
function ScrollTop(props) {
    const { children, window } = props;
    const classes = useStyles();
    const trigger = useScrollTrigger({
        target: window ? window() : undefined,
        disableHysteresis: true,
        threshold: 100,
    });

    const handleClick = event => {
        document.body.scrollTop = 0
        document.documentElement.scrollTop = 0
        // const anchor = (event.target.ownerDocument || document).querySelector('#back-to-top-anchor');
        // if (anchor) {
        //     anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
        // }
    };

    return (
        <Zoom in={trigger}>
            <div onClick={handleClick} role="presentation" className={classes.rootscrollbar}>
                {children}
            </div>
        </Zoom>
    )
}

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    rootFooter: {
        width: 500,
        height: 200
    },
    appBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9) + 1,
        },
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        flexGrow: 1,
        width: '100%',
        paddingTop: theme.spacing(1),
        backgroundColor:'#F5F5F5'
    },

    //scrollbar
    rootscrollbar: {
        position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    },
}))
