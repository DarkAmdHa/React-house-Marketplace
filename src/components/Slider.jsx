import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore'
import { db } from '../firebase.config'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css/bundle'
import Spinner from './Spinner'

function Slider() {
  const [loading, setLoading] = useState(true)
  const [listings, setListings] = useState(null)

  const navigate = useNavigate()

  useEffect(() => {
    const fetchLatest = async () => {
      const listingsRef = collection(db, 'listings')
      const q = query(listingsRef, orderBy('timestamp', 'desc'), limit(5))
      const querySnap = await getDocs(q)

      let listings = []
      querySnap.forEach((doc) =>
        listings.push({ id: doc.id, data: doc.data() })
      )

      setListings(listings)
      setLoading(false)
    }

    fetchLatest()
  }, [])

  if (loading) {
    return <Spinner />
  }

  if (listings.length === 0) {
    return <></>
  }

  return (
    listings && (
      <>
        <p className="exploreHeading">Latest listings</p>

        <Swiper
          slidesPerView={1}
          pagination={{ clickable: true }}
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          navigation
          scrollbar={{ draggable: true }}
        >
          {listings.map(({ data, id }) => (
            <SwiperSlide
              key={id}
              onClick={() => navigate(`category/${data.type}/${id}`)}
            >
              <div
                className="swiperSlideDiv"
                style={{
                  background: `url(${data.imageUrls[0]}) center no-repeat`,
                  backgroudnSize: 'cover',
                  minHeight: '26rem',
                }}
              >
                <p className="swiperSlideText">{data.name}</p>
                <p className="swiperSlidePrice">
                  ${data.discountedPrice ?? data.regularPrice}{' '}
                  {data.type === 'rent' && '/ Month'}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </>
    )
  )
}

export default Slider
