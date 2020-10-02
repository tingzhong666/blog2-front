import hljs from 'highlight.js'
import marked from 'marked'
import Vue from 'vue'

marked.setOptions({
  renderer: new marked.Renderer(),
  highlight: function(code, language) {
    const validLanguage = hljs.getLanguage(language) ? language : 'plaintext';
    return hljs.highlight(validLanguage, code).value;
  },
  pedantic: false,
  gfm: true,
  breaks: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  xhtml: false
})

marked.use({
  renderer: {
    heading(text, level) {
      return `<h${level} id="${text}" class="md-title">${text}</h${level}>`;
    }
  }
})

Vue.prototype.$marked = marked
