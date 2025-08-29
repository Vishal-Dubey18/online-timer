# Online Timer - React Application

A modern, responsive online timer and stopwatch application built with React.js, featuring glassmorphism design and comprehensive functionality.

## 🚀 Features

### Countdown Timer
- Set custom time in HH:MM:SS or MM:SS format
- Start, Pause, Resume, and Reset functionality
- Visual progress ring with percentage indicator
- Alarm sound notification when timer completes
- Browser notifications support

### Stopwatch
- High precision timing with milliseconds
- Start, Pause, and Reset controls
- Lap timing functionality
- Clean, modern interface

### Modern UI
- Glassmorphism design with frosted glass effect
- Dark/Light theme toggle
- Responsive design for mobile and desktop
- Smooth animations and transitions
- Tailwind CSS styling

### Additional Features
- Browser notification support
- Alarm sound with mute/unmute
- Persistent theme preferences
- Keyboard shortcuts support
- Clean, modular React components

## 🛠️ Tech Stack

- **Frontend**: React.js 19.1.1
- **Styling**: Tailwind CSS 3.4.17
- **Build Tool**: Vite 7.1.2
- **Icons**: Lucide React
- **Deployment**: Vercel (recommended)

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd online-timer
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:3000`

## 🏗️ Project Structure

```
online-timer/
├── src/
│   ├── components/          # React components
│   │   ├── Countdown.jsx   # Countdown timer component
│   │   ├── Stopwatch.jsx   # Stopwatch component
│   │   ├── TimeInput.jsx   # Time input component
│   │   ├── ProgressRing.jsx # Progress visualization
│   │   ├── Header.jsx      # App header with theme toggle
│   │   └── Tabs.jsx        # Navigation tabs
│   ├── hooks/              # Custom React hooks
│   │   ├── useTimer.js     # Timer functionality
│   │   └── useAlarm.js     # Alarm and notifications
│   ├── utils/              # Utility functions
│   │   └── time.js         # Time formatting and calculations
│   ├── App.jsx             # Main application component
│   ├── main.jsx            # React entry point
│   └── index.css           # Global styles with Tailwind
├── public/                 # Static assets
├── package.json           # Dependencies and scripts
├── vite.config.js         # Vite configuration
├── tailwind.config.cjs    # Tailwind CSS configuration
├── postcss.config.cjs     # PostCSS configuration
└── index.html             # HTML template
```

## 🚀 Deployment

### Vercel Deployment (Recommended)

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy to Vercel**
   ```bash
   vercel
   ```

3. **Follow the prompts**
   - Confirm project directory: `online-timer`
   - Set build command: `npm run build`
   - Set output directory: `dist`
   - No override settings needed

### Alternative: Netlify Deployment

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Drag and drop** the `dist` folder to Netlify

3. **Or connect repository** to Netlify for automatic deployments

### Manual Deployment

1. **Build for production**
   ```bash
   npm run build
   ```

2. **Deploy** the `dist` folder to your preferred hosting service

## 🎨 Customization

### Colors and Themes
Modify the glassmorphism effects in `src/index.css`:
```css
.glass-card {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(2px);
}
```

### Alarm Sound
Replace the base64 encoded sound in `src/hooks/useAlarm.js` with your preferred audio file.

### Styling
Customize the Tailwind configuration in `tailwind.config.cjs`:
```javascript
theme: {
  extend: {
    colors: {
      glass: 'rgba(255, 255, 255, 0.1)',
      glassBorder: 'rgba(255, 255, 255, 0.3)'
    }
  }
}
```

## 📱 Browser Support

- Chrome/Edge 88+
- Firefox 85+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [React.js](https://reactjs.org/) - UI framework
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Vite](https://vitejs.dev/) - Build tool
- [Lucide](https://lucide.dev/) - Icons
- [Vercel](https://vercel.com/) - Deployment platform

## 📞 Support

If you have any questions or issues, please open an issue on GitHub or contact the development team.

---

Built with ❤️ using React.js and modern web technologies.
