import React, { useState } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { styled, useTheme, alpha, createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import AssessmentIcon from "@mui/icons-material/Assessment";
import Button from "@mui/material/Button";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";

const drawerWidth = 240;
const dashboardNavItems = [
    {
        label: 'Dashboard',
        title: 'Dashboard',
        to: '/dashboard',
        icon: DashboardIcon,
    },
    {
        label: 'Reports',
        title: 'Reports',
        to: '/dashboard/reports',
        icon: AssessmentIcon,
    },
    {
        label: 'Users',
        title: 'Users',
        to: '/dashboard/users',
        icon: PeopleIcon,
    },
];

const dashboardTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#18181b',
        },
        secondary: {
            main: '#d97706',
        },
        background: {
            default: '#f4f4f5',
            paper: '#fafafa',
        },
        text: {
            primary: '#18181b',
            secondary: '#52525b',
        },
        divider: '#18181b',
    },
    shape: {
        borderRadius: 20,
    },
    typography: {
        fontFamily: '"Work Sans", "Segoe UI", sans-serif',
        h1: {
            fontFamily: '"Space Grotesk", "Work Sans", sans-serif',
            fontWeight: 700,
        },
        h2: {
            fontFamily: '"Space Grotesk", "Work Sans", sans-serif',
            fontWeight: 700,
        },
        h3: {
            fontFamily: '"Space Grotesk", "Work Sans", sans-serif',
            fontWeight: 700,
        },
        h4: {
            fontFamily: '"Space Grotesk", "Work Sans", sans-serif',
            fontWeight: 700,
        },
        h5: {
            fontFamily: '"Space Grotesk", "Work Sans", sans-serif',
            fontWeight: 600,
        },
        h6: {
            fontFamily: '"Space Grotesk", "Work Sans", sans-serif',
            fontWeight: 600,
        },
        button: {
            textTransform: 'uppercase',
            fontWeight: 700,
            letterSpacing: '0.08em',
            fontSize: '0.72rem',
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 999,
                    borderWidth: 2,
                    borderStyle: 'solid',
                    borderColor: '#18181b',
                    padding: '8px 18px',
                    '&.MuiButton-contained': {
                        backgroundColor: '#18181b',
                        color: '#fafafa',
                        boxShadow: 'none',
                        '&:hover': {
                            backgroundColor: '#27272a',
                            boxShadow: 'none',
                        },
                    },
                    '&.MuiButton-outlined': {
                        backgroundColor: '#f4f4f5',
                        color: '#18181b',
                        '&:hover': {
                            backgroundColor: '#e4e4e7',
                        },
                    },
                    '&.MuiButton-text': {
                        borderColor: 'transparent',
                        '&:hover': {
                            backgroundColor: '#e4e4e7',
                        },
                    },
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    border: '2px solid #18181b',
                    borderRadius: 24,
                    backgroundColor: '#fafafa',
                    boxShadow: '8px 8px 0 rgba(24, 24, 27, 0.2)',
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundImage: 'none',
                },
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    borderRadius: 999,
                    backgroundColor: '#fafafa',
                    '& .MuiOutlinedInput-notchedOutline': {
                        borderWidth: 2,
                        borderColor: '#18181b',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#18181b',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#18181b',
                    },
                },
                input: {
                    fontSize: '0.85rem',
                    fontWeight: 600,
                },
            },
        },
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    fontSize: '0.7rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    fontWeight: 700,
                },
            },
        },
        MuiDataGrid: {
            styleOverrides: {
                root: {
                    border: '2px solid #18181b',
                    borderRadius: 18,
                    backgroundColor: '#fafafa',
                },
                columnHeaders: {
                    backgroundColor: '#f4f4f5',
                    borderBottom: '2px solid #18181b',
                    fontSize: '0.7rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    fontWeight: 700,
                },
                cell: {
                    borderBottom: '1px solid #e4e4e7',
                },
            },
        },
    },
});

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});
const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing(0, 2),
    ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: '#f4f4f5',
    color: '#18181b',
    borderBottom: '2px solid #18181b',
    boxShadow: 'none',
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));
const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': {
                ...openedMixin(theme),
                backgroundColor: '#f4f4f5',
                borderRight: '2px solid #18181b',
                boxShadow: 'none',
            },
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': {
                ...closedMixin(theme),
                backgroundColor: '#f4f4f5',
                borderRight: '2px solid #18181b',
                boxShadow: 'none',
            },
        }),
    }),
);
const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));
const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: 999,
    border: '2px solid #18181b',
    backgroundColor: '#fafafa',
    '&:hover': {
        backgroundColor: '#f4f4f5',
    },
    '&:focus-within': {
        boxShadow: `0 0 0 3px ${alpha('#18181b', 0.15)}`,
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));
const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: '#18181b',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        fontSize: '0.75rem',
        fontWeight: 600,
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));
const getPageTitle = (pathname) =>
    dashboardNavItems.find(item => item.to === pathname)?.title ?? 'Welcome';

