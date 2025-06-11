import { Box, Container, Typography, Button } from '@mui/material'
import { Link } from 'react-router-dom'
import ocean from "@/assets/violet.jpeg";

export const Hero = () => {
  return (
    <Box
      sx={{
        mt: { xs: '60px', md: '80px' },
        height: { xs: '100vh', md: 'calc(100vh - 80px)' },
        backgroundImage: `url(${ocean})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(90deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.1) 100%)',
          zIndex: 1,
        },
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2, py: { xs: 4, md: 0 } }}>
        <Box sx={{ maxWidth: { xs: '100%', md: '600px' }, color: '#fff', textShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '1.75rem', sm: '2rem', md: '3rem' },
              fontWeight: 700,
              mb: { xs: 2, md: 3 },
              lineHeight: 1.2,
            }}
          >
            Discover the world with us
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontSize: { xs: '1rem', sm: '1.125rem', md: '1.25rem' },
              lineHeight: 1.6,
              mb: { xs: 3, md: 4 },
            }}
          >
            Our travel agency is your reliable guide to unforgettable journeys. We specialize in creating unique travel
            programs that combine comfort, safety, and vivid experiences.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
            <Button
              component={Link}
              to="/AboutUs"
              variant="outlined"
              color="secondary"
              size="large"
              sx={{ width: { xs: '100%', sm: 'auto' } }}
            >
              About Us
            </Button>
            <Button
              component={Link}
              to="/Tours"
              variant="contained"
              color="primary"
              size="large"
              sx={{ width: { xs: '100%', sm: 'auto' } }}
            >
              Find a Tour
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}