import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import useStyles from './categoryCard-jss';
import { useTheme } from '@material-ui/core/styles'
import { useRouter } from 'next/router';
import Link from 'next/link'
import Skeleton from '@material-ui/lab/Skeleton';
import PropTypes from 'prop-types';


export default function CategoryCard(props) {
    const {
      title,
      image,
      isLoading
    } = props
    const theme = useTheme();
    const classes = useStyles(theme);
    const router = useRouter();

    const handleClick = () =>{
      router.push(`/category/${title.toLowerCase()}`)
    }

    return (
      <Card className={classes.card} onClick={handleClick} >
        {
          !isLoading ?
          <CardHeader 
            title={title} 
            classes={{
                title: classes.cardTitle,
                root: classes.cardHeader
            }}
          /> :
          <Skeleton width="100%">
            <CardHeader 
              classes={{
                  title: classes.cardTitle,
                  root: classes.cardHeader
              }}
            />
          </Skeleton>
        }
        
        {
          !isLoading ?
          <CardMedia
            className={classes.media}
            image={image}
            title={title}
            component="img"
          /> :
          <Skeleton variant="rect" width="100%">
            <CardMedia
              className={classes.media}
            />
          </Skeleton>
        }

        <CardActions disableSpacing>
          {
            !isLoading ?
            <Link href={`/category/${title.toLowerCase()}`}>
              <Button 
                size="small" 
                classes={{root: classes.cardButton}} 
                component="a"
              >
                  Shop now
              </Button>
            </Link> :
            <Button 
              size="small" 
              classes={{root: classes.cardButton}} 
              component="a"
              disabled
            >
                Shop now
            </Button>
          }
        </CardActions>
      </Card>
    );
}

CategoryCard.propTypes = {
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    isLoading: PropTypes.bool
}
