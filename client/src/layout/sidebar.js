import React, { Fragment } from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import BookOutlined from '@material-ui/icons/BookRounded'
import Person from '@material-ui/icons/Person'
import AccountBox from '@material-ui/icons/AccountBox'
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
import { Query, withApollo } from 'react-apollo'
import { FETCH_AUTHORS } from '_src/components/queries/authors'
import Books from '_src/components/books/books'
import Tooltip from '@material-ui/core/Tooltip'
const Categories = Category[0]['category']
const styles = {
    items: {
        height: 40,
    },
    Link: {
        height: 35,
        backgrounfColor: '#EEEEEE'
    },
    list: {
        padding: 0,
        margin: 0
    },
    listAuthor: {
        padding: 0,
        margin: 0,
        maxHeight: 250,
        overflowY: 'scroll'
    },
    linkNested: {
        height: '100%',
        width: '100%',
        textDecoration: 'none',
        color: '#3f51b5'//colorprimary
    },
    icon:{
        color:'#9E9E9E'
    }
}

export const sidebar = (props) => {
    return (
        <div>
            <List style={styles.list}>
                <ListItem button component={Link} to={"/books"} style={styles.items}>
                    <Tooltip title="Books" placement='right'>
                        <ListItemIcon><BookOutlined style={styles.icon} /></ListItemIcon>
                    </Tooltip>
                    <Typography variant="caption">BOOKS</Typography>
                </ListItem>
                <Divider />
                <ListItem button component={Link} to={"/authors"} style={styles.items}>
                    <Tooltip title="Authors" placement='right'>
                        <ListItemIcon><Person style={styles.icon} /></ListItemIcon>
                    </Tooltip>
                    <Typography variant="caption">AUTHORS</Typography>
                </ListItem>
                <Divider />
                {
                    props.isSignedIn &&
                    <ListItem button component={Link} to={"/account"} style={styles.items}>
                        <Tooltip title="Account" placement='right'>
                            <ListItemIcon><AccountBox style={styles.icon} /></ListItemIcon>
                        </Tooltip>
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
                    {/* <ListItemIcon><Sort /></ListItemIcon> */}
                    <Typography variant="caption"> Sort </Typography>
                </ExpansionPanelSummary>
                {/* <Divider /> */}
                <List style={styles.list}>
                    <ListItem button component={Link} to={{ pathname: '/books/', sort: 'rating', isSignedIn: props.isSignedIn }} style={styles.linkNested}>
                        <Typography variant="caption">RATING</Typography>
                    </ListItem>
                    <Divider />
                    <ListItem button component={Link} to={{ pathname: '/books/', sort: 'publish', isSignedIn: props.isSignedIn }} style={styles.linkNested}>
                        <Typography variant="caption">PUBLISH</Typography>
                    </ListItem>
                </List>
            </ExpansionPanel>

            <ExpansionPanel onChange={() => { props.expansionClicked() }}>
                <ExpansionPanelSummary expandIcon={props.isOpen && <ExpandMoreIcon />} style={styles.items}>
                    <Typography variant="caption"> Category </Typography>
                </ExpansionPanelSummary>
                <List style={styles.list}>
                    {/* <Divider /> */}
                    {
                        Categories.map((item, index) => {
                            return (
                                <React.Fragment key={index} >
                                    <ListItem button component={Link} to={{ pathname: '/books/', category: item.id, isSignedIn: props.isSignedIn }} style={styles.linkNested}>
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
                    <Typography variant="caption"> Author </Typography>
                </ExpansionPanelSummary>
                <List style={styles.listAuthor}>

                    <Query query={FETCH_AUTHORS}>
                        {({ loading, error, data }) => {
                            if (loading) return <h4>Loading...</h4>
                            if (error) console.log(error)
                            return (
                                data.authors.map((item, index) => {
                                    return (
                                        <React.Fragment key={index}>
                                            <ListItem button style={styles.linkNested}>
                                                <Link
                                                    to={{ pathname: '/books/', authorId: item.id, authorName: item.name, isSignedIn: props.isSignedIn }}
                                                    style={styles.linkNested}
                                                >
                                                    <Typography variant="caption">{item.name}</Typography>
                                                </Link>

                                            </ListItem>
                                            <Divider />

                                        </React.Fragment>

                                    )
                                })
                            )
                        }}
                    </Query>

                </List>
            </ExpansionPanel>

        </div>
    )
}
export default withApollo(sidebar)

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



