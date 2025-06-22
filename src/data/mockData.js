export const initialClients = [
  { id: 1, name: 'Select Client', value: '' },
  { id: 2, name: 'Acme Corp', value: 'acme-corp' },
  { id: 3, name: 'TechStart Inc', value: 'techstart-inc' },
  { id: 4, name: 'Green Valley Co', value: 'green-valley' },
  { id: 5, name: "Perry's Ice Cream", value: 'perrys-ice-cream' }
];

export const initialChatMessages = [
  { 
    id: 1, 
    type: 'bot', 
    message: 'Hello! I am your AI assistant for this client. I can help you find information from their brand materials, meeting transcripts, and documents. What would you like to know?' 
  }
];

export const initialOnboardingProgress = {
  'business-foundation': { completed: true, completedAt: '2024-07-15' },
  'target-audience': { completed: true, completedAt: '2024-07-15' },
  'brand-positioning': { completed: true, completedAt: '2024-07-16' },
  'digital-assets': { completed: false, completedAt: null },
  'financial-landmines': { completed: false, completedAt: null }
};

export const initialUploadedFiles = [
  {
    id: 'perrys-meeting-1',
    name: 'Perry\'s Meeting Transcript - July 2024.pdf',
    size: 245760,
    type: 'application/pdf',
    uploadedAt: new Date().toLocaleString(),
    processed: true,
    status: 'processed'
  },
  {
    id: 'perrys-brand-guide',
    name: 'Perry\'s Brand Guidelines 4th Edition.pdf',
    size: 892160,
    type: 'application/pdf', 
    uploadedAt: new Date().toLocaleString(),
    processed: true,
    status: 'processed'
  }
];

export const initialProcessedDocuments = {
  'perrys-meeting-1': {
    id: 'perrys-meeting-1',
    name: 'Perry\'s Meeting Transcript - July 2024.pdf',
    type: 'transcript',
    content: `Meeting Transcript: Perry's Ice Cream - Discovery Session

ATTENDEES: Gayle Denning (Perry's), Mya Priester (Perry's)

KEY DISCUSSION POINTS:
- Major shipping challenges with current setup
- Exploring Gold Belly partnership for order fulfillment
- DoorDash integration going live July 7th
- Need better search by ingredients functionality
- Clean label/ingredient questions increasing
- 70+ flavors, 20 still need ingredient addressing`,
    processedAt: new Date().toISOString(),
    keywords: ['shipping', 'gold-belly', 'doorDash', 'search', 'clean-label'],
    summary: 'Discovery session covering operational challenges and platform improvements.'
  },
  'perrys-brand-guide': {
    id: 'perrys-brand-guide',
    name: 'Perry\'s Brand Guidelines 4th Edition.pdf',
    type: 'pdf',
    content: `Brand Guidelines: Perry's Ice Cream

BRAND IDENTITY:
- Primary Colors: PMS 186 Red (#DC2032), Perry's Black (#001722)
- Tagline: "Life is a Bowl of Perry's"
- 105+ year family ice cream company
- Slow-cooked, small batch, creamier, richer ice cream
- Brand Promise: Premium quality through traditional methods`,
    processedAt: new Date().toISOString(),
    keywords: ['brand-identity', 'slow-cooked', 'family-company', 'premium-ice-cream'],
    summary: 'Comprehensive brand guidelines covering heritage and visual identity.'
  }
};
