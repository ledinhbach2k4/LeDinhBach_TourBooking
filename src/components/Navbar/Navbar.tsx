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

const dropdownLinks: NavLink[] = [
  { href: '/about', label: 'About Us' },
  { href: '/team', label: 'Our Team' },
  { href: '/contact', label: 'Contact Us' },
];

export const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [dropdownAnchorEl, setDropdownAnchorEl] = useState<null | HTMLElement>(null);
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

  const handleDropdownToggle = (event: React.MouseEvent<HTMLElement>) => {
    setDropdownAnchorEl(event.currentTarget);
  };

  const handleDropdownClose = () => {
    setDropdownAnchorEl(null);
  };

  const isActive = (path: string) => (currentPath === path ? 'active' : '');

  return (
    <AppBar position="sticky" className="navbar-container">
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Box display="flex" alignItems="center" gap={0.5} component={RouterLink} to="/" sx={{ textDecoration: 'none' }}>
          <Box className="navbar-logo">
            <Logo />
          </Box>
          <Typography variant="h6" className="navbar-brand-text">
            TechTop-Journey
          </Typography>
        </Box>

        {!isMobile && (
          <Box display="flex" gap={3} className="navbar-links-container">
            {navLinks.map(({ href, label }) => (
              <RouterLink
                key={href}
                to={href}
                className={`navbar-link ${isActive(href)}`}
                aria-current={currentPath === href ? 'page' : undefined}
              >
                {label}
              </RouterLink>
            ))}
            <RouterLink
              to="/signin"
              className={`navbar-link ${isActive('/signin')}`}
              aria-current={currentPath === '/signin' ? 'page' : undefined}
            >
              Signin
            </RouterLink>
            <RouterLink
              to="/signup"
              className={`navbar-link ${isActive('/signup')}`}
              aria-current={currentPath === '/signup' ? 'page' : undefined}
            >
              Signup
            </RouterLink>
            <Box
              className="navbar-link"
              onClick={handleDropdownToggle}
              sx={{ cursor: 'pointer' }}
            >
              More
            </Box>
            <Menu
              anchorEl={dropdownAnchorEl}
              open={Boolean(dropdownAnchorEl)}
              onClose={handleDropdownClose}
              PaperProps={{ className: 'navbar-mobile-menu' }}
            >
              {dropdownLinks.map(({ href, label }) => (
                <MenuItem
                  key={href}
                  onClick={handleDropdownClose}
                  component={RouterLink}
                  to={href}
                  className={`navbar-mobile-link ${isActive(href)}`}
                >
                  {label}
                </MenuItem>
              ))}
            </Menu>
          </Box>
        )}

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
              className={`navbar-mobile-link ${isActive(href)}`}
            >
              {label}
            </MenuItem>
          ))}
          <MenuItem
            onClick={handleMenuClose}
            component={RouterLink}
            to="/signin"
            className={`navbar-mobile-link ${isActive('/signin')}`}
          >
            Signin
          </MenuItem>
          <MenuItem
            onClick={handleMenuClose}
            component={RouterLink}
            to="/signup"
            className={`navbar-mobile-link ${isActive('/signup')}`}
          >
            Signup
          </MenuItem>
          {dropdownLinks.map(({ href, label }) => (
            <MenuItem
              key={href}
              onClick={handleMenuClose}
              component={RouterLink}
              to={href}
              className={`navbar-mobile-link ${isActive(href)}`}
            >
              {label}
            </MenuItem>
          ))}
        </Menu>
      </Toolbar>
    </AppBar>
  );
};