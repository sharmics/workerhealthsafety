import Users from "../Dataset/Users.json"
import Workers from "../Dataset/Workers.json"
import ZoneDetails from "../Dataset/ZoneDetails.json"
import Incidents from "../Dataset/Incidents.json"
import DashboardCardGraphData from "../Dataset/DashboardCardGraphData.json"

export default function data_set() {
    return {
      users: Users,
      workers: Workers,
      zone_details: ZoneDetails,
      incidents: Incidents,
      card_graph_data: DashboardCardGraphData
    };
}
