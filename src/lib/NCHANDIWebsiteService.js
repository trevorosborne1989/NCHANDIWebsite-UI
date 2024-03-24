/*** NAME NCHANDIWebsite-UI*/

import axios from 'axios';

class NCHANDIWebsiteService {
  constructor(params) {
    if (params) {
      this.instance = axios.create({
        baseURL: params.baseURL ? params.baseURL : 'undefined', 
        timeout: params.timeout ? params.timeout : 10000,
        headers: params.headers ? params.headers : { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' }, 
      });
    } else this.instance = axios;
  }

  /**
   * Valid Query Parameters:
   * { 
   * } 
   * @return Check http://localhost:8080/api/NCHANDIWebsite/swagger-ui/index.html#/ for more information on the response body 
   */ 
  getPendings(params, body) {
            
    return this.instance.get('http://localhost:8080/api/NCHANDIWebsite/pendings', params) 
  } 

  /**
   * Valid Query Parameters:
   * { 
   * } 
   * @return Check http://localhost:8080/api/NCHANDIWebsite/swagger-ui/index.html#/ for more information on the response body 
   */ 
  savePending(params, body) {
            
    return this.instance.post('http://localhost:8080/api/NCHANDIWebsite/pendings', body, params) 
  } 

  /**
   * Valid Query Parameters:
   * { 
   * string : pendingId, 
   * } 
   * @return Check http://localhost:8080/api/NCHANDIWebsite/swagger-ui/index.html#/ for more information on the response body 
   */ 
  getPendingWithPendingId(params, pendingId , body) {
            
    return this.instance.get('http://localhost:8080/api/NCHANDIWebsite/pendings/' + pendingId + '', params) 
  } 

  /**
   * Valid Query Parameters:
   * { 
   * string : pendingId, 
   * } 
   * @return Check http://localhost:8080/api/NCHANDIWebsite/swagger-ui/index.html#/ for more information on the response body 
   */ 
  putPendingWithPendingId(params, pendingId , body) {
            
    return this.instance.put('http://localhost:8080/api/NCHANDIWebsite/pendings/' + pendingId + '', body, params) 
  } 

  /**
   * Valid Query Parameters:
   * { 
   * string : pendingId, 
   * } 
   * @return Check http://localhost:8080/api/NCHANDIWebsite/swagger-ui/index.html#/ for more information on the response body 
   */ 
  deletePendingWithPendingId(params, pendingId , body) {
            
    return this.instance.delete('http://localhost:8080/api/NCHANDIWebsite/pendings/' + pendingId + '', params) 
  } 

  /**
   * Valid Query Parameters:
   * { 
   * string : pendingId, 
   * } 
   * @return Check http://localhost:8080/api/NCHANDIWebsite/swagger-ui/index.html#/ for more information on the response body 
   */ 
  approvePending(params, pendingId , body) {
            
    return this.instance.put('http://localhost:8080/api/NCHANDIWebsite/pendings/' + pendingId + '/approve', body, params) 
  } 

  /**
   * Valid Query Parameters:
   * { 
   * } 
   * @return Check http://localhost:8080/api/NCHANDIWebsite/swagger-ui/index.html#/ for more information on the response body 
   */ 
  getPanels(params, body) {
            
    return this.instance.get('http://localhost:8080/api/NCHANDIWebsite/panels', params) 
  } 

  /**
   * Valid Query Parameters:
   * { 
   * } 
   * @return Check http://localhost:8080/api/NCHANDIWebsite/swagger-ui/index.html#/ for more information on the response body 
   */ 
  postPanels(params, body) {
            
    return this.instance.post('http://localhost:8080/api/NCHANDIWebsite/panels', body, params) 
  } 

  /**
   * Valid Query Parameters:
   * { 
   * string : panelId, 
   * } 
   * @return Check http://localhost:8080/api/NCHANDIWebsite/swagger-ui/index.html#/ for more information on the response body 
   */ 
  getPanelsWithPanelId(params, panelId , body) {
            
    return this.instance.get('http://localhost:8080/api/NCHANDIWebsite/panels/' + panelId + '', params) 
  } 

  /**
   * Valid Query Parameters:
   * { 
   * string : panelId, 
   * } 
   * @return Check http://localhost:8080/api/NCHANDIWebsite/swagger-ui/index.html#/ for more information on the response body 
   */ 
  putPanelsWithPanelId(params, panelId , body) {
            
    return this.instance.put('http://localhost:8080/api/NCHANDIWebsite/panels/' + panelId + '', body, params) 
  } 

  /**
   * Valid Query Parameters:
   * { 
   * string : panelId, 
   * } 
   * @return Check http://localhost:8080/api/NCHANDIWebsite/swagger-ui/index.html#/ for more information on the response body 
   */ 
  deletePanelsWithPanelId(params, panelId , body) {
            
    return this.instance.delete('http://localhost:8080/api/NCHANDIWebsite/panels/' + panelId + '', params) 
  } 

  /**
   * Valid Query Parameters:
   * { 
   * } 
   * @return Check http://localhost:8080/api/NCHANDIWebsite/swagger-ui/index.html#/ for more information on the response body 
   */ 
  getPanelsopen(params, body) {
            
    return this.instance.get('http://localhost:8080/api/NCHANDIWebsite/panels-open', params) 
  } 

  /**
   * Valid Query Parameters:
   * { 
   * } 
   * @return Check http://localhost:8080/api/NCHANDIWebsite/swagger-ui/index.html#/ for more information on the response body 
   */ 
  getPanelmaterials(params, body) {
            
    return this.instance.get('http://localhost:8080/api/NCHANDIWebsite/panel-materials', params) 
  } 

  /**
   * Valid Query Parameters:
   * { 
   * } 
   * @return Check http://localhost:8080/api/NCHANDIWebsite/swagger-ui/index.html#/ for more information on the response body 
   */ 
  postPanelmaterials(params, body) {
            
    return this.instance.post('http://localhost:8080/api/NCHANDIWebsite/panel-materials', body, params) 
  } 

  /**
   * Valid Query Parameters:
   * { 
   * string : panelMaterialId, 
   * } 
   * @return Check http://localhost:8080/api/NCHANDIWebsite/swagger-ui/index.html#/ for more information on the response body 
   */ 
  getPanelmaterialsWithPanelMaterialId(params, panelMaterialId , body) {
            
    return this.instance.get('http://localhost:8080/api/NCHANDIWebsite/panel-materials/' + panelMaterialId + '', params) 
  } 

  /**
   * Valid Query Parameters:
   * { 
   * string : panelMaterialId, 
   * } 
   * @return Check http://localhost:8080/api/NCHANDIWebsite/swagger-ui/index.html#/ for more information on the response body 
   */ 
  putPanelmaterialsWithPanelMaterialId(params, panelMaterialId , body) {
            
    return this.instance.put('http://localhost:8080/api/NCHANDIWebsite/panel-materials/' + panelMaterialId + '', body, params) 
  } 

  /**
   * Valid Query Parameters:
   * { 
   * string : panelMaterialId, 
   * } 
   * @return Check http://localhost:8080/api/NCHANDIWebsite/swagger-ui/index.html#/ for more information on the response body 
   */ 
  deletePanelmaterialsWithPanelMaterialId(params, panelMaterialId , body) {
            
    return this.instance.delete('http://localhost:8080/api/NCHANDIWebsite/panel-materials/' + panelMaterialId + '', params) 
  } 

  /**
   * Valid Query Parameters:
   * { 
   * } 
   * @return Check http://localhost:8080/api/NCHANDIWebsite/swagger-ui/index.html#/ for more information on the response body 
   */ 
  getMonthlyreports(params, body) {
            
    return this.instance.get('http://localhost:8080/api/NCHANDIWebsite/monthly-reports', params) 
  } 

  /**
   * Valid Query Parameters:
   * { 
   * } 
   * @return Check http://localhost:8080/api/NCHANDIWebsite/swagger-ui/index.html#/ for more information on the response body 
   */ 
  postMonthlyreports(params, body) {
            
    return this.instance.post('http://localhost:8080/api/NCHANDIWebsite/monthly-reports', body, params) 
  } 

  /**
   * Valid Query Parameters:
   * { 
   * string : monthlyReportId, 
   * } 
   * @return Check http://localhost:8080/api/NCHANDIWebsite/swagger-ui/index.html#/ for more information on the response body 
   */ 
  getMonthlyreportsWithMonthlyReportId(params, monthlyReportId , body) {
            
    return this.instance.get('http://localhost:8080/api/NCHANDIWebsite/monthly-reports/' + monthlyReportId + '', params) 
  } 

  /**
   * Valid Query Parameters:
   * { 
   * string : monthlyReportId, 
   * } 
   * @return Check http://localhost:8080/api/NCHANDIWebsite/swagger-ui/index.html#/ for more information on the response body 
   */ 
  putMonthlyreportsWithMonthlyReportId(params, monthlyReportId , body) {
            
    return this.instance.put('http://localhost:8080/api/NCHANDIWebsite/monthly-reports/' + monthlyReportId + '', body, params) 
  } 

  /**
   * Valid Query Parameters:
   * { 
   * string : monthlyReportId, 
   * } 
   * @return Check http://localhost:8080/api/NCHANDIWebsite/swagger-ui/index.html#/ for more information on the response body 
   */ 
  deleteMonthlyreportsWithMonthlyReportId(params, monthlyReportId , body) {
            
    return this.instance.delete('http://localhost:8080/api/NCHANDIWebsite/monthly-reports/' + monthlyReportId + '', params) 
  } 

  /**
   * Valid Query Parameters:
   * { 
   * } 
   * @return Check http://localhost:8080/api/NCHANDIWebsite/swagger-ui/index.html#/ for more information on the response body 
   */ 
  getGeneralresources(params, body) {
            
    return this.instance.get('http://localhost:8080/api/NCHANDIWebsite/general-resources', params) 
  } 

  /**
   * Valid Query Parameters:
   * { 
   * } 
   * @return Check http://localhost:8080/api/NCHANDIWebsite/swagger-ui/index.html#/ for more information on the response body 
   */ 
  postGeneralresources(params, body) {
            
    return this.instance.post('http://localhost:8080/api/NCHANDIWebsite/general-resources', body, params) 
  } 

  /**
   * Valid Query Parameters:
   * { 
   * string : generalResourceId, 
   * } 
   * @return Check http://localhost:8080/api/NCHANDIWebsite/swagger-ui/index.html#/ for more information on the response body 
   */ 
  getGeneralresourcesWithGeneralResourceId(params, generalResourceId , body) {
            
    return this.instance.get('http://localhost:8080/api/NCHANDIWebsite/general-resources/' + generalResourceId + '', params) 
  } 

  /**
   * Valid Query Parameters:
   * { 
   * string : generalResourceId, 
   * } 
   * @return Check http://localhost:8080/api/NCHANDIWebsite/swagger-ui/index.html#/ for more information on the response body 
   */ 
  putGeneralresourcesWithGeneralResourceId(params, generalResourceId , body) {
            
    return this.instance.put('http://localhost:8080/api/NCHANDIWebsite/general-resources/' + generalResourceId + '', body, params) 
  } 

  /**
   * Valid Query Parameters:
   * { 
   * string : generalResourceId, 
   * } 
   * @return Check http://localhost:8080/api/NCHANDIWebsite/swagger-ui/index.html#/ for more information on the response body 
   */ 
  deleteGeneralresourcesWithGeneralResourceId(params, generalResourceId , body) {
            
    return this.instance.delete('http://localhost:8080/api/NCHANDIWebsite/general-resources/' + generalResourceId + '', params) 
  } 

  /**
   * Valid Query Parameters:
   * { 
   * } 
   * @return Check http://localhost:8080/api/NCHANDIWebsite/swagger-ui/index.html#/ for more information on the response body 
   */ 
  getFacilities(params, body) {
            
    return this.instance.get('http://localhost:8080/api/NCHANDIWebsite/facilities', params) 
  } 

  /**
   * Valid Query Parameters:
   * { 
   * } 
   * @return Check http://localhost:8080/api/NCHANDIWebsite/swagger-ui/index.html#/ for more information on the response body 
   */ 
  postFacilities(params, body) {
            
    return this.instance.post('http://localhost:8080/api/NCHANDIWebsite/facilities', body, params) 
  } 

  /**
   * Valid Query Parameters:
   * { 
   * string : facilityId, 
   * } 
   * @return Check http://localhost:8080/api/NCHANDIWebsite/swagger-ui/index.html#/ for more information on the response body 
   */ 
  getFacilitiesWithFacilityId(params, facilityId , body) {
            
    return this.instance.get('http://localhost:8080/api/NCHANDIWebsite/facilities/' + facilityId + '', params) 
  } 

  /**
   * Valid Query Parameters:
   * { 
   * string : facilityId, 
   * } 
   * @return Check http://localhost:8080/api/NCHANDIWebsite/swagger-ui/index.html#/ for more information on the response body 
   */ 
  putFacilitiesWithFacilityId(params, facilityId , body) {
            
    return this.instance.put('http://localhost:8080/api/NCHANDIWebsite/facilities/' + facilityId + '', body, params) 
  } 

  /**
   * Valid Query Parameters:
   * { 
   * string : facilityId, 
   * } 
   * @return Check http://localhost:8080/api/NCHANDIWebsite/swagger-ui/index.html#/ for more information on the response body 
   */ 
  deleteFacilitiesWithFacilityId(params, facilityId , body) {
            
    return this.instance.delete('http://localhost:8080/api/NCHANDIWebsite/facilities/' + facilityId + '', params) 
  } 

  /**
   * Valid Query Parameters:
   * { 
   * } 
   * @return Check http://localhost:8080/api/NCHANDIWebsite/swagger-ui/index.html#/ for more information on the response body 
   */ 
  getFacilitiesactive(params, body) {
            
    return this.instance.get('http://localhost:8080/api/NCHANDIWebsite/facilities-active', params) 
  } 

  /**
   * Valid Query Parameters:
   * { 
   * } 
   * @return Check http://localhost:8080/api/NCHANDIWebsite/swagger-ui/index.html#/ for more information on the response body 
   */ 
  getArchivedreports(params, body) {
            
    return this.instance.get('http://localhost:8080/api/NCHANDIWebsite/archived-reports', params) 
  } 

  /**
   * Valid Query Parameters:
   * { 
   * } 
   * @return Check http://localhost:8080/api/NCHANDIWebsite/swagger-ui/index.html#/ for more information on the response body 
   */ 
  postArchivedreports(params, body) {
            
    return this.instance.post('http://localhost:8080/api/NCHANDIWebsite/archived-reports', body, params) 
  } 

  /**
   * Valid Query Parameters:
   * { 
   * string : archivedReportId, 
   * } 
   * @return Check http://localhost:8080/api/NCHANDIWebsite/swagger-ui/index.html#/ for more information on the response body 
   */ 
  getArchivedreportsWithArchivedReportId(params, archivedReportId , body) {
            
    return this.instance.get('http://localhost:8080/api/NCHANDIWebsite/archived-reports/' + archivedReportId + '', params) 
  } 

  /**
   * Valid Query Parameters:
   * { 
   * string : archivedReportId, 
   * } 
   * @return Check http://localhost:8080/api/NCHANDIWebsite/swagger-ui/index.html#/ for more information on the response body 
   */ 
  putArchivedreportsWithArchivedReportId(params, archivedReportId , body) {
            
    return this.instance.put('http://localhost:8080/api/NCHANDIWebsite/archived-reports/' + archivedReportId + '', body, params) 
  } 

  /**
   * Valid Query Parameters:
   * { 
   * string : archivedReportId, 
   * } 
   * @return Check http://localhost:8080/api/NCHANDIWebsite/swagger-ui/index.html#/ for more information on the response body 
   */ 
  deleteArchivedreportsWithArchivedReportId(params, archivedReportId , body) {
            
    return this.instance.delete('http://localhost:8080/api/NCHANDIWebsite/archived-reports/' + archivedReportId + '', params) 
  } 

  /**
   * Valid Query Parameters:
   * { 
   * } 
   * @return Check http://localhost:8080/api/NCHANDIWebsite/swagger-ui/index.html#/ for more information on the response body 
   */ 
  getPeople(params, body) {
            
    return this.instance.get('http://localhost:8080/api/NCHANDIWebsite/people', params) 
  } 

  /**
   * Valid Query Parameters:
   * { 
   * } 
   * @return Check http://localhost:8080/api/NCHANDIWebsite/swagger-ui/index.html#/ for more information on the response body 
   */ 
  postPerson(params, body) {
            
    return this.instance.post('http://localhost:8080/api/NCHANDIWebsite/people', body, params) 
  } 

  /**
   * Valid Query Parameters:
   * { 
   * string : peopleId, 
   * } 
   * @return Check http://localhost:8080/api/NCHANDIWebsite/swagger-ui/index.html#/ for more information on the response body 
   */ 
  getPersonWithPersonId(params, personId, body) {
            
    return this.instance.get('http://localhost:8080/api/NCHANDIWebsite/people/' + personId + '', params) 
  } 

  /**
   * Valid Query Parameters:
   * { 
   * string : peopleId, 
   * } 
   * @return Check http://localhost:8080/api/NCHANDIWebsite/swagger-ui/index.html#/ for more information on the response body 
   */ 
  putPersonWithPersonId(params, personId , body) {
            
    return this.instance.put('http://localhost:8080/api/NCHANDIWebsite/people/' + personId + '', body, params) 
  } 

  /**
   * Valid Query Parameters:
   * { 
   * string : personId, 
   * } 
   * @return Check http://localhost:8080/api/NCHANDIWebsite/swagger-ui/index.html#/ for more information on the response body 
   */ 
  deletePersonWithPersonId(params, personId , body) {
            
    return this.instance.delete('http://localhost:8080/api/NCHANDIWebsite/people/' + personId + '', params)
  } 

 

} 
export default NCHANDIWebsiteService; 


