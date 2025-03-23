import React from 'react';
import { Paper } from '@material-ui/core';

/* eslint-disable max-len */
const Map = () => (
  <Paper style={{ height: '85vh', width: '100%' }}>
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14962.650974875676!2d85.79704648715823!3d20.355546600000014!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a19091813dab8d5%3A0xa033051ccddbbcbc!2sKalinga%20Institute%20of%20Industrial%20Technology!5e0!3m2!1sen!2sin!4v1742650474262!5m2!1sen!2sin"
      width="100%"
      height="100%"
      style={{ border: 0 }}
      allowFullScreen=""
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      title="KIIT Map"
    />
  </Paper>
);

export default Map;
