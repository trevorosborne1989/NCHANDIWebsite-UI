
import axios from 'axios';

// Use this service URL for local
// const serviceURL = 'http://localhost:8080/api';

// Use this service URL for production
const serviceURL = 'https://df7g4zitg1.execute-api.us-west-1.amazonaws.com/nchandi-api';

class NCHANDIWebsiteService {
  constructor(params) {
    if (params) { 
      this.instance = axios.create({
        baseURL: params.baseURL ? params.baseURL : 'undefined',
        timeout: params.timeout ? params.timeout : 10000,
        headers: params.headers ? params.headers : {
          'Access-Control-Allow-Origin': serviceURL,
          'Content-Type': 'application/json, application/pdf, multipart/form-data, application/octet-stream',
          'Accept': 'application/json, application/pdf, multipart/form-data, application/octet-stream',
          'Access-Control-Request-Headers': 'Content-Type, Authorization'
        }
      });
    } else this.instance = axios;
  }

  /**
   * Valid Query Parameters:
   * {
   * }
   * @return Check serviceURL/swagger-ui/index.html#/ for more information on the response body 
   */
  getPendings(params, body) {

    return this.instance.get(serviceURL + '/pendings', params)
  }

  /**
   * Valid Query Parameters:
   * { 
   * } 
   * @return Check serviceURL/swagger-ui/index.html#/ for more information on the response body 
   */
  savePending(params, body) {

    return this.instance.post(serviceURL + '/pendings', body, params)
  }

  /**
   * Valid Query Parameters:
   * { 
   * string : pendingId, 
   * } 
   * @return Check serviceURL/swagger-ui/index.html#/ for more information on the response body 
   */
  getPendingWithPendingId(params, pendingId, body) {

    return this.instance.get(serviceURL + '/pendings/' + pendingId + '', params)
  }

  /**
   * Valid Query Parameters:
   * { 
   * string : pendingId, 
   * } 
   * @return Check serviceURL/swagger-ui/index.html#/ for more information on the response body 
   */
  putPendingWithPendingId(params, pendingId, body) {

    return this.instance.put(serviceURL + '/pendings/' + pendingId + '', body, params)
  }

  /**
   * Valid Query Parameters:
   * { 
   * string : pendingId, 
   * } 
   * @return Check serviceURL/swagger-ui/index.html#/ for more information on the response body 
   */
  deletePendingWithPendingId(params, pendingId, body) {

    return this.instance.delete(serviceURL + '/pendings/' + pendingId + '', params)
  }

  /**
   * Valid Query Parameters:
   * { 
   * string : pendingId, 
   * } 
   * @return Check serviceURL/swagger-ui/index.html#/ for more information on the response body 
   */
  approvePending(params, pendingId, body) {

    return this.instance.put(serviceURL + '/pendings/' + pendingId + '/approve', body, params)
  }

  /**
   * Valid Query Parameters:
   * { 
   * } 
   * @return Check serviceURL/swagger-ui/index.html#/ for more information on the response body 
   */
  getAllPanels(params, body) {

    return this.instance.get(serviceURL + '/panels', params)
  }

  /**
   * Valid Query Parameters:
   * { 
   * } 
   * @return Check serviceURL/swagger-ui/index.html#/ for more information on the response body 
   */
  getOpenPanels(params, body) {

    return this.instance.get(serviceURL + '/panels-open', params)
  }

  /**
   * Valid Query Parameters:
   * { 
   * } 
   * @return Check serviceURL/swagger-ui/index.html#/ for more information on the response body 
   */
  postPanel(params, body) {

    return this.instance.post(serviceURL + '/panels', body, params)
  }

  /**
   * Valid Query Parameters:
   * { 
   * string : panelId, 
   * } 
   * @return Check serviceURL/swagger-ui/index.html#/ for more information on the response body 
   */
  getPanelsWithPanelId(params, panelId, body) {

    return this.instance.get(serviceURL + '/panels/' + panelId + '', params)
  }

  /**
   * Valid Query Parameters:
   * { 
   * string : panelId, 
   * } 
   * @return Check serviceURL/swagger-ui/index.html#/ for more information on the response body 
   */
  putPanelWithPanelId(params, panelId, body) {

    return this.instance.put(serviceURL + '/panels/' + panelId + '', body, params)
  }

  /**
   * Valid Query Parameters:
   * { 
   * string : panelId, 
   * } 
   * @return Check serviceURL/swagger-ui/index.html#/ for more information on the response body 
   */
  deletePanelsWithPanelId(params, panelId, body) {

    return this.instance.delete(serviceURL + '/panels/' + panelId + '', params)
  }

  /**
   * Valid Query Parameters:
   * { 
   * } 
   * @return Check serviceURL/swagger-ui/index.html#/ for more information on the response body 
   */
  getFacilities(params, body) {

    return this.instance.get(serviceURL + '/facilities', params)
  }

  /**
   * Valid Query Parameters:
   * { 
   * } 
   * @return Check serviceURL/swagger-ui/index.html#/ for more information on the response body 
   */
  postFacilities(params, body) {

    return this.instance.post(serviceURL + '/facilities', body, params)
  }

  /**
   * Valid Query Parameters:
   * { 
   * string : facilityId, 
   * } 
   * @return Check serviceURL/swagger-ui/index.html#/ for more information on the response body 
   */
  getFacilitiesWithFacilityId(params, facilityId, body) {

    return this.instance.get(serviceURL + '/facilities/' + facilityId + '', params)
  }

  /**
   * Valid Query Parameters:
   * { 
   * string : facilityId, 
   * } 
   * @return Check serviceURL/swagger-ui/index.html#/ for more information on the response body 
   */
  putFacilitiesWithFacilityId(params, facilityId, body) {

    return this.instance.put(serviceURL + '/facilities/' + facilityId + '', body, params)
  }

  /**
   * Valid Query Parameters:
   * { 
   * string : facilityId, 
   * } 
   * @return Check serviceURL/swagger-ui/index.html#/ for more information on the response body 
   */
  deleteFacilitiesWithFacilityId(params, facilityId, body) {

    return this.instance.delete(serviceURL + '/facilities/' + facilityId + '', params)
  }

  /**
   * Valid Query Parameters:
   * { 
   * } 
   * @return Check serviceURL/swagger-ui/index.html#/ for more information on the response body 
   */
  getFacilitiesactive(params, body) {

    return this.instance.get(serviceURL + '/facilities-active', params)
  }

  /**
   * Valid Query Parameters:
   * { 
   * } 
   * @return Check serviceURL/swagger-ui/index.html#/ for more information on the response body 
   */
  getPeople(params, body) {

    return this.instance.get(serviceURL + '/people', params)
  }

  /**
   * Valid Query Parameters:
   * { 
   * } 
   * @return Check serviceURL/swagger-ui/index.html#/ for more information on the response body 
   */
  postPerson(params, body) {

    return this.instance.post(serviceURL + '/people', body, params)
  }

  /**
   * Valid Query Parameters:
   * { 
   * string : peopleId, 
   * } 
   * @return Check serviceURL/swagger-ui/index.html#/ for more information on the response body 
   */
  getPersonWithPersonId(params, personId, body) {

    return this.instance.get(serviceURL + '/people/' + personId + '', params)
  }

  /**
   * Valid Query Parameters:
   * { 
   * string : peopleId, 
   * } 
   * @return Check serviceURL/swagger-ui/index.html#/ for more information on the response body 
   */
  putPersonWithPersonId(params, personId, body) {

    return this.instance.put(serviceURL + '/people/' + personId + '', body, params)
  }

  /**
   * Valid Query Parameters:
   * { 
   * string : personId, 
   * } 
   * @return Check serviceURL/swagger-ui/index.html#/ for more information on the response body 
   */
  deletePersonWithPersonId(params, personId, body) {

    return this.instance.delete(serviceURL + '/people/' + personId + '', params)
  }

  /**
   * Valid Query Parameters:
   * { 
   * } 
   * @return Check serviceURL/swagger-ui/index.html#/ for more information on the response body 
   */
  getResourceItems(params, body) {

    return this.instance.get(serviceURL + '/resource-items', params)
  }

