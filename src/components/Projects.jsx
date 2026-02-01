import { useState, useEffect } from 'react'
import { getProjects } from '../services/api'
import { ChevronDown, ChevronUp } from 'lucide-react'

const Projects = () => {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [expandedProject, setExpandedProject] = useState(null)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getProjects()
        setProjects(data)
      } catch (error) {
        console.error('Error fetching projects:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchProjects()
  }, [])

  const toggleExpand = (projectId) => {
    setExpandedProject(expandedProject === projectId ? null : projectId)
  }

  const getStatusColor = (status) => {
    if (status.toLowerCase() === 'running') {
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
    }
    return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
  }

  if (loading) {
    return (
      <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-600 dark:text-gray-400">Loading projects...</p>
        </div>
      </section>
    )
  }

  return (
    <section
      id="projects"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800"
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="section-title">Projects</h2>
        <p className="section-subtitle">
          Here are some of my recent projects
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="card animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {project.title}
                </h3>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(
                    project.status
                  )}`}
                >
                  {project.status}
                </span>
              </div>

              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {project.description}
              </p>

              <div className="mb-4">
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Timeline: <span className="font-normal">{project.timeline}</span>
                </p>
              </div>

              <div className="mb-4">
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Technologies:
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies_list?.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-xs font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {expandedProject === project.id ? (
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Features:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-400 text-sm">
                    {project.features_list?.map((feature, idx) => (
                      <li key={idx}>{feature}</li>
                    ))}
                  </ul>
                  <button
                    onClick={() => toggleExpand(project.id)}
                    className="mt-4 text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 text-sm font-medium"
                  >
                    <ChevronUp className="w-4 h-4" />
                    Show Less
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => toggleExpand(project.id)}
                  className="mt-4 text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 text-sm font-medium"
                >
                  <ChevronDown className="w-4 h-4" />
                  View Details
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects

