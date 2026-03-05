import { type Repository } from "../types/github";

interface CardProps {
  repository: Repository;
  score: number | null;
}

const Card = ({ repository, score }: CardProps) => {
  return (
    <div className="card-container">
      <img src={repository.owner?.avatar_url} />
      <div className="card-info">
        <div className="card-name">{repository.name}</div>
        <a className="card-link" href={repository.owner?.html_url} target="__blank">
          {repository.owner?.html_url}
        </a>

        {score !== null && (
          <span className="card-score">
            score: {score}
          </span>
        )}
      </div>
    </div>
  );
};

interface CardsProps {
  isLoading: boolean;
  repositories: Repository[];
  scores?: number[];
}

export const Cards = ({ isLoading, repositories, scores = [] }: CardsProps) => {
  return (
    <div>
      {isLoading ? (
        <div className="loading-container">
          <div className="spinner"></div>
          <div className="loading-text">Loading...</div>
        </div>
      ) : (
        <div className="repository-container">
          {repositories.map((repository, idx) => {
            return (
              <Card
                repository={repository}
                score={scores.length > 0 ? scores[idx] : null}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Cards;
