import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Typography, Box, Menu, MenuItem, useTheme, useMediaQuery } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link as RouterLink } from 'react-router-dom';
import './Navbar.scss';
import { Logo } from '../Logo/Logo';

interface NavLink {
  href: string;
  label: string;
}

const navLinks: NavLink[] = [
  { href: '/', label: 'Home' },
  { href: '/Tours', label: 'Browse Tours' },
];

export const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { pathname: currentPath } = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleMenuToggle = (event: React.MouseEvent<HTMLElement>) => {
    setIsMenuOpen(!isMenuOpen);
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setIsMenuOpen(false);
    setAnchorEl(null);
  };

  return (
    <AppBar position="sticky" className="navbar-container">
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {/* Brand Section */}
        <Box display="flex" alignItems="center" gap={1.5} component={RouterLink} to="/" sx={{ textDecoration: 'none' }}>
          <Box className="navbar-logo">
            <Logo />
          </Box>
          <Typography variant="h6" className="navbar-brand-text" color="text.primary">
            OpenWorld
          </Typography>
        </Box>

        {/* Desktop Links */}
        {!isMobile && (
          <Box display="flex" gap={3} className="navbar-links-container">
            {navLinks.map(({ href, label }) => (
              <RouterLink
                key={href}
                to={href}
                className={`navbar-link ${currentPath === href ? 'active' : ''}`}
                aria-current={currentPath === href ? 'page' : undefined}
              >
                {label}
              </RouterLink>
            ))}
          </Box>
        )}

        {/* Mobile Menu Toggle */}
        {isMobile && (
          <IconButton
            edge="end"
            color="inherit"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            onClick={handleMenuToggle}
            className="navbar-menu-toggle"
          >
            <MenuIcon />
          </IconButton>
        )}

        {/* Mobile Menu */}
        <Menu
          anchorEl={anchorEl}
          open={isMenuOpen}
          onClose={handleMenuClose}
          PaperProps={{ className: 'navbar-mobile-menu' }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          {navLinks.map(({ href, label }) => (
            <MenuItem
              key={href}
              onClick={handleMenuClose}
              component={RouterLink}
              to={href}
              className={`navbar-mobile-link ${currentPath === href ? 'active' : ''}`}
            >
              {label}
            </MenuItem>
          ))}
        </Menu>
      </Toolbar>
    </AppBar>
  );
};