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

# Landing Page
<img width="2467" height="959" alt="Screenshot 2026-03-08 at 17 14 30" src="https://github.com/user-attachments/assets/51c0a23a-287f-4c67-aee4-b993f999da7c" />

* We can type keyword to find repositories
* Tips can be helpful for using specific query


# Trending Barchart View
<img width="1915" height="847" alt="Screenshot 2026-03-08 at 15 36 25" src="https://github.com/user-attachments/assets/53c5cdde-ce76-4591-9db3-a9c2dee89995" />

# Trending Card view
<img width="1952" height="755" alt="Screenshot 2026-03-08 at 15 36 39" src="https://github.com/user-attachments/assets/3d5962c9-015b-4d11-b3f6-2708407fe018" />

* Clicking the url allows us to navigate to the repository page

# Demo


https://github.com/user-attachments/assets/136b5b0c-7e69-4643-a112-b92cec6a9579

