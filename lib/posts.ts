import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import remark from 'remark'
import html from 'remark-html'


const postsDirectory = path.join(process.cwd(), 'posts')
const booksDirectory = path.join(process.cwd(), 'books')

export function getSortedBookssData() {
  return getSortedResourceData(booksDirectory);
}

export function getSortedPostsData() {
  return getSortedResourceData(postsDirectory);
}

function getSortedResourceData(dir) {
  // Get file names under /posts
  const fileNames = fs.readdirSync(dir)
  const allPostsData = fileNames.map(fileName => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '')

    // Read markdown file as string
    const fullPath = path.join(dir, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents)
    
    // Combine the data with the id
    return {
      id,
      ...matterResult.data
    }
  })
  // Sort posts by date
  return allPostsData.sort((a, b) => {
    // @ts-ignore: Property 'date' does not exist on type '{ id: string; }'.
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}

export function getAllPostIds() {
  return getAllResourceIds(postsDirectory)
}
export function getAllBookIds() {
  return getAllResourceIds(booksDirectory)
}

export function getAllResourceIds(dir) {
  const fileNames = fs.readdirSync(dir)

  // Returns an array that looks like this:
  // [
  //   {
  //     params: {
  //       id: 'ssg-ssr'
  //     }
  //   },
  //   {
  //     params: {
  //       id: 'pre-rendering'
  //     }
  //   }
  // ]
  return fileNames.map(fileName => {
    return {
      params: {
        id: fileName.replace(/\.md$/, '')
      }
    }
  })
}

export function getPostData(id) {
  return getResourceData(postsDirectory, id);
}
export function getBookData(id) {
  return getResourceData(booksDirectory, id);
}

async function getResourceData(dir, id) {
  const fullPath = path.join(dir, `${id}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents)
  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content)
  const contentHtml = processedContent.toString()

  // Combine the data with the id
  return {
    id,
    contentHtml,
    ...matterResult.data
  }
}
