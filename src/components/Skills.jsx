import { useState, useEffect } from 'react'
import { getSkills } from '../services/api'
import {
  Code,
  Globe,
  Cpu,
  Wrench,
  FileCode,
  Database,
  Cloud,
} from 'lucide-react'

const Skills = () => {
  const [skillsByCategory, setSkillsByCategory] = useState({})
  const [loading, setLoading] = useState(true)

  const categoryIcons = {
    programming: Code,
    web: Globe,
    hardware: Cpu,
    tools: Wrench,
  }

  const categoryLabels = {
    programming: 'Programming',
    web: 'Web',
    hardware: 'Hardware',
    tools: 'Tools',
  }

  const skillIcons = {
    Python: FileCode,
    C: FileCode,
    'C++': FileCode,
    HTML: Globe,
    CSS: Globe,
    JavaScript: Globe,
    Django: Database,
    ESP32: Cpu,
    Arduino: Cpu,
    Sensors: Cpu,
    Firebase: Cloud,
    GitHub: Wrench,
  }

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const data = await getSkills()
        setSkillsByCategory(data)
      } catch (error) {
        console.error('Error fetching skills:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchSkills()
  }, [])

  if (loading) {
    return (
      <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-600 dark:text-gray-400">Loading skills...</p>
        </div>
      </section>
    )
  }

  const categoryOrder = ['programming', 'web', 'hardware', 'tools']

  return (
    <section
      id="skills"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900"
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="section-title">Skills</h2>
        <p className="section-subtitle">
          Technologies and tools I work with
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categoryOrder.map((category, categoryIndex) => {
            const CategoryIcon = categoryIcons[category]
            const skills = skillsByCategory[category] || []

            return (
              <div
                key={category}
                className="card animate-slide-up"
                style={{ animationDelay: `${categoryIndex * 0.1}s` }}
              >
                <div className="flex items-center gap-3 mb-4">
                  {CategoryIcon && (
                    <CategoryIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  )}
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {categoryLabels[category]}
                  </h3>
                </div>
                <div className="space-y-3">
                  {skills.map((skill) => {
                    const SkillIcon = skillIcons[skill.name] || Code
                    return (
                      <div
                        key={skill.id}
                        className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200"
                      >
                        <SkillIcon className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                        <span className="text-gray-700 dark:text-gray-300 font-medium">
                          {skill.name}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Skills

