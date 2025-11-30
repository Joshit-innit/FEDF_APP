import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';

const SafeImage = ({ src, alt, height = 200, width = '100%', sx = {}, fallbackText }) => {
  const [imgError, setImgError] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleError = (e) => {
    console.error('Image failed to load:', src, e);
    setImgError(true);
    setLoading(false);
  };

  const handleLoad = () => {
    setLoading(false);
  };

  // If no src provided, show fallback immediately
  if (!src) {
    return (
      <Box
        height={height}
        width={width}
        bgcolor="#FF6B35"
        display="flex"
        alignItems="center"
        justifyContent="center"
        sx={{ color: 'white', ...sx }}
      >
        <Typography variant="body2" textAlign="center" px={2}>
          {fallbackText || alt || 'Image not available'}
        </Typography>
      </Box>
    );
  }

  if (imgError) {
    return (
      <Box
        height={height}
        width={width}
        bgcolor="#FF6B35"
        display="flex"
        alignItems="center"
        justifyContent="center"
        sx={{ color: 'white', ...sx }}
      >
        <Typography variant="body2" textAlign="center" px={2}>
          {fallbackText || alt || 'Image not available'}
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ position: 'relative', width, height, ...sx }}>
      {loading && (
        <Box
          position="absolute"
          top={0}
          left={0}
          width="100%"
          height="100%"
          bgcolor="#f0f0f0"
          display="flex"
          alignItems="center"
          justifyContent="center"
          zIndex={1}
        >
          <Typography variant="body2" color="text.secondary">
            Loading...
          </Typography>
        </Box>
      )}
      <img
        src={src}
        alt={alt}
        onError={handleError}
        onLoad={handleLoad}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: loading ? 'none' : 'block',
        }}
      />
    </Box>
  );
};

export default SafeImage;

