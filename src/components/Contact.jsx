import { useState } from 'react'
import { sendContactMessage } from '../services/api'
import { Github, Linkedin, Mail, Send, CheckCircle } from 'lucide-react'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)
    setErrorMessage('')

    try {
      await sendContactMessage(formData)
      setSubmitStatus('success')
      setFormData({ name: '', email: '', message: '' })
      setTimeout(() => setSubmitStatus(null), 5000)
    } catch (error) {
      console.error('Contact form error:', error)
      let errorMsg = 'Failed to send message. Please try again.'
      
      if (error.response) {
        // Server responded with error status
        if (error.response.data) {
          if (typeof error.response.data === 'string') {
            errorMsg = error.response.data
          } else if (error.response.data.message) {
            errorMsg = error.response.data.message
          } else if (error.response.data.error) {
            errorMsg = error.response.data.error
          } else if (error.response.data.detail) {
            errorMsg = error.response.data.detail
          } else if (typeof error.response.data === 'object') {
            // Handle field errors
            const fieldErrors = Object.entries(error.response.data)
              .map(([field, messages]) => `${field}: ${Array.isArray(messages) ? messages.join(', ') : messages}`)
              .join('; ')
            if (fieldErrors) {
              errorMsg = fieldErrors
            }
          }
        } else {
          errorMsg = `Server error (${error.response.status})`
        }
      } else if (error.request) {
        // Request was made but no response received
        errorMsg = 'No response from server. Please check your connection and try again.'
      } else {
        // Error setting up request
        errorMsg = error.message || 'An error occurred. Please try again.'
      }
      
      setErrorMessage(errorMsg)
      setSubmitStatus('error')
      setTimeout(() => {
        setSubmitStatus(null)
        setErrorMessage('')
      }, 8000)
    } finally {
      setIsSubmitting(false)
    }
  }

  const socialLinks = [
    {
      name: 'GitHub',
      url: 'https://github.com/mahbubul03',
      icon: Github,
      color: 'hover:text-gray-900 dark:hover:text-white',
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/mahbubul03/',
      icon: Linkedin,
      color: 'hover:text-blue-600 dark:hover:text-blue-400',
    },
    {
      name: 'Email',
      url: 'mailto:mahbubul2313@gmail.com',
      icon: Mail,
      color: 'hover:text-red-600 dark:hover:text-red-400',
    },
  ]

  return (
    <section
      id="contact"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800"
    >
      <div className="max-w-4xl mx-auto">
        <h2 className="section-title">Get In Touch</h2>
        <p className="section-subtitle">
          Let's connect and discuss opportunities
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Social Links */}
          <div className="card">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Connect With Me
            </h3>
            <div className="space-y-4">
              {socialLinks.map((link) => {
                const Icon = link.icon
                return (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-all duration-200 group ${link.color}`}
                  >
                    <Icon className="w-6 h-6 text-gray-600 dark:text-gray-400 group-hover:scale-110 transition-transform duration-200" />
                    <span className="text-gray-700 dark:text-gray-300 font-medium">
                      {link.name}
                    </span>
                  </a>
                )
              })}
            </div>
          </div>

          {/* Contact Form */}
          <div className="card">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Send a Message
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 resize-none"
                  placeholder="Your message..."
                />
              </div>

              {submitStatus === 'success' && (
                <div className="flex items-center gap-2 text-green-600 dark:text-green-400 text-sm font-medium animate-fade-in">
                  <CheckCircle className="w-5 h-5" />
                  <span>Message sent successfully!</span>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 animate-fade-in">
                  <div className="text-red-600 dark:text-red-400 text-sm font-medium">
                    {errorMessage || 'Failed to send message. Please try again.'}
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  'Sending...'
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact

