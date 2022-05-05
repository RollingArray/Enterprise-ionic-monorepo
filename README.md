# Enterprise Ionic/Angular Monorepo Sample Repository

This repo holds all the code for some of the sample apps as part of mono repository(Monorepo). The code which can shared across the apps must be created as library and inject to the apps via dependency injection.
```
Following are the sample apps the mono-repo supports
Apps
    -> Sidemenu (Ionic template) 
    -> Tabs (Ionic template) 
    -> List (Ionic template) 
```

# Follow below septs to create the mono repo from scratch 
## Create a directory and initialize a monorepo
```
ng new workspace-name --strict --create-application=false
```

## Initialize the monorepo as an Ionic multi-app project. This will create a multi-app ionic.config.json file. See Config File for full details.
```
ionic init --multi-app
```
## We're going to use the command line utility rimraf to remove some of the files that are created when using Angular's library schematic
```
npm install --save-dev rimraf
```
## Project Structure we will plan to implement 
```
apps/
    app-one/
    app-two/
libs/
  lib-one/
  lib-two
ionic.config.json
package.json
```

## Create a folder for apps
```
mkdir apps
```
## Adding an App
```
cd apps/
ionic start "app-name" --no-deps
```

## Migrate app specific angular.json to root angular.json before removing app specific angular.json
```
npx rimraf apps/app-name/angular.json

npx json -I -f apps/app-name/package.json -e "delete this.scripts"

npx json -I -f apps/app-name/package.json -e "delete this.dependencies"

npx json -I -f apps/app-name/package.json -e "delete this.devDependencies"

npx json -I -f apps/app-name/package.json -e "delete this.author"

npx json -I -f apps/app-name/package.json -e "this.author = 'Ranjoy Sen'"

npx json -I -f apps/app-name/package.json -e "this.description = 'Tabs App'"
```
## Remove the tsconfig.json form the app folder as we will refer to root tsconfig.json
```
npx rimraf apps/app-name/tsconfig.json

npx json -I -f apps/app-name/tsconfig.app.json -e "delete this.extends"

npx json -I -f apps/app-name/tsconfig.app.json -e "this.extends = '../../tsconfig.json'"
```
## Optional :: Add PWA support for web apps
```
ng add @angular/pwa --project app-name
```

## Most of our projects will be workspace libraries. We'll set the default project folder to the libs folder which will be created shortly. Do this by running this ng config command.
```
ng config newProjectRoot libs
```

# Add compodoc support to generate documentation

## Create a compodoc config file at the root of the repo
```
touch app-name.compodoc.json
```

## Upadate the json content with the files from the relevant app folder and everything in libs
```
{ 
    "include": [
        "apps/app-name/**/*.ts",
        "libs/**/*.ts"
    ]
}

```
## Create a new script in package.json to generate the doc
```
"doc:app-name": "./node_modules/.bin/compodoc -p app-name.compodoc.json -w -s -d ./documentation/app-name"
```


# Generate library
```
ng generate library library-name --entry-file=index --skip-install --skip-package-json
```
## We're going to get rid of the files ng-package.json,  package.json, and tsconfig.lib.prod.json as we want this to be a workspace library, not a package library.
```
npx rimraf libs/library-name/*package.json

npx rimraf libs/library-name/tsconfig.lib.prod.json
```
## if needs to remove the default generated filed in the lib 
```
npx rimraf libs/library-name/src/lib/*.*
```
## Remove the build architect target since we're not going to build this library separately – instead, it'll be built as part of the booking applications.
```
npx json -I -f angular.json -e "delete this.projects['library-name'].architect.build"
```
## The Angular library schematic in tsconfig.json set up the path mapping in the following listing.
```
{
  "compileOnSave": false,
  "compilerOptions": {
    "paths": {
      "library-name": [
        "dist/library-name/library-name",
        "dist/library-name",
      ]
    }
  },
}
```
## That path mapping was meant to use a package library after it had been built and output to the dist folder. We don't have a build architect target for the library anymore. Monorepos use workspace libraries straight from their source code and build them as part of an application bundle.
```
npx json -I -f tsconfig.json -e "delete this.compilerOptions.paths['library-name']"
npx json -I -f tsconfig.json -e "this.compilerOptions.paths['@workspace-name/library-name'] = ['libs/library-name/src/index.ts']"
```

## Consolidated Steps to create library, named walkthrough
```
ng generate library shared-component-library --entry-file=index --skip-install --skip-package-json

npx rimraf libs/shared-component-library/*package.json

npx rimraf libs/shared-component-library/tsconfig.lib.prod.json

npx json -I -f angular.json -e "delete this.projects['shared-component-library'].architect.build"

npx json -I -f tsconfig.json -e "delete this.compilerOptions.paths['shared-component-library']"

npx json -I -f tsconfig.json -e "this.compilerOptions.paths['@rc-enterprise/shared-component-library'] = ['libs/shared-component-library/src/index.ts']"
```
## Generate Page
```
cd cd workspace-name/apps/app-name/src/app 
ng g page pages/page-name
```
## To copy all the assets of <shared-library> in root of the app while building, make following changes in angular.json for each app in architect->build->options->assets for each app
```
{
  "glob": "**/*.json",
  "input": "libs/<shared-library>/assets",
  "output": "assets"
}, 
```
## Translation has been implemented as common shared file applicable too all the apps in the repo, Update the relevant translation keys in
```
libs/core/assets/i18n/en.json
```

# Create build scripts in root package.json for convenience
## run app in local environment
```
npm Run start-app-name
```

## Lint app in local environment
```
npm run lint-app-name
```

## Test app in local environment
```
npm run test-app-name
```

## Build app in local environment
```
npm run build-app-name
```

# Code commit rules
## Checkout <branch> build
```
git clone <git-url> -b <branch>
```
## Make relevant changes

## Stage related files together for a particular operation
```
Use VS code option to stage your changes
```
## Commit message guidelines for App
```

<App initial (<app-name>)> : <Short description>
```

## Commit message guidelines for Lib
```
<lib-name> : <Short description>
```

## Commit message guidelines for Root
```
<ROOT> : <Short description>
```

## Create separate PR for APP or LIB to elevate <lower-level-branch> to <higher-level-branch> for related feature changes

## Take frequent update in working days to avoid code conflicts


