
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
          'Access-Control-Allow-Origin': 'http://ec2-54-215-204-46.us-west-1.compute.amazonaws.com:8080',
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
   * @return Check http://ec2-54-215-204-46.us-west-1.compute.amazonaws.com:8080/api/NCHANDIWebsite/swagger-ui/index.html#/ for more information on the response body 
   */
  getPendings(params, body) {

    return this.instance.get('http://ec2-54-215-204-46.us-west-1.compute.amazonaws.com:8080/api/NCHANDIWebsite/pendings', params)
  }

  /**
   * Valid Query Parameters:
   * { 
   * } 
   * @return Check http://ec2-54-215-204-46.us-west-1.compute.amazonaws.com:8080/api/NCHANDIWebsite/swagger-ui/index.html#/ for more information on the response body 
   */
  savePending(params, body) {

    return this.instance.post('http://ec2-54-215-204-46.us-west-1.compute.amazonaws.com:8080/api/NCHANDIWebsite/pendings', body, params)
  }

  /**
   * Valid Query Parameters:
   * { 
   * string : pendingId, 
   * } 
   * @return Check http://ec2-54-215-204-46.us-west-1.compute.amazonaws.com:8080/api/NCHANDIWebsite/swagger-ui/index.html#/ for more information on the response body 
   */
  getPendingWithPendingId(params, pendingId, body) {

    return this.instance.get('http://ec2-54-215-204-46.us-west-1.compute.amazonaws.com:8080/api/NCHANDIWebsite/pendings/' + pendingId + '', params)
  }

  /**
   * Valid Query Parameters:
   * { 
   * string : pendingId, 
   * } 
   * @return Check http://ec2-54-215-204-46.us-west-1.compute.amazonaws.com:8080/api/NCHANDIWebsite/swagger-ui/index.html#/ for more information on the response body 
   */
  putPendingWithPendingId(params, pendingId, body) {

    return this.instance.put('http://ec2-54-215-204-46.us-west-1.compute.amazonaws.com:8080/api/NCHANDIWebsite/pendings/' + pendingId + '', body, params)
  }

  /**
   * Valid Query Parameters:
   * { 
   * string : pendingId, 
   * } 
   * @return Check http://ec2-54-215-204-46.us-west-1.compute.amazonaws.com:8080/api/NCHANDIWebsite/swagger-ui/index.html#/ for more information on the response body 
   */
  deletePendingWithPendingId(params, pendingId, body) {

    return this.instance.delete('http://ec2-54-215-204-46.us-west-1.compute.amazonaws.com:8080/api/NCHANDIWebsite/pendings/' + pendingId + '', params)
  }

  /**
   * Valid Query Parameters:
   * { 
   * string : pendingId, 
   * } 
   * @return Check http://ec2-54-215-204-46.us-west-1.compute.amazonaws.com:8080/api/NCHANDIWebsite/swagger-ui/index.html#/ for more information on the response body 
   */
  approvePending(params, pendingId, body) {

    return this.instance.put('http://ec2-54-215-204-46.us-west-1.compute.amazonaws.com:8080/api/NCHANDIWebsite/pendings/' + pendingId + '/approve', body, params)
  }

  /**
   * Valid Query Parameters:
   * { 
   * } 
   * @return Check http://ec2-54-215-204-46.us-west-1.compute.amazonaws.com:8080/api/NCHANDIWebsite/swagger-ui/index.html#/ for more information on the response body 
   */
  getAllPanels(params, body) {

    return this.instance.get('http://ec2-54-215-204-46.us-west-1.compute.amazonaws.com:8080/api/NCHANDIWebsite/panels', params)
  }

  /**
   * Valid Query Parameters:
   * { 
   * } 
   * @return Check http://ec2-54-215-204-46.us-west-1.compute.amazonaws.com:8080/api/NCHANDIWebsite/swagger-ui/index.html#/ for more information on the response body 
   */
  getOpenPanels(params, body) {

    return this.instance.get('http://ec2-54-215-204-46.us-west-1.compute.amazonaws.com:8080/api/NCHANDIWebsite/panels-open', params)
  }

  /**
   * Valid Query Parameters:
   * { 
   * } 
   * @return Check http://ec2-54-215-204-46.us-west-1.compute.amazonaws.com:8080/api/NCHANDIWebsite/swagger-ui/index.html#/ for more information on the response body 
   */
  postPanel(params, body) {

    return this.instance.post('http://ec2-54-215-204-46.us-west-1.compute.amazonaws.com:8080/api/NCHANDIWebsite/panels', body, params)
  }

  /**
   * Valid Query Parameters:
   * { 
   * string : panelId, 
   * } 
   * @return Check http://ec2-54-215-204-46.us-west-1.compute.amazonaws.com:8080/api/NCHANDIWebsite/swagger-ui/index.html#/ for more information on the response body 
   */
  getPanelsWithPanelId(params, panelId, body) {

    return this.instance.get('http://ec2-54-215-204-46.us-west-1.compute.amazonaws.com:8080/api/NCHANDIWebsite/panels/' + panelId + '', params)
  }

  /**
   * Valid Query Parameters:
   * { 
   * string : panelId, 
   * } 
   * @return Check http://ec2-54-215-204-46.us-west-1.compute.amazonaws.com:8080/api/NCHANDIWebsite/swagger-ui/index.html#/ for more information on the response body 
   */
  putPanelWithPanelId(params, panelId, body) {

    return this.instance.put('http://ec2-54-215-204-46.us-west-1.compute.amazonaws.com:8080/api/NCHANDIWebsite/panels/' + panelId + '', body, params)
  }

  /**
   * Valid Query Parameters:
   * { 
   * string : panelId, 
   * } 
   * @return Check http://ec2-54-215-204-46.us-west-1.compute.amazonaws.com:8080/api/NCHANDIWebsite/swagger-ui/index.html#/ for more information on the response body 
   */
  deletePanelsWithPanelId(params, panelId, body) {

    return this.instance.delete('http://ec2-54-215-204-46.us-west-1.compute.amazonaws.com:8080/api/NCHANDIWebsite/panels/' + panelId + '', params)
  }

  /**
   * Valid Query Parameters:
   * { 
   * } 
   * @return Check http://ec2-54-215-204-46.us-west-1.compute.amazonaws.com:8080/api/NCHANDIWebsite/swagger-ui/index.html#/ for more information on the response body 
   */
  getPanelsopen(params, body) {

    return this.instance.get('http://ec2-54-215-204-46.us-west-1.compute.amazonaws.com:8080/api/NCHANDIWebsite/panels-open', params)
  }

  /**
   * Valid Query Parameters:
   * { 
   * } 
   * @return Check http://ec2-54-215-204-46.us-west-1.compute.amazonaws.com:8080/api/NCHANDIWebsite/swagger-ui/index.html#/ for more information on the response body 
   */
  getFacilities(params, body) {

    return this.instance.get('http://ec2-54-215-204-46.us-west-1.compute.amazonaws.com:8080/api/NCHANDIWebsite/facilities', params)
  }

  /**
   * Valid Query Parameters:
   * { 
   * } 
   * @return Check http://ec2-54-215-204-46.us-west-1.compute.amazonaws.com:8080/api/NCHANDIWebsite/swagger-ui/index.html#/ for more information on the response body 
   */
  postFacilities(params, body) {

    return this.instance.post('http://ec2-54-215-204-46.us-west-1.compute.amazonaws.com:8080/api/NCHANDIWebsite/facilities', body, params)
  }

  /**
   * Valid Query Parameters:
   * { 
   * string : facilityId, 
   * } 
   * @return Check http://ec2-54-215-204-46.us-west-1.compute.amazonaws.com:8080/api/NCHANDIWebsite/swagger-ui/index.html#/ for more information on the response body 
   */
  getFacilitiesWithFacilityId(params, facilityId, body) {

    return this.instance.get('http://ec2-54-215-204-46.us-west-1.compute.amazonaws.com:8080/api/NCHANDIWebsite/facilities/' + facilityId + '', params)
  }

  /**
   * Valid Query Parameters:
   * { 
   * string : facilityId, 
   * } 
   * @return Check http://ec2-54-215-204-46.us-west-1.compute.amazonaws.com:8080/api/NCHANDIWebsite/swagger-ui/index.html#/ for more information on the response body 
   */
  putFacilitiesWithFacilityId(params, facilityId, body) {

    return this.instance.put('http://ec2-54-215-204-46.us-west-1.compute.amazonaws.com:8080/api/NCHANDIWebsite/facilities/' + facilityId + '', body, params)
  }

  /**
   * Valid Query Parameters:
   * { 
   * string : facilityId, 
   * } 
   * @return Check http://ec2-54-215-204-46.us-west-1.compute.amazonaws.com:8080/api/NCHANDIWebsite/swagger-ui/index.html#/ for more information on the response body 
   */
  deleteFacilitiesWithFacilityId(params, facilityId, body) {

    return this.instance.delete('http://ec2-54-215-204-46.us-west-1.compute.amazonaws.com:8080/api/NCHANDIWebsite/facilities/' + facilityId + '', params)
  }

  /**
   * Valid Query Parameters:
   * { 
   * } 
   * @return Check http://ec2-54-215-204-46.us-west-1.compute.amazonaws.com:8080/api/NCHANDIWebsite/swagger-ui/index.html#/ for more information on the response body 
   */
  getFacilitiesactive(params, body) {

    return this.instance.get('http://ec2-54-215-204-46.us-west-1.compute.amazonaws.com:8080/api/NCHANDIWebsite/facilities-active', params)
  }

  /**
   * Valid Query Parameters:
   * { 
   * } 
   * @return Check http://ec2-54-215-204-46.us-west-1.compute.amazonaws.com:8080/api/NCHANDIWebsite/swagger-ui/index.html#/ for more information on the response body 
   */
  getPeople(params, body) {

    return this.instance.get('http://ec2-54-215-204-46.us-west-1.compute.amazonaws.com:8080/api/NCHANDIWebsite/people', params)
  }

  /**
   * Valid Query Parameters:
   * { 
   * } 
   * @return Check http://ec2-54-215-204-46.us-west-1.compute.amazonaws.com:8080/api/NCHANDIWebsite/swagger-ui/index.html#/ for more information on the response body 
   */
  postPerson(params, body) {

    return this.instance.post('http://ec2-54-215-204-46.us-west-1.compute.amazonaws.com:8080/api/NCHANDIWebsite/people', body, params)
  }

  /**
   * Valid Query Parameters:
   * { 
   * string : peopleId, 
   * } 
   * @return Check http://ec2-54-215-204-46.us-west-1.compute.amazonaws.com:8080/api/NCHANDIWebsite/swagger-ui/index.html#/ for more information on the response body 
   */
  getPersonWithPersonId(params, personId, body) {

    return this.instance.get('http://ec2-54-215-204-46.us-west-1.compute.amazonaws.com:8080/api/NCHANDIWebsite/people/' + personId + '', params)
  }

  /**
   * Valid Query Parameters:
   * { 
   * string : peopleId, 
   * } 
   * @return Check http://ec2-54-215-204-46.us-west-1.compute.amazonaws.com:8080/api/NCHANDIWebsite/swagger-ui/index.html#/ for more information on the response body 
   */
  putPersonWithPersonId(params, personId, body) {

    return this.instance.put('http://ec2-54-215-204-46.us-west-1.compute.amazonaws.com:8080/api/NCHANDIWebsite/people/' + personId + '', body, params)
  }

  /**
   * Valid Query Parameters:
   * { 
   * string : personId, 
   * } 
   * @return Check http://ec2-54-215-204-46.us-west-1.compute.amazonaws.com:8080/api/NCHANDIWebsite/swagger-ui/index.html#/ for more information on the response body 
   */
  deletePersonWithPersonId(params, personId, body) {

    return this.instance.delete('http://ec2-54-215-204-46.us-west-1.compute.amazonaws.com:8080/api/NCHANDIWebsite/people/' + personId + '', params)
  }

  /**
   * Valid Query Parameters:
   * { 
   * } 
   * @return Check http://ec2-54-215-204-46.us-west-1.compute.amazonaws.com:8080/api/NCHANDIWebsite/swagger-ui/index.html#/ for more information on the response body 
   */
  getResourceItems(params, body) {

    return this.instance.get('http://ec2-54-215-204-46.us-west-1.compute.amazonaws.com:8080/api/NCHANDIWebsite/resource-items', params)
  }

  /**
   * Valid Query Parameters:
   * { 
   * } 
   * @return Check http://ec2-54-215-204-46.us-west-1.compute.amazonaws.com:8080/api/NCHANDIWebsite/swagger-ui/index.html#/ for more information on the response body 
   */
  postResourceItem(params, body) {

    return this.instance.post('http://ec2-54-215-204-46.us-west-1.compute.amazonaws.com:8080/api/NCHANDIWebsite/resource-items', body, params)
  }

  /**
   * Valid Query Parameters:
   * { 
   * string : resourceItemId, 
   * } 
   * @return Check http://ec2-54-215-204-46.us-west-1.compute.amazonaws.com:8080/api/NCHANDIWebsite/swagger-ui/index.html#/ for more information on the response body 
   */
  getResourceItemWithResourceItemId(params, resourceItemId, body) {

    return this.instance.get('http://ec2-54-215-204-46.us-west-1.compute.amazonaws.com:8080/api/NCHANDIWebsite/resource-items/' + resourceItemId + '', params)
  }

  /**
   * Valid Query Parameters:
   * { 
   * string : resourceItemId, 
   * } 
   * @return Check http://ec2-54-215-204-46.us-west-1.compute.amazonaws.com:8080/api/NCHANDIWebsite/swagger-ui/index.html#/ for more information on the response body 
   */
  putResourceItemWithResourceItemId(params, resourceItemId, body) {

    return this.instance.put('http://ec2-54-215-204-46.us-west-1.compute.amazonaws.com:8080/api/NCHANDIWebsite/resource-items/' + resourceItemId + '', body, params)
  }

  /**
   * Valid Query Parameters:
   * { 
   * string : resourceItemId, 
   * } 
   * @return Check http://ec2-54-215-204-46.us-west-1.compute.amazonaws.com:8080/api/NCHANDIWebsite/swagger-ui/index.html#/ for more information on the response body
   */
  deleteResourceItemWithResourceItemId(params, resourceItemId, body) {

    return this.instance.delete('http://ec2-54-215-204-46.us-west-1.compute.amazonaws.com:8080/api/NCHANDIWebsite/resource-items/' + resourceItemId + '', params)
  }

  /**
   * Valid Query Parameters:
   * {
   * }
   * @return Check http://ec2-54-215-204-46.us-west-1.compute.amazonaws.com:8080/api/NCHANDIWebsite/swagger-ui/index.html#/ for more information on the response body
   */
  getAttachments(params, body) {

    return this.instance.get('http://ec2-54-215-204-46.us-west-1.compute.amazonaws.com:8080/api/NCHANDIWebsite/attachments', params)
  }

  /**
   * Valid Query Parameters:
   * {
   * string : resourceItemId,
   * }
   * @return Check http://ec2-54-215-204-46.us-west-1.compute.amazonaws.com:8080/api/NCHANDIWebsite/swagger-ui/index.html#/ for more information on the response body
   */
  postAttachments(params, resourceItemId, body) {

    return this.instance.post('http://ec2-54-215-204-46.us-west-1.compute.amazonaws.com:8080/api/NCHANDIWebsite/attachments/' + resourceItemId + '', body, params)
  }

  /**
   * Valid Query Parameters:
   * {
   * string : attachmentId,
   * }
   * @return Check http://ec2-54-215-204-46.us-west-1.compute.amazonaws.com:8080/api/NCHANDIWebsite/swagger-ui/index.html#/ for more information on the response body
   */
  getAttachmentWithAttachmentId(params, attachmentId, body) {

    return axios.get('http://ec2-54-215-204-46.us-west-1.compute.amazonaws.com:8080/api/NCHANDIWebsite/attachments/' + attachmentId + '', { responseType: 'blob' })
  }

  /**
   * Valid Query Parameters:
   * {
   * string : attachmentId,
   * }
   * @return Check http://ec2-54-215-204-46.us-west-1.compute.amazonaws.com:8080/api/NCHANDIWebsite/swagger-ui/index.html#/ for more information on the response body
   */
  putAttachmentWithAttachmentId(params, attachmentId, body) {

    return this.instance.put('http://ec2-54-215-204-46.us-west-1.compute.amazonaws.com:8080/api/NCHANDIWebsite/attachments/' + attachmentId + '', body, params)
  }

  /**
   * Valid Query Parameters:
   * {
   * string : attachmentId,
   * }
   * @return Check http://ec2-54-215-204-46.us-west-1.compute.amazonaws.com:8080/api/NCHANDIWebsite/swagger-ui/index.html#/ for more information on the response body
   */
  deleteAttachmentWithAttachmentId(params, attachmentId, body) {

    return this.instance.delete('http://ec2-54-215-204-46.us-west-1.compute.amazonaws.com:8080/api/NCHANDIWebsite/attachments/' + attachmentId + '', params)
  }

  /**
   * Valid Query Parameters:
   * {
   * }
   * @return Check http://ec2-54-215-204-46.us-west-1.compute.amazonaws.com:8080/api/NCHANDIWebsite/swagger-ui/index.html#/ for more information on the response body
   */
  authenticate(token) {

    return axios.post('http://ec2-54-215-204-46.us-west-1.compute.amazonaws.com:8080/api/NCHANDIWebsite/login', {}, {
      headers: {
        'Authorization': `Basic ${token}`
      },
    })
  }

  /**
   * Valid Query Parameters:
   * {
   * }
   * @return Check http://ec2-54-215-204-46.us-west-1.compute.amazonaws.com:8080/api/NCHANDIWebsite/swagger-ui/index.html#/ for more information on the response body 
   */
  logout(params, body) {

    return this.instance.post('http://ec2-54-215-204-46.us-west-1.compute.amazonaws.com:8080/api/NCHANDIWebsite/logout', params)
  }

  /**
   * Valid Query Parameters:
   * {
   * }
   * @return Check http://ec2-54-215-204-46.us-west-1.compute.amazonaws.com:8080/api/NCHANDIWebsite/swagger-ui/index.html#/ for more information on the response body 
   */
  emailLiteratureRequest(params, body) {

    return this.instance.post('http://ec2-54-215-204-46.us-west-1.compute.amazonaws.com:8080/api/NCHANDIWebsite/email/literature-request', body, params)
  }

  /**
   * Valid Query Parameters:
   * {
   * }
   * @return Check http://ec2-54-215-204-46.us-west-1.compute.amazonaws.com:8080/api/NCHANDIWebsite/swagger-ui/index.html#/ for more information on the response body 
   */
  emailContactForm(params, body) {

    return this.instance.post('http://ec2-54-215-204-46.us-west-1.compute.amazonaws.com:8080/api/NCHANDIWebsite/email/contact-form', body, params)
  }

}
export default NCHANDIWebsiteService;


