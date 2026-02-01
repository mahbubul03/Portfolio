import { useState, useEffect, useRef } from 'react'
import { ChevronDown } from 'lucide-react'

const Hero = () => {
  const [displayedText, setDisplayedText] = useState('')
  const fullText = "Mahbubul Islam"
  const [isTyping, setIsTyping] = useState(true)
  const currentIndexRef = useRef(0)
  const sectionRef = useRef(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    currentIndexRef.current = 0
    setDisplayedText('')
    setIsTyping(true)
    
    const typingSpeed = 150 // milliseconds per character
    
    const typingInterval = setInterval(() => {
      if (currentIndexRef.current < fullText.length) {
        setDisplayedText(fullText.slice(0, currentIndexRef.current + 1))
        currentIndexRef.current++
      } else {
        setIsTyping(false)
        clearInterval(typingInterval)
      }
    }, typingSpeed)

    return () => clearInterval(typingInterval)
  }, [fullText])

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect()
        // Normalize to -1 to 1 range
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2
        setMousePosition({ x, y })
      }
    }

    const section = sectionRef.current
    if (section) {
      section.addEventListener('mousemove', handleMouseMove)
      return () => section.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  // Calculate parallax offset based on distance from cursor to line center
  // Lines closer to cursor move more
  const getParallaxOffset = (centerX, centerY, baseMultiplier = 1) => {
    // Convert mouse position to SVG coordinates (0-1200 for x, 0-800 for y)
    const mouseX = (mousePosition.x + 1) * 600 // -1 to 1 -> 0 to 1200
    const mouseY = (mousePosition.y + 1) * 400 // -1 to 1 -> 0 to 800
    
    // Calculate distance from cursor to line center
    const distance = Math.sqrt(
      Math.pow(mouseX - centerX, 2) + Math.pow(mouseY - centerY, 2)
    )
    
    // Max possible distance (diagonal of SVG)
    const maxDistance = Math.sqrt(1200 * 1200 + 800 * 800)
    
    // Inverse distance: closer = higher value (1 at distance 0, approaching 0 at max distance)
    const proximity = 1 - (distance / maxDistance)
    
    // Apply multiplier - closer lines move more
    const movementFactor = proximity * baseMultiplier * 60
    
    return {
      x: mousePosition.x * movementFactor,
      y: mousePosition.y * movementFactor
    }
  }

  const scrollToSection = (href) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section
      ref={sectionRef}
      id="home"
      className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"
    >
      {/* Topographic Contour Line Pattern */}
      <div 
        className="absolute inset-0 overflow-hidden pointer-events-none"
      >
        <svg
          className="w-full h-full opacity-15 dark:opacity-10"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 800"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <style>
              {`.contour-line {
                fill: none;
                stroke: #3b82f6;
                stroke-width: 0.8;
                stroke-linecap: round;
                stroke-linejoin: round;
              }
              .dark .contour-line {
                stroke: #60a5fa;
              }`}
            </style>
          </defs>
          
          <g className="contour-lines">
            {/* Concentric circles - center peak (closest lines move most) */}
            <g style={{ transform: `translate(${getParallaxOffset(600, 400, 1.5).x}px, ${getParallaxOffset(600, 400, 1.5).y}px)`, transition: 'transform 0.08s ease-out' }}>
              <ellipse className="contour-line" cx="600" cy="400" rx="50" ry="35" />
              <ellipse className="contour-line" cx="600" cy="400" rx="100" ry="70" />
              <ellipse className="contour-line" cx="600" cy="400" rx="150" ry="105" />
            </g>
            <g style={{ transform: `translate(${getParallaxOffset(600, 400, 1.2).x}px, ${getParallaxOffset(600, 400, 1.2).y}px)`, transition: 'transform 0.08s ease-out' }}>
              <ellipse className="contour-line" cx="600" cy="400" rx="200" ry="140" />
              <ellipse className="contour-line" cx="600" cy="400" rx="250" ry="175" />
            </g>
            <g style={{ transform: `translate(${getParallaxOffset(600, 400, 0.9).x}px, ${getParallaxOffset(600, 400, 0.9).y}px)`, transition: 'transform 0.08s ease-out' }}>
              <ellipse className="contour-line" cx="600" cy="400" rx="300" ry="210" />
              <ellipse className="contour-line" cx="600" cy="400" rx="350" ry="245" />
            </g>
            <g style={{ transform: `translate(${getParallaxOffset(600, 400, 0.6).x}px, ${getParallaxOffset(600, 400, 0.6).y}px)`, transition: 'transform 0.08s ease-out' }}>
              <ellipse className="contour-line" cx="600" cy="400" rx="400" ry="280" />
              <ellipse className="contour-line" cx="600" cy="400" rx="450" ry="315" />
              <ellipse className="contour-line" cx="600" cy="400" rx="500" ry="350" />
            </g>
            
            {/* Secondary peak - top left */}
            <g style={{ transform: `translate(${getParallaxOffset(200, 150, 1.3).x}px, ${getParallaxOffset(200, 150, 1.3).y}px)`, transition: 'transform 0.08s ease-out' }}>
              <ellipse className="contour-line" cx="200" cy="150" rx="60" ry="45" />
              <ellipse className="contour-line" cx="200" cy="150" rx="120" ry="90" />
            </g>
            <g style={{ transform: `translate(${getParallaxOffset(200, 150, 0.8).x}px, ${getParallaxOffset(200, 150, 0.8).y}px)`, transition: 'transform 0.08s ease-out' }}>
              <ellipse className="contour-line" cx="200" cy="150" rx="180" ry="135" />
              <ellipse className="contour-line" cx="200" cy="150" rx="240" ry="180" />
            </g>
            
            {/* Tertiary peak - bottom right */}
            <g style={{ transform: `translate(${getParallaxOffset(1000, 650, 1.3).x}px, ${getParallaxOffset(1000, 650, 1.3).y}px)`, transition: 'transform 0.08s ease-out' }}>
              <ellipse className="contour-line" cx="1000" cy="650" rx="70" ry="50" />
              <ellipse className="contour-line" cx="1000" cy="650" rx="140" ry="100" />
            </g>
            <g style={{ transform: `translate(${getParallaxOffset(1000, 650, 0.8).x}px, ${getParallaxOffset(1000, 650, 0.8).y}px)`, transition: 'transform 0.08s ease-out' }}>
              <ellipse className="contour-line" cx="1000" cy="650" rx="210" ry="150" />
              <ellipse className="contour-line" cx="1000" cy="650" rx="280" ry="200" />
            </g>
            
            {/* Flowing contour lines (move based on their center points) */}
            <g style={{ transform: `translate(${getParallaxOffset(600, 300, 0.7).x}px, ${getParallaxOffset(600, 300, 0.7).y}px)`, transition: 'transform 0.08s ease-out' }}>
              <path className="contour-line" d="M0,300 Q150,250 300,280 Q450,310 600,300 Q750,290 900,310 Q1050,330 1200,320" />
            </g>
            <g style={{ transform: `translate(${getParallaxOffset(600, 370, 0.6).x}px, ${getParallaxOffset(600, 370, 0.6).y}px)`, transition: 'transform 0.08s ease-out' }}>
              <path className="contour-line" d="M0,350 Q150,320 300,350 Q450,380 600,370 Q750,360 900,380 Q1050,400 1200,390" />
            </g>
            <g style={{ transform: `translate(${getParallaxOffset(600, 400, 0.8).x}px, ${getParallaxOffset(600, 400, 0.8).y}px)`, transition: 'transform 0.08s ease-out' }}>
              <path className="contour-line" d="M0,400 Q150,430 300,410 Q450,390 600,400 Q750,410 900,400 Q1050,390 1200,410" />
            </g>
            <g style={{ transform: `translate(${getParallaxOffset(600, 450, 0.6).x}px, ${getParallaxOffset(600, 450, 0.6).y}px)`, transition: 'transform 0.08s ease-out' }}>
              <path className="contour-line" d="M0,450 Q150,480 300,460 Q450,440 600,450 Q750,460 900,450 Q1050,440 1200,460" />
            </g>
            
            {/* Vertical flowing lines */}
            <g style={{ transform: `translate(${getParallaxOffset(340, 400, 0.5).x}px, ${getParallaxOffset(340, 400, 0.5).y}px)`, transition: 'transform 0.08s ease-out' }}>
              <path className="contour-line" d="M300,0 Q350,150 340,300 Q350,450 330,600 Q340,750 320,800" />
            </g>
            <g style={{ transform: `translate(${getParallaxOffset(640, 400, 0.7).x}px, ${getParallaxOffset(640, 400, 0.7).y}px)`, transition: 'transform 0.08s ease-out' }}>
              <path className="contour-line" d="M600,0 Q650,150 640,300 Q650,450 630,600 Q640,750 620,800" />
            </g>
            <g style={{ transform: `translate(${getParallaxOffset(940, 400, 0.5).x}px, ${getParallaxOffset(940, 400, 0.5).y}px)`, transition: 'transform 0.08s ease-out' }}>
              <path className="contour-line" d="M900,0 Q950,150 940,300 Q950,450 930,600 Q940,750 920,800" />
            </g>
            
            {/* Diagonal contours */}
            <g style={{ transform: `translate(${getParallaxOffset(600, 250, 0.4).x}px, ${getParallaxOffset(600, 250, 0.4).y}px)`, transition: 'transform 0.08s ease-out' }}>
              <path className="contour-line" d="M0,200 Q200,300 400,250 Q600,200 800,250 Q1000,300 1200,280" />
            </g>
            <g style={{ transform: `translate(${getParallaxOffset(600, 550, 0.4).x}px, ${getParallaxOffset(600, 550, 0.4).y}px)`, transition: 'transform 0.08s ease-out' }}>
              <path className="contour-line" d="M0,500 Q200,600 400,550 Q600,500 800,550 Q1000,600 1200,580" />
            </g>
            
            {/* Additional detail lines */}
            <g style={{ transform: `translate(${getParallaxOffset(300, 120, 0.3).x}px, ${getParallaxOffset(300, 120, 0.3).y}px)`, transition: 'transform 0.08s ease-out' }}>
              <path className="contour-line" d="M100,100 Q200,150 300,120 Q400,100 500,130" />
            </g>
            <g style={{ transform: `translate(${getParallaxOffset(900, 120, 0.3).x}px, ${getParallaxOffset(900, 120, 0.3).y}px)`, transition: 'transform 0.08s ease-out' }}>
              <path className="contour-line" d="M700,100 Q800,150 900,120 Q1000,100 1100,130" />
            </g>
            <g style={{ transform: `translate(${getParallaxOffset(300, 680, 0.3).x}px, ${getParallaxOffset(300, 680, 0.3).y}px)`, transition: 'transform 0.08s ease-out' }}>
              <path className="contour-line" d="M100,700 Q200,650 300,680 Q400,700 500,670" />
            </g>
            <g style={{ transform: `translate(${getParallaxOffset(900, 680, 0.3).x}px, ${getParallaxOffset(900, 680, 0.3).y}px)`, transition: 'transform 0.08s ease-out' }}>
              <path className="contour-line" d="M700,700 Q800,650 900,680 Q1000,700 1100,670" />
            </g>
          </g>
        </svg>
      </div>

      <div className="max-w-4xl mx-auto text-center animate-fade-in relative z-10">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 text-gray-900 dark:text-white">
          I'm{' '}
          <span className="text-blue-600 dark:text-blue-400">
            {displayedText}
            {isTyping && <span className="animate-pulse">|</span>}
          </span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
          Embedded AI & Intelligent Systems Developer | Research Enthusiast |
          Machine Learning | Full Stack Developer using Django
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <button
            onClick={() => scrollToSection('#projects')}
            className="btn-primary"
          >
            View Projects
          </button>
          <button
            onClick={() => scrollToSection('#contact')}
            className="btn-secondary"
          >
            Contact Me
          </button>
        </div>
        <button
          onClick={() => scrollToSection('#projects')}
          className="animate-bounce text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
          aria-label="Scroll down"
        >
          <ChevronDown className="w-8 h-8 mx-auto" />
        </button>
      </div>
    </section>
  )
}

export default Hero
