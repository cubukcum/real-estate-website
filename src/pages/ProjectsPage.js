import React from "react";

const ProjectsPage = () => {
  const projects = [
    { id: 1, name: "Project A", location: "City Center", status: "Ongoing" },
    { id: 2, name: "Project B", location: "Suburb", status: "Completed" },
  ];

  return (
    <div>
      <h1>Our Projects</h1>
      <ul>
        {projects.map((project) => (
          <li key={project.id}>
            <a href={`/projects/${project.id}`}>{project.name}</a> -{" "}
            {project.location} ({project.status})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectsPage;
