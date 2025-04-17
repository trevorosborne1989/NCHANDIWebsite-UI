
import axios from 'axios';

class NCHANDIWebsiteService {
  constructor(params) {
    if (params) {
      this.instance = axios.create({
        baseURL: params.baseURL ? params.baseURL : 'undefined',
        timeout: params.timeout ? params.timeout : 10000,
        headers: params.headers ? params.headers : {
          // For local hosting use the below allow origin url. Update all of the api method routes in this document.
          // 'Access-Control-Allow-Origin': 'http://localhost:8080',
          'Access-Control-Allow-Origin': 'http://ec2-13-57-33-74.us-west-1.compute.amazonaws.com:8080',
          'Content-Type': 'application/json',
          'Access-Control-Request-Headers': 'Content-Type, Authorization'
        }
      });
    } else this.instance = axios;
  }

  /**
   * Valid Query Parameters:
   * {
   * }
   * @return Check https://ec2-13-57-33-74.us-west-1.compute.amazonaws.com:8080/swagger-ui/index.html#/ for more information on the response body 
   */
  getPendings(params, body) {

    return this.instance.get('https://ec2-13-57-33-74.us-west-1.compute.amazonaws.com:8080/pendings', params)
  }

  /**
   * Valid Query Parameters:
   * { 
   * } 
   * @return Check https://ec2-13-57-33-74.us-west-1.compute.amazonaws.com:8080/swagger-ui/index.html#/ for more information on the response body 
   */
  savePending(params, body) {

    return this.instance.post('https://ec2-13-57-33-74.us-west-1.compute.amazonaws.com:8080/pendings', body, params)
  }

  /**
   * Valid Query Parameters:
   * { 
   * string : pendingId, 
   * } 
   * @return Check https://ec2-13-57-33-74.us-west-1.compute.amazonaws.com:8080/swagger-ui/index.html#/ for more information on the response body 
   */
  getPendingWithPendingId(params, pendingId, body) {

    return this.instance.get('https://ec2-13-57-33-74.us-west-1.compute.amazonaws.com:8080/pendings/' + pendingId + '', params)
  }

  /**
   * Valid Query Parameters:
   * { 
   * string : pendingId, 
   * } 
   * @return Check https://ec2-13-57-33-74.us-west-1.compute.amazonaws.com:8080/swagger-ui/index.html#/ for more information on the response body 
   */
  putPendingWithPendingId(params, pendingId, body) {

    return this.instance.put('https://ec2-13-57-33-74.us-west-1.compute.amazonaws.com:8080/pendings/' + pendingId + '', body, params)
  }

  /**
   * Valid Query Parameters:
   * { 
   * string : pendingId, 
   * } 
   * @return Check https://ec2-13-57-33-74.us-west-1.compute.amazonaws.com:8080/swagger-ui/index.html#/ for more information on the response body 
   */
  deletePendingWithPendingId(params, pendingId, body) {

    return this.instance.delete('https://ec2-13-57-33-74.us-west-1.compute.amazonaws.com:8080/pendings/' + pendingId + '', params)
  }

  /**
   * Valid Query Parameters:
   * { 
   * string : pendingId, 
   * } 
   * @return Check https://ec2-13-57-33-74.us-west-1.compute.amazonaws.com:8080/swagger-ui/index.html#/ for more information on the response body 
   */
  approvePending(params, pendingId, body) {

    return this.instance.put('https://ec2-13-57-33-74.us-west-1.compute.amazonaws.com:8080/pendings/' + pendingId + '/approve', body, params)
  }

  /**
   * Valid Query Parameters:
   * { 
   * } 
   * @return Check https://ec2-13-57-33-74.us-west-1.compute.amazonaws.com:8080/swagger-ui/index.html#/ for more information on the response body 
   */
  getAllPanels(params, body) {

    return this.instance.get('https://ec2-13-57-33-74.us-west-1.compute.amazonaws.com:8080/panels', params)
  }

  /**
   * Valid Query Parameters:
   * { 
   * } 
   * @return Check https://ec2-13-57-33-74.us-west-1.compute.amazonaws.com:8080/swagger-ui/index.html#/ for more information on the response body 
   */
  getOpenPanels(params, body) {

    return this.instance.get('https://ec2-13-57-33-74.us-west-1.compute.amazonaws.com:8080/panels-open', params)
  }

