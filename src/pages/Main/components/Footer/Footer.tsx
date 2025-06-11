import { Box, Container, Grid, Typography, Link } from '@mui/material'

export const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <Box component="footer" sx={{ bgcolor: '#f8f9fa', py: 6, borderTop: '1px solid #e9ecef' }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, color: '#343a40' }}>
                OpenWorld
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary">
              © {currentYear} OpenWorld, Inc. All rights reserved.
            </Typography>
          </Grid>
          <Grid item xs={12} md={8}>
            <Grid container spacing={4}>
              <Grid item xs={12} sm={4}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1, color: '#343a40' }}>
                  Company
                </Typography>
                <Link href="/AboutUs" color="text.secondary" sx={{ display: 'block', mb: 0.5, textDecoration: 'none', '&:hover': { color: '#0077cc' } }}>
                  About
                </Link>
                <Link href="/careers" color="text.secondary" sx={{ display: 'block', mb: 0.5, textDecoration: 'none', '&:hover': { color: '#0077cc' } }}>
                  Careers
                </Link>
                <Link href="/partners" color="text.secondary" sx={{ display: 'block', mb: 0.5, textDecoration: 'none', '&:hover': { color: '#0077cc' } }}>
                  Partners
                </Link>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1, color: '#343a40' }}>
                  Legal
                </Typography>
                <Link href="/terms" color="text.secondary" sx={{ display: 'block', mb: 0.5, textDecoration: 'none', '&:hover': { color: '#0077cc' } }}>
                  Terms
                </Link>
                <Link href="/privacy" color="text.secondary" sx={{ display: 'block', mb: 0.5, textDecoration: 'none', '&:hover': { color: '#0077cc' } }}>
                  Privacy
                </Link>
                <Link href="/security" color="text.secondary" sx={{ display: 'block', mb: 0.5, textDecoration: 'none', '&:hover': { color: '#0077cc' } }}>
                  Security
                </Link>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1, color: '#343a40' }}>
                  Resources
                </Typography>
                <Link href="/status" color="text.secondary" sx={{ display: 'block', mb: 0.5, textDecoration: 'none', '&:hover': { color: '#0077cc' } }}>
                  Status
                </Link>
                <Link href="/docs" color="text.secondary" sx={{ display: 'block', mb: 0.5, textDecoration: 'none', '&:hover': { color: '#0077cc' } }}>
                  Docs
                </Link>
                <Link href="/contact" color="text.secondary" sx={{ display: 'block', mb: 0.5, textDecoration: 'none', '&:hover': { color: '#0077cc' } }}>
                  Contact
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}