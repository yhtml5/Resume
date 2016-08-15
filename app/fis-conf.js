/************************* Project Setting *****************************/
fis.set('project.md5Length', 7);
fis.set('project.md5Connector ', '.');
fis.set('project.name', 'yhtml5');
fis.set('project.static', '/');
fis.set('project.ignore', ['*.test.*', '*.psd', '.git/**', '/**/demo.*']);
// fis.set('project.files', [
//     '/index.html','/stylesheets/**'
// ]);
fis.match('/stylesheets/**', {
    release:false
})
fis.match('/{index.html,stylesheets/**}', {
    optimizer: function (content) {
        return content.replace(/<!--([\s\S]*?)-->/g, '');
    }
})
fis.match('/components/**/*.css', {
    preprocessor: fis.plugin('cssprefixer', {
        "browsers": ["FireFox > 1", "Chrome > 1", "ie >= 8"],
        "cascade": true
    })
})
fis.match('/index.html', {
    optimizer: fis.plugin('htmlminify', {
        removeComments: true,
        collapseWhitespace: true,
        minifyJS: true,
        minifyCSS: true
    })
})