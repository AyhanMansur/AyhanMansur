<!-- 🖤 Neon Glow Header -->
<h1 align="center">
  <span style="color:#00F0FF;">AYHAN MANSUR</span>
</h1>

<p align="center">
  <img src="https://readme-typing-svg.herokuapp.com?color=00F0FF&size=26&center=true&vCenter=true&width=700&lines=Software+Developer;Python+%7C+Java+%7C+HTML;Building+High-Performance+Systems;Future+Full+Stack+Engineer" />
</p>

---

## 🧠 Tech Stack

<p align="center">
  <img src="https://skillicons.dev/icons?i=python,java,html,git,github,vscode" />
</p>

---

## 📊 GitHub Analytics

<p align="center">
  <img src="https://github-readme-stats.vercel.app/api?username=YOUR_USERNAME&show_icons=true&theme=tokyonight&hide_border=true" height="165">
  <img src="https://streak-stats.demolab.com?user=YOUR_USERNAME&theme=tokyonight&hide_border=true" height="165">
</p>

---

## 📈 Contribution Snake Animation

```yaml
# Add this as a GitHub Action file:
# .github/workflows/snake.yml
name: Generate Snake

on:
  schedule:
    - cron: "0 0 * * *"
  workflow_dispatch:

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: Platane/snk@v3
        with:
          github_user_name: YOUR_USERNAME
          outputs: |
            dist/github-contribution-grid-snake.svg
      - uses: crazy-max/ghaction-github-pages@v3
        with:
          target_branch: output
          build_dir: dist
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
