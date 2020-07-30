# MusicBox

A free music web app(desktop version) implemented by Vue.js, mimic of NetEase Music(https://music.163.com/), may be better, may be later ...

## Deployment

AWS EC2: http://ec2-54-191-119-231.us-west-2.compute.amazonaws.com:5600/

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

### Development Log

1. July 26th: Project initializatoin:

   - Created the project by vue-cli, with Vuex and vue-router supported;
   - Installed the essential libraries: element-ui, axios, lodash;

2. July 27th: https://vuejs.org/v2/style-guide/index.html

   - Project conventions:

     - components naming: PascalCase

   - Project Structure:

     - views: logic components, routing components
     - components: pure components
     - assets: images and styles

   - Implementation:
     - Styled Header buttons, input box
     - Styled aside Navigation list
     - Styled Main Content Area

3. July 29th: Added routes for Home and Recommend page

4. July 30th: Added vuex store, implemented search feature, footer audio play feature
