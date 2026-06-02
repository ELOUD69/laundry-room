import Navbar    from '@/components/Navbar'
import Hero      from '@/components/Hero'
import Events    from '@/components/Events'
import VIPBooking from '@/components/VIPBooking'
import Guestlist from '@/components/Guestlist'
import Gallery   from '@/components/Gallery'
import About     from '@/components/About'
import Footer    from '@/components/Footer'

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Events />
      <VIPBooking />
      <Guestlist />
      <Gallery />
      <About />
      <Footer />
    </main>
  )
}
