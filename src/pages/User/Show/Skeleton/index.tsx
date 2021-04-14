import React from 'react';
import { Box, Grid } from '@material-ui/core';
import MaterialSkeleton from '@material-ui/lab/Skeleton';

// import { Container } from './styles';

const Skeleton: React.FC = () => {
  return (
    <Box paddingY={4} paddingX={4}>
      <Box>
        <MaterialSkeleton variant="text" width={160} height={50} />
        <MaterialSkeleton variant="text" width={180} height={30} />
      </Box>

      <Box marginTop={4}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <Box display="flex" alignItems="center">
              <MaterialSkeleton variant="rect" width={30} height={20} />
              <MaterialSkeleton
                variant="text"
                width={100}
                height={20}
                style={{
                  marginLeft: 4,
                }}
              />
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <MaterialSkeleton variant="rect" height={50} />
          </Grid>

          <Grid item xs={12} md={8}>
            <MaterialSkeleton variant="rect" height={50} />
          </Grid>

          <Grid item xs={12} md={4}>
            <MaterialSkeleton variant="rect" height={50} />
          </Grid>

          <Grid item xs={12} md={4}>
            <MaterialSkeleton variant="rect" height={50} />
          </Grid>

          <Grid item xs={12} md={4}>
            <MaterialSkeleton variant="rect" height={50} />
          </Grid>
        </Grid>

        <Box>
          <MaterialSkeleton variant="text" width={100} height={30} />
          <MaterialSkeleton variant="text" width={400} height={30} />

          <Box display="flex" alignItems="center">
            <MaterialSkeleton variant="rect" width={20} height={20} />
            <MaterialSkeleton
              variant="text"
              width={100}
              height={20}
              style={{
                marginLeft: 4,
              }}
            />
          </Box>

          <Box marginTop={2}>
            <Grid container spacing={2}>
              <Grid item xs={6} md={4} lg={3}>
                <Box display="flex" alignItems="center">
                  <MaterialSkeleton
                    animation="wave"
                    variant="rect"
                    width={20}
                    height={20}
                  />
                  <MaterialSkeleton
                    animation="wave"
                    variant="text"
                    width={100}
                    height={20}
                    style={{
                      marginLeft: 4,
                    }}
                  />
                </Box>
              </Grid>

              <Grid item xs={6} md={4} lg={3}>
                <Box display="flex" alignItems="center">
                  <MaterialSkeleton
                    animation="wave"
                    variant="rect"
                    width={20}
                    height={20}
                  />
                  <MaterialSkeleton
                    animation="wave"
                    variant="text"
                    width={100}
                    height={20}
                    style={{
                      marginLeft: 4,
                    }}
                  />
                </Box>
              </Grid>

              <Grid item xs={6} md={4} lg={3}>
                <Box display="flex" alignItems="center">
                  <MaterialSkeleton
                    animation="wave"
                    variant="rect"
                    width={20}
                    height={20}
                  />
                  <MaterialSkeleton
                    animation="wave"
                    variant="text"
                    width={100}
                    height={20}
                    style={{
                      marginLeft: 4,
                    }}
                  />
                </Box>
              </Grid>

              <Grid item xs={6} md={4} lg={3}>
                <Box display="flex" alignItems="center">
                  <MaterialSkeleton
                    animation="wave"
                    variant="rect"
                    width={20}
                    height={20}
                  />
                  <MaterialSkeleton
                    animation="wave"
                    variant="text"
                    width={100}
                    height={20}
                    style={{
                      marginLeft: 4,
                    }}
                  />
                </Box>
              </Grid>

              <Grid item xs={6} md={4} lg={3}>
                <Box display="flex" alignItems="center">
                  <MaterialSkeleton variant="rect" width={20} height={20} />
                  <MaterialSkeleton
                    variant="text"
                    width={100}
                    height={20}
                    style={{
                      marginLeft: 4,
                    }}
                  />
                </Box>
              </Grid>

              <Grid item xs={6} md={4} lg={3}>
                <Box display="flex" alignItems="center">
                  <MaterialSkeleton variant="rect" width={20} height={20} />
                  <MaterialSkeleton
                    variant="text"
                    width={100}
                    height={20}
                    style={{
                      marginLeft: 4,
                    }}
                  />
                </Box>
              </Grid>

              <Grid item xs={6} md={4} lg={3}>
                <Box display="flex" alignItems="center">
                  <MaterialSkeleton variant="rect" width={20} height={20} />
                  <MaterialSkeleton
                    variant="text"
                    width={100}
                    height={20}
                    style={{
                      marginLeft: 4,
                    }}
                  />
                </Box>
              </Grid>

              <Grid item xs={6} md={4} lg={3}>
                <Box display="flex" alignItems="center">
                  <MaterialSkeleton variant="rect" width={20} height={20} />
                  <MaterialSkeleton
                    variant="text"
                    width={100}
                    height={20}
                    style={{
                      marginLeft: 4,
                    }}
                  />
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Skeleton;
