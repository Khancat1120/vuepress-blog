# Kehan Pang — Academic Homepage

A multilingual academic homepage built with VuePress 1.x. English is served at
`/`, Chinese at `/zh/`, and Japanese at `/ja/`.

## Local workflow

```bash
npm run dev
npm run build
npm run validate
```

`npm run build` also regenerates `kehan-pang-cv.pdf` from `cv/kehan-pang-cv.tex`
and adds canonical and `hreflang` metadata to the built pages.

To mirror a validated build into the local GitHub Pages working tree, run:

```bash
npm run sync:dist
```

The sync uses deletion-aware `rsync` while explicitly protecting the Pages
repository's `.git` directory. It never commits or pushes. `run.sh` performs the
build, validation, and local sync in sequence and likewise performs no Git write
to a remote.

The former blog sources and assets are retained outside this public repository
at `/home/kehan/Blog/legacy-blog-archive`.
