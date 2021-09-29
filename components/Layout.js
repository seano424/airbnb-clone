import Header from './Header'
import Footer from './Footer'

function Layout({ children }) {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="h-24">
        <Header />
      </div>
      <main className="flex flex-col h-screen flex-1 relative">
        <div className="flex overflow-hidden">{children}</div>
      </main>
      <Footer />
    </div>
  )
}

export default Layout
