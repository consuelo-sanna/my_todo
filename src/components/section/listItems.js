import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import AssignmentIcon from '@material-ui/icons/Assignment';

import HomeIcon from '@material-ui/icons/Home';

import Link from '@material-ui/core/Link';

import AccountBoxIcon from '@material-ui/icons/AccountBox';

export const secondaryListItems = (
    <div>
        <ListItem button>
            <ListItemIcon>
                <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <ShoppingCartIcon />
            </ListItemIcon>
            <ListItemText primary="Orders" />
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Customers" />
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <BarChartIcon />
            </ListItemIcon>
            <ListItemText primary="Reports" />
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <LayersIcon />
            </ListItemIcon>
            <ListItemText primary="Integrations" />
        </ListItem>
    </div>
);

export const mainListItems = (
    <div>
        <ListSubheader inset>Redirect</ListSubheader>

        <ListItem button key={'home'}>
            <Link href="/">
                <ListItemIcon>
                    <HomeIcon />
                </ListItemIcon>
            </Link>

            <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button key={'dashboard'}>
            <Link href="/dashboard">
                <ListItemIcon>
                    <DashboardIcon />
                </ListItemIcon>
            </Link>

            <ListItemText primary="Dashboard" />
        </ListItem>
    </div>
);
