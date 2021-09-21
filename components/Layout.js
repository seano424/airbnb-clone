import Header from './Header'
import Footer from './Footer'

function Layout({ children }) {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex flex-col h-screen flex-1 relative">
        <Header />
        <div>{children}</div>
      </main>
      <Footer />
    </div>
  )
}

export default Layout