  /**
   * Valid Query Parameters:
   * { 
   * } 
   * @return Check serviceURL/swagger-ui/index.html#/ for more information on the response body 
   */
  postResourceItem(params, body) {

    return this.instance.post(serviceURL + '/resource-items', body, params)
  }

  /**
   * Valid Query Parameters:
   * { 
   * string : resourceItemId, 
   * } 
   * @return Check serviceURL/swagger-ui/index.html#/ for more information on the response body 
   */
  getResourceItemWithResourceItemId(params, resourceItemId, body) {

    return this.instance.get(serviceURL + '/resource-items/' + resourceItemId + '', params)
  }

  /**
   * Valid Query Parameters:
   * { 
   * string : resourceItemId, 
   * } 
   * @return Check serviceURL/swagger-ui/index.html#/ for more information on the response body 
   */
  putResourceItemWithResourceItemId(params, resourceItemId, body) {

    return this.instance.put(serviceURL + '/resource-items/' + resourceItemId + '', body, params)
  }

  /**
   * Valid Query Parameters:
   * { 
   * string : resourceItemId, 
   * } 
   * @return Check serviceURL/swagger-ui/index.html#/ for more information on the response body
   */
  deleteResourceItemWithResourceItemId(params, resourceItemId, body) {

    return this.instance.delete(serviceURL + '/resource-items/' + resourceItemId + '', params)
  }

  /**
   * Valid Query Parameters:
   * {
   * }
   * @return Check serviceURL/swagger-ui/index.html#/ for more information on the response body
   */
  getAttachments(params, body) {

    return this.instance.get(serviceURL + '/attachments', params)
  }

  /**
   * Valid Query Parameters:
   * {
   * string : resourceItemId,
   * }
   * @return Check serviceURL/swagger-ui/index.html#/ for more information on the response body
   */
  postAttachments(params, resourceItemId, body) {

    return this.instance.post(serviceURL + '/attachments/' + resourceItemId + '', body, params)
  }

  /**
   * Valid Query Parameters:
   * {
   * string : attachmentId,
   * }
   * @return Check serviceURL/swagger-ui/index.html#/ for more information on the response body
   */
  getAttachmentWithAttachmentId(params, attachmentId, body) {

    return axios.get(serviceURL + '/attachments/' + attachmentId + '', { responseType: 'blob' })
  }

  /**
   * Valid Query Parameters:
   * {
   * string : attachmentId,
   * }
   * @return Check serviceURL/swagger-ui/index.html#/ for more information on the response body
   */
  putAttachmentWithAttachmentId(params, attachmentId, body) {

    return this.instance.put(serviceURL + '/attachments/' + attachmentId + '', body, params)
  }

  /**
   * Valid Query Parameters:
   * {
   * string : attachmentId,
   * }
   * @return Check serviceURL/swagger-ui/index.html#/ for more information on the response body
   */
  deleteAttachmentWithAttachmentId(params, attachmentId, body) {

    return this.instance.delete(serviceURL + '/attachments/' + attachmentId + '', params)
  }

  /**
   * Valid Query Parameters:
   * {
   * }
   * @return Check serviceURL/swagger-ui/index.html#/ for more information on the response body
   */
  authenticate(token) {

    return axios.post(serviceURL + '/login', {}, {
      headers: {
        'Authorization': `Basic ${token}`
      },
    })
  }

  /**
   * Valid Query Parameters:
   * {
   * }
   * @return Check serviceURL/swagger-ui/index.html#/ for more information on the response body 
   */
  logout(params, body) {

    return this.instance.post(serviceURL + '/logout', params)
  }

  /**
   * Valid Query Parameters:
   * {
   * }
   * @return Check serviceURL/swagger-ui/index.html#/ for more information on the response body 
   */
  emailLiteratureRequest(params, body) {

    return this.instance.post(serviceURL + '/email/literature-request', body, params)
  }

  /**
   * Valid Query Parameters:
   * {
   * }
   * @return Check serviceURL/swagger-ui/index.html#/ for more information on the response body 
   */
  emailContactForm(params, body) {

    return this.instance.post(serviceURL + '/email/contact-form', body, params)
  }

}
export default NCHANDIWebsiteService;


