# Qwitter (qwitter)

A Quasar Project

## Install the dependencies
```bash
yarn
# or
npm install
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)
```bash
quasar dev
```


### Build the app for production
```bash
quasar build
```

### Desktop Version (Electron)
#### Start in development mode
```bash
quasar dev -m electron
```

#### Build for production
To build for different platforms, change the ```bash electron > packager > platform``` setting in  ```bash quasar.conf.js``` to  ```bash win32```,  ```bash darwin```,  ```bash mas``` or  ```bash linux```

 ```bash quasar build -m electron```
 
#### iOS Version (Cordova)
##### Install Cordova globally
```bash npm install -g cordova```
or

```bashsudo npm install -g cordova```
