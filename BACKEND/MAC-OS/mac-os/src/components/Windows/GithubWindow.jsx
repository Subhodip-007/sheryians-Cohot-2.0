
import React, { useContext } from "react";
import UseWindow from "./UseWindow";
import "../../shared/GitCard.scss";
import githubRepo from "../../assets/githubRepo.json";
import { AppContext } from "../../context/App.context";

const GitCard = ({ data }) => {
  return (
    <div className="git-card">

      <div className="git-card-image">
        <img
          src={data.image || "/placeholder.png"}
          alt={data.title}
        />
      </div>

      <div className="git-card-content">

        <div className="git-card-heading">
          <h2>{data.title}</h2>
          <span className="project-id">#{data.id}</span>
        </div>

        <p className="git-card-description">
          {data.description}
        </p>

        <div className="git-card-tags">
          {data.tag?.map((tag, index) => (
            <span key={index}>{tag}</span>
          ))}
        </div>

        <div className="git-card-footer">

          <a
            href={data.repoLink}
            target="_blank"
            rel="noreferrer"
            className="repo-btn"
          >
            <i className="ri-github-fill"></i>
            Source Code
          </a>

          {data.demoLink && (
            <a
              href={data.demoLink}
              target="_blank"
              rel="noreferrer"
              className="demo-btn"
            >
              Live Demo
              <i className="ri-arrow-up-right-line"></i>
            </a>
          )}

        </div>
      </div>
    </div>
  );
};

const GithubWindow = () => {

  const { isOpenGithub } = useContext(AppContext);

  if (!isOpenGithub) return null;

  return (
    <UseWindow windowId="github">

      <div className="card-container">
        {githubRepo.map((project) => (
          <GitCard key={project.id} data={project} />
        ))}
      </div>

    </UseWindow>
  );
};

export default GithubWindow;
