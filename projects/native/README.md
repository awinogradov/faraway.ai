# Faraway.ai Native Application

## FAQ

### Beta

TestFlight [overview](https://help.apple.com/app-store-connect/#/devdc42b26b8).
TestFlight build [statuses](https://help.apple.com/app-store-connect/#/dev3d6869aff).

Build pipeline:

0. Generate `main.jsbundle` by `npm run build:jsbundle:ios` and add it in `Copy files` section on `Build steps` tab
1. `npm run xcode`
2. Set `farawayai-release` schema
3. Run `Build` for Generic iOS Device — [docs](https://help.apple.com/xcode/mac/current/#/devf37a1db04)
4. Run `Product` > `Archive`
5. Click `Distribute app`
6. Click `Upload`
