import { NavLink } from "react-router-dom";
import { LayoutDashboard, 
  GraduationCap,
  Trophy,
  FileText,
  Calendar,
  ClipboardList,
FlaskConical } from "lucide-react";
function Sidebar() {
  const links = [
    { name: "Dashboard", path: "/dashboard", icon: <LayoutDashboard size={20}/>  },
    { name: "My Colleges", path: "/colleges", icon: <GraduationCap size={20}/>  },
    { name: "Deadlines", path: "/deadlines", icon: <Calendar size={20}/>  },
    { name: "Essays", path: "/essays", icon: <FileText size={20}/>  },
    { name: "Achievements", path: "/achievements", icon: <Trophy size={20}/>  },
    { name: "Application", path: "/application", icon: <ClipboardList size={20}/>  },
    { name: "Testing", path: "/testing", icon: <FlaskConical size={20}/>  },
  ];

  return (
    <aside className="sidebar">
      <nav>
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) =>
              isActive ? "sidebar-link active" : "sidebar-link"
            }
          >
            {link.icon}
            <span> {link.name}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;