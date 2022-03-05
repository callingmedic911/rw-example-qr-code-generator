import { MetaTags } from '@redwoodjs/web'
import QRGenerator from 'src/components/QRGenerator'

const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-10 bg-gray-100 p-4 sm:p-0 md:h-screen">
      <MetaTags
        title="QR Code Generator"
        description="Generate QR Code from text, link, contact and more!"
      />

      <h1 className="bg-gradient-to-br from-violet-500 to-sky-400 bg-clip-text text-4xl font-extrabold text-transparent sm:text-5xl lg:text-7xl">
        QR Generator
      </h1>
      <QRGenerator />
    </div>
  )
}

export default HomePage
