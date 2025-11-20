# Felinos - Cat Gallery Web Application

A beautiful, elegant, and interactive web application for discovering and exploring cats using the CATAAS API. Built with Next.js, React, and modern web technologies.

## Features

### 🖼️ Interactive Cat Gallery
- Browse a curated collection of beautiful cat images
- Responsive grid layout that adapts to all screen sizes
- Infinite scroll to load more cats on demand
- Smooth hover effects and transitions

### ❤️ Favorites System
- Mark your favorite cats with a heart icon
- Favorites are displayed with a distinct visual indicator
- Works seamlessly across the entire gallery

### 🔍 Detailed Cat Viewer
- Click on any cat to view it in full detail
- Share cat images directly or copy to clipboard
- Download high-quality cat images
- Large, immersive viewing experience

### 🌙 Dark Mode Support
- Automatic detection of system theme preference
- Toggle between light and dark modes
- Carefully designed color scheme for both themes
- Smooth theme transitions

### 💬 "Say Something" Feature
- Create custom images with your own text using the CATAAS API
- Customize font size and color
- Download your creations
- Perfect for memes and fun messages

### ℹ️ About Section
- Learn about the mission and vision of Felinos
- Understand why cats are special
- Discover the technology powering the application

### 📱 Fully Responsive Design
- Mobile-first design approach
- Optimized for tablets, laptops, and desktops
- Touch-friendly interface
- Fast loading times

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: Lucide Icons
- **API**: CATAAS (Cat as a Service) & The Cat API
- **Image Optimization**: Next.js Image component

## Installation

1. Clone the repository:
\`\`\`bash
git clone <repository-url>
cd cat-api-website
\`\`\`

2. Install dependencies using the shadcn CLI:
\`\`\`bash
npx shadcn-cli@latest init
\`\`\`

Or download and unzip the project, then install manually:
\`\`\`bash
npm install
\`\`\`

3. Run the development server:
\`\`\`bash
npm run dev
\`\`\`

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## API Endpoints Used

### The Cat API
- **Gallery Images**: `https://api.thecatapi.com/v1/images/search?limit=12&order=RANDOM`
- Fetches random cat images to populate the gallery

### CATAAS (Cat as a Service)
- **Cat Says**: `/cat/says/:text?fontSize=:size&fontColor=:color`
- Creates custom images of cats with personalized text
- Supports custom font sizes and colors

## Project Structure

\`\`\`
├── app/
│   ├── page.tsx           # Main page component
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Global styles
├── components/
│   ├── header.tsx         # Navigation header with theme toggle
│   ├── cat-gallery.tsx    # Cat gallery grid
│   ├── cat-detail.tsx     # Cat detail view
│   ├── about-section.tsx  # About section
│   ├── say-something.tsx  # Cat says feature
│   └── footer.tsx         # Footer with social links
├── lib/
│   └── utils.ts           # Utility functions
└── public/                # Static assets
\`\`\`

## Key Features Explained

### Theme System
The application automatically detects your system's color preference and applies the appropriate theme. Users can manually toggle between light and dark modes using the button in the header.

### Cat Gallery
- Displays a grid of random cat images
- Lazy loading with the "Load More Cats" button
- Heart button for marking favorites (Black in light mode, Orange in dark mode)
- Click to expand any cat for detailed view

### Download Functionality
- Download cat images directly from the gallery or detail view
- Download custom cat messages from the "Say Something" section
- Handles CORS properly for reliable downloads

### Responsive Design
- Mobile: 1 column layout
- Tablet: 2 column layout  
- Desktop: 3 column layout
- All components scale beautifully across devices

## Customization

### Colors
Modify the design tokens in `app/globals.css`:
- `--background`: Main background color
- `--foreground`: Main text color
- `--primary`: Primary accent color
- `--muted`: Muted background color

### Fonts
The project uses system fonts optimized for web performance. Modify the font family in `app/globals.css` if desired.

## Browser Support

- Chrome/Edge: Latest 2 versions
- Firefox: Latest 2 versions
- Safari: Latest 2 versions
- Mobile browsers: iOS Safari, Chrome Mobile

## Performance Optimizations

- Image optimization with Next.js Image component
- Lazy loading of cat images
- Responsive images for different screen sizes
- Efficient state management with React hooks
- CSS-in-JS for minimal bundle size

## Future Enhancements

- User authentication and profile system
- Save favorites to a database
- Share galleries with friends
- Cat breed identification
- AI-powered cat recommendations
- PWA support for offline viewing

## License

This project is open source and available under the MIT License.

## Contributing

We welcome contributions! Feel free to:
- Report bugs and issues
- Suggest new features
- Submit pull requests
- Improve documentation

## Support

For issues, questions, or suggestions, please open an issue in the repository.

## Acknowledgments

- [The Cat API](https://thecatapi.com/) - For providing the cat images
- [CATAAS](https://cataas.com/) - For the cat says functionality
- [Tailwind CSS](https://tailwindcss.com/) - For the styling framework
- [Next.js](https://nextjs.org/) - For the React framework

---

**Made with ❤️ for cat lovers everywhere**
