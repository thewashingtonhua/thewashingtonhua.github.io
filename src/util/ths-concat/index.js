const through = require('through-gulp')
const path = require('path')
const fs = require('fs')
const catalog = require('../../../config/catalog.json')
const moment = require('moment')

const base = path.resolve(__dirname, '../../../')

const headerOpen = fs.readFileSync(path.resolve(base, 'src/views/common/header-open.html'), {encoding: 'utf-8'})
const headerClose = fs.readFileSync(path.resolve(base, 'src/views/common/header-close.html'), {encoding: 'utf-8'})
const footer = fs.readFileSync(path.resolve(base, 'src/views/common/footer.html'), {encoding: 'utf-8'})

function getTime () {
  return moment.unix(Date.now() / 1000).format('HH:mm:ss')
}

function createStyle (type, value) {
  switch (type) {
    case 'link':
      return `<link rel="stylesheet" href="${value}" />`
    case 'style':
      return `<style>${value}</style>`
    default:
      return ''
  }
}

function createScript (type, value, option = {}) {
  switch (type) {
    case 'outter':
      return `<script${option.defer ? ' defer' : ''}${option.async ? ' async' : ''} src="${value}"></script>`
    case 'inner':
      return `<script>${value}</script>`
    default:
      return ''
  }
}

function getFilename (file, suffix = true) {
  const { base: fileBase, path: filePath } = file
  const filenameWithSuffix = filePath.substr(fileBase.length)
  if (suffix) {
    return filenameWithSuffix
  } else {
    const filenameArr = filenameWithSuffix.split('.')
    filenameArr.pop()
    return filenameArr.join('.')
  }
}

function thsConcatBaseIndex (file, options) {
  const config = options.items['index']

  let content = file.contents.toString('utf-8')

  // Get latest blog
  const latestBlog = catalog.blogs[0]
  const latestBlogElem = `
  <a class="blog" href="${latestBlog.url}" id="${latestBlog.id}">
    <div class="banner fix-ratio ratio-16-9">
      <img src="${latestBlog.cover}" alt="${latestBlog.id}">
    </div>
    <div class="info">
      <p class="title">${latestBlog.title}</p>
      <p class="create-date"><time datetime="${latestBlog.publishDateNum}">${latestBlog.publishDateStr}</time></p>
      <p class="description">${latestBlog.description}</p>
    </div>
  </a>`
  content = content.replace(/\{\{latestBlogElem\}\}/, latestBlogElem)
  // console.log(content)

  // Get latest commercial project
  const commercialProjects = catalog.projects.filter(p => p.category === 'commercial')
  const latestCommercialProjects = [commercialProjects[0], commercialProjects[1]]
  const latestCommercialProjectsElem = latestCommercialProjects.map(p => `
    <a class="project commercial" id="${p.id}" href="${p.url}">
      <div class="cover">
        <img src="${p.thumb}" alt="${p.id}">
      </div>
      <div class="intro">
        <h2>${p.title}</h2>
        <p>${p.description}</p>
      </div>
    </a>`
  )
  content = content.replace(/\{\{latestCommercialProjectsElem\}\}/, latestCommercialProjectsElem.join('\n'))

  // Get latest exercise project
  // const exerciseProjects = catalog.projects.filter(p => p.category === 'exercise')
  // const latestExerciseProjects = [exerciseProjects[0], exerciseProjects[1]]
  // const latestExerciseProjectsElem = latestExerciseProjects.map(p => `
  //   <a class="project exercise" id="${p.id}" href="${p.url}">
  //     <div class="cover">
  //       <img src="${p.thumb}" alt="${p.id}">
  //     </div>
  //     <div class="intro">
  //       <h2>${p.title}</h2>
  //       <p>${p.description}</p>
  //     </div>
  //   </a>`
  // )
  // content = content.replace(/\{\{latestExerciseProjectsElem\}\}/, latestExerciseProjectsElem.join('\n'))

  const title = config.title + options.commonTitle
  const keywords = (options.commonKeywords.concat(config.keywords))
  const styles = (options.commonStyles.concat(config.styles)).map(style => createStyle(style.type, style.value))
  const scripts = (options.commonScripts.concat(config.scripts)).map(script => createScript(script.type, script.value))
  const output = [
    headerOpen,
    `<meta name="keywords" content="${keywords.join(',')}" />`,
    `<title>${title}</title>`,
    styles.join('\n'),
    headerClose,
    content,
    scripts.join('\n'),
    footer
  ].join('\n')
  console.log(`[${getTime()}] [ths-concat] base: ${getFilename(file)}`)
  const newFile = file.clone()
  newFile.contents = Buffer.from(output)
  return newFile
}