  /**
   * Valid Query Parameters:
   * { 
   * } 
   * @return Check https://ec2-13-57-33-74.us-west-1.compute.amazonaws.com:8080/swagger-ui/index.html#/ for more information on the response body 
   */
  postPanel(params, body) {

    return this.instance.post('https://ec2-13-57-33-74.us-west-1.compute.amazonaws.com:8080/panels', body, params)
  }

  /**
   * Valid Query Parameters:
   * { 
   * string : panelId, 
   * } 
   * @return Check https://ec2-13-57-33-74.us-west-1.compute.amazonaws.com:8080/swagger-ui/index.html#/ for more information on the response body 
   */
  getPanelsWithPanelId(params, panelId, body) {

    return this.instance.get('https://ec2-13-57-33-74.us-west-1.compute.amazonaws.com:8080/panels/' + panelId + '', params)
  }

  /**
   * Valid Query Parameters:
   * { 
   * string : panelId, 
   * } 
   * @return Check https://ec2-13-57-33-74.us-west-1.compute.amazonaws.com:8080/swagger-ui/index.html#/ for more information on the response body 
   */
  putPanelWithPanelId(params, panelId, body) {

    return this.instance.put('https://ec2-13-57-33-74.us-west-1.compute.amazonaws.com:8080/panels/' + panelId + '', body, params)
  }

  /**
   * Valid Query Parameters:
   * { 
   * string : panelId, 
   * } 
   * @return Check https://ec2-13-57-33-74.us-west-1.compute.amazonaws.com:8080/swagger-ui/index.html#/ for more information on the response body 
   */
  deletePanelsWithPanelId(params, panelId, body) {

    return this.instance.delete('https://ec2-13-57-33-74.us-west-1.compute.amazonaws.com:8080/panels/' + panelId + '', params)
  }

  /**
   * Valid Query Parameters:
   * { 
   * } 
   * @return Check https://ec2-13-57-33-74.us-west-1.compute.amazonaws.com:8080/swagger-ui/index.html#/ for more information on the response body 
   */
  getFacilities(params, body) {

    return this.instance.get('https://ec2-13-57-33-74.us-west-1.compute.amazonaws.com:8080/facilities', params)
  }

  /**
   * Valid Query Parameters:
   * { 
   * } 
   * @return Check https://ec2-13-57-33-74.us-west-1.compute.amazonaws.com:8080/swagger-ui/index.html#/ for more information on the response body 
   */
  postFacilities(params, body) {

    return this.instance.post('https://ec2-13-57-33-74.us-west-1.compute.amazonaws.com:8080/facilities', body, params)
  }

  /**
   * Valid Query Parameters:
   * { 
   * string : facilityId, 
   * } 
   * @return Check https://ec2-13-57-33-74.us-west-1.compute.amazonaws.com:8080/swagger-ui/index.html#/ for more information on the response body 
   */
  getFacilitiesWithFacilityId(params, facilityId, body) {

    return this.instance.get('https://ec2-13-57-33-74.us-west-1.compute.amazonaws.com:8080/facilities/' + facilityId + '', params)
  }

  /**
   * Valid Query Parameters:
   * { 
   * string : facilityId, 
   * } 
   * @return Check https://ec2-13-57-33-74.us-west-1.compute.amazonaws.com:8080/swagger-ui/index.html#/ for more information on the response body 
   */
  putFacilitiesWithFacilityId(params, facilityId, body) {

    return this.instance.put('https://ec2-13-57-33-74.us-west-1.compute.amazonaws.com:8080/facilities/' + facilityId + '', body, params)
  }

  /**
   * Valid Query Parameters:
   * { 
   * string : facilityId, 
   * } 
   * @return Check https://ec2-13-57-33-74.us-west-1.compute.amazonaws.com:8080/swagger-ui/index.html#/ for more information on the response body 
   */
  deleteFacilitiesWithFacilityId(params, facilityId, body) {

    return this.instance.delete('https://ec2-13-57-33-74.us-west-1.compute.amazonaws.com:8080/facilities/' + facilityId + '', params)
  }

  /**
   * Valid Query Parameters:
   * { 
   * } 
   * @return Check https://ec2-13-57-33-74.us-west-1.compute.amazonaws.com:8080/swagger-ui/index.html#/ for more information on the response body 
   */
  getFacilitiesactive(params, body) {

    return this.instance.get('https://ec2-13-57-33-74.us-west-1.compute.amazonaws.com:8080/facilities-active', params)
  }

