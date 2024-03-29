import { useRef, useState, useEffect } from 'react'
import QRCode from 'qrcode'
import {
  EmailField,
  Form,
  NumberField,
  Submit,
  TelField,
  TextAreaField,
  TextField,
  UrlField,
} from '@redwoodjs/forms'

import ErrorIcon from 'src/icons/error.svg'
import Button from 'src/components/Button'
import TabSelector from 'src/components/TabSelector'

const QRGenerator = () => {
  const canvasRef = useRef(null)
  const [type, setType] = useState<QRCodeType>('Text')
  const [qrError, setQRError] = useState(false)

  const setQROnCanvas = async (data: string) => {
    if (!canvasRef.current || !data) {
      // Clear the canvas
      canvasRef.current
        ?.getContext('2d')
        ?.clearRect(0, 0, canvasRef?.current?.width, canvasRef?.current?.height)

      return
    }

    try {
      await QRCode.toCanvas(canvasRef.current, data, {
        width: 256,
        margin: 0,
      })
    } catch (e) {
      setQRError(true)
      console.error(e)
    }
  }

  const downloadQR = () => {
    if (!canvasRef.current) {
      return
    }

    const link = document.createElement('a')
    link.download = 'QR.png'
    link.href = canvasRef.current.toDataURL('image/png')
    link.click()
  }

  // Default QR code
  useEffect(() => {
    setQROnCanvas('https://redwoodjs.com')
  }, [])

  const generateQR = ({ text, url, name, phone, email, lat, lng }) => {
    setQRError(false)
    switch (type) {
      case 'Text':
        !text && setQRError(true)
        setQROnCanvas(text)
        break
      case 'URL':
        !url && setQRError(true)
        setQROnCanvas(url)
        break
      case 'Phone':
        !phone && setQRError(true)
        setQROnCanvas(`tel:${phone}`)
        break
      case 'Email':
        !email && setQRError(true)
        setQROnCanvas(`mailto:${email}`)
        break
      case 'Contact':
        !name && !phone && !email && setQRError(true)
        setQROnCanvas(
          `BEGIN:VCARD\nVERSION:3.0\nN:${name}\nTEL:${phone}\nEMAIL:${email}\nEND:VCARD`
        )
        break
      case 'Location':
        !lat && !lng && setQRError(true)
        setQROnCanvas(
          `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`
        )
        break
    }
  }

  return (
    <div className="w-full max-w-2xl rounded bg-white shadow">
      <TabSelector<QRCodeType>
        options={Object.keys(QRGeneratorFields) as QRCodeType[]}
        currentValue={type}
        defaultValue="Text"
        onChange={setType}
      />
      <div className="flex flex-col items-center justify-between gap-10 p-4 sm:flex-row sm:items-start sm:py-6 sm:px-10">
        <Form
          onSubmit={generateQR}
          className="flex w-full flex-1 flex-col gap-2"
        >
          {QRGeneratorFields[type]}
          <div className="flex gap-2">
            <Button as={Submit} data-testid="generate">
              Generate
            </Button>
            {!qrError && <Button onClick={downloadQR}>Download</Button>}
          </div>
        </Form>
        {qrError ? (
          <div className="flex h-[256px] w-[256px] flex-col items-center justify-center gap-4 border-2 border-red-800 p-4">
            <ErrorIcon className="h-12 w-12 fill-red-800" />
            <p data-testid="error" className="text-sm text-red-800">
              Whoops! Couldn&apos;t create the QR. Sure you entered valid input?
            </p>
          </div>
        ) : (
          <canvas ref={canvasRef} />
        )}
      </div>
    </div>
  )
}

const QRGeneratorFields = {
  Text: (
    <TextAreaField
      data-testid="text-input"
      name="text"
      placeholder="Enter text"
    />
  ),
  URL: <UrlField data-testid="url-input" name="url" placeholder="Enter URL" />,
  Phone: (
    <TelField
      data-testid="phone-input"
      name="phone"
      placeholder="Enter phone number"
    />
  ),
  Email: (
    <EmailField
      data-testid="email-input"
      name="email"
      placeholder="Enter email"
    />
  ),
  Contact: (
    <>
      <TextField
        data-testid="contact-name"
        name="name"
        placeholder="Enter name"
      />
      <TelField
        data-testid="contact-phone"
        name="phone"
        placeholder="Enter phone number"
      />
      <EmailField
        data-testid="contact-email"
        name="email"
        placeholder="Enter email"
      />
    </>
  ),
  Location: (
    <>
      <NumberField
        data-testid="lat-input"
        name="lat"
        placeholder="Enter latitude"
        step="any"
      />
      <NumberField
        data-testid="lng-input"
        name="lng"
        placeholder="Enter longitude"
        step="any"
      />
    </>
  ),
}

type QRCodeType = keyof typeof QRGeneratorFields

export default QRGenerator
