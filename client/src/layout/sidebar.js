import React, { Fragment } from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import BookOutlined from '@material-ui/icons/BookOutlined'
import Person from '@material-ui/icons/Person'
import Sort from '@material-ui/icons/Sort'
import PersonOutline from '@material-ui/icons/PersonOutline'
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel'
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import { withStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import Category from '_src/config/category.json'
const Categories = Category[0]['category']

const styles = {
    items: {
        height: 40,
    },
    itemsNested: {
        height: 35,
        backgrounfColor: '#EEEEEE'
    },
    list: {
        padding: 0,
        margin: 0
    }
}

export const sidebar = (props) => {
    return (
        <div>
            <List style={styles.list}>
                <ListItem button component={Link} to={"/books"} style={styles.items}>
                    <ListItemIcon><BookOutlined /></ListItemIcon>
                    <Typography variant="caption">BOOKS</Typography>
                </ListItem>
                <Divider />
                <ListItem button component={Link} to={"/authors"} style={styles.items}>
                    <ListItemIcon><Person /></ListItemIcon>
                    <Typography variant="caption">AUTHORS</Typography>
                </ListItem>

                {
                    props.isSignedIn &&
                    <ListItem button component={Link} to={"/account"} style={styles.items}>
                        <ListItemIcon><Person /></ListItemIcon>
                        <Typography variant="caption">ACCOUNT</Typography>
                    </ListItem>
                }
            </List>

            <Divider />

            <List>
                <ListItem>
                </ListItem>
            </List>
            <List>
                <ListItem>
                </ListItem>
            </List>
            <List>
                <ListItem>
                    <Typography variant="caption"> FILTERS </Typography>
                </ListItem>
            </List>



            <ExpansionPanel onChange={() => { props.expansionClicked() }} style={styles.list}>
                <ExpansionPanelSummary expandIcon={props.isOpen && <ExpandMoreIcon />} style={styles.items}>
                    <ListItemIcon><Sort /></ListItemIcon>
                    {props.isOpen && <Typography variant="caption">SORT</Typography>}
                </ExpansionPanelSummary>
                {/* <Divider /> */}
                <List style={styles.list}>
                    <ListItem button component={Link} to={{ pathname: '/books/', sort: 'rating' }} style={styles.itemsNested}>
                        <Typography variant="caption">RATING</Typography>
                    </ListItem>
                    <Divider />
                    <ListItem button component={Link} to={{ pathname: '/books/', sort: 'publish' }} style={styles.itemsNested}>
                        <Typography variant="caption">PUBLISH</Typography>
                    </ListItem>
                </List>
            </ExpansionPanel>

            <ExpansionPanel onChange={() => { props.expansionClicked() }}>
                <ExpansionPanelSummary expandIcon={props.isOpen && <ExpandMoreIcon />} style={styles.items}>
                    <ListItemIcon><Sort /></ListItemIcon>
                    {props.isOpen && <Typography variant="caption"> CATEGORY </Typography>}
                </ExpansionPanelSummary>
                <List style={styles.list}>
                    {/* <Divider /> */}
                    {
                        Categories.map((item, index) => {
                            return (
                                <React.Fragment key={index} >
                                    <ListItem button component={Link} to={{ pathname: '/books/', category: item.id }} style={styles.itemsNested}>
                                        <Typography variant="caption">{item.name.toUpperCase()}</Typography>
                                    </ListItem>
                                    <Divider />
                                </React.Fragment>
                            )
                        })
                    }
                </List>
            </ExpansionPanel>

            <ExpansionPanel onChange={() => { props.expansionClicked() }}>
                <ExpansionPanelSummary expandIcon={props.isOpen && <ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                    <ListItemIcon><Sort /></ListItemIcon>
                    {props.isOpen && <Typography variant="caption"> AUTHORS </Typography>}
                </ExpansionPanelSummary>
                <List style={styles.list}>
                    <Divider />
                    {
                        Categories.map((item, index) => {
                            return (
                                <React.Fragment key={index}>
                                    <ListItem button component={Link} to={{ pathname: '/books/', category: item.id }}>
                                        <ListItemText primary={item.name} />
                                    </ListItem>
                                    <Divider />
                                </React.Fragment>
                            )
                        })
                    }
                </List>
            </ExpansionPanel>

        </div>
    )
}
export default sidebar

const ExpansionPanel = withStyles({
    root: {
        border: '1px solid rgba(0, 0, 0, .125)',
        boxShadow: 'none',
        '&:not(:last-child)': {
            borderBottom: 0,
        },
        '&:before': {
            display: 'none',
        },
        '&$expanded': {
            margin: 'auto',
        },
    },
    expanded: {},
})(MuiExpansionPanel)
const ExpansionPanelSummary = withStyles({
    root: {
        backgroundColor: 'rgba(0, 0, 0, .03)',
        borderBottom: '1px solid rgba(0, 0, 0, .125)',
        marginBottom: -1,
        minHeight: 56,
        '&$expanded': {
            minHeight: 56,
        },
    },
    content: {
        '&$expanded': {
            margin: '12px 0',
        },
    },
    expanded: {},
})(MuiExpansionPanelSummary)



