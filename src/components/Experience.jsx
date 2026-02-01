import { useState, useEffect } from 'react'
import { getExperience } from '../services/api'
import { Briefcase, MapPin, Calendar } from 'lucide-react'

const Experience = () => {
  const [experiences, setExperiences] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchExperience = async () => {
      try {
        const data = await getExperience()
        setExperiences(data)
      } catch (error) {
        console.error('Error fetching experience:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchExperience()
  }, [])

  if (loading) {
    return (
      <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-600 dark:text-gray-400">Loading experience...</p>
        </div>
      </section>
    )
  }

  return (
    <section
      id="experience"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800"
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="section-title">Work Experience</h2>
        <p className="section-subtitle">
          My professional journey and contributions
        </p>

        <div className="relative">
          {/* Timeline line - only show if more than one experience */}
          {experiences.length > 1 && (
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-blue-200 dark:bg-blue-800 transform md:-translate-x-1/2 hidden md:block"></div>
          )}

          <div className="space-y-8">
            {experiences.map((experience, index) => (
              <div
                key={experience.id}
                className="relative animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Timeline dot */}
                <div className="absolute left-6 md:left-1/2 w-4 h-4 bg-blue-600 dark:bg-blue-400 rounded-full border-4 border-white dark:border-gray-800 transform md:-translate-x-1/2 z-10"></div>

                {/* Content Card */}
                <div className={`ml-16 md:ml-0 ${index % 2 === 0 ? 'md:mr-auto md:w-[calc(50%-4rem)]' : 'md:ml-auto md:w-[calc(50%-4rem)]'} card`}>
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Briefcase className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                          {experience.role}
                        </h3>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-3">
                        <MapPin className="w-4 h-4" />
                        <span className="text-lg font-semibold text-blue-600 dark:text-blue-400">
                          {experience.organization}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-semibold mt-2 md:mt-0 w-fit">
                      <Calendar className="w-4 h-4" />
                      <span>{experience.duration_display}</span>
                    </div>
                  </div>

                  <div className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {experience.description.split('\n').filter(line => line.trim()).map((line, idx) => (
                      <p key={idx} className="mb-2">
                        {line.trim()}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Experience

