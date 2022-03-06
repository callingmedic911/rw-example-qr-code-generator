import { MetaTags } from '@redwoodjs/web'
import QRGenerator from 'src/components/QRGenerator'

const HomePage = () => {
  return (
    <div className="flex h-screen flex-col items-center gap-10 bg-gray-100 px-4 py-8 sm:justify-center sm:p-0">
      <MetaTags
        title="QR Code Generator"
        description="Generate QR Code from text, link, contact and more!"
      />

      <h1 className="bg-gradient-to-br from-violet-500 to-sky-400 bg-clip-text text-5xl font-extrabold text-transparent sm:text-6xl lg:text-7xl">
        QR Generator
      </h1>
      <QRGenerator />
    </div>
  )
}

export default HomePage
