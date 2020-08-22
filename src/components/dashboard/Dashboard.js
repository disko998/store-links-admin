import * as React from 'react'
import clsx from 'clsx'
import {
    CssBaseline,
    Drawer,
    AppBar,
    Toolbar,
    List,
    Typography,
    Divider,
    IconButton,
    Badge,
    Container,
} from '@material-ui/core'

import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import NotificationsIcon from '@material-ui/icons/Notifications'

import { MainListItems, SecondaryListItems } from './listItems'
import { useDashboardStyles } from './styles'
import MainRouter from '../../router/MainRouter'

export default function Dashboard() {
    const classes = useDashboardStyles()
    const [open, setOpen] = React.useState(true)
    const handleDrawerOpen = () => {
        setOpen(true)
    }
    const handleDrawerClose = () => {
        setOpen(false)
    }

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                position='absolute'
                className={clsx(classes.appBar, open && classes.appBarShift)}
            >
                <Toolbar className={classes.toolbar}>
                    <IconButton
                        edge='start'
                        color='inherit'
                        aria-label='open drawer'
                        onClick={handleDrawerOpen}
                        className={clsx(
                            classes.menuButton,
                            open && classes.menuButtonHidden,
                        )}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        component='h1'
                        variant='h6'
                        color='inherit'
                        noWrap
                        className={classes.title}
                    >
                        Linkat Admin Panel
                    </Typography>
                    <IconButton color='inherit'>
                        <Badge badgeContent={14} max={99} color='secondary'>
                            <NotificationsIcon />
                        </Badge>
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Drawer
                variant='permanent'
                classes={{
                    paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
                }}
                open={open}
            >
                <div className={classes.toolbarIcon}>
                    <IconButton onClick={handleDrawerClose}>
                        <ChevronLeftIcon />
                    </IconButton>
                </div>
                <Divider />
                <List>
                    <MainListItems />
                </List>
                <Divider />
                <List>
                    <SecondaryListItems />
                </List>
            </Drawer>
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth='lg' className={classes.container}>
                    {/* Router */}
                    <MainRouter />
                </Container>
            </main>
        </div>
    )
}
