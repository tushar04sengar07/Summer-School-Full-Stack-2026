import "../css/Projects.css";
import ProjectCard from "./ProjectCard";

function Projects () {
    const projects = [
        { title: "Weather App", description: "Built using React and Open Weather API" },
        { title: "Todo List", description: "Task management app with React hooks" },
        { title: "Portfolio Website", description: "Personal portfolio built with React and CSS" },
        { title: "E-commerce Store", description: "Full-stack project with Node.js and MongoDB" }
    ];
    
    return (
        <section className="projects" id="projects">
            <h2>Projects</h2>
            <p>Check out some of my recent projects and work</p>
            <div className="projects-container">
                {
                    projects.map(function(project, index) {
                        return (
                            <ProjectCard 
                                key={index}
                                title={project.title} 
                                description={project.description}
                            />
                        );
                    })
                }
            </div>
        </section>
    );
}
export default Projects;