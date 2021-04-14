import React from 'react';
import { Box, Divider, Grid } from '@material-ui/core';
import MaterialSkeleton from '@material-ui/lab/Skeleton';

// import { Container } from './styles';

const Skeleton: React.FC = () => {
  return (
    <Box paddingX={4} paddingY={4}>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box>
          <MaterialSkeleton variant="text" width={250} height={50} />
          <MaterialSkeleton variant="text" width={250} height={30} />
        </Box>

        <Box display="flex" flexDirection="column" alignItems="flex-end">
          <Box display="flex" flexDirection="row" alignItems="center">
            <MaterialSkeleton
              width={90}
              height={50}
              style={{
                borderRadius: 20,
              }}
            />

            <MaterialSkeleton
              width={40}
              height={40}
              style={{
                marginLeft: 16,
              }}
            />
          </Box>

          <MaterialSkeleton variant="text" width={300} height={20} />

          <MaterialSkeleton variant="text" width={100} height={20} />
        </Box>
      </Box>

      <Box marginY={4}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <MaterialSkeleton variant="rect" height={50} />
          </Grid>

          <Grid item xs={12} md={8}>
            <MaterialSkeleton variant="rect" height={50} />
          </Grid>

          <Grid item xs={12} md={2}>
            <MaterialSkeleton variant="rect" height={50} />
          </Grid>

          <Grid item xs={12} md={2}>
            <MaterialSkeleton variant="rect" height={50} />
          </Grid>

          <Grid item xs={12} md={8}>
            <MaterialSkeleton variant="rect" height={50} />
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

          <Grid item xs={12} md={8}>
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

          <Grid item xs={12} md={4}>
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

          <Grid item xs={12} md={12}>
            <MaterialSkeleton variant="rect" height={115} />
          </Grid>

          <Grid item xs={12} md={12}>
            <MaterialSkeleton variant="text" width={250} />

            <Box
              display="flex"
              flexDirection="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Box display="flex" flexDirection="row" alignItems="center">
                <MaterialSkeleton variant="circle" width={40} height={40} />
                <MaterialSkeleton
                  variant="text"
                  width={150}
                  style={{ marginLeft: 16 }}
                />
              </Box>

              <MaterialSkeleton variant="circle" width={40} height={40} />
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Divider />

      <Box marginY={4}>
        <MaterialSkeleton variant="text" width={250} />

        <Box marginTop={4}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <MaterialSkeleton variant="rect" height={50} />
            </Grid>

            <Grid item xs={12} md={4}>
              <MaterialSkeleton variant="rect" height={50} />
            </Grid>

            <Grid item xs={12} md={4}>
              <MaterialSkeleton variant="rect" height={50} />
            </Grid>

            <Grid item xs={12} md={12}>
              <MaterialSkeleton variant="text" width={250} />

              <Box
                display="flex"
                flexDirection="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <Box display="flex" flexDirection="row" alignItems="center">
                  <MaterialSkeleton variant="circle" width={40} height={40} />
                  <MaterialSkeleton
                    variant="text"
                    width={150}
                    style={{ marginLeft: 16 }}
                  />
                </Box>

                <MaterialSkeleton variant="circle" width={40} height={40} />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default Skeleton;
