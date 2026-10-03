<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Project decisions

- The "/" route is a single-page scroll presentation (narrative sections 01–10 + manifesto) for pitching the Raízes library project to church leadership — no nav, no app features. Keep new pitch content in this page, in pt-BR, following the narrative order.
- Brand tokens (ink/gold/wine/cream, Cormorant Garamond + Karla) are defined once in `src/styles.css` @theme; the logo and co-branded illustrations are served through lovable-assets pointers in `src/assets/` — never copy binaries into the repo.
