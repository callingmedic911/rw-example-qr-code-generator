import { render, screen, fireEvent, waitFor } from '@redwoodjs/testing/web'
import QRCode from 'qrcode'

import QRGenerator from './QRGenerator'

jest.mock('qrcode')

describe('QrGenerator', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<QRGenerator />)
    }).not.toThrow()
  })

  it('shows error if missing input', async () => {
    const qrCode = render(<QRGenerator />)
    const textInput = qrCode.getByTestId('text-input') as HTMLTextAreaElement
    const generateButton = qrCode.getByTestId('generate')

    fireEvent.change(textInput, { target: { value: '' } })
    fireEvent.click(generateButton)

    await waitFor(() => screen.getByTestId('error'))
  })

  it('generates QR with text input', async () => {
    const qrCode = render(<QRGenerator />)
    const textInput = qrCode.getByTestId('text-input') as HTMLTextAreaElement
    const generateButton = qrCode.getByTestId('generate')

    fireEvent.change(textInput, { target: { value: 'test' } })
    fireEvent.click(generateButton)

    await waitFor(() =>
      expect(QRCode.toCanvas).toHaveBeenCalledWith(
        expect.any(HTMLCanvasElement),
        'test',
        {
          margin: 0,
          width: 256,
        }
      )
    )
  })

  it('generates QR with url input', async () => {
    const qrCode = render(<QRGenerator />)
    fireEvent.click(screen.getAllByText('URL')?.[1])
    const urlInput = qrCode.getByTestId('url-input') as HTMLInputElement
    const generateButton = qrCode.getByTestId('generate')

    fireEvent.change(urlInput, { target: { value: 'http://example.com' } })
    fireEvent.click(generateButton)

    await waitFor(() =>
      expect(QRCode.toCanvas).toHaveBeenCalledWith(
        expect.any(HTMLCanvasElement),
        'http://example.com',
        {
          margin: 0,
          width: 256,
        }
      )
    )
  })

  it('generates QR with phone input', async () => {
    const qrCode = render(<QRGenerator />)
    fireEvent.click(screen.getAllByText('Phone')?.[1])
    const phoneInput = qrCode.getByTestId('phone-input') as HTMLInputElement
    const generateButton = qrCode.getByTestId('generate')

    fireEvent.change(phoneInput, { target: { value: '000000000' } })
    fireEvent.click(generateButton)

    await waitFor(() =>
      expect(QRCode.toCanvas).toHaveBeenCalledWith(
        expect.any(HTMLCanvasElement),
        'tel:000000000',
        {
          margin: 0,
          width: 256,
        }
      )
    )
  })

  it('generates QR with email input', async () => {
    const qrCode = render(<QRGenerator />)
    fireEvent.click(screen.getAllByText('Email')?.[1])
    const emailInput = qrCode.getByTestId('email-input') as HTMLInputElement
    const generateButton = qrCode.getByTestId('generate')

    fireEvent.change(emailInput, { target: { value: 'jest@test.com' } })
    fireEvent.click(generateButton)

    await waitFor(() =>
      expect(QRCode.toCanvas).toHaveBeenCalledWith(
        expect.any(HTMLCanvasElement),
        'mailto:jest@test.com',
        {
          margin: 0,
          width: 256,
        }
      )
    )
  })

  it('generates QR with contacts input', async () => {
    const qrCode = render(<QRGenerator />)
    fireEvent.click(screen.getAllByText('Contact')?.[1])

    // Fill up the form
    const nameInput = qrCode.getByTestId('contact-name') as HTMLInputElement
    fireEvent.change(nameInput, { target: { value: 'Good Name' } })
    const phoneInput = qrCode.getByTestId('contact-phone') as HTMLInputElement
    fireEvent.change(phoneInput, { target: { value: '000000000' } })
    const emailInput = qrCode.getByTestId('contact-email') as HTMLInputElement
    fireEvent.change(emailInput, { target: { value: 'jest@test.com' } })

    const generateButton = qrCode.getByTestId('generate')
    fireEvent.click(generateButton)

    await waitFor(() =>
      expect(QRCode.toCanvas).toHaveBeenCalledWith(
        expect.any(HTMLCanvasElement),
        'BEGIN:VCARD\nVERSION:3.0\nN:Good Name\nTEL:000000000\nEMAIL:jest@test.com\nEND:VCARD',
        {
          margin: 0,
          width: 256,
        }
      )
    )
  })

  it('generates QR with location input', async () => {
    const qrCode = render(<QRGenerator />)
    fireEvent.click(screen.getAllByText('Location')?.[1])

    // Fill up the form
    const latInput = qrCode.getByTestId('lat-input') as HTMLInputElement
    fireEvent.change(latInput, { target: { value: '11.111111' } })
    const lngInput = qrCode.getByTestId('lng-input') as HTMLInputElement
    fireEvent.change(lngInput, { target: { value: '22.222222' } })

    const generateButton = qrCode.getByTestId('generate')
    fireEvent.click(generateButton)

    await waitFor(() =>
      expect(QRCode.toCanvas).toHaveBeenCalledWith(
        expect.any(HTMLCanvasElement),
        'https://www.google.com/maps/search/?api=1&query=11.111111,22.222222',
        {
          margin: 0,
          width: 256,
        }
      )
    )
  })
})
