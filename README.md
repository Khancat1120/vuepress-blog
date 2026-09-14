# Kehan Pang — Academic Homepage

VuePress 1.x source for the multilingual academic homepage. English is served
at `/`, Chinese at `/zh/`, and Japanese at `/ja/`.

The canonical CV files are `/home/kehan/Blog/cv.pdf` and
`/home/kehan/Blog/简历.pdf`, outside this source repository. `npm run build`
copies them unchanged to the generated site, then `npm run validate` verifies
the pages and file checksums.

Use the workspace-level deployment command from `/home/kehan/Blog`:

```bash
./run.sh "update site"
```

Historical blog writing is stored outside this public source repository in
`/home/kehan/Blog/legacy-blog-archive/md_files` and is not part of the build.
