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

## Project rules

- GENZ FARMER is a frontend-only demonstration platform by design: no backend, database, auth, real AI or live APIs. All sample content lives in `src/data/demo.ts`; simulated outputs must be visibly labeled as demo data.
- All module pages reuse `src/components/shared.tsx` (PageShell, inputs, buttons) and `src/components/layout.tsx` (header/footer); do not duplicate these.
- Multilingual UI uses `src/i18n.tsx` with 9 languages; untranslated strings fall back to English — do not add a translation service.
