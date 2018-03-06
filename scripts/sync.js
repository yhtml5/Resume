const shell = require('shelljs');

// sync h5-mini-program report
const h5MinProgramReportSourceFiles = [
  '/Users/yhtml5/projects/gitlab/app/projects/03-小程序内嵌H5点餐/images',
  '/Users/yhtml5/projects/gitlab/app/projects/03-小程序内嵌H5点餐/report.md'
]
const h5MinProgramReportDest = '/Users/yhtml5/projects/gits/resume/src/pages/h5MinProgramReport'
console.log('\nremove h5-mini-program report')
shell.rm('-rf', [
  '/Users/yhtml5/projects/gits/resume/src/pages/h5MinProgramReport/images',
  '/Users/yhtml5/projects/gits/resume/src/pages/h5MinProgramReport/reports'
]);
console.log('copy h5-mini-program report\n')
shell.cp('-rf', h5MinProgramReportSourceFiles, h5MinProgramReportDest);

