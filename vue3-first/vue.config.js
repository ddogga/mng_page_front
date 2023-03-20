const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,

  outputDir:
    "C:/Users/User/Desktop/Programing/WorkSpace/project/study/tutoring/shop/src/main/resources/static",

  //index.html경로
  indexPath:
    "C:/Users/User/Desktop/Programing/WorkSpace/project/study/tutoring/shop/src/main/resources/templates/index.html",

  devServer: {
    port: 8085,
    proxy: {
      "/api": {
        target: "http://localhost:8084",
        changeOrigin: true, // cross origin 허용
      },
    },
  },
});
