import { getAll } from './rc'
import downloadGit from 'download-git-repo'

export const downloadLocal = async (templateName, projectName) => {
  let config = await getAll()
  let api = `${config.registry}/${templateName}` // 这儿只需要是github的作者/包名，例如：tfeng-use/files

  return new Promise((resolve, reject) => {
    downloadGit(api, projectName, err => {
      if (err) {
        reject(err)
      }
      resolve()
    })
  })
}
