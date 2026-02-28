import { type Repository } from "../types/github";

interface CardProps {
  repository: Repository;
  //   add score as well
}

const Card = ({ repository }: CardProps) => {
  return (
    <div className="card-container">
      <img src={repository.owner?.avatar_url} />
      <div className="">
        <div className="">{repository.name}</div>
        <a href={repository.owner?.html_url} target="__blank">
          {repository.owner?.html_url}
        </a>
      </div>
    </div>
  );
};

interface CardsProps {
  isLoading: boolean;
  repositories: Repository[];
  //   add score as well
}

export const Cards = ({ isLoading, repositories }: CardsProps) => {
  return (
    <div>
      {isLoading ? (
        "LOADING CONTENT..."
      ) : (
        <div className="repository-container">
          {repositories.map((repository) => {
            return <Card repository={repository} />;
          })}
        </div>
      )}
    </div>
  );
};

export default Cards;
