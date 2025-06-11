import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Box,
  Typography,
  Slider,
  TextField,
  Button,
  FormGroup,
  FormControlLabel,
  Checkbox,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import './SideBar.scss';

interface FilterValues {
  minPrice: number;
  maxPrice: number;
  duration: string[];
  rating: string[];
  region: string[];
}

interface SideBarProps {
  onApply: (filters: Partial<FilterValues>) => void;
  onReset: () => void;
}

const minValue = 0;
const maxValue = 20000;

const validationSchema = Yup.object({
  minPrice: Yup.number().min(minValue).max(Yup.ref('maxPrice')).default(minValue),
  maxPrice: Yup.number().min(Yup.ref('minPrice')).max(maxValue).default(maxValue),
  duration: Yup.array().of(Yup.string()),
  rating: Yup.array().of(Yup.string()).max(2, 'Select up to 2 ratings'),
  region: Yup.array().of(Yup.string()),
});

export const SideBar: React.FC<SideBarProps> = ({ onApply, onReset }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const formik = useFormik<FilterValues>({
    initialValues: {
      minPrice: minValue,
      maxPrice: maxValue,
      duration: [],
      rating: [],
      region: [],
    },
    validationSchema,
    onSubmit: (values) => {
      onApply({
        minPrice: values.minPrice !== minValue ? values.minPrice : undefined,
        maxPrice: values.maxPrice !== maxValue ? values.maxPrice : undefined,
        duration: values.duration.length ? values.duration : undefined,
        rating: values.rating.length ? values.rating : undefined,
        region: values.region.length ? values.region : undefined,
      });
    },
  });

  const handleReset = () => {
    formik.resetForm();
    onReset();
  };

  const hasActiveFilters = () =>
    formik.values.minPrice !== minValue ||
    formik.values.maxPrice !== maxValue ||
    formik.values.duration.length > 0 ||
    formik.values.rating.length > 0 ||
    formik.values.region.length > 0;

  const handleSliderChange = (_: Event, value: number | number[]) => {
    if (Array.isArray(value)) {
      formik.setFieldValue('minPrice', value[0]);
      formik.setFieldValue('maxPrice', value[1]);
    }
  };

  return (
    <Box className="SideBar" component="form" onSubmit={formik.handleSubmit}>
      {/* Header */}
      <Box className="SideBar-header">
        <Typography variant="h6" component="h3">
          Filters
        </Typography>
        {hasActiveFilters() && (
          <Button
            variant="text"
            color="primary"
            className="SideBar-reset-link"
            onClick={handleReset}
            size="small"
          >
            Clear All
          </Button>
        )}
      </Box>

      {/* Price Filter */}
      <Box className="SideBar-section">
        <Typography variant="subtitle1" className="SideBar-section-title">
          Price (₴)
        </Typography>
        <Box className="SideBar-slider">
          <Slider
            value={[formik.values.minPrice, formik.values.maxPrice]}
            onChange={handleSliderChange}
            min={minValue}
            max={maxValue}
            step={100}
            valueLabelDisplay="auto"
            className="SideBar-slider-control"
          />
          <Box className="SideBar-inputs">
            <Box className="SideBar-input-group">
              <Typography variant="caption">From</Typography>
              <TextField
                name="minPrice"
                value={formik.values.minPrice}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                size="small"
                type="number"
                inputProps={{ min: minValue, max: formik.values.maxPrice - 100 }}
                aria-label="Minimum price"
                className="SideBar-input"
                error={formik.touched.minPrice && !!formik.errors.minPrice}
                helperText={formik.touched.minPrice && formik.errors.minPrice}
              />
            </Box>
            <Box className="SideBar-input-group">
              <Typography variant="caption">To</Typography>
              <TextField
                name="maxPrice"
                value={formik.values.maxPrice}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                size="small"
                type="number"
                inputProps={{ min: formik.values.minPrice + 100, max: maxValue }}
                aria-label="Maximum price"
                className="SideBar-input"
                error={formik.touched.maxPrice && !!formik.errors.maxPrice}
                helperText={formik.touched.maxPrice && formik.errors.maxPrice}
              />
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Region Filter */}
      <Box className="SideBar-section">
        <Typography variant="subtitle1" className="SideBar-section-title">
          Region
        </Typography>
        <FormGroup className="SideBar-checkbox-group">
          {[
            { value: '1', label: 'Europe' },
            { value: '2', label: 'Asia' },
            { value: '3', label: 'America' },
            { value: '4', label: 'Africa' },
            { value: '5', label: 'Oceania' },
          ].map(({ value, label }) => (
            <FormControlLabel
              key={value}
              control={
                <Checkbox
                  name="region"
                  value={value}
                  checked={formik.values.region.includes(value)}
                  onChange={formik.handleChange}
                  className="SideBar-checkbox"
                />
              }
              label={label}
            />
          ))}
        </FormGroup>
      </Box>

      {/* Duration Filter */}
      <Box className="SideBar-section">
        <Typography variant="subtitle1" className="SideBar-section-title">
          Tour Duration
        </Typography>
        <FormGroup className="SideBar-checkbox-group">
          {[
            { value: '5', label: '5 days' },
            { value: '7', label: '7 days' },
            { value: '10', label: '10 days' },
          ].map(({ value, label }) => (
            <FormControlLabel
              key={value}
              control={
                <Checkbox
                  name="duration"
                  value={value}
                  checked={formik.values.duration.includes(value)}
                  onChange={formik.handleChange}
                  className="SideBar-checkbox"
                />
              }
              label={label}
            />
          ))}
        </FormGroup>
      </Box>

      {/* Rating Filter */}
      <Box className="SideBar-section">
        <Typography variant="subtitle1" className="SideBar-section-title">
          Tour Rating
        </Typography>
        <FormGroup className="SideBar-checkbox-group">
          <Box className="SideBar-ratings">
            {[
              { value: '5', stars: '★★★★★' },
              { value: '4', stars: '★★★★', empty: '★' },
              { value: '3', stars: '★★★', empty: '★★' },
              { value: '2', stars: '★★', empty: '★★★' },
              { value: '1', stars: '★', empty: '★★★★' },
            ].map(({ value, stars, empty }) => (
              <FormControlLabel
                key={value}
                control={
                  <Checkbox
                    name="rating"
                    value={value}
                    checked={formik.values.rating.includes(value)}
                    onChange={(e) => {
                      const newRatings = e.target.checked
                        ? [...formik.values.rating, value]
                        : formik.values.rating.filter((r) => r !== value);
                      if (newRatings.length <= 2) {
                        formik.setFieldValue('rating', newRatings);
                      }
                    }}
                    className="SideBar-checkbox"
                    disabled={formik.values.rating.length >= 2 && !formik.values.rating.includes(value)}
                  />
                }
                label={
                  <Box className="SideBar-rating">
                    <span className="stars">{stars}</span>
                    {empty && <span className="empty-stars">{empty}</span>}
                  </Box>
                }
              />
            ))}
          </Box>
          {formik.touched.rating && formik.errors.rating && (
            <Typography color="error" variant="caption">
              {formik.errors.rating}
            </Typography>
          )}
        </FormGroup>
      </Box>

      {/* Actions */}
      <Box className="SideBar-actions">
        <Button
          variant="outlined"
          color="secondary"
          onClick={handleReset}
          className="SideBar-btn-reset"
          fullWidth={isMobile}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className="SideBar-btn-apply"
          fullWidth={isMobile}
        >
          Apply
        </Button>
      </Box>
    </Box>
  );
};