import { MetaTags } from '@redwoodjs/web'
import QRGenerator from 'src/components/QRGenerator'

const HomePage = () => {
  return (
    <div className="md:h-screen flex flex-col gap-10 items-center justify-center bg-gray-100 p-4 sm:p-0">
      <MetaTags
        title="QR Code Generator"
        description="Generate QR Code from text, link, contact and more!"
      />

      <h1 className="font-extrabold text-4xl sm:text-5xl lg:text-7xl text-transparent bg-clip-text bg-gradient-to-br from-violet-500 to-sky-400">
        QR Generator
      </h1>
      <QRGenerator />
    </div>
  )
}

export default HomePage