  /**
   * Valid Query Parameters:
   * { 
   * } 
   * @return Check https://ec2-13-57-33-74.us-west-1.compute.amazonaws.com:8080/swagger-ui/index.html#/ for more information on the response body 
   */
  getPeople(params, body) {

    return this.instance.get('https://ec2-13-57-33-74.us-west-1.compute.amazonaws.com:8080/people', params)
  }

  /**
   * Valid Query Parameters:
   * { 
   * } 
   * @return Check https://ec2-13-57-33-74.us-west-1.compute.amazonaws.com:8080/swagger-ui/index.html#/ for more information on the response body 
   */
  postPerson(params, body) {

    return this.instance.post('https://ec2-13-57-33-74.us-west-1.compute.amazonaws.com:8080/people', body, params)
  }

  /**
   * Valid Query Parameters:
   * { 
   * string : peopleId, 
   * } 
   * @return Check https://ec2-13-57-33-74.us-west-1.compute.amazonaws.com:8080/swagger-ui/index.html#/ for more information on the response body 
   */
  getPersonWithPersonId(params, personId, body) {

    return this.instance.get('https://ec2-13-57-33-74.us-west-1.compute.amazonaws.com:8080/people/' + personId + '', params)
  }

  /**
   * Valid Query Parameters:
   * { 
   * string : peopleId, 
   * } 
   * @return Check https://ec2-13-57-33-74.us-west-1.compute.amazonaws.com:8080/swagger-ui/index.html#/ for more information on the response body 
   */
  putPersonWithPersonId(params, personId, body) {

    return this.instance.put('https://ec2-13-57-33-74.us-west-1.compute.amazonaws.com:8080/people/' + personId + '', body, params)
  }

  /**
   * Valid Query Parameters:
   * { 
   * string : personId, 
   * } 
   * @return Check https://ec2-13-57-33-74.us-west-1.compute.amazonaws.com:8080/swagger-ui/index.html#/ for more information on the response body 
   */
  deletePersonWithPersonId(params, personId, body) {

    return this.instance.delete('https://ec2-13-57-33-74.us-west-1.compute.amazonaws.com:8080/people/' + personId + '', params)
  }

  /**
   * Valid Query Parameters:
   * { 
   * } 
   * @return Check https://ec2-13-57-33-74.us-west-1.compute.amazonaws.com:8080/swagger-ui/index.html#/ for more information on the response body 
   */
  getResourceItems(params, body) {

    return this.instance.get('https://ec2-13-57-33-74.us-west-1.compute.amazonaws.com:8080/resource-items', params)
  }

  /**
   * Valid Query Parameters:
   * { 
   * } 
   * @return Check https://ec2-13-57-33-74.us-west-1.compute.amazonaws.com:8080/swagger-ui/index.html#/ for more information on the response body 
   */
  postResourceItem(params, body) {

    return this.instance.post('https://ec2-13-57-33-74.us-west-1.compute.amazonaws.com:8080/resource-items', body, params)
  }

  /**
   * Valid Query Parameters:
   * { 
   * string : resourceItemId, 
   * } 
   * @return Check https://ec2-13-57-33-74.us-west-1.compute.amazonaws.com:8080/swagger-ui/index.html#/ for more information on the response body 
   */
  getResourceItemWithResourceItemId(params, resourceItemId, body) {

    return this.instance.get('https://ec2-13-57-33-74.us-west-1.compute.amazonaws.com:8080/resource-items/' + resourceItemId + '', params)
  }

  /**
   * Valid Query Parameters:
   * { 
   * string : resourceItemId, 
   * } 
   * @return Check https://ec2-13-57-33-74.us-west-1.compute.amazonaws.com:8080/swagger-ui/index.html#/ for more information on the response body 
   */
  putResourceItemWithResourceItemId(params, resourceItemId, body) {

    return this.instance.put('https://ec2-13-57-33-74.us-west-1.compute.amazonaws.com:8080/resource-items/' + resourceItemId + '', body, params)
  }

