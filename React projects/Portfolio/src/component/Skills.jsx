function Skills () {
    const skills = ["Html", "Css", "JS", "React", "Node.js", "MongoDB"];
    return (
        <section className="Skills" id="Skills">
            <h2>Skills</h2>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dicta repellendus saepe excepturi dolorum impedit officia expedita eveniet voluptates natus quas!</p>
            <div className="Skills-conatiner">
                {
                    skills.map(function(skill) {
                        return <div>{skill}</div>;
                    })
                }
            </div>
        </section>
    );
}
export default Skills;