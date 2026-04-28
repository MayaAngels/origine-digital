// app/api/email/send/route.ts
import { NextRequest, NextResponse } from 'next/server'

const BREVO_API_KEY = process.env.BREVO_API_KEY

export async function POST(request: NextRequest) {
  try {
    const { to, template, data } = await request.json()
    
    let subject = ''
    let htmlContent = ''
    
    switch (template) {
      case 'welcome':
        subject = 'Welcome to Origine.Digital!'
        htmlContent = `
          <h1>Welcome to Origine.Digital, ${data.name}!</h1>
          <p>We're excited to have you on board. Start exploring our products and services.</p>
          <a href="https://origine.digital/shop">Browse Shop →</a>
        `
        break
        
      case 'birthday':
        subject = 'Happy Birthday! 🎂'
        htmlContent = `
          <h1>Happy Birthday, ${data.name}!</h1>
          <p>As a gift, here's a 20% discount code: <strong>BIRTHDAY20</strong></p>
          <a href="https://origine.digital/shop">Shop Now →</a>
        `
        break
        
      case 'abandoned-cart':
        subject = 'You left something behind...'
        htmlContent = `
          <h1>Don't forget your items!</h1>
          <p>Use code <strong>SAVE10</strong> for 10% off your cart.</p>
          <a href="https://origine.digital/cart">Complete Purchase →</a>
        `
        break
        
      case 'order-confirmation':
        subject = `Order Confirmation #${data.orderId}`
        htmlContent = `
          <h1>Thank you for your order, ${data.name}!</h1>
          <p>Your order #${data.orderId} has been confirmed.</p>
          <h2>Download Links:</h2>
          <ul>
            ${data.items.map((item: any) => `<li><a href="${item.downloadUrl}">${item.name}</a></li>`).join('')}
          </ul>
          <h2>Instructions:</h2>
          <p>${data.instructions}</p>
          <h2>Next Steps:</h2>
          <ul>
            <li>Download your files (they never expire)</li>
            <li>Check out our <a href="https://origine.digital/services">services</a> for implementation help</li>
            <li>Join our <a href="https://origine.digital/community">community</a></li>
          </ul>
          <hr />
          <p>Questions? Reply to this email or contact support@origine.digital</p>
        `
        break
        
      default:
        subject = 'Update from Origine.Digital'
        htmlContent = `<p>${data.message || 'Thank you for being a customer!'}</p>`
    }
    
    // Enviar via Brevo
    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': BREVO_API_KEY!
      },
      body: JSON.stringify({
        sender: { email: 'hello@origine.digital', name: 'Origine.Digital' },
        to: [{ email: to }],
        subject,
        htmlContent
      })
    })
    
    if (!response.ok) {
      throw new Error('Failed to send email')
    }
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Email error:', error)
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
  }
}