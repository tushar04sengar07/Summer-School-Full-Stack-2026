import "../css/Skill.css";
function Skills () {
    const skills = [
        { name: "HTML", level: 90 },
        { name: "CSS", level: 85 },
        { name: "JavaScript", level: 80 },
        { name: "React", level: 75 },
        { name: "MongoDB", level: 70 }
    ];
    return (
        <section className="skills" id="skills">
            <h2>Skills</h2>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dicta repellendus saepe excepturi dolorum impedit officia expedita eveniet voluptates natus quas!</p>
            <div className="skills-conatiner">
                {
                    skills.map(function(skill, index) {
                        return (
                            <div key={index} className="skill-card">
                                <h3>{skill.name}</h3>
                                <div className="skill-progress">
                                    <div className="skill-bar" style={{ width: skill.level + "%" }}></div>
                                </div>
                            </div>
                        );
                    })
                }
            </div>
        </section>
    );
}
export default Skills;