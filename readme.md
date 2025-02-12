# Started this project to learn TS, Nodejs, Nitro, Tailwind, Vue, Nuxt and Quasar

# Core functionality: Building web applications with an visual interface

## Features

- Export your created solution as an nuxtjs project (in the browser, with WebContainers!) - you will get an project with the common nuxtjs file structure with the difference that the views in the generated page files a rendererd dynamically based on the configuration (json) in AppConfigs/pages.ts
- Create as many pages as you want with the visual builder
- Custom theming
- Create events for components and let call an action (Control component, go to url, call function ...)
- The exported project can be served as SPA, MPA, PWA and with electron
- some other cool stuff

## Development

Before start, you need to install the dependencies of all modules and of Apps/NuxtApplicationSkeleton

cd Apps/NuxtApplicationSkeleton
npm run dev


## Build the project

cd Apps/NuxtApplicationSkeleton
npm run build

## Build and Export your solution

open http://localhost:3000/appdevelopment/development/"your solution name" 
open the download dialog on the top right corner and click on the "Bundle" or "Project" button. The bundle will return a ready to deploy nuxtjs project and the project will return a zip file with the project files and folders.