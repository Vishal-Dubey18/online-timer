# ⏰ Online Timer & Stopwatch

A modern, responsive online timer and stopwatch built with React and Tailwind CSS.  
**Live Demo:** [https://online-timer-1234.vercel.app/](https://online-timer-1234.vercel.app/)

---

## 🚀 Features

- **Countdown Timer:** Set custom time, start, pause, resume, reset, and get alarm/notification when time is up.
- **Stopwatch:** High-precision stopwatch with lap support and statistics.
- **Modern UI:** Glassmorphism, dark/light mode, smooth animations, and responsive design.
- **Sound & Notifications:** Alarm sound and browser notifications when timer completes.
- **Presets & Recents:** Quick timer presets and recent timer memory.
- **Accessibility:** Keyboard navigation, ARIA labels, and screen reader support.
- **PWA Ready:** Installable and works offline (if enabled).
- **Customizable:** Easily change colors, fonts, and alarm sound.

---

## 🌐 Live Demo

👉 [https://online-timer-1234.vercel.app/](https://online-timer-1234.vercel.app/)

---

## 🛠️ Tech Stack

- **Frontend:** React 18+
- **Styling:** Tailwind CSS 3+
- **Icons:** Lucide React
- **Build Tool:** Vite
- **Deployment:** Vercel

---

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/online-timer.git
   cd online-timer
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open in your browser**
   - Visit [http://localhost:3000](http://localhost:3000)

---

## 🏗️ Project Structure

```
online-timer/
├── src/
│   ├── components/          # React components (Timer, Stopwatch, Header, etc.)
│   ├── hooks/               # Custom React hooks (useTimer, useAlarm, etc.)
│   ├── utils/               # Utility functions (time formatting, etc.)
│   ├── App.jsx              # Main app component
│   ├── main.jsx             # React entry point
│   └── index.css            # Tailwind/global styles
├── public/                  # Static assets (favicon, robots.txt, alarm.mp3)
├── package.json             # Project metadata and dependencies
├── tailwind.config.cjs      # Tailwind CSS config
├── postcss.config.cjs       # PostCSS config
├── vite.config.js           # Vite config
├── index.html               # HTML template
└── README.md                # This file
```

---

## 🔔 Alarm Sound

- The timer plays an alarm sound when time is up.
- To use your own sound, replace `public/alarm.mp3` with your preferred audio file.

---

## 🌙 Dark/Light Theme

- Toggle between dark and light mode using the theme switch in the header.
- Theme preference is saved in local storage.

---

## 🧑‍💻 Accessibility

- All controls are keyboard accessible.
- ARIA labels and roles are used for screen readers.

---

## 🚀 Deployment

### Deploy to Vercel

1. [Sign up for Vercel](https://vercel.com/signup) and connect your GitHub account.
2. Import your repository and select the Vite framework.
3. Set the build command to `npm run build` and output directory to `dist`.
4. Deploy!  
   Your app will be live at a URL like `https://online-timer-1234.vercel.app/`.
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
