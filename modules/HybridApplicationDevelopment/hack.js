import fs from 'fs'
import path from 'path'
import glob from 'glob'
import { parse, compileScript, compileTemplate } from '@vue/compiler-sfc'

const files = glob.sync('src/**/*.vue')
let count = 1

for (const file of files) {
 

  const source = fs.readFileSync(file, 'utf-8')
  const parsed = parse(source)
  const descriptor = parsed.descriptor
  let replaced = source

  if (descriptor.template) {
    const template = descriptor.template.content
    const hasQBtn = template.includes('<q-btn')

    if (hasQBtn) {
      const updatedTemplate = template
        .replace(/<q-input([^>]*)>([\s\S]*?)<\/q-input>/g, '<InputComponent$1>$2</InputComponent>')
        .replace(/<q-input([^>]*)\/>/g, '<InputComponent$1 />')

      if (updatedTemplate !== template) {
        // Replace template block
        replaced = replaced.replace(template, updatedTemplate)

        // Add import if script exists
        const scriptBlock = descriptor.script || descriptor.scriptSetup
        if (scriptBlock) {
          const scriptContent = scriptBlock.content
          const importStatement = `import { ButtonComponent } from 'alphaviewlibrary'`

          // Prevent duplicate import
          if (!scriptContent.includes(importStatement)) {
            const newScriptContent = importStatement + '\n' + scriptContent
            replaced = replaced.replace(scriptContent, newScriptContent)
          }
        } else {
          // No script block – insert <script setup> manually
          replaced = `<script setup>\nimport { ButtonComponent } from 'alphaviewlibrary'\n</script>\n` + replaced
        }

        console.log(`✔ Replaced and updated import in: ${file}`)
        fs.writeFileSync(file, replaced, 'utf-8')
        count++
      }
    }
  }
}
