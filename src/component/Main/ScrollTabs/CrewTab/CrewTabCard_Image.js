import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import Tooltip from '@material-ui/core/Tooltip';

import {Link} from 'react-router-dom';

import { awsImageURL } from '../../../../config/awsurl';
import { serverUrl } from '../../../../config/serverUrl';

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        width: 500,
        height: 450,
    },
    icon: {
        color: 'rgba(255, 255, 255, 0.54)',
    },
});

class TitlebarGridList extends React.Component {
    state = {
        open: false,
      };
    
      handleTooltipClose = () => {
        this.setState({ open: false });
      };
    
      handleTooltipOpen = () => {
        this.setState({ open: true });
      };

      historyPushURL=(e)=>{
      }

    render() {
        const { classes } = this.props;
        const PageLink = React.forwardRef((props, ref) => <Link innerRef={ref} {...props} />);
        return (
            <div className={classes.root}>
                <GridList cellHeight={130} className={classes.gridList}>
                    {/* <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
                        <ListSubheader component="div">December</ListSubheader>
                    </GridListTile> */}
                    {this.props.tileData?this.props.tileData.map(tile => (
                        <GridListTile key={tile.post_id}
                        >
                            {tile.post_thumbnail_url==='none'?
                                <img src={`${awsImageURL}/logo/imageNo2.gif`} alt={tile.post_title} 
                                    
                                />:
                                <img src={tile.post_thumbnail_url} alt={tile.post_title} 
                                    
                                />
                            }
                            <GridListTileBar
                                title={<Link style={{color:'white'}} to={`/classify/${tile.parent_route}/category/${tile.shb_item_id}/v/${tile.post_id}?BomNo=${tile.shb_num}`}>{tile.post_title}</Link>}
                                subtitle={<Link style={{color:'white'}} to={`/classify/${tile.parent_route}/category/${tile.shb_item_id}/v/${tile.post_id}?BomNo=${tile.shb_num}`}><span>by: {tile.user_nickname}</span></Link>}
                                actionIcon={
                                    <Tooltip 
                                        disableFocusListener 
                                        disableTouchListener
                                        title={tile.post_title}
                                    >
                                        <IconButton className={classes.icon}>
                                            <InfoIcon />
                                        </IconButton>
                                    </Tooltip>
                                }
                            />
                        </GridListTile>
                    )):""}
                </GridList>
            </div>
        );
    }

}

TitlebarGridList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TitlebarGridList);