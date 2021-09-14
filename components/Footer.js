import React from 'react'

function Footer() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-4 gap-y-10 px-32 py-14 bg-gray-100 text-gray-600">
      <div className="space-y-4 text-xs text-gray-800">
        <h5 className="font-bold">ABOUT</h5>
        <p>How Airbnb works</p>
        <p>Newsroom</p>
        <p>Investors</p>
        <p>Airbnb Plus</p>
        <p>Airbnb Luxe</p>
      </div>
      <div className=" space-y-4 text-xs text-gray-800">
        <h5 className="font-bold">COMMUNITY</h5>
        <p>Accessibility</p>
        <p>This is not a real site</p>
        <p>Its a pretty awesome clone</p>
        <p>Referalls accepted</p>
        <p>Sean OReilly - Frontend Dev</p>
      </div>
      <div className=" space-y-4 text-xs text-gray-800">
        <h5 className="font-bold">HOST</h5>
        <p>Sean OReilly</p>
        <p>Presents</p>
        <p>This pretty awesome Airbnb clone</p>
        <a className="block text-blue-400" href="https://www.seanpatrick.io">
          Check out my portfolio!
        </a>
        <p>Experienced Frontend Developer</p>
      </div>
      <div className=" space-y-4 text-xs text-gray-800">
        <h5 className="font-bold">SUPPORT</h5>
        <p>Help Center</p>
        <p>Trust & Safety</p>
        <p>Say Hi</p>
        <a
          className="block text-blue-400"
          href="www.github.com/seano424/airbnb-clone"
        >
          Further details
        </a>
      </div>
    </section>
  )
}

export default Footer
