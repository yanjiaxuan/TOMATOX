[![TOMATOX](docs/img/logo.png)](https://github.com/yanjiaxuan/TOMATOX/releases)
# TOMATOX

### A Online video player with TypeScript, React, and Electron.
- 🎞 全网在线VIP视频解析
- 🎨 贯彻精致简洁的设计风格
- 👑 PC全平台支持(Windows, Linux, MacOS)
- ✨ 新功能陆续上线中...

### About Project
[![React](docs/img/react.png)](https://reactjs.org/)
[![Webpack](docs/img/webpack.png)](https://webpack.js.org/)
[![TypeScript](docs/img/ts.png)](https://www.typescriptlang.org/)
[![Electron](docs/img/electron.png)](https://electronjs.org/)

[Electron](https://electronjs.org/) application boilerplate based on [React](https://reactjs.org/) and [Webpack](https://webpack.js.org/) for rapid application development using [TypeScript](https://www.typescriptlang.org/).

## Screenshot

![image](https://github.com/yanjiaxuan/TOMATOX/blob/main/docs/product/TOMATOX-1.png?raw=true)
![image](https://github.com/yanjiaxuan/TOMATOX/blob/main/docs/product/TOMATOX-2.png?raw=true)
![image](https://github.com/yanjiaxuan/TOMATOX/blob/main/docs/product/TOMATOX-3.png?raw=true)
![image](https://github.com/yanjiaxuan/TOMATOX/blob/main/docs/product/TOMATOX-4.png?raw=true)
![image](https://github.com/yanjiaxuan/TOMATOX/blob/main/docs/product/TOMATOX-5.png?raw=true)
![image](https://github.com/yanjiaxuan/TOMATOX/blob/main/docs/product/TOMATOX-6.png?raw=true)
![image](https://github.com/yanjiaxuan/TOMATOX/blob/main/docs/product/TOMATOX-7.png?raw=true)
![image](https://github.com/yanjiaxuan/TOMATOX/blob/main/docs/product/TOMATOX-8.png?raw=true)
![image](https://github.com/yanjiaxuan/TOMATOX/blob/main/docs/product/TOMATOX-9.png?raw=true)

## Install
Clone the repository with Git:

```bash
git clone --depth=1 git@github.com:yanjiaxuan/TOMATOX.git <your-project-name>
```

Setting npm registry and electron mirror address

```bash
npm config set registry https://mirrors.huaweicloud.com/repository/npm/
npm config set disturl https://mirrors.huaweicloud.com/nodejs/
npm config set electron_mirror https://mirrors.huaweicloud.com/electron/
```

And then install the dependencies:

```bash
cd <your-project-name>
npm install
```

## Usage
Both processes have to be started **simultaneously** in different console tabs:

```bash
npm run start-renderer-dev
npm run start-main-dev
```

This will start the application with hot-reload so you can instantly start developing your application.

You can also run do the following to start both in a single process:

```bash
npm run start-dev
```

## Packaging
We use [Electron builder](https://www.electron.build/) to build and package the application. By default you can run the following to package for your current platform:

```bash
npm run dist
```

This will create a installer for your platform in the `releases` folder.

You can make builds for specific platforms (or multiple platforms) by using the options found [here](https://www.electron.build/cli). E.g. building for all platforms (Windows, Mac, Linux):

```bash
npm run dist -- -mwl
```

## Husky and Prettier
This project comes with both Husky and Prettier setup to ensure a consistent code style. 

To change the code style, you can change the configuration in `.prettierrc`. 

In case you want to get rid of this, you can removing the following from `package.json`:

1. Remove `precommit` from the `scripts` section
1. Remove the `lint-staged` section
1. Remove `lint-staged`, `prettier`, `eslint-config-prettier`, and `husky` from the `devDependencies`

Also remove all mentions of Prettier from the `extends` section in `.eslintrc.json`.

### 版权声明

    本人发布的所有资源或软件均来自网络，与本人没有任何关系，只能作为私下交流、学习、研究之用，版权归原作者及原软件公司所有。
    
    本人发布的所有资源或软件请在下载后24小时内自行删除。如果您喜欢这个资源或软件，请联系原作者或原软件公司购买正版。与本人无关！
    
    本人仅仅提供一个私下交流、学习、研究的环境，将不对任何资源或软件负法律责任！
    
    任何涉及商业盈利性目的的单位或个人，均不得使用本人发布的资源或软件，否则产生的一切后果将由使用者自己承担！

## License
MIT © [yanjiaxuan](https://github.com/yanjiaxuan)
