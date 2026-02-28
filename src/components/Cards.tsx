import { type Repository } from "../types/github";

interface CardProps {
  repository: Repository;
  score: number | null;
  //   add score as well
}

const Card = ({ repository, score }: CardProps) => {
  return (
    <div className="card-container">
      <img src={repository.owner?.avatar_url} />
      <div className="">
        <div className="">{repository.name}</div>
        <a href={repository.owner?.html_url} target="__blank">
          {repository.owner?.html_url}
        </a>

        {score !== null && (
          <div className="">
            <p>score</p>
            <p>{score}</p>
          </div>
        )}
      </div>
    </div>
  );
};

interface CardsProps {
  isLoading: boolean;
  repositories: Repository[];
  scores?: number[];
  //   add score as well
}

export const Cards = ({ isLoading, repositories, scores = [] }: CardsProps) => {
  return (
    <div>
      {isLoading ? (
        "LOADING CONTENT..."
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
