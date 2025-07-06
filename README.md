# Sibyl - AI-Powered Client Management System

> BY AGENCY 15

Sibyl is a comprehensive client management and AI assistant application designed specifically for agencies to streamline client onboarding, document management, and discovery processes.

## 🌟 Features

### 🤖 AI Assistant

-   Intelligent chat interface powered by document analysis
-   Quick actions for common queries
-   Context-aware responses based on uploaded client materials

### 📋 Discovery Framework

-   Structured questionnaire system covering:
    -   Business Foundation & Objectives
    -   Target Audience & Customer Insights
    -   Brand Positioning & Messaging
    -   Digital Assets & Access Management
    -   Financial & Legal Considerations

### 📁 Document Management

-   File upload and processing simulation
-   Support for multiple file types (PDF, images, documents)
-   Organized storage by category (Brand Assets, Transcripts, Legal, etc.)
-   Required documents checklist

### 📊 Progress Tracking

-   Visual onboarding progress indicators
-   Completion tracking for discovery sections
-   Client-specific progress management

### 🔐 Credentials Management

-   Secure client login storage (browser-based)
-   Copy-to-clipboard functionality
-   Organized by platform/service

### 👥 Multi-Client Support

-   Easy client switching
-   Individual client data management
-   Add new clients on-the-fly

## 🛠️ Technology Stack

-   **Frontend**: React 18 with Vite
-   **Icons**: Lucide React
-   **Styling**: Custom CSS utility system (no framework dependencies)
-   **State Management**: Custom React hooks
-   **Build Tool**: Vite
-   **Package Manager**: npm

## 🚀 Getting Started

### Prerequisites

-   Node.js (v14 or higher)
-   npm (v6 or higher)

### Installation

1. Clone the repository:

git clone [your-repo-url]
cd sibyl-app

Install dependencies:

bash
npm install

Start the development server:

bash
npm run dev

Open your browser and navigate to http://localhost:5173

📖 Usage
Quick Start

Select a Client: Use the dropdown in the sidebar to choose a client
Upload Documents: Go to any document section and upload client materials
Ask Questions: Use the AI Assistant to query client information
Track Progress: Monitor onboarding completion in the Progress section

AI Assistant
The AI assistant can help you with:

Analyzing client target audiences
Extracting brand guidelines information
Summarizing meeting transcripts
Generating ideal customer profiles (ICPs)

Discovery Framework
Navigate through structured discovery questions organized by:

Business Foundation: Goals, challenges, success metrics
Target Audience: Demographics, customer journey, personas
Brand Positioning: Personality, messaging, emotional connection
Digital Assets: Website, social media, advertising accounts
Financial & Legal: Payment terms, scope limitations, IP ownership

🏗️ Project Structure

src/
├── components/
│ ├── chat/ # AI chat interface
│ ├── common/ # Reusable components
│ ├── credentials/ # Login management
│ ├── discovery/ # Discovery framework
│ ├── documents/ # File management
│ ├── layout/ # App layout components
│ └── progress/ # Progress tracking
├── data/ # Static data and configurations
├── hooks/ # Custom React hooks
├── utils/ # Utility functions
└── index.css # Custom CSS utility system

🎨 Custom CSS System
This project uses a custom CSS utility system similar to Tailwind CSS but without external dependencies. Key features:

Responsive design utilities
Flexbox and grid layouts
Color system with consistent palette
Typography and spacing utilities
Interactive states (hover, focus, disabled)
Custom animations and transitions

📱 Responsive Design
Sibyl is fully responsive and works on:

Desktop computers
Tablets
Mobile devices

🔒 Security Notes

Client credentials are stored locally in the browser
No sensitive data is transmitted to external servers
For production use, implement proper credential encryption and storage

🚀 Deployment
Build for Production

npm run build

npm run preview

The build artifacts will be stored in the dist/ directory.
🤝 Contributing

Fork the repository
Create your feature branch (git checkout -b feature/amazing-feature)
Commit your changes (git commit -m 'Add some amazing feature')
Push to the branch (git push origin feature/amazing-feature)
Open a Pull Request

📄 License
This project is proprietary software developed by Agency 15.
📞 Support
For support and questions, please contact the development team.

Built with ❤️ by Agency 15

```

```
