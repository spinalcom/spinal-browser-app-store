
import { appService } from "spinal-env-viewer-plugin-apps-generator/service/appsService";
import { SpinalGraphService } from "spinal-env-viewer-graph-service";
import { pathToFileURL } from "url";

export class GetAppService {
    constructor(){
        this.listOfTitle = ["Group", "Equipment"];
        this.ListFound = [];
        
        // ----- ajouter ici les nouvelles interfaces -----
        this.group = {
          title: "Group",
          type: "RoomsGroupContext",
          url:
            "http://localhost:7777/html/appstore/?path=",
          apps: []
          }
        this.equipment = {
          title: "Equipment",
          type: "EquipmentGroupContext",
          url:
            "http://localhost:7777/html/appstore/?path=",
          apps: []
          }
        this.ticket = {
            title: "Ticket",
            type: "SpinalSystemServiceTicket",
            url:
              "http://localhost:7777/html/maintainer/?path=",
            apps: []
            }  
        appService.getAllApps().then(res => {
            this.ListFound = res;
        });
        this.buildURL(); 
    }
    buildURL() {
      let path;
      try {
        path = window.location.href.split("path=")[1].split("&node")
      } catch {
        path = window.location.href.split("path=")[1]
      }

      this.group.url = this.group.url + path;
      this.equipment.url = this.equipment.url + path;
      this.ticket.url = this.ticket.url + path;

      // ajouter ici les nouvelles interfaces
    }
    GetList(list) {
      let listToReturn = []
        for (var i in list) {
          console.log("---list----", list[i]);
          if (list[i] === "RoomsGroupContext")
            listToReturn.push(this.group)
          if (list[i] === "EquipmentGroupContext")
            listToReturn.push(this.equipment)
          if (list[i] === "SpinalSystemServiceTicket")
            listToReturn.push(this.ticket)
        } 
        return listToReturn;
    }
}

export default new GetAppService();