function thsConcatBaseBlog (file, options) {
  const config = options.items['blog']

  let content = file.contents.toString('utf-8')

  // Get blogs
  const blogs = catalog.blogs
  const blogsElem = blogs.map(blog => {
    const tags = blog.tags.map(tag => `<li class="tag">${tag}</li>`)
    const series = blog.series ? ` data-series="${blog.series}"` : ''
    return `
      <a class="blog" href="${blog.url}" id="${blog.id}"${series}>
        <div class="banner fix-ratio ratio-16-9">
          <img src="${blog.cover}" alt="${blog.id}">
        </div>
        <div class="info">
          <p class="title">${blog.title}</p>
          <p class="create-date"><time datetime="${blog.publishDateNum}">${blog.publishDateStr}</time></p>
          <p class="description">${blog.description}</p>
          <ul class="tags">
            ${tags.join('\n')}
          </ul>
        </div>
      </a>`
  })
  content = content.replace(/\{\{blogsElem\}\}/, blogsElem.join('\n'))

  const title = config.title + options.commonTitle
  const keywords = (options.commonKeywords.concat(config.keywords))
  const styles = (options.commonStyles.concat(config.styles)).map(style => createStyle(style.type, style.value))
  const scripts = (options.commonScripts.concat(config.scripts)).map(script => createScript(script.type, script.value))
  const output = [
    headerOpen,
    `<meta name="keywords" content="${keywords.join(',')}" />`,
    `<title>${title}</title>`,
    styles.join('\n'),
    headerClose,
    content,
    scripts.join('\n'),
    footer
  ].join('\n')
  console.log(`[${getTime()}] [ths-concat] base: ${getFilename(file)}`)
  const newFile = file.clone()
  newFile.contents = Buffer.from(output)
  return newFile
}

function thsConcatBaseProject (file, options) {
  const config = options.items['project']

  let content = file.contents.toString('utf-8')

  // Get commercial projects
  const commercialProjects = catalog.projects.filter(p => p.category === 'commercial')
  const commercialProjectsElem = commercialProjects.map(p => `
    <a class="project commercial" id="${p.id}" href="${p.url}">
      <div class="cover">
        <img src="${p.thumb}" alt="${p.id}">
      </div>
      <div class="intro">
        <h2>${p.title}</h2>
        <p>${p.description}</p>
      </div>
    </a>`
  )
  content = content.replace(/\{\{commercialProjectsCount\}\}/, commercialProjects.length)
  content = content.replace(/\{\{commercialProjectsElem\}\}/, commercialProjectsElem.join('\n'))

  // Get exercise projects
  // const exerciseProjects = catalog.projects.filter(p => p.category === 'exercise')
  // const exerciseProjectsElem = exerciseProjects.map(p => `
  //   <a class="project exercise" id="${p.id}" href="${p.url}">
  //     <div class="cover">
  //       <img src="${p.thumb}" alt="${p.id}">
  //     </div>
  //     <div class="intro">
  //       <h2>${p.title}</h2>
  //       <p>${p.description}</p>
  //     </div>
  //   </a>`
  // )
  // content = content.replace(/\{\{exerciseProjectsCount\}\}/, exerciseProjects.length)
  // content = content.replace(/\{\{exerciseProjectsElem\}\}/, exerciseProjectsElem.join('\n'))

  const title = config.title + options.commonTitle
  const keywords = (options.commonKeywords.concat(config.keywords))
  const styles = (options.commonStyles.concat(config.styles)).map(style => createStyle(style.type, style.value))
  const scripts = (options.commonScripts.concat(config.scripts)).map(script => createScript(script.type, script.value))
  const output = [
    headerOpen,
    `<meta name="keywords" content="${keywords.join(',')}" />`,
    `<title>${title}</title>`,
    styles.join('\n'),
    headerClose,
    content,
    scripts.join('\n'),
    footer
  ].join('\n')
  console.log(`[${getTime()}] [ths-concat] base: ${getFilename(file)}`)
  const newFile = file.clone()
  newFile.contents = Buffer.from(output)
  return newFile
}

