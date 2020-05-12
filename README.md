# A NodeJS static site generator for my personal website
This project isn't meant as a re-usable library, so I had it as private before. After thinking about it, it could be used as a website building template using plain text files for site content.

# How it works
Folder strucuture looks like this:

```
content/blog/2020-01-03-whatevs
content/blog/2020-05-19-blah
template/layout.pug
template/blog.pug
```

The files inside ./content are just plain files where I write in plain HTML. The first line is the title in a `<h2>` tag, and below that is the content in `<p>` tags.

When the site builds with `npm run build`, a script goes through all the folders in the `./content` directory and extracts data for the content and uses that to generate the static html files in `./public`.

The script gets the date, and URI slug from the filename (Y-M-D and /whatevs, /blah) from the example above. The title is taken from the first line of the file, which in my case is the `<h2>` tag. The content is taken from everything else. The name of the template used (blog.pug) is taken from the folder name of the file, and blog.pug extends the layout.pug template. Layout can have all the base HTML for the header.
