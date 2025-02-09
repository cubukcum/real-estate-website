import React, { useState, useEffect } from "react";
import configAdmin from "../config.admin.json"

const ProjectManagement = () => {
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({
    name: "",
    location: "",
    status: "",
  });

  useEffect(() => {
    fetch("/api/projects")
      .then((res) => res.json())
      .then((data) => setProjects(data));
  }, []);

  const handleAddProject = async () => {
    const response = await fetch("/api/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProject),
    });
    if (response.ok) {
      const project = await response.json();
      setProjects([...projects, project]);
    }
  };

  const handleDeleteProject = async (id) => {
    await fetch(`/api/projects/${id}`, { method: "DELETE" });
    setProjects(projects.filter((project) => project.id !== id));
  };

  return (
    <div>
      <h1>{configAdmin.projectManagement.manageProjectTitle}</h1>
      <div>
        <h2>{configAdmin.projectManagement.manageAddNewProjectTitle}</h2>
        <input
          type="text"
          placeholder="Name"
          value={newProject.name}
          onChange={(e) =>
            setNewProject({ ...newProject, name: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Location"
          value={newProject.location}
          onChange={(e) =>
            setNewProject({ ...newProject, location: e.target.value })
          }
        />
        <select
          value={newProject.status}
          onChange={(e) =>
            setNewProject({ ...newProject, status: e.target.value })
          }
        >
          <option value="">{configAdmin.projectManagement.selectStatusTitle}</option>
          <option value="Ongoing">{configAdmin.projectManagement.selectStatusOngoing}</option>
          <option value="Completed">{configAdmin.projectManagement.selectStatusCompleted}</option>
        </select>
        <button onClick={handleAddProject}>{configAdmin.projectManagement.manageAddProjectButton}</button>
      </div>
      <h2>{configAdmin.projectManagement.manageExistingProjectsTitle}</h2>
      <ul>
        {projects.map((project) => (
          <li key={project.id}>
            {project.name} - {project.location}
            <button onClick={() => handleDeleteProject(project.id)}>
              {configAdmin.projectManagement.manageDeleteProjectButton}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectManagement;
