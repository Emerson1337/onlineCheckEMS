import React from 'react';

// material-ui
import { makeStyles } from '@material-ui/styles';
import { Card, CardContent, Grid } from '@material-ui/core';
import { Skeleton } from '@mui/material';

// style constant
const useStyles = makeStyles({
    cardHeading: {
        marginRight: '8px',
        marginTop: '18px',
        marginBottom: '14px',
    },
    earningCard: {
        width: '25%',
        backgroundColor: '#1890FF',
        marginRight: '20px'
    }
});

//-----------------------|| SKELETON EARNING CARD ||-----------------------//

const EarningCard = ({ money }: any) => {
    const classes = useStyles();
    return (
        <Card className={classes.earningCard}>
            <CardContent>
                <Grid container direction="column">
                    <Grid item>
                        <Grid container justifyContent="space-between">
                            <Grid item>
                                {
                                    money ? money : <Skeleton variant="rectangular" width={44} height={44} />
                                }
                            </Grid>
                            <Grid item>
                                <Skeleton variant="rectangular" width={34} height={34} />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Skeleton variant="rectangular" className={classes.cardHeading} height={40} />
                    </Grid>
                    <Grid item>
                        <Skeleton variant="rectangular" height={30} />
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

export default EarningCard;