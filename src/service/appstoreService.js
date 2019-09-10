import { appService, isShownType, AppsContextModel, nodeTypeApp, relationName, relationType } from 'spinal-env-viewer-plugin-apps-generator/service/appsService';

console.log(appService);

class appStoreService {
  constructor() {
    this.users = []
    this.context = undefined;
  }

  getContext() {
    appService.getContext()
  }
}
const storeService = new appStoreService;
export default storeService
