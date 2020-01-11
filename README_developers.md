# @Mill/ng

| For Users     | For Developers| 
| ------------- |:-------------:| 
| [Link for **Users**](./README_users.md)| [Link for **Developers**](./README_developers.md) |

## For developers


### Commands for starting dev 
1. Set fuib registry for npm
```
registry=https://nxrepo.fuib.com/repository/fuib-npm-group/
strict-ssl=false
```
2. git clone..., npm install
3. Run start command for open dev application (Stroybook)
```
npm start
```

### Commands for build npm package
```
npm i
npm run build
```


### Commands for static storybook app
```
npm i
npm run build-storybook
```

### How create new component
#### Git 
##### **Commits**
* Do not amend commits (aka "do not change git history") during PR (code review).
If you find your branch commit history messy and would like to make it pretty, you can do it only before merge after review is done with `git rebase -i HEAD~<amount of commits>` command.\
**Motivation**: *so that reviewers could see changes incrementally during PR.*

* Try to make atomic commits, e.g. so that each commit has a certain single goal.\
**Motivation**. *It is good for:*\
*.1 code review;*\
*.2 understanding history after weeks/months/years ... later;*\
*.3 sometimes, for reverting changes.*

Useful links: 1 - http://bit.ly/2qNCQnE | 2 - http://bit.ly/33LNeLk | 3 - http://bit.ly/2NIS6es | 4 - http://bit.ly/375hDWL | 5 - http://bit.ly/3747RV9 | 6 - http://bit.ly/37cq4zU | 7 - http://bit.ly/2CITmIl | 8 - http://bit.ly/2OcZ1eP

##### **Commit messages**
* Each commit message should begin with the task name, followed by colon and actual info message.

*Example: DSYS-79: modify input text directive (add mask)*

**Motivation**: *to be able to identify scope of change (JIRA ID), easy to filter Git history to see and do some operations (e.g. cherry-picking), same convention as in Server and Protocol projects.*

* Multi task commit can be performed only in case that two issues have the same fix and has to be 

*Example: DSYS-111, DSYS-222: fix foo for bar*

**Motivation**: *to have clear picture for fixes which were provided for issues.*

##### **Branch names**
* `master` - Release branch. Version separation by tags
* `develop` - Develop brach. From this branch will be created **beta** versions
* `feature/*-*_ID` - for PRs targeting master and the next release
* `bugfix/*-*_ID` - for bugfixes targeting master and the next release
* `hotfix/*-*_ID` - for bugfixes in an already released version
* `improvement/*-*` - to improve functionality, styles, project structure ... etc

*Examples:*
* `feature/syntactic-sugar`
* `feature/mega-cool-stuff_DSYS-379`
* `bugfix/edge-case_DSYS-383`
* `hotfix/crutch_DSYS-456`
* `improvement/support-stylelint`

**Motivation behind:**
* " / " - Well understand separator for branch type. " - " Is being used for separation of words.
* " / " Is used to group in GUI clients.

###### **Merge flow**
```
feature/*-*_ID ------> |
bugfix/*-*_ID -------> | develop --> | master
hotfix/*-*_ID -------> |
improvement/*-* -----> |
```


#### Project structure
```
|[src]
|--[module-name]
|----[components]
|------[component-a]
|--------component-a.component.ts
|--------component-a.component.html
|--------component-a.component.scss
|
|----[services]
|------service-a.service.ts
|
|----[strories]
|------variation-a.ts
|------variation-b.ts
|
|----module-name.module.ts
|----module-name.stories.ts
|----public-api.ts
|
|--public-api.ts
```
##### **public-api.ts (exporting)**
1. "Local" pablic-api.ts for you module. Put here modlues, components, variables that you with to export.

*example:*
```
export * from './module-name.module.ts'
export * from './components/component-a/component-a.component.ts'
export * from './services/service-a.service.ts'
```
2. "Global" public-api.ts. Put here export all from you "local" public-api.ts

*example:*
```
export * from './module-name/public-api.ts
```
##### **[stories] and module-name.stories.ts**
1. If you want create new file for each "substroy" create [stories] folder, and create files for "substory" here;

*example (substrory is variation-a.ts):*
```typescript
export const variationA = () => ({
  moduleMetadata: {
    declarations: [
      MillComponent
    ]
  },
  props: {
    text: 'Hello world!',
  },
  template: `
    <mill-component>{{text}}</mill-component>
  `
});
``` 

2. module-name.stories.ts group all you "substroies" to story for Stroybook, but you may write "substroies" here

*example (module-name.stories.ts)*
```typescript
import { variationA } from './stroies/variation-a';

export default { title: 'Mill Component' };

export { variationA };

export const variationB = () => ({
  moduleMetadata: {
    declarations: [
      MillComponent
    ]
  },
  props: {
    text: 'Hello world!',
  },
  template: `
    <mill-component varitaion="2">{{text}}</mill-component>
  `
});
```