const DashLayoutContent = () => {
    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const pageTitle = getPageTitle(location.pathname);

    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };
    const handleLogout = () => {
        navigate('/');
    };
    return (
        <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f4f4f5' }}>
            <CssBaseline />
            <AppBar position="fixed" open={open}>
                <Toolbar sx={{ gap: 1.5, flexWrap: { xs: 'wrap', md: 'nowrap' } }}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={open ? handleDrawerClose : handleDrawerOpen}
                        edge="start"
                        sx={{
                            marginRight: { xs: 0, md: 2 },
                        }}
                    >
                        {open ? <MenuOpenIcon /> : <MenuIcon />}
                    </IconButton>
                    <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
                        {pageTitle}
                    </Typography>
                    <Button
                        color="inherit"
                        component={Link}
                        to="/dashboard"
                        variant="outlined"
                    >
                        Dashboard
                    </Button>
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search dashboard"
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </Search>
                    <Button color="inherit" onClick={handleLogout} variant="outlined">
                        Logout
                    </Button>
                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open}>
                <DrawerHeader>
                    <Box
                        sx={{
                            height: 36,
                            width: 36,
                            borderRadius: '50%',
                            border: '2px solid #18181b',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 700,
                            fontSize: '0.9rem',
                            letterSpacing: '0.08em',
                            backgroundColor: '#fafafa',
                        }}
                    >
                        S
                    </Box>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List sx={{ mt: 2 }}>
                    {dashboardNavItems.map((item) => (
                        <ListItem key={item.label} disablePadding sx={{ display: 'block' }}>
                            <ListItemButton
                                component={Link}
                                to={item.to}
                                selected={location.pathname === item.to}
                                sx={{
                                    minHeight: 46,
                                    px: 2.5,
                                    mx: 1.2,
                                    mb: 1,
                                    borderRadius: 999,
                                    border: '2px solid #18181b',
                                    backgroundColor: '#fafafa',
                                    color: '#18181b',
                                    justifyContent: open ? 'initial' : 'center',
                                    '&:hover': {
                                        backgroundColor: '#e4e4e7',
                                    },
                                    '&.Mui-selected': {
                                        backgroundColor: '#18181b',
                                        color: '#fafafa',
                                        '&:hover': {
                                            backgroundColor: '#27272a',
                                        },
                                        '& .MuiListItemIcon-root': {
                                            color: '#fafafa',
                                        },
                                    },
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 2 : 'auto',
                                        justifyContent: 'center',
                                        color: 'inherit',
                                    }}
                                >
                                    <item.icon />
                                </ListItemIcon>
                                <ListItemText primary={item.label} sx={{ opacity: open ? 1 : 0 }} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: { xs: 2, sm: 3 }, minWidth: 0 }}>
                <DrawerHeader />
                <Outlet />
            </Box>
        </Box>
    );
};

const DashLayout = () => (
    <ThemeProvider theme={dashboardTheme}>
        <DashLayoutContent />
    </ThemeProvider>
);

export default DashLayout;