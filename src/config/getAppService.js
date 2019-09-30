
import { appService } from "spinal-env-viewer-plugin-apps-generator/service/appsService";
import { SpinalGraphService } from "spinal-env-viewer-graph-service";

export class GetAppService {
    constructor(){
        this.listOfTitle = ["Group", "Equipment"];
        this.ListFound = [];
        this.group = {
          title: "Group",
          type: "RoomsGroupContext",
          url:
            "http://localhost:7777/html/appstore/?path=6df1273a26ebd872396a2da1563791c0f3095918a58d721d",
          apps: []
          }
        this.equipment = {
          title: "Equipment",
          type: "EquipmentGroupContext",
          url:
            "http://localhost:7777/html/appstore/?path=6df1273a26ebd872396a2da1563791c0f3095918a58d721d",
          apps: []
          }
        this.ticket = {
            title: "Ticket",
            type: "TicketGroupContext",
            url:
              "http://localhost:7777/html/appstore/?path=6df1273a26ebd872396a2da1563791c0f3095918a58d721d",
            apps: []
            }  
        appService.getAllApps().then(res => {
            this.ListFound = res;
        });
        console.log("serch app"); 
    }
    GetList(list) {
      let listToReturn = []
      console.log("'-------------------------------")
        for (var i in list) {
          console.log(list[i])
          if (list[i] === "RoomsGroupContext")
            listToReturn.push(this.group)
          if (list[i] === "EquipmentGroupContext")
            listToReturn.push(this.equipment)
          if (list[i] === "TicketGroupContext")
            listToReturn.push(this.ticket)
        }
        return listToReturn;
    }
}

export default new GetAppService();