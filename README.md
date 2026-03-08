# github searcher

- Created a single page application with

1. Octokit to enable github read methods
2. Rechart to integrate with chart system

# Trending Logic

1. Runs every minute
2. Check the range between current time to 5 minutes ago for following conditions

- At least 500 stars for the repository
- Pushed to the branch within #2 timeframe

3. Score is based on number of stars of repository(70%) and number of forks(30%)(arbitrarily choose the ratio)
4. Fetch top 10 repositories that matches with above criteria
