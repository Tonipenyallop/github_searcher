# GitHub Searcher

A single-page application for searching and discovering trending GitHub repositories.

## Tech Stack

- **React 19** with TypeScript
- **Octokit** for GitHub API integration
- **Recharts** for data visualization
- **Vite** for build tooling

## Features

### Search

- Search repositories using GitHub's query syntax
- Paginated results with a 5-page sliding window
- Built-in tips for advanced queries (e.g. `stars:>=500 language:typescript`)

### Trending

- Automatically fetches trending repositories every 60 seconds
- Filters for repositories with 5000+ stars, 300+ forks, and recent push activity (within 5 minutes)
- Scores repositories based on stars (70%) and forks (30%)
- Toggle between bar chart and card views

## Demo

### Landing Page

<img width="2467" height="959" alt="Landing page" src="https://github.com/user-attachments/assets/51c0a23a-287f-4c67-aee4-b993f999da7c" />

### Trending - Bar Chart View

<img width="1915" height="847" alt="Trending bar chart view" src="https://github.com/user-attachments/assets/53c5cdde-ce76-4591-9db3-a9c2dee89995" />

### Trending - Card View

<img width="1952" height="755" alt="Trending card view" src="https://github.com/user-attachments/assets/3d5962c9-015b-4d11-b3f6-2708407fe018" />

## Demo - Video

https://github.com/user-attachments/assets/136b5b0c-7e69-4643-a112-b92cec6a9579
