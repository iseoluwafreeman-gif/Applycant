
import { useState } from "react"
import {
  Search,
  PenLine,
  GraduationCap,
  BookOpen,
  Wallet,
  ExternalLink
} from "lucide-react"

const resources = [
  {
    title: "Official SAT Practice",
    category: "Test Prep",
    description:
      "Practice for the SAT with lessons, practice questions, and personalized study tools.",
    provider: "Khan Academy",
    url: "https://www.khanacademy.org/test-prep",
    icon: BookOpen
  },
  {
    title: "SAT Practice Tests",
    category: "Test Prep",
    description:
      "Access official SAT practice tests and preparation resources.",
    provider: "College Board",
    url: "https://satsuite.collegeboard.org/sat/practice-preparation",
    icon: GraduationCap
  },
  {
    title: "College Application Guide",
    category: "Applications",
    description:
      "Learn how to navigate the application process and prepare your materials.",
    provider: "Common App",
    url: "https://www.commonapp.org/",
    icon: GraduationCap
  },
  {
    title: "Essay Writing Tips",
    category: "Essays",
    description:
      "Explore advice for developing a personal statement that reflects your experiences.",
    provider: "College Essay Guy",
    url: "https://www.collegeessayguy.com/",
    icon: PenLine
  },
  {
    title: "College Search",
    category: "College Research",
    description:
      "Research colleges, explore majors, and compare your options.",
    provider: "BigFuture",
    url: "https://bigfuture.collegeboard.org/",
    icon: Search
  },
  {
    title: "Federal Financial Aid",
    category: "Scholarships",
    description:
      "Find official information about FAFSA, federal student aid, and paying for college.",
    provider: "Federal Student Aid",
    url: "https://studentaid.gov/",
    icon: Wallet
  },
  {
    title: "Scholarship Search",
    category: "Scholarships",
    description:
      "Explore scholarship opportunities and learn how to plan for college costs.",
    provider: "BigFuture",
    url: "https://bigfuture.collegeboard.org/pay-for-college/scholarship-search",
    icon: Wallet
  },
  {
    title: "College Admissions Videos",
    category: "Videos",
    description:
      "Watch educational videos about college applications, essays, and admissions.",
    provider: "YouTube",
    url: "https://www.youtube.com/results?search_query=college+admissions+essay+tips",
    icon: BookOpen
  }
]

const categories = [
  "All",
  "Test Prep",
  "Applications",
  "Essays",
  "College Research",
  "Scholarships",
  "Videos"
]

function Resources() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeCategory, setActiveCategory] = useState("All")

  const filteredResources = resources.filter((resource) => {
    const matchesCategory =
      activeCategory === "All" ||
      resource.category === activeCategory

    const searchText = (
      resource.title +
      " " +
      resource.description +
      " " +
      resource.provider +
      " " +
      resource.category
    ).toLowerCase()

    return matchesCategory &&
      searchText.includes(searchTerm.toLowerCase())
  })

  return (
    <div className="resources-page">
      <div className="page-header">
        <div>
          <h1>College Resources</h1>
          <p>
            Helpful tools and guides for every step of your college journey.
          </p>
        </div>
      </div>

      <div className="resources-search">
        <Search size={20} />
        <input
          type="text"
          placeholder="Search resources..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="resource-filters">
        {categories.map((category) => (
          <button
            key={category}
            className={
              activeCategory === category
                ? "resource-filter active"
                : "resource-filter"
            }
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="resource-grid">
        {filteredResources.map((resource) => {
          const Icon = resource.icon

          return (
            <div className="resource-card" key={resource.title}>
              <div className="resource-card-top">
                <div className="resource-icon">
                  <Icon size={22} />
                </div>

                <span className="resource-category">
                  {resource.category}
                </span>
              </div>

              <h2>{resource.title}</h2>
              <p>{resource.description}</p>

              <div className="resource-card-footer">
                <span>{resource.provider}</span>

                <a
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open ${resource.title} in a new tab`}
                >
                  Explore <ExternalLink size={15} />
                </a>
              </div>
            </div>
          )
        })}
      </div>

      {filteredResources.length === 0 && (
        <div className="dashboard-section">
          <h2>No resources found</h2>
          <p>Try another search term or select a different category.</p>
        </div>
      )}
    </div>
  )
}

export default Resources
