import { useEffect, useState } from 'react'
import { Swiper as SwiperBase, SwiperSlide } from 'swiper/react'
import { Pagination, Navigation, A11y, Autoplay, EffectFade } from 'swiper/modules'
import { Box, Button, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchTours } from '@/store/slices/toursSlice'
import { RootState } from '@/store'
import { Loader } from '@/pages/Main/components/Loader/Loader'

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import 'swiper/css/effect-fade'

export const Swiper = () => {
  const dispatch = useDispatch()
  const { tours, loading, error } = useSelector((state: RootState) => state.tours)
  const [imageLoadErrors, setImageLoadErrors] = useState<{ [tourId: number]: boolean }>({})

  // Fetch tours when component mounts
  useEffect(() => {
    dispatch(fetchTours() as any)
  }, [dispatch])

  // Preload and validate images
  useEffect(() => {
    if (!tours) return

    tours.slice(0, 4).forEach((tour) => {
      const img = new Image()
      img.src = `http://localhost:1323${tour.imageSrc}`
      img.onerror = () => {
        setImageLoadErrors((prev) => ({ ...prev, [tour.id]: true }))
        console.warn(`Image failed to load: Tour ID ${tour.id}`)
      }
    })
  }, [tours])

  // Handle loading state
  if (loading) {
    return (
      <Box sx={{ height: 400, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Loader />
      </Box>
    )
  }

  // Handle error or empty data
  if (error || !tours) {
    return (
      <Box sx={{ height: 400, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', bgcolor: '#f9f9f9', borderRadius: 2, p: 4, textAlign: 'center', gap: 2 }}>
        <Typography variant="h6">Не вдалося завантажити тури</Typography>
        <Typography variant="body2">Спробуйте оновити сторінку або зв'яжіться з нами</Typography>
        <Button variant="contained" color="primary" onClick={() => window.location.reload()}>
          Спробувати знову
        </Button>
      </Box>
    )
  }

  const topTours = tours.slice(0, 4)
  if (topTours.length === 0) {
    return (
      <Box sx={{ height: 400, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', bgcolor: '#f9f9f9', borderRadius: 2, p: 4, textAlign: 'center', gap: 2 }}>
        <Typography variant="h6">Немає доступних турів</Typography>
        <Button component={Link} to="/Tours" variant="contained" color="primary">
          Переглянути всі тури
        </Button>
      </Box>
    )
  }

  // Main carousel rendering
  return (
    <Box
      sx={{
        my: 6,
        position: 'relative',
        height: { xs: '75vh', md: '80vh' },
        maxHeight: 800,
        '& .swiper-pagination-bullet': { width: 12, height: 12, bgcolor: '#fff', opacity: 0.6 },
        '& .swiper-pagination-bullet-active': { opacity: 1, bgcolor: '#fff' },
        '& .swiper-button-prev, & .swiper-button-next': {
          color: '#fff',
          bgcolor: 'rgba(0, 0, 0, 0.3)',
          width: 50,
          height: 50,
          borderRadius: '50%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.5)' },
          '&::after': { fontSize: '1.5rem' },
        },
      }}
    >
      <SwiperBase
        modules={[Pagination, Navigation, A11y, Autoplay, EffectFade]}
        slidesPerView={1}
        pagination={{ clickable: true, dynamicBullets: true }}
        navigation
        effect="fade"
        autoplay={{ delay: 5000, disableOnInteraction: false }}
      >
        {topTours.map((tour) => {
          const bgImage = imageLoadErrors[tour.id]
            ? '/images/fallback-tour.jpg'
            : `http://localhost:1323${tour.imageSrc}`

          return (
            <SwiperSlide key={tour.id}>
              <Box
                sx={{
                  position: 'relative',
                  height: '100%',
                  overflow: 'hidden',
                  '&:hover .swiper-slide-background': { transform: 'scale(1.05)' },
                }}
              >
                {/* Background image */}
                <Box
                  className="swiper-slide-background"
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundImage: `url("${bgImage}")`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    transition: 'transform 8s ease',
                  }}
                />
                {/* Gradient overlay */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background:
                      'linear-gradient(to right, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.4) 50%, rgba(0, 0, 0, 0.2) 100%)',
                    zIndex: 1,
                  }}
                />
                {/* Tour content box */}
                <Box
                  sx={{
                    position: 'relative',
                    zIndex: 2,
                    width: { xs: '90%', sm: '80%', md: '50%' },
                    maxWidth: 700,
                    p: { xs: 2, md: 3 },
                    ml: { xs: 'auto', md: '10%' },
                    mr: { xs: 'auto', md: 0 },
                    bgcolor: 'rgba(255, 255, 255, 0.85)',
                    borderRadius: 2,
                    boxShadow: 3,
                    backdropFilter: 'blur(4px)',
                    transition: 'transform 0.3s ease',
                  }}
                >
                  <Typography variant="h4" sx={{ fontWeight: 700, mb: 2, color: '#333' }}>
                    {tour.title}
                  </Typography>
                  <Typography variant="body1" sx={{ lineHeight: 1.6, mb: 3, color: '#555' }}>
                    {tour.description}
                  </Typography>
                  <Button
                    component={Link}
                    to={`/TourDetails/${tour.id}`}
                    variant="contained"
                    color="secondary"
                    size="large"
                    sx={{ fontWeight: 600 }}
                  >
                    {tour.callToAction}
                  </Button>
                </Box>
              </Box>
            </SwiperSlide>
          )
        })}
      </SwiperBase>
    </Box>
  )
}
