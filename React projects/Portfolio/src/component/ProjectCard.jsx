function ProjectCard({ title, description, image }) {
    return (
        <div className="project-card">
            <img src={image} alt={title} />
            <div className="project-card-content">
                <h3>{title}</h3>
                <p>{description}</p>
            </div>
        </div>
    );
}
export default ProjectCard;