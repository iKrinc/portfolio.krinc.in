import React from "react";
import { useParams } from "react-router-dom";
import "./projectDetailPage.scss";
import { projects } from "../../components/sections/Projects"; // Import projects data

const ProjectDetailPage = () => {
  const { projectId } = useParams();
  const project = projects.find(
    (p) =>
      p.project_name.replace(/[^a-zA-Z0-9]/g, "").toLowerCase() === projectId
  );

  if (!project) {
    return <div className="project-detail-page">Project not found.</div>;
  }

  return (
    <div className="project-detail-page">
      <div className="project-detail-content">
        <h2>{project.project_name}</h2>
        {project.tl_dr && (
          <div className="detail-section">
            <p>{project.tl_dr}</p>
          </div>
        )}
        {project.problem_context && (
          <div className="detail-section">
            <h3>Problem Context:</h3>
            <p>{project.problem_context}</p>
          </div>
        )}
        {project.my_role && (
          <div className="detail-section">
            <h3>My Role:</h3>
            <p>{project.my_role}</p>
          </div>
        )}
        {project.approach_and_architecture && (
          <div className="detail-section">
            <h3>Approach & Architecture:</h3>
            <p>{project.approach_and_architecture}</p>
          </div>
        )}
        {project.key_features && Array.isArray(project.key_features) && (
          <div className="detail-section">
            <h3>Key Features:</h3>
            <ul>
              {project.key_features.map((feature, i) => (
                <li key={i}>{feature}</li>
              ))}
            </ul>
          </div>
        )}
        {project.challenges_and_solutions && (
          <div className="detail-section">
            <h3>Challenges & Solutions:</h3>
            <p>{project.challenges_and_solutions}</p>
          </div>
        )}
        {project.testing_and_quality && (
          <div className="detail-section">
            <h3>Testing & Quality:</h3>
            <p>{project.testing_and_quality}</p>
          </div>
        )}
        {project.ci_cd_and_deploy && (
          <div className="detail-section">
            <h3>CI/CD & Deploy:</h3>
            <p>{project.ci_cd_and_deploy}</p>
          </div>
        )}
        {project.deployment_and_ops && (
          <div className="detail-section">
            <h3>Deployment & Ops:</h3>
            <p>{project.deployment_and_ops}</p>
          </div>
        )}
        {project.why_this_is_important && (
          <div className="detail-section">
            <h3>Why this is important:</h3>
            <p>{project.why_this_is_important}</p>
          </div>
        )}
        {project.why_it_matters && (
          <div className="detail-section">
            <h3>Why it matters:</h3>
            <p>{project.why_it_matters}</p>
          </div>
        )}
        {project.artifacts && (
          <div className="detail-section project-artifacts">
            <h3>Artifacts:</h3>
            {project.artifacts.repo && (
              <a href={project.artifacts.repo} target="_blank" rel="noreferrer">
                Repo
              </a>
            )}
            {project.artifacts.demo && (
              <a href={project.artifacts.demo} target="_blank" rel="noreferrer">
                Demo
              </a>
            )}
            {project.artifacts.storybook && (
              <a
                href={project.artifacts.storybook}
                target="_blank"
                rel="noreferrer"
              >
                Storybook
              </a>
            )}
            {project.artifacts.apk && (
              <a href={project.artifacts.apk} target="_blank" rel="noreferrer">
                APK
              </a>
            )}
            {project.artifacts.package_registry && (
              <a
                href={project.artifacts.package_registry}
                target="_blank"
                rel="noreferrer"
              >
                Package Registry
              </a>
            )}
            {project.artifacts.before_after_reports &&
              (Array.isArray(project.artifacts.before_after_reports) ? (
                project.artifacts.before_after_reports.map((report, i) => (
                  <a key={i} href={report} target="_blank" rel="noreferrer">
                    Report {i + 1}
                  </a>
                ))
              ) : (
                <a
                  href={project.artifacts.before_after_reports}
                  target="_blank"
                  rel="noreferrer"
                >
                  Report
                </a>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectDetailPage;