function thsConcatBaseLab (file, options) {
  const config = options.items['lab']

  let content = file.contents.toString('utf-8')

  // Get labs: browser
  const browserLabs = catalog.labs.filter(lab => lab.category === 'browser')
  const browserLabsElem = browserLabs.map(lab => `<a class="item" href="${lab.url}">${lab.title}</a>`)
  content = content.replace(/\{\{browserLabsElem\}\}/, browserLabsElem.join('\n'))

  // Get labs: html5
  const html5Labs = catalog.labs.filter(lab => lab.category === 'html5')
  const html5LabsElem = html5Labs.map(lab => `<a class="item" href="${lab.url}">${lab.title}</a>`)
  content = content.replace(/\{\{html5LabsElem\}\}/, html5LabsElem.join('\n'))

  const title = config.title + options.commonTitle
  const keywords = (options.commonKeywords.concat(config.keywords))
  const styles = (options.commonStyles.concat(config.styles)).map(style => createStyle(style.type, style.value))
  const scripts = (options.commonScripts.concat(config.scripts)).map(script => createScript(script.type, script.value))
  const output = [
    headerOpen,
    `<meta name="keywords" content="${keywords.join(',')}" />`,
    `<title>${title}</title>`,
    styles.join('\n'),
    headerClose,
    content,
    scripts.join('\n'),
    footer
  ].join('\n')
  console.log(`[${getTime()}] [ths-concat] base: ${getFilename(file)}`)
  const newFile = file.clone()
  newFile.contents = Buffer.from(output)
  return newFile
}

function thsConcatBlog (file, options) {
  const filename = getFilename(file, false)
  const config = options.items[filename]
  if (!config) return file

  const title = config.title + options.commonTitle
  const keywords = (options.commonKeywords.concat(config.keywords))
  const styles = (options.commonStyles.concat(config.styles)).map(style => createStyle(style.type, style.value))
  const scripts = (options.commonScripts.concat(config.scripts)).map(script => createScript(script.type, script.value))

  const tags = config.tags.map(tag => `<li class="tag">${tag}</li>`)
  const blogHeader = `
  <div id="mf-content">
    <p class="back-to-parent"><a href="/blog.html">&laquo; 回到博客列表</a></p>
    <article id="${config.id}">
      <h1>${config.title}</h1>
      <p class="publish-date"><time datetime="${config.publishDateNum}">${config.publishDateStr}<time></p>
      <ul class="tags">
        ${tags.join('\n')}
      </ul>
      <div class="banner">
        <img src="${config.cover}" alt="${config.id}">
      </div>
  `
  const blogFooter = `</article></div>`

  let content = file.contents.toString('utf-8')

  const output = [
    headerOpen,
    `<meta name="keywords" content="${keywords.join(',')}" />`,
    `<title>${title}</title>`,
    styles.join('\n'),
    headerClose,
    blogHeader,
    content,
    blogFooter,
    scripts.join('\n'),
    footer
  ].join('\n')
  console.log(`[${getTime()}] [ths-concat] blog: ${getFilename(file)}`)
  const newFile = file.clone()
  newFile.contents = Buffer.from(output)
  return newFile
}

function thsConcatCommon (file, options) {
  const filename = getFilename(file, false)
  const config = options.items[filename]

  if (!config) return null

  const content = file.contents.toString('utf-8')
  const title = config.title + options.commonTitle
  const keywords = (options.commonKeywords.concat(config.keywords))
  const styles = (options.commonStyles.concat(config.styles)).map(style => createStyle(style.type, style.value))
  const scripts = (options.commonScripts.concat(config.scripts)).map(script => createScript(script.type, script.value))
  const output = [
    headerOpen,
    `<meta name="keywords" content="${keywords.join(',')}" />`,
    `<title>${title}</title>`,
    styles.join('\n'),
    headerClose,
    content,
    scripts.join('\n'),
    footer
  ].join('\n')
  console.log(`[${getTime()}] [ths-concat] common: ${getFilename(file)}`)
  const newFile = file.clone()
  newFile.contents = Buffer.from(output)
  return newFile
}

function thsConcat (file, options) {
  if (options.id === 'base') {
    const filename = getFilename(file, false)
    switch (filename) {
      case 'index':
        return thsConcatBaseIndex(file, options)
      case 'blog':
        return thsConcatBaseBlog(file, options)
      case 'project':
        return thsConcatBaseProject(file, options)
      case 'lab':
        return thsConcatBaseLab(file, options)
      default:
        return thsConcatCommon(file, options)
    }
  } else if (options.id === 'blog') {
    return thsConcatBlog(file, options)
  } else {
    return thsConcatCommon(file, options)
  }
}

module.exports = function (options = {}) {
  var stream = through(function (file, encoding, callback) {
    if (file.isNull()) {
      throw new Error('No File, please check')
    }

    const newFile = thsConcat(file, options)

    if (newFile) {
      this.push(newFile)
    }
    callback()
  }, function (callback) {
    callback()
  })

  return stream
}