  /**
   * Valid Query Parameters:
   * { 
   * string : resourceItemId, 
   * } 
   * @return Check https://ec2-13-57-33-74.us-west-1.compute.amazonaws.com:8080/swagger-ui/index.html#/ for more information on the response body
   */
  deleteResourceItemWithResourceItemId(params, resourceItemId, body) {

    return this.instance.delete('https://ec2-13-57-33-74.us-west-1.compute.amazonaws.com:8080/resource-items/' + resourceItemId + '', params)
  }

  /**
   * Valid Query Parameters:
   * {
   * }
   * @return Check https://ec2-13-57-33-74.us-west-1.compute.amazonaws.com:8080/swagger-ui/index.html#/ for more information on the response body
   */
  getAttachments(params, body) {

    return this.instance.get('https://ec2-13-57-33-74.us-west-1.compute.amazonaws.com:8080/attachments', params)
  }

  /**
   * Valid Query Parameters:
   * {
   * string : resourceItemId,
   * }
   * @return Check https://ec2-13-57-33-74.us-west-1.compute.amazonaws.com:8080/swagger-ui/index.html#/ for more information on the response body
   */
  postAttachments(params, resourceItemId, body) {

    return this.instance.post('https://ec2-13-57-33-74.us-west-1.compute.amazonaws.com:8080/attachments/' + resourceItemId + '', body, params)
  }

  /**
   * Valid Query Parameters:
   * {
   * string : attachmentId,
   * }
   * @return Check https://ec2-13-57-33-74.us-west-1.compute.amazonaws.com:8080/swagger-ui/index.html#/ for more information on the response body
   */
  getAttachmentWithAttachmentId(params, attachmentId, body) {

    return axios.get('https://ec2-13-57-33-74.us-west-1.compute.amazonaws.com:8080/attachments/' + attachmentId + '', { responseType: 'blob' })
  }

  /**
   * Valid Query Parameters:
   * {
   * string : attachmentId,
   * }
   * @return Check https://ec2-13-57-33-74.us-west-1.compute.amazonaws.com:8080/swagger-ui/index.html#/ for more information on the response body
   */
  putAttachmentWithAttachmentId(params, attachmentId, body) {

    return this.instance.put('https://ec2-13-57-33-74.us-west-1.compute.amazonaws.com:8080/attachments/' + attachmentId + '', body, params)
  }

  /**
   * Valid Query Parameters:
   * {
   * string : attachmentId,
   * }
   * @return Check https://ec2-13-57-33-74.us-west-1.compute.amazonaws.com:8080/swagger-ui/index.html#/ for more information on the response body
   */
  deleteAttachmentWithAttachmentId(params, attachmentId, body) {

    return this.instance.delete('https://ec2-13-57-33-74.us-west-1.compute.amazonaws.com:8080/attachments/' + attachmentId + '', params)
  }

  /**
   * Valid Query Parameters:
   * {
   * }
   * @return Check https://ec2-13-57-33-74.us-west-1.compute.amazonaws.com:8080/swagger-ui/index.html#/ for more information on the response body
   */
  authenticate(token) {

    return axios.post('https://ec2-13-57-33-74.us-west-1.compute.amazonaws.com:8080/login', {}, {
      headers: {
        'Authorization': `Basic ${token}`
      },
    })
  }

  /**
   * Valid Query Parameters:
   * {
   * }
   * @return Check https://ec2-13-57-33-74.us-west-1.compute.amazonaws.com:8080/swagger-ui/index.html#/ for more information on the response body 
   */
  logout(params, body) {

    return this.instance.post('https://ec2-13-57-33-74.us-west-1.compute.amazonaws.com:8080/logout', params)
  }

  /**
   * Valid Query Parameters:
   * {
   * }
   * @return Check https://ec2-13-57-33-74.us-west-1.compute.amazonaws.com:8080/swagger-ui/index.html#/ for more information on the response body 
   */
  emailLiteratureRequest(params, body) {

    return this.instance.post('https://ec2-13-57-33-74.us-west-1.compute.amazonaws.com:8080/email/literature-request', body, params)
  }

  /**
   * Valid Query Parameters:
   * {
   * }
   * @return Check https://ec2-13-57-33-74.us-west-1.compute.amazonaws.com:8080/swagger-ui/index.html#/ for more information on the response body 
   */
  emailContactForm(params, body) {

    return this.instance.post('https://ec2-13-57-33-74.us-west-1.compute.amazonaws.com:8080/email/contact-form', body, params)
  }

}
export default NCHANDIWebsiteService;


