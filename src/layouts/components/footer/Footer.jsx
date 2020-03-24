import React from 'react';
import { Box, Typography } from '@material-ui/core';
import CopyrightIcon from '@material-ui/icons/Copyright';


const styling = {
  fontSize: '14px',
};

const Footer = () => (
  <>
    <Box mt={2}>
      <Typography variant="body2" color="black" align="center">
        <CopyrightIcon style={styling} />
      Successive Technology
      </Typography>
    </Box>
  </>
);

export default Footer;
