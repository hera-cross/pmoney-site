import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Ticker from '@/components/Ticker';
import Yield from '@/components/Yield';
import Story from '@/components/Story';
import PonsOrigin from '@/components/PonsOrigin';
import Checker from '@/components/Checker';
import Footer from '@/components/Footer';

export default function Page() {
  return (
    <div style={{ background: '#f4f2ed', minHeight: '100vh', fontFamily: "'Space Grotesk',Helvetica,sans-serif", overflowX: 'hidden' }}>
      <Header />
      <Hero />
      <Ticker />
      <Yield />
      <Story />
      <PonsOrigin />
      <Checker />
      <Footer />
    </div>
  );
}
